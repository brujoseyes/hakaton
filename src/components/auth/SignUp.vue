<template>
  <transition name="fade">

    <div class="FormAuth SignUp">

      <div class="FormAuthTitle">
        <h1>Создайте учетную запись</h1>
      </div>

      <div class="FormAuthBody">

        <b-form @submit="onSubmitSignUp" v-if="show">

          <b-form-group id="InputNameGroup">
            <b-form-input id="InputName"
                type="text"
                v-model="form.name"
                required
                placeholder="Имя">
            </b-form-input>
          </b-form-group>

          <b-form-group id="InputSurNameGroup">
            <b-form-input id="InputSurName"
                type="text"
                v-model="form.surname"
                required
                placeholder="Фамилия">
            </b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input type="email"
              v-model="form.email"
              required
              placeholder="Email">
            </b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input type="password"
              v-model="form.password"
              required
              placeholder="Пароль">
            </b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input type="password"
              v-model="form.password_confirm"
              required
              placeholder="Повторите пароль">
            </b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input type="phone"
              v-model="form.phone"
              placeholder="Номер телефона">
            </b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input type="text"
              v-model="form.promo_code"
              placeholder="Промо код">
            </b-form-input>
          </b-form-group>

          <div class="PrivacyCookie">
            Регистрируясь, вы соглашаетесь с Политикой конфиденциальности, включая Политику использования файлов cookie.
          </div>

          <b-button type="submit" variant="success" class="BtnSignIn">Регистрация</b-button>

        </b-form>

      </div>

      <div class="FormAuthFooter">

        <div class="AuthFooterLine">
          У вас уже есть учетная запись? <router-link :to="{ path: '/auth/signin' }">Авторизация</router-link>
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
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirm: '',
        phone: '',
        promo_code: ''
      },
      show: true
    }
  },
  methods: {
    onSubmitSignUp(evt) {
      evt.preventDefault()

      HTTP_V3.post(`/auth/signup`, this.form)
      .then(res => {

        res = res.data

        console.log(res)
        if (res.code === 200) {

          this.$swal.fire({
            title: 'Успешно',
            text: `Вы успешно зарегистрировались, теперь войдите.`,
            type: 'success',
          })
          .then((willDelete) => {
            if (willDelete) {
              location.href = '/auth/signin'
            }
          })

        }
        if (res.code === 400) {
          this.$swal.fire({
            title: 'Ошибка',
            text: res.message,
            type: 'warning',
          })
        }

      })

    }
  }

}
</script>
