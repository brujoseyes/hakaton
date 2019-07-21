<template lang="html">

  <div>

    <index-collection/>

    <b-col sm="10" class="p-0">


      <!-- <pre>{{$store.state.dashboard.account}}</pre> -->

      <!-- Только для админов -->
      <b-col sm="6" class="p-0">

        <div class="mb-4" v-if="!this.$store.state.profile_cards.check && this.$store.state.profile.root" style="font-size: 14px">
           <b-alert show variant="warning" style="padding: 1.5em;line-height: 170%">
             <h5><b>Карта оплаты отсутсвует</b></h5>
             <div class="">
               Можно привязать свою банковскую карту и<br>
               платить прямо с нее, без пополнения кошелька.<br>
               Данные карты вы указываете только один раз, во время привязки.
             </div>
             <!-- <pre>{{this.$store.state}}</pre> -->
             <b-btn class="mt-4" variant="secondary" @click="ClickPayAccount()">Привязать карту</b-btn>
           </b-alert>
        </div>

      </b-col>

      <div class="" v-if="this.$store.state.dashboard.account.NotFound">
        <h1>Аккаунт @{{this.$route.params.username}} не найден.</h1>
      </div>

      <div class="" v-if="this.$store.state.dashboard.account.AccessDenied">
        <h1>Доступ закрыт @{{this.$route.params.username}}</h1>
      </div>

      <div class="account-header" v-if="this.$store.state.dashboard.account.ShowBody">
        <div class="account-wrapper">

          <div class="account-body">

            <div class="account-body-info">

              <div class="account-body-photo">
                <a :href="`https://www.instagram.com/${this.$route.params.username}`" target="_blank">
                  <b-img :src="this.$store.state.dashboard.account.body.hdProfilePicUrlInfo" alt="left image" />
                </a>
              </div>

              <div class="block-msg-exceptions clearfix" v-if="this.$store.state.dashboard.account.body.msg_exceptions">
                <span>Предупреждение</span>
                <div class="msg-exceptions-content">
                  {{ this.$store.state.dashboard.account.body.msg_exceptions }}
                </div>
              </div>

              <!-- <h1>{{ this.$route.params.username }}</h1>

              <div class="account-status" v-if="this.$store.state.dashboard.account.body.work">В работе, {{ this.$store.state.dashboard.account.body.count_like }} лайков</div>
              <div class="account-status sleep" v-if="!this.$store.state.dashboard.account.body.work">{{ this.$store.state.dashboard.account.body.date_like_format }}</div> -->

              <!-- Мета данные -->
              <b-col sm="12" class="body-info-meta p-0 mt-4" style="display:none">
                <div class="meta-block-line">
                  <span>{{this.$store.state.dashboard.account.body.params_obj.mediaCount}}</span> публикаций
                </div>
                <div class="meta-block-line">
                  <span>{{this.$store.state.dashboard.account.body.params_obj.followerCount}}</span> подписчиков
                </div>
                <div class="meta-block-line">
                  <span>{{this.$store.state.dashboard.account.body.params_obj.followingCount}}</span> подписки
                </div>
                <div class="clearfix"></div>
              </b-col>

              <b-col sm="12" class="mt-4 p-0">
                <b-button-group>

                  <!-- <b-button :to="{ path: `/dashboard/${this.$route.params.username}` }">Аккаунт</b-button> -->
                  <b-button v-b-modal.modallg>Собрать аудиторию</b-button>

                  <b-dropdown left text="Еще">
                    <b-dropdown-item :to="{ path: `/dashboard/${this.$route.params.username}/settings` }">Настройки</b-dropdown-item>
                    <b-dropdown-item :to="{ path: `/dashboard/${this.$route.params.username}/logs` }">История действий</b-dropdown-item>
                    <b-dropdown-item :to="{ path: `/dashboard/${this.$route.params.username}/analyst` }">Analyst (beta)</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Item 3</b-dropdown-item>
                  </b-dropdown>

                </b-button-group>
              </b-col>

            </div>

          </div>

        </div>
      </div>

      <router-view/>

    </b-col>

  </div>

</template>

<script>

import swal from 'sweetalert'

import moment from 'moment'
import 'moment/min/locales'

moment.locale('ru')

import Collection from './Collection'

import HTTP from '../../http-common.js'
import HTTP_V3 from '../../store/http.js'

export default {
  components: {
    'index-collection': Collection
  },
  data() {
    return {
      title: 'Hello account/Index.vue'
    }
  },
  methods: {
    moment() {
      return moment()
    },
    payInOneClick() {

      HTTP_V3.post('/account/settings/pay_one_click', {
        instagram_user_id: this.this.$store.state.dashboard.account.body.id
      })
      .then(res => {

        const data = res.data

        if (data.code === 200) {
          swal({
            title: 'Успешно',
            text: data.message,
            icon: 'success'
          })
        }

      })

    },
    backward() {
      this.$router.push({
        path: `/dashboard`
      })
    },
    loadAccount() {

      const username = this.$route.params.username

      this.$store.dispatch('DashboardAccount', username)
      .then(ok => {

        console.log(ok)

      })

    },
    ClickPayAccount() {

      // PayAccount
      this.$store.dispatch('PayAccount')
      .then(e => {
        alert(e.message)
      })

    }
  },
  created() {
    this.loadAccount()
  },
  watch: {
    '$route.params.username' (to, from) {
      this.loadAccount()
    }
  }

}
</script>

<style lang="css">

  .box-sale-block {
    padding: 20px 0;
    line-height: 180%;
  }
  .box-sale-block img {
    margin: 0 0 20px 0;
  }

  .table-price {
    margin: 40px 0 0 0;
    width: 100%;
  }
  .table-price tr {
    height: 80px;
    line-height: 80px;
  }
  .table-price tr.header {
    border-bottom: 1px solid #ddd;
  }
  .table-price tr.header td {
    font-size: 14px;
    color: #9c9494;
    font-weight: 700;
  }
  .table-price tr.prices td {
    font-size: 24px;
    letter-spacing: 2px;
    width: 200px;
  }

  .account-block-not-paid {
    background: #fff;
    padding: 60px;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,.04);
    border-radius: 6px;
    position: relative;
    margin: 0 0 20px 0;
    text-align: center;
    line-height: 170%;
  }
  .description-block-pay {
    color: #000;
    font-size: 16px;
    font-weight: bold;
    line-height: 180%;
  }
  .account-block-not-paid i {
    background: #fff933;
    font-size: 14px;
    padding: 4px 6px;
  }
  .account-block-not-paid .block-not-paid-content {
    color: #000;
    letter-spacing: 1px;
  }
  .account-block-not-paid .block-not-paid-content .not-paid-card {
    background: #f3f3f3;
  }

  .account-block-not-paid .block-not-paid-content .not-paid-card .icon-card-left {
    float: left;
    padding: 0 24px;
  }
  .account-block-not-paid .block-not-paid-content .not-paid-card .icon-card-left .icon-card {
    width: 98px;
    height: 120px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98' height='72' viewBox='0 0 98 72'%3E%3Cpath fill='none' d='M0 0H98V72H0z'/%3E%3Cpath d='M80,62H18a6.0176,6.0176,0,0,1-6-6V16a6.0176,6.0176,0,0,1,6-6H80a6.0176,6.0176,0,0,1,6,6V56A6.0176,6.0176,0,0,1,80,62Z' fill='%238c2e78'/%3E%3Cpath d='M79.1,42.7h-14a2.0059,2.0059,0,0,1-2-2v-10a2.0059,2.0059,0,0,1,2-2h14a2.0059,2.0059,0,0,1,2,2v10A2.0059,2.0059,0,0,1,79.1,42.7Z' fill='%23b53c9b'/%3E%3Cpath d='M22.1 46.4V41.6L21 42.7l-.8-.8 2.1-2.1h1.2v6.7H22.1zM24.6 46.4V45.3c2.7-2 3.5-2.7 3.5-3.5 0-.6-.5-.9-1.1-.9a2.3417 2.3417 0 0 0-1.8.8l-.8-.9A3.143 3.143 0 0 1 27 39.7a2.226 2.226 0 0 1 2.5 2.1c0 1.1-.9 2.1-2.7 3.4h2.7v1.2zM30.3 45.5l.7-1a2.6885 2.6885 0 0 0 1.8.8c.8 0 1.3-.3 1.3-.8s-.4-.8-1.3-.8H32V42.4h.8c.7 0 1.2-.2 1.2-.7s-.5-.8-1.2-.8a2.342 2.342 0 0 0-1.7.7l-.7-.9a3.2723 3.2723 0 0 1 2.5-1.1c1.6 0 2.5.7 2.5 1.8a1.6124 1.6124 0 0 1-1.5 1.5 1.7181 1.7181 0 0 1 1.6 1.6c0 1.1-1 2-2.6 2A3.3 3.3 0 0 1 30.3 45.5zM39.4 46.4V45H36.2V43.9l2.6-4.2h2v4h.9V45h-.9v1.4zm0-5.4l-1.8 2.8h1.8zM45 45.5l.8-1a2.41 2.41 0 0 0 1.8.7c.8 0 1.2-.4 1.2-1s-.4-1-1.2-1a2.3893 2.3893 0 0 0-1.4.5l-1-.3V39.6h4.6V41H46.6v1.6a2.2915 2.2915 0 0 1 1.5-.6 2.0753 2.0753 0 0 1 2.1 2.2c0 1.4-1.1 2.3-2.7 2.3A3.04 3.04 0 0 1 45 45.5zM51 43.1c0-2 1.1-3.4 3.1-3.4a3.2209 3.2209 0 0 1 2 .7l-.6 1.1a1.901 1.901 0 0 0-1.3-.5 1.74 1.74 0 0 0-1.7 1.9V43a2.3737 2.3737 0 0 1 1.7-.9 2.1785 2.1785 0 0 1 2.3 2.2A2.3169 2.3169 0 0 1 54 46.6C51.8 46.5 51 45 51 43.1zm3.9 1.2c0-.7-.6-1-1.2-1a1.6125 1.6125 0 0 0-1.3.6c.1.6.4 1.3 1.3 1.3A.9517.9517 0 0 0 54.9 44.3zM57.9 46.4L60.3 41H56.9V39.8h5v1l-2.5 5.7H57.9zM62.5 44.7A1.9012 1.9012 0 0 1 63.9 43c-.7-.3-1.3-.7-1.3-1.6 0-1.3 1.3-1.8 2.6-1.8 1.2 0 2.6.5 2.6 1.8A1.81 1.81 0 0 1 66.5 43a1.9013 1.9013 0 0 1 1.4 1.7c0 1.2-1.3 1.8-2.7 1.8S62.5 45.9 62.5 44.7zm3.9-.2c0-.6-.8-.8-1.2-.9-.4.1-1.2.3-1.2.9 0 .5.5.8 1.2.8S66.4 45 66.4 44.5zm-.1-2.9c0-.5-.5-.8-1.1-.8-.7 0-1.1.3-1.1.8s.7.7 1.1.8C65.6 42.4 66.3 42.1 66.3 41.6z' opacity='.2'/%3E%3Cpath d='M22.1 45.4V40.6L21 41.7l-.8-.8 2.1-2.1h1.2v6.7H22.1zM24.6 45.4V44.3c2.7-2 3.5-2.7 3.5-3.5 0-.6-.5-.9-1.1-.9a2.3417 2.3417 0 0 0-1.8.8l-.8-.9A3.143 3.143 0 0 1 27 38.7a2.226 2.226 0 0 1 2.5 2.1c0 1.1-.9 2.1-2.7 3.4h2.7v1.2zM30.3 44.5l.7-1a2.6885 2.6885 0 0 0 1.8.8c.8 0 1.3-.3 1.3-.8s-.4-.8-1.3-.8H32V41.4h.8c.7 0 1.2-.2 1.2-.7s-.5-.8-1.2-.8a2.342 2.342 0 0 0-1.7.7l-.7-.9a3.2723 3.2723 0 0 1 2.5-1.1c1.6 0 2.5.7 2.5 1.8a1.6124 1.6124 0 0 1-1.5 1.5 1.7181 1.7181 0 0 1 1.6 1.6c0 1.1-1 2-2.6 2A3.3 3.3 0 0 1 30.3 44.5zM39.4 45.4V44H36.2V42.9l2.6-4.2h2v4h.9V44h-.9v1.4zm0-5.4l-1.8 2.8h1.8zM45 44.5l.8-1a2.41 2.41 0 0 0 1.8.7c.8 0 1.2-.4 1.2-1s-.4-1-1.2-1a2.3893 2.3893 0 0 0-1.4.5l-1-.3V38.6h4.6V40H46.6v1.6a2.2915 2.2915 0 0 1 1.5-.6 2.0753 2.0753 0 0 1 2.1 2.2c0 1.4-1.1 2.3-2.7 2.3A3.04 3.04 0 0 1 45 44.5zM51 42.1c0-2 1.1-3.4 3.1-3.4a3.2209 3.2209 0 0 1 2 .7l-.6 1.1a1.901 1.901 0 0 0-1.3-.5 1.74 1.74 0 0 0-1.7 1.9V42a2.3737 2.3737 0 0 1 1.7-.9 2.1785 2.1785 0 0 1 2.3 2.2A2.3169 2.3169 0 0 1 54 45.6C51.8 45.5 51 44 51 42.1zm3.9 1.2c0-.7-.6-1-1.2-1a1.6125 1.6125 0 0 0-1.3.6c.1.6.4 1.3 1.3 1.3A.9517.9517 0 0 0 54.9 43.3zM57.9 45.4L60.3 40H56.9V38.8h5v1l-2.5 5.7H57.9zM62.5 43.7A1.9012 1.9012 0 0 1 63.9 42c-.7-.3-1.3-.7-1.3-1.6 0-1.3 1.3-1.8 2.6-1.8 1.2 0 2.6.5 2.6 1.8A1.81 1.81 0 0 1 66.5 42a1.9013 1.9013 0 0 1 1.4 1.7c0 1.2-1.3 1.8-2.7 1.8S62.5 44.9 62.5 43.7zm3.9-.2c0-.6-.8-.8-1.2-.9-.4.1-1.2.3-1.2.9 0 .5.5.8 1.2.8S66.4 44 66.4 43.5zm-.1-2.9c0-.5-.5-.8-1.1-.8-.7 0-1.1.3-1.1.8s.7.7 1.1.8C65.6 41.4 66.3 41.1 66.3 40.6z' fill='%23fff'/%3E%3Cpath d='M26,62H80a6.0176,6.0176,0,0,0,6-6V16a6.0176,6.0176,0,0,0-6-6H60.2Z' opacity='.1' style='isolation:isolate'/%3E%3Cpath d='M86,56V16a6.1028,6.1028,0,0,0-4.8-5.9L47,62H80A6.0176,6.0176,0,0,0,86,56Z' opacity='.2' style='isolation:isolate'/%3E%3C/svg%3E")
  }

  .account-block-not-paid .block-not-paid-content .not-paid-card .paid-card-content {
    padding: 30px 20px 30px 20px;
    float: left;
  }
  .account-block-not-paid .block-not-paid-content .not-paid-card .card-label-title {
    font: bold 26px/40px Arial, 'Helvetica Neue', Helvetica, FreeSans, sans-serif;
    margin: 0 0 8px 0;
  }
  .account-block-not-paid .block-not-paid-content .not-paid-card .card-label-price {
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    margin: 0 0 8px 0;
  }
  .account-block-not-paid .block-not-paid-content .not-paid-card .card-label-date {
    color: #827a7a;
    font-weight: bold;
  }

  .account-block-not-paid .block-not-paid-content .not-paid-card .paid-card-btns {
    float: right;
    padding: 0 30px;
    line-height: 146px;
  }
  .account-block-not-paid .block-not-paid-content .not-paid-card .paid-card-btns button {
    background-color: #00b05a;
    color: #fff;
    padding: 0 12px;
    font-size: 14px;
    line-height: 38px;
    font-weight: bold;
  }


  .account-header {
    position: relative;
    margin: 0 0 20px 0;
  }
  .account-header .bg-black {
    position: absolute;
  }

  .account-wrapper {

  }
  .account-wrapper .account-body {

  }

  .account-wrapper .account-body .account-body-photo {
    width: 140px;
    padding: 0;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    /* -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14); */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    margin: 0 0 10px 0;
  }
  .account-wrapper .account-body .account-body-photo img {
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
  }

  .account-wrapper .account-body .account-body-info {

  }
  .account-wrapper .account-body .account-body-info h1 {
    font-weight: bold;
    font-family: "Museo Sans Cyrl 900 normal",sans-serif;
    font-size: 32px;
    letter-spacing: 1px;
    color: #000;
    padding: 10px 0;
    margin: 0;
  }
  .account-wrapper .account-body .account-body-info .account-status {
    font-size: 14px;
    font-weight: bold;
    color: #444;
  }
  .account-wrapper .account-body .account-body-info .account-status.sleep {
    /* background: #ffc10794;
    color: #654b22; */
    color: #0755e4;
    background: transparent;
    padding: 0;
    font-size: 12px;
  }

  .account-wrapper .account-body .account-body-info .body-info-meta {

  }
  .account-wrapper .account-body .account-body-info .body-info-meta .meta-block-line {
    float: left;
    min-width: 150px;
    color: #000;
    letter-spacing: 0.6px;
    font-size: 10px;
    font-weight: bold;
  }
  .account-wrapper .account-body .account-body-info .body-info-meta .meta-block-line span {
    font-weight: bold;
    color: #000;
    font-size: 18px;
  }

  .block-msg-exceptions {
    margin: 20px 0 0 0;
    width: 400px;
  }
  .block-msg-exceptions span {
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    line-height: 28px;
    background: linear-gradient(-45deg, #ff2bab, #f65148);
    padding: 0 10px;
    height: 28px;
    display: block;
  }
  .block-msg-exceptions .msg-exceptions-content {
    padding: 10px;
    border: 2px solid #f65148;
    background: #fff;
    letter-spacing: 1px;
    font-size: 10px;
    font-weight: bold;
    color: #000;
  }

  .account-info {
    margin: 0 0 20px 0;
  }


  .account-menu {
    /* margin: 10px 0 20px 0; */
    padding: 10px 0 20px 0;
    position: relative;
  }
  .account-menu .nav .nav-item {
    background: #fff;
    border: 2px solid #d3d5d7;
    margin: 10px 0 0 0;
    border-radius: 0;
    font-weight: bold;
    border-radius: 23px;
  }
  .account-menu .nav .nav-item:nth-child(2n) {
    margin: 10px 10px 0 10px;
  }
  .account-menu .nav .nav-item .nav-link {
    letter-spacing: 0.6px;
    font-size: 10px;
    padding: 6px 10px;
  }
  .account-menu .nav .nav-item .nav-link a {
    color: #000;
  }
  .account-menu .nav .nav-item .nav-link .router-link-active {
    font-weight: bold;
  }

</style>
