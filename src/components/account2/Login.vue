<template lang="html">

  <b-row>

    <b-col sm="6">

      <div class="nav-page box-shadow login-account-wrapper">

        <div class="login-account-logo-instagram"></div>

        <!-- <div class="nav-page-title">Добавление аккаунта instagram
          <i v-if="$store.state.profile.login_account.username">@{{$store.state.profile.login_account.username}}</i>
        </div> -->

        <div class="nav-page-content">

          <div class="step-block-error" v-if="this.$store.state.profile.login_account.error">
            <div class="block-error-messages">
              <div class="message-item red">{{ this.$store.state.profile.login_account.error.messages.ru }}</div>
            </div>
            <div class="block-error-buttons">
              <b-button variant="primary" @click="onSubmitCancelLogin">Войти снова</b-button>
            </div>
          </div>

          <div class="step-block" v-if="$store.state.profile.login_account.steps.one">
            <b-form @submit="onSubmit" v-if="show" class="account-form-login">

              <div class="form-re-login" v-if="this.relogin">
                Необходима переавторизация аккаунта {{this.form.username}}, просто войдите снова.
              </div>

              <b-form-group id="InputGroupUsername"
                label-for="InputUsername">
                <b-form-input id="InputUsername"
                  type="text"
                  v-model="form.username"
                  required
                  placeholder="Номер телефона, имя пользователя или эл. адрес">
                </b-form-input>
              </b-form-group>

              <b-form-group id="InputGroupPassword"
                label-for="InputPassword">
                <b-form-input id="InputPassword"
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="Пароль">
                </b-form-input>
              </b-form-group>

              <div v-if="progress.show">
                <h4>Loading...</h4>
                <img width="70" src="/static/img/nyan.gif" alt="">
              </div>

              <b-button type="submit" variant="primary" v-if="!progress.show">Добавить</b-button>

            </b-form>
          </div>

          <div class="step-block two-factor-code" v-if="$store.state.profile.login_account.steps.three">

            <b-form @submit="onSubmitTwoFactorCode" v-if="show" class="account-form-login">
              <b-form-group id="InputGroupCode"
                label="Введите код безопасности"
                label-for="InputCode">
                <b-form-input id="InputCode"
                  type="text"
                  v-model="form.two_factor_code"
                  required
                  placeholder="12345">
                </b-form-input>
              </b-form-group>

              <div class="account-login-desc">
                <b>Выполните следующие действия</b>
                <ul class="lists-auth">
                  <li><b>1.</b> Зайдите на почту к которой привязан аккаунт <a target="_blank" :href="`https://instagram.com/${$store.state.profile.login_account.username}`">{{$store.state.profile.login_account.username}}</a></li>
                  <li><b>2.</b> Скопируйте и введите код, нажмите отправить код.</li>
                </ul>
              </div>

              <div class="clearfix btns">
                <b-button class="btn-send" type="submit" variant="primary">Отправить</b-button>
                <b-button class="btn-cancel" variant="danger" @click="onSubmitCancelLogin()">Отмена</b-button>
              </div>

            </b-form>

          </div>

        </div>

      </div>

    </b-col>

  </b-row>

</template>

<script>
import swal from 'sweetalert'
import HTTP from '../../http-common.js'

export default {
  data() {
    return {
      relogin: false,
      form: {
        username: '',
        password: '',
        two_factor_code: ''
      },
      show: true,
      progress: {
        show: false,
        value: 25,
        max: 100
      }
    }
  },
  methods: {
    onSubmit(evt) {

      evt.preventDefault()

      const _reset = () => {
        this.progress.show  = false
        this.progress.value = 25
      }

      HTTP.get('/account/login_new', {
        params: {
          username: this.form.username,
          password: this.form.password,
        }
      })
      .then(res => {

        const data = res.data

        if (data.code) {

          if (data.code === 200) {
            this.progress.show = true
          }

          if (data.code === 400) {
            swal({
              title: 'Ошибка',
              text: data.message,
              icon: 'error'
            })
          }

          if (data.code === 500) {
            swal({
              title: 'Ошибка',
              text: 'Привяжите банковскую карту оплаты чтобы снять ограничение на добавление больше одного аккаунта.',
              icon: 'error'
            })
          }

        }

      })

    },
    onSubmitTwoFactorCode(evt) {

      evt.preventDefault()

      HTTP.get('/account/two_factor_code', {
        params: {
          token: this.$store.state.access_token,
          user_id: this.$store.state.user_id,
          account_id: this.$store.state.profile.login_account.id,
          code: this.form.two_factor_code
        }
      })
      .then(res => {

        swal({
          title: 'Успешно',
          text: res.data.message,
          icon: 'success'
        })
        .then(willDelete => {

        })

      })

    },
    onSubmitTwoFactorCheck(evt) {

      evt.preventDefault()

      axios.get(`${this.$store.state.host_api_new}/account/two_factor_check`, {
        params: {
          token: this.$store.state.access_token,
          user_id: this.$store.state.user_id,
          account_id: this.$store.state.profile.login_account.id,
          code: 1
        }
      })
      .then(res => {

        swal({
          title: 'Успешно',
          text: res.data.message,
          icon: 'success'
        })
        .then(willDelete => {

        })

      })

    },
    onSubmitCancelLogin() {

      // alert(3)

      HTTP.get('/account/cancel_login', {
        params: {
          token: this.$store.state.access_token,
          user_id: this.$store.state.user_id,
          account_id: this.$store.state.profile.login_account.id
        }
      })
      .then(res => {

        swal({
          title: 'Успешно',
          text: 'Добавление аккаунта отменено',
          icon: 'success'
        })
        .then(willDelete => {
          location.href = '/dashboard'
        })

      })

    }
  },
  created() {

    if (this.$route.query.username) {
      this.form.username = this.$route.query.username
    }

    if (this.$route.query.relogin) {
      this.relogin = true
    }

  }

}
</script>

<style lang="css">

  .login-account-wrapper {
    width: 400px;
    min-height: 580px;
    position: relative;
    border: 1px solid #e6e6e6;
  }
  .login-account-wrapper .login-account-logo-instagram {
    background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    width: 140px;
    height: 120px;
    margin: 0 auto;
  }

  .login-account-wrapper .nav-page-title {
    text-align: center;
    font-size: 14px;
  }



  .step-block-error {
    padding: 20px;
  }
  .step-block-error .block-error-messages {
    letter-spacing: 1px;
  }
  .step-block-error .block-error-messages .message-item {
    line-height: 170%;
  }
  .step-block-error .block-error-messages .message-item.red {
    color: #ed4956;
    font-weight: bold;
  }

  .step-block-error .block-error-buttons {
    padding: 20px 0 0 0;
  }

  .step-block {

  }
  .step-block .two-factor-code {

  }
  .step-block .two-factor-code .btns {

  }
  .step-block .two-factor-code .btns button {
    float: left;
  }

  .account-login {
    padding: 30px 15px;
    line-height: 160%;
    margin-bottom: 20px;
    border-radius: 6px;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,.04);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.04);
    font-weight: 300;
    color: #222;
    background: #fff;
  }

  .account-login-new {

  }
  .account-login-new h3 {
    font-size: 28px;
    color: #000;
    font-weight: 600;
  }
  .account-login-new-tabs {
    background: #fff;
    margin: 20px 0;
    width: 580px;
    max-width: 100%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
  }



  .form-group {
    margin-bottom: 20px;
  }

  .account-login-desc {
    line-height: 170%;
    letter-spacing: 0.5px;
    font-size: 12px;
    color: #616b73;
    margin: 20px 0 0 0;
  }
  .account-login-desc ul {
    padding: 10px;
    margin: 10px 0 0 0;
    list-style: none;
    border-top: 1px solid #ddd;
  }
  .account-login-desc b {
    font-weight: bold;
    color: #000;
    font-size: 10px;
  }

  .login-account-wrapper .step-block .form-re-login {
    background-color: #f0f2f5;
    border-left: 3px solid #93adc8;
    border-bottom: none;
    padding: 10px;
    margin: 0 0 30px 0;
    font-size: 12px;
    color: #000;
    line-height: 170%;
    font-weight: bold;
  }

</style>
