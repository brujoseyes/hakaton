


import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'


import moment from 'moment'


Vue.use(Vuex)
Vue.use(VueCookie)


import HTTP from '../http-common'
import HTTP_V3 from './http'


const getParameterByName = name => {

  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')

  // из адреса страницы
  let results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))

}

const store = new Vuex.Store({

  state: {

    user_id:      0 || VueCookie.get('user_id'),
    access_token: 0 || VueCookie.get('access_token'),

    // NEW STORE

    session: {
      auth: false
    },
    profile: {
      email_event: 0
    },

    profile_cards: {
      check: false,
      items: []
    },

    dashboard: {
      account: {},
      accounts: []
    }

  },

  mutations: {
    logsItems(state, payload) {
      this.state.account.logsItems = payload
    },
    lists(state, payload) {
      this.state.account.lists = payload
    },
    account(state, payload) {
      this.state.account.body = payload
    },

    loginSetAccount(state, payload) {
      this.state.profile.login_account = payload
    },

    // NEW STORE

    session(state, payload) {
      this.state.session       = payload.session
      this.state.profile       = payload.profile
      this.state.profile_cards = payload.profile_cards
    },

    DASHBOARD_ACCOUNT(state, payload) {
      this.state.dashboard.account = payload.account
    },

    DASHBOARD_ACCOUNTS(state, payload) {
      this.state.dashboard.accounts = payload.accounts
    },

    user_challenge_block(state, payload) {
      this.state.profile.challenge_block = payload
    }

  },

  actions: {

    PayAccount ({ commit }, amount) {

      console.log(store.state)

      return new Promise((resolve, reject) => {

        const widget = new cp.CloudPayments()

        const publickId = 'pk_d61f1e0456f1eb0c7b900f02b3a4d'

        widget.auth({
          publicId: publickId,
          amount: 990.00 || amount,
          currency: 'RUB',

          email: store.state.profile.email,

          invoiceId: store.state.profile.id,
          accountId: store.state.user_id,

          description: `Оплата аккаунта @${store.state.dashboard.account.username} на месяц`,

          data: {
            account_pay: true,
            user_id: store.state.profile.id,
            account_id: store.state.dashboard.account.id
          }

        }, options => {

          resolve({
            message: `PayAccount Ok`
          })

        }, (reason, options) => {

          resolve({
            message: `PayAccount Fail error`
          })

        })

      })

    },

    getSession ({ commit }) {

      return new Promise((resolve, reject) => {
        HTTP_V3.get('/profile/session')
        .then(res => {

          const data = res.data

          if (data.code) {
            if (data.code === 200) {
              commit('session', {
                session: data.session,
                profile: data.profile,
                profile_cards: data.profile_cards
              })
              resolve({
                message: data.message
              })
            }
            if (data.code === 403) {
              commit('session', {
                session: false,
                profile: false
              })
              resolve({
                message: data.message
              })
            }
          }

        })
      })

    },

    getAccount ({ commit }, username) {

      return new Promise((resolve, reject) => {
        HTTP_V3.get(`/account/body/${username}`)
        .then(res => {

          const data = res.data

          // console.log(data)
          //

          const account = {}

          if (data.code === 403) {
            account.AccessDenied = true
          }

          if (data.code === 404) {
            account.NotFound = true
          }

          if (data.code === 200) {

            account.body  = res.data.account
            account.lists = res.data.lists

            account.body.er_procent = ((account.body.analyst_er.end.value / account.body.analyst_er.start.value) * 100).toFixed(2)

            const current_time = moment().unix()

            if (current_time <= account.body.unixtime_like) {
              account.body.date_like_format = `Следующий запуск ${moment(account.body.unixtime_like * 1000).fromNow()}`
            } else {
              // this.account.body.date_like_format = `В очереди на запуск, списание средств ${moment(this.account.body.unixtime_pay * 1000).fromNow()}`
              account.body.date_like_format = `В очереди на запуск`
            }

            // account.lists.active.forEach((e, i) => {
            //   e.progress = 100 * e.key / e.count
            // })

            // this.show = true

            commit('account', {
              account: account
            })
            resolve({
              message: `Load account ok ok new`
            })

          }

          resolve()

        })
      })

    },

    getAccounts ({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP_V3.get('/profile/accounts')
        .then(res => {
          commit('accounts', res.data.accounts)
          resolve()
        })
      })
    },

    // New
    DashboardAccount({ commit }, username) {

      return new Promise((resolve, reject) => {
        HTTP_V3.get(`/account/${username}`)
        .then(res => {

          const data = res.data

          const account = {
            AccessDenied: false,
            NotFound: false,
            ShowBody: false,
            body: {
              hdProfilePicUrlInfo: '',
              params_obj: {
                mediaCount: 0,
                followerCount: 0,
                followingCount: 0
              }
            },
            lists: {
              active: [],
              ready: []
            }
          }

          // Доступ запрещен
          if (data.code === 403) {

            account.AccessDenied = true

            commit('DASHBOARD_ACCOUNT', {
              account: account
            })
            resolve({
              message: `Доступ запрещен @${username}`
            })

          }

          // Аккаунт не найден
          if (data.code === 404) {

            account.NotFound = true

            commit('DASHBOARD_ACCOUNT', {
              account: account
            })
            resolve({
              message: `Аккаунт @${username} не найден`
            })

          }

          if (data.code === 200) {

            account.body        = res.data.account
            account.lists       = res.data.lists

            account.body.er_procent = ((account.body.analyst_er.end.value / account.body.analyst_er.start.value) * 100).toFixed(2)

            const current_time = moment().unix()

            if (current_time <= account.body.unixtime_like) {
              account.body.date_like_format = `Запуск ${moment(account.body.unixtime_like * 1000).fromNow()}`
            } else {
              // this.account.body.date_like_format = `В очереди на запуск, списание средств ${moment(this.account.body.unixtime_pay * 1000).fromNow()}`
              account.body.date_like_format = `В очереди на запуск`
            }

            account.ShowBody = true

            commit('DASHBOARD_ACCOUNT', {
              account: account
            })
            resolve({
              message: `Load DASHBOARD_ACCOUNT @${username}`
            })

          }

        })
      })

    },

    DashboardAccounts({ commit }) {

      return new Promise((resolve, reject) => {
        HTTP_V3.get('/dashboard/accounts')
        .then(res => {
          commit('DASHBOARD_ACCOUNTS', {
            accounts: res.data.accounts
          })
          resolve({
            message: `Load DASHBOARD_ACCOUNTS`
          })
        })
      })

    }

  },

  // getters: {
  //   isLoggedIn: state => !!state.access_token,
  //   authStatus: state => state.session.auth
  // }

  getters: {
    DashboardAccount: state => {
      return state.dashboard.account
    },
    DashboardAccounts: state => {
      return state.dashboard.accounts
    }
  }

})

store.dispatch('getSession')
.then(ok => {

  console.log(`\n====== .ENV ======`)
  console.log(process.env)
  console.log(`====== .ENV ======\n\n`)

  const utm_source   = getParameterByName('utm_source')
  const utm_medium   = getParameterByName('utm_medium')
  const utm_campaign = getParameterByName('utm_campaign')
  
  const utm_term     = getParameterByName('utm_term')
  const utm_content  = getParameterByName('utm_content')

  VueCookie.set('utm_source', utm_source, { expires: '6M' })
  VueCookie.set('utm_medium', utm_medium, { expires: '6M' })
  VueCookie.set('utm_campaign', utm_campaign, { expires: '6M' })

  VueCookie.set('utm_term', utm_term, { expires: '6M' })
  VueCookie.set('utm_content', utm_content, { expires: '6M' })

  console.log(`utm_source: ${utm_source}`)
  console.log(`utm_medium: ${utm_medium}`)
  console.log(`utm_campaign: ${utm_campaign}`)
  console.log(`utm_term: ${utm_term}`)
  console.log(`utm_content: ${utm_content}`)

})

export default store
