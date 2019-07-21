<template>

  <div class="DashboardAccounts">

    <!-- Instagram Login Component -->
    <b-modal ref="RefInstagramLogin" id="modal-instagram-login" hide-header hide-footer centered title="Instagram login">

      <div class="instagram-login">

        <div class="instagram-login-logo"></div>

        <!-- ChallengeCode -->
        <div class="login-challenge-block" v-if="$store.state.profile.challenge_block">

          <b-form @submit="onSubmitChallengeCode" v-if="show" class="account-form-login">

            <b-form-group id="InputGroupCode"
              label-for="InputCode">
              <b-form-input id="InputCode"
                type="text"
                v-model="instaLogin.challenge_code"
                required
                placeholder="Введите код безопасности">
              </b-form-input>
            </b-form-group>

            <div class="challenge-block-desc">
              <b>Выполните следующие действия</b>
              <ul class="lists-auth">
                <li><b>1.</b> Зайдите на почту к которой привязан аккаунт</li>
                <li><b>2.</b> Скопируйте и введите код, нажмите отправить код.</li>
              </ul>
            </div>

            <div class="clearfix challenge-btns">
              <b-button class="btn-send" type="submit" variant="primary">Отправить</b-button>
              <b-button class="btn-cancel" variant="danger" @click="onSubmitChallengeCancel()">Отмена</b-button>
            </div>

          </b-form>

        </div>

        <b-form @submit="onSubmitLogin" v-if="!$store.state.profile.challenge_block" class="account-form-login">

          <div class="login-description">
            Прежде, чем вы введете данные, убедитесь, что в настройках вашего аккаунта Instagram указан верный e-mail, к которому у вас есть доступ.
          </div>

          <b-form-group id="InputGroupUsername"
            label-for="InputUsername">
            <b-form-input id="InputUsername"
              type="text"
              v-model="instaLogin.form.login"
              required
              placeholder="Номер телефона, имя пользователя или эл. адрес">
            </b-form-input>
          </b-form-group>

          <b-form-group id="InputGroupPassword"
            label-for="InputPassword">
            <b-form-input id="InputPassword"
              type="password"
              v-model="instaLogin.form.password"
              required
              placeholder="Пароль">
            </b-form-input>
          </b-form-group>

          <b-progress :value="44" :max="100" show-progress animated v-if="instaLogin.sendFormStatus"></b-progress>
          <b-button type="submit" variant="primary" v-if="!instaLogin.sendFormStatus" class="login-button">Войти</b-button>

        </b-form>

      </div>

    </b-modal>


    <b-col sm="6" class="p-0">

      <div class="mb-4">
        <b-btn variant="outline-primary" v-b-modal.modal-instagram-login class="LoginClickAccount">Добавить аккаунт</b-btn>
      </div>
      <h2 class="mb-4">Аккаунты ({{this.$store.state.dashboard.accounts.length}})</h2>
    </b-col>


    <b-col sm="6" class="p-0">

      <div class="accounts">

        <div class="AccountPanel" @click="click_account(account)" v-for="account in this.$store.state.dashboard.accounts">

          <b-container>


            <div class="card-list-photo">
              <img :src="account.hdProfilePicUrlInfo">
              <div class="work-like" v-if="account.work">
                <div class="icon-like"></div>
                <i>{{ account.count_like }}</i></b>
              </div>

            </div>

            <div class="info">
              <div class="info-username">{{ account.username }}</div>

              <div class="account-card-info">

                <!-- <div class="work-like" v-if="account.work">
                  <img :src="'/icon-like-64.png'" alt="" width="20">
                  <i>{{ account.count_like }}</i></b>
                </div> -->


                <div class="work-like" v-if="account.relogin">
                  <b class="re-login">Требуется переавторизация</b>
                </div>

                <!-- <div class="account-card-pay" v-if="account.date_pay_label.plus"><b>Осталось {{ account.date_pay_label.plus }}</b></div> -->
                <!-- <div class="account-card-pay" v-if="account.date_pay_label.minus"><b>Не оплачен {{ account.date_pay_label.minus}}</b></div> -->
                <!-- <div class="account-card-pay" v-if="account.date_pay_label.minus"><b>В ожидании {{ card_label }}</b></div> -->
              </div>

              <!-- <b-button @click="ClickAccountLogin" variant="outline-primary" class="click-akk">Подробнее</b-button> -->

            </div>

          </b-container>

        </div>

        <div class="clearfix">

        </div>

      </div>

    </b-col>

  </div>

</template>

<script>

import moment from 'moment'
import HTTP_V3 from '../../store/http.js'

export default {
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

    PayAccount() {

      this.$store.dispatch('PayAccount')
      .then(e => {
        alert(e.message)
      })

    },

    clicktest() {
      this.$store.commit('user_challenge_block', 1)

      setTimeout(() => {
        this.$store.commit('user_challenge_block', 0)
      }, 3000)
    },

    // Отправка кода
    onSubmitChallengeCode(evt) {

      evt.preventDefault()

      HTTP_V3.get('/account/login_challenge_code', {
        params: {
          code: this.instaLogin.challenge_code
        }
      })
      .then(res => {

        if (res.data.code) {
          if (res.data.code === 200) {
            this.$swal.fire({
              title: 'Предупреждение',
              text: res.data.message,
              type: 'warning'
            })
          }
        }

      })

    },

    // Отмена ввода кода
    onSubmitChallengeCancel() {

      HTTP_V3.get('/account/login_challenge_cancel', {
        params: {
          check: moment.unix()
        }
      })
      .then(res => {

        if (res.data.code) {
          if (res.data.code === 200) {
            this.$swal.fire({
              title: 'Успешно',
              text: 'Добавление аккаунта Instagram отменено.',
              type: 'success'
            })
            .then(() => {
              this.$store.commit('user_challenge_block', 0)
            })
          }
        }

      })

    },

    // Логин аккаунта
    onSubmitLogin(evt) {

      evt.preventDefault()

      this.instaLogin.sendFormStatus = true

      HTTP_V3.get('/account/login', {
        params: {
          login: this.instaLogin.form.login,
          password: this.instaLogin.form.password,
        }
      })
      .then(res => {

        this.instaLogin.sendFormStatus = false

        const data = res.data

        this.instaLogin.resFormData = data

        if (data.code) {

          if (data.code === 400) {
            this.$swal.fire({
              title: 'Ошибка',
              text: data.message,
              type: 'error'
            })
            .then(() => {
              // code
            })
          }

          if (data.code === 200) {
            this.$swal.fire({
              title: 'Успешно',
              text: data.message,
              type: 'success',
              timer: 5000
            }).then(() => {

              this.loadDashboardAccounts()
              this.$refs.RefInstagramLogin.hide()

            })
          }

          if (data.code === 500) {
            this.$swal.fire({
              title: 'Предупреждение',
              text: data.message,
              type: 'warning'
            })
            .then(() => {
              this.$store.commit('user_challenge_block', 1)
            })
          }

        }

        console.log(data)

      })

    },

    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },

    ClickAccountLogin() {
      this.$router.push('dashboard/login')
    },
    getRandBanner() {
      this.banner = this.ImagesBanners[Math.floor(Math.random() * this.ImagesBanners.length)]
    },
    getImage() {
      return this.ImagesAccounts[Math.floor(Math.random() * this.ImagesAccounts.length)]
    },
    click_account(data) {

      if (data.relogin) {
        this.$router.push({
          path: `/dashboard/login?username=${data.username}&relogin=1`
        })
      } else {
        this.$router.push({
          path: `/dashboard/${data.username}`
        })
      }

    },
    showModal() {
      this.$refs.modalProfileSettings.show()
    },
    hideModal() {
      this.$refs.modalProfileSettings.hide()
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
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

.DashboardAccounts {}
/* .DashboardAccounts .LoginClickAccount {
  background-image: -moz-linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-image: -webkit-linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-image: -o-linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-image: -ms-linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-image: linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  background-size: 128% 100%;
  transition: .1s background-position-x ease-in-out;
  color: #fff;
  border: none;
  width: 160px;
  line-height: 32px;
  font-size: 12px;
  font-weight: 400;
  outline: none;
  overflow: hidden;
  letter-spacing: 0.6px;
  -webkit-box-shadow: 0 1px 1px rgb(86, 91, 95);
  box-shadow: 0 1px 1px rgb(86, 91, 95);
} */

/* Добавление аккаунта */

.instagram-login {
  padding: 20px 0 0 0;
}
.instagram-login .instagram-login-logo {
  background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  width: 240px;
  height: 100px;
  margin: 0 auto;
}

.instagram-login .account-form-login {
  width: 100%;
  padding: 60px;
}
.instagram-login .account-form-login .login-description {
  border-bottom: 1px dashed #a8abad;
  padding: 0 0 30px 0;
  margin: 0 0 30px 0;
  line-height: 160%;
  color: #000;
  font-weight: bold;
}

.instagram-login .account-form-login input {
  font-size: 12px;
  border: none;
  border-radius: 6px;
  background: #f5f5f5;
  padding: 20px 15px;
  border: 1px solid #8c89892e;
  font-weight: 400;
  line-height: 18px;
}
.instagram-login .account-form-login input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #000;
}
.instagram-login .account-form-login input::-moz-placeholder { /* Firefox 19+ */
  color: #000;
}
.instagram-login .account-form-login input:-ms-input-placeholder { /* IE 10+ */
  color: #000;
}
.instagram-login .account-form-login input:-moz-placeholder { /* Firefox 18- */
  color: #000;
}
.instagram-login .account-form-login label {
  padding: 20px 0;
  font-weight: bold;
  font-size: 12px;
  color: #000;
}
.instagram-login .account-form-login .login-button {
  letter-spacing: 1px;
  color: #000;
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 200;
  border-radius: 4px;
  color: #fff;
  position: relative;
  width: 120px;
  line-height: 30px;
  display: block;
  background-image: -moz-linear-gradient(-65deg, #1987cd 40%, #153fad);
  background-image: -webkit-gradient(linear, left top, right bottom, color-stop(40%, #1987cd), color-stop(100%, #153fad));
  background-image: -webkit-linear-gradient(-65deg, #1987cd 40%, #153fad);
  background-image: -o-linear-gradient(-65deg, #1987cd 40%, #153fad);
  background-image: -ms-linear-gradient(-65deg, #1987cd 40%, #153fad);
  background-image: linear-gradient(155deg, #1987cd 40%, #153fad);
}

.login-challenge-block {}
.login-challenge-block .challenge-block-desc {
  line-height: 180%;
  font-size: 12px;
  color: #616b73;
  margin: 20px 0 0 0;
}
.login-challenge-block .challenge-block-desc ul {
  padding: 10px 0;
  margin: 10px 0 0 0;
  list-style: none;
  border-top: 1px dashed #3c3b3b2e;
}
.login-challenge-block .challenge-block-desc b {
  font-weight: bold;
  color: #000;
  /* font-size: 10px; */
}
.login-challenge-block .account-form-login .challenge-btns {
  margin: 60px 0 0 0;
}
.login-challenge-block .account-form-login .challenge-btns .btn-send {
  font-weight: 200;
  width: 120px;
  margin: 0 10px 0 0;
}
.login-challenge-block .account-form-login .challenge-btns .btn-cancel {
  font-weight: 200;
  width: 120px;
}

/* Добавление аккаунта */

.click-akk {
  position: absolute;
  right: 0;
  letter-spacing: 0.4px;
  font-size: 10px;
  border: 1px solid #e6e6e7;
}
.accounts {
  /* width: 70%; */
  /* overflow: hidden; */
  /* background: #fff; */
  /* border-radius: 6px; */
}
.accounts .accounts-head-title {
  font-size: 24px;
  font-weight: 300;
  margin: 70px 0 15px 0;
}

.AccountPanel {
  cursor: pointer;
  padding: 20px;
  border-bottom: 1px solid #e6ecf0;
  -webkit-box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
  padding-left: 15px;
  padding-right: 15px;
  border-right: 3px solid transparent;
  -webkit-transition: border-color 0.3s;
  -moz-transition: border-color 0.3s;
  -o-transition: border-color 0.3s;
  transition: border-color 0.3s;
  margin-bottom: 15px;
  position: relative;
  float: left;
  width: 100%;
  background: #fff;
  border-radius: 6px;
}
.AccountPanel:hover {
  background-color: #f5f8fa;
  /* border-bottom: 1px solid #999; */
}
.AccountPanel .container {
  height: 80px;
  position: relative;
}
.AccountPanel .container .card-list-photo {
  width: 80px;
  height: 80px;
  position: absolute;
  left: 160px;
}

.AccountPanel .container .card-list-photo img {
  width: 100%;
  border-radius: 50%;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
}

.container .info {
  top: 0;
  left: 270px;
  width: 530px;
  position: absolute;
  padding: 10px 0 0 0;
}
.container .info .info-username {
  font-size: 20px;
  font-weight: bold;
  color: #2FC2EF;
}
.account-card-info {
  position: absolute;
  top: 35px;
  left: 0;
  color: #000;
}

.work-like {
  position: absolute;
  bottom: 20px;
  right: -76px;
  width: 100px;
}
.work-like .icon-like {
  width: 20px;
  height: 20px;
  background-image: url(/icon-like-64.png);
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
}
.work-like i {
  font-style: normal;
  font-size: 10px;
  border-radius: 100px;
  font-weight: bold;
  color: #000;
  position: absolute;
  left: 24px;
  line-height: 20px;
}
.account-card-info .no-work-status {
  font-size: 12px;
  font-weight: bold;
}
.account-card-info .account-card-name {
  font-size: 18px;
  font-weight: bold;
}
.account-card-info .work-like .re-login {
  font-style: normal;
  background: #ff2265b0;
  font-size: 10px;
  padding: 3px 4px;
  border-radius: 2px;
  font-weight: bold;
}
.account-card-info .account-card-pay {
  line-height: 16px;
  font-weight: bold;
  font-size: 8px;
  margin: 4px 0 0 0;
}

/* ER */
.account-card-info-er {
  position: absolute;
  left: 0;
  padding: 0;
  top: 14px;
}
.account-card-info-er .card-info-er {
  width: 130px;
  font-weight: bold;
  text-align: right;
  letter-spacing: 0.5px;
  font-size: 8px;
}
.account-card-info-er .card-info-er .card-info-er-end {
  font-size: 10px;
  font-weight: bold;
  color: ##251515;
  line-height: 30px;
}
.account-card-info-er .card-info-er .card-info-er-end i {
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  padding: 0 0 0 2px;
}
.account-card-info-er .card-info-er .minus {
  color: #444;
  float: right;
  font-size: 10px;
  padding: 5px 0;
  font-weight: bold;
  border-bottom: 2px solid #ff2265;
  min-width: 54px;
}
.account-card-info-er .card-info-er .plus {
  color: #444;
  float: right;
  font-size: 10px;
  padding: 5px 0;
  font-weight: bold;
  border-bottom: 2px solid #15bf00;
  min-width: 54px;
}

.account-card-info-er .card-info-er-text {
  font-size: 10px;
  float: left;
  font-weight: 400;
  letter-spacing: 0.5px;
  width: 100%;
  text-align: right;
}

.dashboard-block-error {
  background: #fff;
  margin: 0 0 20px 0;
  border: 1px solid #d3d5d7;
}
.dashboard-block-error-messages {
  padding: 20px;
  letter-spacing: 0.5px;
  font-weight: 300;
  line-height: 170%;
  color: #ed4956;
}
.dashboard-block-error-messages h5 {
  color: #000;
  font-size: 14px;
}


.card-not-attached {
  background: #fff;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  position: relative;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
  margin: 0 0 30px 0;
}
.card-not-attached .card-not-desc {
  padding: 7px;
  color: #000;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 180%;
  font-size: 13px;
}

.wrapper-support {
  width: 300px;
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
}
.wrapper-support .seva0812-logo-image-bg {
  margin: 10px auto;
  width: 100%;
  height: 60px;
  background-image: url(/static/img/logo-likefinity.png);
  display: block;
  background-position: center;
  background-size: cover;
}
.wrapper-support a {
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 1px;
}
.wrapper-support h4 {
  color: #000;
  display: inline-block;
  font-family: "Museo Sans Cyrl 900 normal",sans-serif;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  text-transform: uppercase;
  width: 100%;
}
.wrapper-support .center-block {
  width: 100%;
}
.wrapper-support .center-block .smm24-banner {
  box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 2px 0px;
  overflow: hidden;
  border-radius: 12px;
  width: 200px;
  margin: 20px auto 0 auto;
}
.wrapper-support .center-block .smm24-banner a {
  display: block;
}
.wrapper-support .center-block .smm24-banner img {
  width: 100%;
}


</style>
