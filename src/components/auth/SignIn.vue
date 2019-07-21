<template>
  <transition name="fade">

    <div class="FormAuth SignIn">

      <div class="FormAuthTitle">
        <h1>Авторизация</h1>
      </div>

      <div class="FormAuthBody">

        <b-form @submit="onSubmitSignIn" v-if="show">

          <b-form-group id="InputEmailGroup">
            <b-form-input id="InputEmail"
                type="email"
                v-model="form.email"
                required
                placeholder="Адрес электронной почты">
            </b-form-input>
          </b-form-group>

          <b-form-group id="InputPasswordGroup">
            <b-form-input id="InputPassword"
                type="password"
                v-model="form.password"
                required
                placeholder="Пароль">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success" class="BtnSignIn">Войти</b-button>

        </b-form>

      </div>

      <div class="FormAuthFooter">

        <div class="AuthFooterLine">
          Забыли пароль? <router-link :to="{ path: '/auth/forgot' }">Восстановить</router-link>
        </div>

        <div class="AuthFooterLine">
          У вас нет учетной записи? <router-link :to="{ path: '/auth/signup' }">Зарегистрируйтесь прямо сейчас</router-link>
        </div>

      </div>

    </div>

  </transition>
</template>

<script>

import HTTP_V3 from '../../store/http.js'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmitSignIn(evt) {
      evt.preventDefault()

      HTTP_V3.post(`/auth/signin`, {
        email: this.form.email,
        password: this.form.password
      })
      .then(res => {
        res = res.data

        console.log(res)

        if (res.code) {
          if (res.code === 200) {

            const user_id      = res.user_id
            const access_token = res.access_token

            this.$cookie.set('user_id', user_id, { expires: '6M' })
            this.$cookie.set('access_token', access_token, { expires: '6M' })

            this.$swal.fire({
              title: 'Успешно',
              text: `Добро пожаловать!`,
              type: 'success'
            })
            .then(() => {
              this.$router.push('/dashboard')
            })

          }
        } else {
          this.$swal.fire({
            title: 'Ошибка',
            text: res.message,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })

    }
  }

}

</script>
