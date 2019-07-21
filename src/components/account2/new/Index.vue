<template lang="html">

  <div class="AccountIndex">

    <!-- Modal Create Collection -->
    <create-collection/>
    <!-- Modal Create Collection -->

    <div v-if="this.$store.state.dashboard.account.NotFound">
      <h1>Аккаунт @{{this.$route.params.username}} не найден.</h1>
    </div>

    <div v-if="this.$store.state.dashboard.account.AccessDenied">
      <h1>Доступ закрыт @{{this.$route.params.username}}</h1>
    </div>

    <div class="AccountBody p-0" v-if="this.$store.state.dashboard.account.ShowBody">

      <!-- Информация -->
      <div class="AccountInfo">
        <b-row class="m-0">

          <!-- Фотография аккаунта -->
          <b-col class="InfoLeft" sm="3">
            <div class="AccountInfoPhoto" v-bind:class="{ AccountWorkBg: this.$store.state.dashboard.account.body.work }" data-v-step="2">
              <router-link :to="{ path: `/dashboard/${this.$route.params.username}` }">
                <img :src="this.$store.state.dashboard.account.body.hdProfilePicUrlInfo" alt="left image" />
              </router-link>
            </div>
          </b-col>

          <b-col class="InfoRight" sm="9">

            <div class="AccountInfoMeta">

              <div class="MetaLine">
                <h1 class="AccountUserName m-0 v-step-1">{{this.$route.params.username}}</h1>
                <div class="MiniStatus" v-if="!this.$store.state.dashboard.account.body.work"><b-badge variant="dark">Очередь на запуск</b-badge></div>
                <div class="MiniStatus" v-if="this.$store.state.dashboard.account.body.work"><b-badge variant="primary">Активен</b-badge></div>
              </div>

              <!-- Публикации / Подписчики / Подписки -->
              <!-- <div class="MetaLine">
                <b-col sm="12" class="body-info-meta p-0">
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
              </div> -->

              <b-alert v-if="this.$store.state.dashboard.account.body.msg_exceptions" show variant="warning" class="msg_exceptions">
                {{ this.$store.state.dashboard.account.body.msg_exceptions }}
              </b-alert>

              <div class="Static" v-if="this.$store.state.dashboard.account.body.work">
                <b>Кол-во поставленных лайков: {{this.$store.state.dashboard.account.body.count_like}} из 100</b>
                <b>Последняя активность: {{this.$store.state.dashboard.account.body.date_last_act}}</b>
              </div>

              <div class="Static" v-if="!this.$store.state.dashboard.account.body.work">
                <b>Дата включения: {{this.$store.state.dashboard.account.body.date_like}}</b>
              </div>

              <div class="Static">
                <b>Оплачен до: {{this.$store.state.dashboard.account.body.date_pay}}</b>
              </div>



              <!-- Собрать аудитрию / Настройки -->
              <b-col class="AccountInfoActions p-0" sm="12">

                <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
                  <b-button-group>
                    <b-button :to="{ path: `/dashboard/${this.$route.params.username}/settings` }">Настройки</b-button>
                  </b-button-group>
                  <!-- <b-dropdown left>
                    <b-dropdown-item :to="{ path: `/dashboard/${this.$route.params.username}/logs` }">История действий</b-dropdown-item>
                    <b-dropdown-item :to="{ path: `/dashboard/${this.$route.params.username}/analyst` }">Analyst (beta)</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>created by @seva0812</b-dropdown-item>
                  </b-dropdown> -->
                </b-button-toolbar>

              </b-col>

            </div>

          </b-col>

        </b-row>
      </div>

      <!-- Контент -->
      <div class="AccountContent">
        <router-view/>
      </div>


    </div>

  </div>

</template>

<script>

import swal from 'sweetalert'

import moment from 'moment'
import 'moment/min/locales'

moment.locale('ru')

import CreateCollection from './modals/CreateCollection'

import HTTP from '../../../http-common.js'
import HTTP_V3 from '../../../store/http.js'

export default {
  name: 'AccountIndex',
  components: {
    'create-collection': CreateCollection
  },
  data() {
    return {
      title: 'Hello account/Index.vue',
    }
  },
  mounted() {

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

.blink {
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1.0,2.0,0,1.0);
  animation-duration: 1s;
  -webkit-animation-name: blinker;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(1.0,2.0,0,1.0);
  -webkit-animation-duration: 1s;
}

@keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}

@-webkit-keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}

.AccountIndex {

}
.AccountWorkBg {
  background-image: linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-size: 128% 100%;
  -webkit-transition: .1s background-position-x ease-in-out;
  transition: .1s background-position-x ease-in-out;
}
.AccountIndex .AccountBody {
  max-width: 540px;
}
.AccountIndex .AccountBody .AccountInfo {
  /* border-radius: 4px; */
  /* background: #fff; */
  /* box-shadow: 0 1px 0 0 #d7d8db80, 0 0 0 1px #e3e4e88c; */
}
.AccountIndex .AccountBody .AccountInfo .row {
  padding: 20px 0;
}

.AccountIndex .AccountBody .AccountInfo .InfoLeft {
  position: relative;
  padding: 0;
}
.AccountIndex .AccountBody .AccountInfo .InfoLeft .AccountInfoPhoto {
  position: relative;
  padding: 0;
  background-color: #e8ecef;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 0 0 #d7d8db80, 0 0 0 1px #e3e4e88c;
  box-shadow: 0 1px 0 0 #d7d8db80, 0 0 0 1px #e3e4e88c;
  margin: 0;
  width: 100%;
  overflow: hidden;
}
.AccountIndex .AccountBody .AccountInfo .InfoLeft .AccountInfoPhoto img {
  width: 100%;
}


.AccountIndex .AccountBody .AccountInfo .InfoRight {
 padding: 0 20px;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta {
  margin: 0;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .Static {
  width: 100%;
  margin: 0 0 6px 0;
  font-weight: 600;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .Static b {
  width: 100%;
  display: block;
  color: #252b37;
  font-weight: 900;
  margin: 0 0 2px 0;
  font-size: 10px;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountUserName {
  font-size: 22px;
  font-weight: 900;
  font-style: normal;
  line-height: 28px;
  color: #262626;
  display: inline-block;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .msg_exceptions {
  padding: 5px;
  font-size: 10px;
  font-weight: bold;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .MetaLine {
  margin: 0 0 10px 0;
  position: relative;
  display: inline-flex;
  width: 100%;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .MetaLine .MiniStatus {
  margin: 4px 0 0 4px;
  display: inline-block;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions {
  margin: 0;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions .btn-group.b-dropdown {
  margin-left: 10px;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions .btn-group .btn {
  outline: none;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions .btn-group .btn.btn-secondary {
  color: #262626;
  border-color: #dbdbdb;
  font-size: 10px;
  font-weight: 900;
  line-height: 22px;
  padding: 0 10px;
  background: transparent;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions .btn-group .btn.btn-secondary.dropdown-toggle {
  padding: 0 12px;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions .btn-group .btn.btn-secondary:hover {
  color: #333;
  background-color: #edeef0;
  border-color: #545b624d;
}
.AccountIndex .AccountBody .AccountInfo .InfoRight .AccountInfoMeta .AccountInfoActions .btn-group .btn:focus,.btn:active {
  outline: none !important;
  box-shadow: none !important;
}




.body-info-meta {

}
.body-info-meta .meta-block-line {
  float: left;
  color: #262626;
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  margin-right: 10px;
  line-height: 18px;
}
.body-info-meta .meta-block-line span {
  font-weight: 600;
  color: #262626;
  font-size: 16px;
}

.AccountContent {

}



/* .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active, .show > .btn-secondary.dropdown-toggle */

</style>
