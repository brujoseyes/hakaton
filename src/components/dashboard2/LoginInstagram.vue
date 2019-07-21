<template>
  <div class="">

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

    }

  },
  created() {
    // code...
  }
}
</script>

<style scoped>
.instagram-login{padding:20px 0 0 0}
.instagram-login .instagram-login-logo{background-image:url(//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png);background-repeat:no-repeat;background-size:100%;background-position:50%;width:240px;height:100px;margin:0 auto}
.instagram-login .account-form-login{width:100%;padding:60px}
.instagram-login .account-form-login .login-description{border-bottom:1px dashed #a8abad;padding:0 0 30px 0;margin:0 0 30px 0;line-height:160%;color:#000;font-weight:700}
.instagram-login .account-form-login input{font-size:12px;border:none;border-radius:6px;background:#f5f5f5;padding:20px 15px;border:1px solid rgba(140,137,137,.18);font-weight:400;line-height:18px}
.instagram-login .account-form-login input::-webkit-input-placeholder{color:#000}
.instagram-login .account-form-login input::-moz-placeholder{color:#000}
.instagram-login .account-form-login input:-ms-input-placeholder{color:#000}
.instagram-login .account-form-login input:-moz-placeholder{color:#000}
.instagram-login .account-form-login label{padding:20px 0;font-weight:700;font-size:12px;color:#000}
.instagram-login .account-form-login .login-button{letter-spacing:1px;color:#000;padding:6px 14px;font-size:14px;font-weight:200;border-radius:4px;color:#fff;position:relative;width:120px;line-height:30px;display:block;background-image:linear-gradient(155deg,#1987cd 40%,#153fad)}
.login-challenge-block .challenge-block-desc{line-height:180%;font-size:12px;color:#616b73;margin:20px 0 0 0}
.login-challenge-block .challenge-block-desc ul{padding:10px 0;margin:10px 0 0 0;list-style:none;border-top:1px dashed rgba(60,59,59,.18)}
.login-challenge-block .challenge-block-desc b{font-weight:700;color:#000}
.login-challenge-block .account-form-login .challenge-btns{margin:60px 0 0 0}
.login-challenge-block .account-form-login .challenge-btns .btn-send{font-weight:200;width:120px;margin:0 10px 0 0}
.login-challenge-block .account-form-login .challenge-btns .btn-cancel{font-weight:200;width:120px}.PaymentInfo{margin:0 0 30px 0;background:#fafafa;padding:20px;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.16);-webkit-box-shadow:0 1px 4px 0 rgba(0,0,0,.16);-moz-box-shadow:0 1px 4px 0 rgba(0,0,0,.39)}
</style>
