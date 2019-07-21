<template>

  <div class="DashboardAccounts">

    <login-instagram/>

    <b-row>

      <b-col sm="5">
        <div class="AccountsWrap">
          <b-card-group deck>

            <b-card no-body header-tag="header" footer-tag="footer">

              <div slot="header" class="">
                <div class="header-text">Аккаунты ({{this.$store.state.dashboard.accounts.length}})</div>
                <div class="header-btn">
                  <b-btn variant="outline-primary" v-b-modal.modal-instagram-login class="LoginClickAccount">Добавить аккаунт</b-btn>
                </div>
              </div>

              <b-list-group flush>

                <!-- @click="click_account(account)" -->
                <b-list-group-item href="#" v-for="account in this.$store.state.dashboard.accounts" @click="click_account(account)">
                  <b-row>
                    <b-col sm="2" class="item-icon" v-bind:class="{ bgWorkAccount: account.work }">
                      <img :src="account.hdProfilePicUrlInfo" width="60" alt="">
                    </b-col>
                    <b-col sm="10">
                      <div class="item-body">
                        <div class="d-flex w-100 justify-content-between">
                          <h5>{{account.username}}</h5>
                        </div>
                        <div class="line-info">
                          <!-- <pre>{{account}}</pre> -->
                          <span v-if="account.work" class="badge badge-primary">+{{account.count_like}}</span>
                          <span v-if="account.relogin" class="badge badge-danger">Переавторизуйте аккаунт.</span>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-list-group-item>

              </b-list-group>

              <em slot="footer">Footer Slot</em>

            </b-card>

          </b-card-group>
        </div>
      </b-col>

      <b-col sm="4">
        <payment-info/>
      </b-col>

    </b-row>

  </div>

</template>

<script>

import moment from 'moment'
import HTTP_V3 from '../../store/http.js'

import LoginInstagram from './LoginInstagram'
import PaymentInfo from './PaymentInfo'

export default {
  components: {
    'login-instagram': LoginInstagram,
    'payment-info': PaymentInfo
  },
  data() {
    return {
      instaLogin: {
        sendFormStatus: false,
        form: {
          login: '',
          password: '',
          challenge_code: ''
        }
      },
      show: true
    }
  },
  methods: {

    click_account(account) {

      // if (account.relogin) {
      //   this.$swal.fire({
      //     title: `Переавторизуйте аккаунт @${account.username}`,
      //     text: 'Для этого нажмите кнопку "Добавить аккаунт" и выполните переавторизацию аккаунта используя логин и пароль.',
      //     type: 'warning'
      //   })
      // } else {
      //   this.$router.push({
      //     path: `/dashboard/${account.username}`
      //   })
      // }

      this.$router.push({
        path: `/dashboard/${account.username}`
      })

    },

    loadDashboardAccounts() {
      this.$store.dispatch('DashboardAccounts')
      .then(e => {
        console.log(e)
      })
    }
  },
  created() {
    this.loadDashboardAccounts()
  }
}
</script>

<style>



/* ==================== */

.DashboardAccounts .AccountsWrap {
    margin: 0 0 30px 0;
    background: #fafafa;
    border-radius: 6px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.16);
    -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,.16);
    -moz-box-shadow: 0 1px 4px 0 rgba(0,0,0,.39);
}
.DashboardAccounts .AccountsWrap .card-deck {
    background: transparent!important;
}
.DashboardAccounts .AccountsWrap .card-deck .card {
    border: none;
    background: transparent!important;
}
.DashboardAccounts .AccountsWrap .card .card-header {
    padding: 12px 30px;
    background: transparent;
    box-shadow: none;
}
.DashboardAccounts .AccountsWrap .card .card-header .header-text {
    font-size: 22px;
    color: #26262b;
    font-weight: 900;
}
.DashboardAccounts .AccountsWrap .card .card-header .header-btn {
    position: absolute;
    top: 17px;
    right: 20px;
}
.DashboardAccounts .LoginClickAccount {
  background-image: linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-size: 128% 100%;
  -webkit-transition: background-position-x .1s ease-in-out;
  transition: background-position-x .1s ease-in-out;
  color: #fff;
  border: none;
  background-size: 100%;
  font-size: 10px;
  font-weight: 900;
  outline: none;
  overflow: hidden;
  letter-spacing: .6px;
  -webkit-box-shadow: 0 1px 1px #565b5f;
  box-shadow: 0 1px 1px #565b5f;
  text-transform: uppercase;
}
.DashboardAccounts .AccountsWrap .card .card-header .header-btn {
    position: absolute;
    top: 17px;
    right: 20px;
}
.DashboardAccounts .AccountsWrap .card-deck .card {
    border: none;
    background: transparent!important;
}
.DashboardAccounts .AccountsWrap .card .list-group {
    padding: 0;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item {
    cursor: pointer;
    padding: 15px;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item:active {
    color: #212529;
    background-color: #e9ecef;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item:hover, .list-group-item:focus {
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row {
    margin: 0;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row .item-icon {
  padding: 3px;
  width: 66px;
  height: 66px;
  max-width: 66px;
  max-height: 66px;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row .item-icon.bgWorkAccount {
  background-image: linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-size: 128% 100%;
  -webkit-transition: .1s background-position-x ease-in-out;
  transition: .1s background-position-x ease-in-out;
  border-radius: 100%;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row .item-icon img {
  border-radius: 100%;
  width: 60px;
  height: 60px;
  display: block;
}

.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row .item-body {
  padding: 0;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row h5 {
    font-size: 20px;
    font-weight: 600;
    font-style: normal;
    color: #262626;
    margin: 0;
    height: 30px;
    line-height: 30px;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row .item-body .line-info {
    text-align: left;
}
.DashboardAccounts .AccountsWrap .card .list-group .list-group-item .row .item-body .line-info .badge {
    line-height: 14px;
    border-radius: 3px;
    display: inline-block;
    padding: 0 .4em;
    font-size: 75%;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
}
</style>
