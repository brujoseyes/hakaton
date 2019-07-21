<template>
  <transition name="fade">

    <div class="FormAuth SignIn">

      <div class="FormAuthTitle">
        <h1>Забыли пароль?</h1>
      </div>

      <div class="FormAuthBody">

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-group id="InputEmailGroup">
            <b-form-input id="InputEmail"
                type="email"
                v-model="form.email"
                required
                placeholder="Адрес электронной почты">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success" class="BtnSignIn">Восстановить</b-button>

        </b-form>

      </div>

      <div class="FormAuthFooter">

        <div class="AuthFooterLine">
          У вас уже есть учетная запись? <router-link :to="{ path: '/auth/signin' }">Авторизация</router-link>
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
      },
      show: true
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      HTTP_V3.post(`/auth/forgot`, this.form)
      .then(res => {

        if (res.data) {

          const data = res.data

          if (data.code) {

            if (data.code === 200) {
              this.$swal.fire({
                title: 'Успешно',
                text: `Пароль был успешно сброшен и выслан Вам на email, проверьте почту.`,
                type: 'success',
              })
            }

            if (data.code === 400) {
              this.$swal.fire({
                title: 'Ошибка',
                text: `Введенный email не существует`,
                type: 'error',
              })
            }

          }

        }

      })

    },
    onReset (evt) {
      evt.preventDefault()
    }
  }

}
</script>
