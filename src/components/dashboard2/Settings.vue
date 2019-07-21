<template>

  <b-row v-if="show" class="m-0">

    <b-col sm="12">

      <div class="profile-settings">

        <b-tabs class="profile-settings-tabs">

          <b-tab title="Основные" active>

            <!-- <pre><code>{{this.$store.state.profile}}</code></pre> -->

            <b-form class="setting-main-wrapper" @submit="onSubmitResetPassword" v-if="show">

              <div class="main-header">
                <h3 class="header-id">#{{this.$store.state.profile.id}}</h3>
                <h3 class="header-email">{{this.$store.state.profile.email}}</h3>
                <h3 class="header-phone">{{this.$store.state.profile.phone}}</h3>
              </div>

              <b-form-group class="m-0" label="Присылать оповещения на Email">
                <b-btn @click="toggleIndeterminate" class="btn-event-email">
                  <div v-if="this.$store.state.profile.email_event">Включено</div>
                  <div v-if="!this.$store.state.profile.email_event">Отключено</div>
                </b-btn>
              </b-form-group>

              <!-- <b-form-group class="mt-4" v-if="!this.$store.state.profile.email_verification">
                <h6>Подтвердите почту {{this.$store.state.profile.email}}</h6>
                <b-btn @click="toggleIndeterminate" class="btn-event-email">Отправить снова?</b-btn>
              </b-form-group> -->

            </b-form>

          </b-tab>

          <b-tab title="Новый пароль">

            <div class="settings-tab-title">
              <h3>Пароль</h3>
            </div>

            <b-form class="setting-password" @submit="onSubmitResetPassword" v-if="show">

              <b-form-group id="exampleInputGroup1"
                label="Придумайте новый пароль"
                label-for="PasswordInput">
                <b-form-input id="PasswordInput"
                  type="text"
                  v-model="form.ResetPassword.password"
                  required>
                </b-form-input>
              </b-form-group>

              <b-form-group id="exampleInputGroup2"
                label="Введите пароль повторно"
                label-for="PasswordInputTwo">
                <b-form-input id="exampleInput2"
                  type="text"
                  v-model="form.ResetPassword.password2"
                  required>
                </b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Изменить</b-button>

            </b-form>

          </b-tab>

          <!-- <b-tab title="Мои карты">

            <div class="settings-tab-title">
              <h3>Ваши карты</h3>
            </div>

            <div class="my-cards">

              <div class="my-cards-add">
                <b-button style="font-size: 11px" variant="outline-primary" @click="click_pay">Добавить карту</b-button>
              </div>

              <div class="my-cards-lists clearfix">

                <div class="my-card-list" v-for="card in this.$store.state.profile_cards.items">
                  <div class="bank-card-title">Карта ···· {{ card.CardType }}</div>
                  <div class="bank-card-number">{{ card.CardFirstSix }}******{{ card.CardLastFour }}</div>
                  <div class="bank-card-cancel">
                    <b-button variant="outline-danger" class="add-work" @click="remove_card(card.id)">Отвязать</b-button>
                  </div>
                </div>

              </div>

            </div>

          </b-tab> -->

          <!-- <b-tab title="Транзакции">
            <div class="settings-tab-title">
              <h3>Транзакции</h3>
            </div>
            <div class="">
              <b-table striped hover :items="items" :fields="fields"></b-table>
            </div>
          </b-tab> -->

        </b-tabs>

      </div>

    </b-col>

  </b-row>

</template>

<script>
import axios from 'axios'

const items = [
  { id: 1, summa: 990, type: 'Списание', status: 'Успешно ✅', comment: '@vsevolod_moscow', card_name: '···· Visa 427956******1565' },
  { id: 2, summa: 990, type: 'Списание', status: 'В обработке 🚀', comment: '@anuyalika', card_name: '···· Visa 427956******1565' },
  { id: 3, summa: 990, type: 'Списание', status: 'Недостаточно средств 💰', comment: '@seva0812', card_name: '···· Visa 427611******1545' },
  { id: 4, summa: 990, type: 'Списание', status: 'Ошибка (403)', comment: '@startup_edinorog', card_name: '···· Visa 427956******1565' },
  { id: 4, summa: 990, type: 'Списание', status: 'Ошибка (5001)', comment: '@startup_edinorog', card_name: '···· Visa 427956******1565' }
]
items.forEach((e, k) => {
  e.summa = e.summa + ' руб.'
  // if (e.status) {
  //   e.status = 'Да'
  // } else {
  //   e.status = 'Нет'
  // }
})


export default {
  data() {
    return {
      items: items,
      fields: [
        {
          key: 'id',
          label: '#',
          sortable: true,
        },
        {
          key: 'type',
          label: 'Операция'
        },
        {
          key: 'summa',
          label: 'Сумма',
        },
        {
          key: 'comment',
          label: 'Комментарий'
        },
        {
          key: 'card_name',
          label: 'Карта'
        },
        {
          key: 'status',
          label: 'Статус'
        }
      ],
      show: true,
      form: {
        promo_code: '',
        events: {
          email: false
        },
        ResetPassword: {
          password: '',
          password2: ''
        }
      }
    }
  },
  methods: {
    toggleIndeterminate() {
      this.$store.state.profile.email_event = !this.$store.state.profile.email_event
    },
    onSubmitResetPassword(evt) {

      evt.preventDefault()

      axios.post(`${this.$store.state.host_api_new}/profile/settings/passwordreset`, {
        user_id: this.$store.state.user_id,
        token: this.$store.state.access_token,
        form: this.form.ResetPassword
      })
      .then(res => {

        // console.log(res.data)

        swal(res.data.message, {
          icon: 'success',
        })

      })

    },
    remove_card(id) {
      axios.get(`${this.$store.state.host_api_new}/profile/remove_card/${id}`, {
        params: {
          token: this.$store.state.access_token,
          user_id: this.$store.state.user_id
        }
      })
      .then(res => {

        swal('Card successfully deleted', {
          icon: 'success',
        })

      })
    },
    click_pay() {

      const widget = new cp.CloudPayments()

      const data = {
        authentication: true,
        user_id: this.$store.state.user_id
      }

      console.log(this.$store.state.user_id)

      widget.auth({ // options
        publicId: 'pk_aec7eb890607c2fc90a8eb4140304', //id из личного кабинета
        description: 'Авторизация банковской карты на сайте likefinity.com', //назначение
        amount: 1.00,    //сумма
        currency: 'RUB', //валюта
        accountId: this.$store.state.user_id, //идентификатор плательщика (обязательно для создания подписки)
        data: data
      },
      options => {

        // success
        location.reload()

      }, (reason, options) => {

        // fail
        alert('fail оплата')
        // действие при неуспешной оплате

      })
    }
  },
  created() {

    // console.log(this.$store.state.profile)
    //
    // this.form.events.email = this.$store.profile.email_event

    // const ckeditor = document.createElement('script')
    // ckeditor.setAttribute('src', '//widget.cloudpayments.ru/bundles/cloudpayments')
    // document.head.appendChild(ckeditor)

  }
}
</script>

<style>


.profile-settings {

}


.profile-settings .settings-tab-title {
  margin: 35px 0 20px 0;
}
.profile-settings h3 {
  font-size: 28px;
  color: #000;
  font-weight: 600;
}
.profile-settings-tabs {
  background: #fff;
  width: 720px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
}
.profile-settings-tabs .nav-tabs {
  border-bottom: 1px solid #000000;
}
.profile-settings-tabs .nav-tabs .nav-item {
  margin: 0;
}
.profile-settings-tabs .nav-tabs .nav-link {
  border: none;
  line-height: 26px;
  padding: 6px 24px;
  font-size: 11px;
  letter-spacing: 2px;
}
.profile-settings-tabs .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  color: #fff;
  outline: none;
  background-color: #000;
}
.profile-settings-tabs .nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {
  border: none;
}
.profile-settings-tabs label {
  font-weight: bold;
  font-size: 11px;
  color: #000;
  letter-spacing: 1px;
}
.profile-settings-tabs input {
  border-radius: 0px;
  line-height: 24px;
}

.setting-main-wrapper {
  margin: 15px 0 0 0;
}
.setting-main-wrapper .main-header {
  padding: 20px 0;
}
.setting-main-wrapper .main-header .header-id {
  font-size: 28px;
  color: #000;
  letter-spacing: 1px;
  font-weight: bold;
}
.setting-main-wrapper .main-header .header-email {
  font-size: 28px;
  color: #000;
  letter-spacing: 1px;
  font-weight: bold;
}
.setting-main-wrapper .main-header .header-phone {
  font-size: 18px;
  font-weight: 100;
  margin: 20px 0 0 0;
  letter-spacing: 1px;
}

.setting-main-wrapper .btn-event-email {
  margin: 5px 0 0 0;
  box-shadow: none;
}

.profile-settings-tabs .setting-password {
  width: 240px;
  margin: 20px 0 0 0;
}
.profile-settings-tabs .setting-password .form-group {
  margin-bottom: 20px;
}


.my-cards {

}
.my-cards .my-cards-add {
  margin: 20px 0 0 0;
}
.my-cards .my-cards-lists {
  margin: 10px 0 0 0;
}
.my-cards .my-cards-lists .my-card-list {
  width: 280px;
  height: 180px;
  position: relative;
  margin: 10px 0;
  background-color: #f6f6f6;
  border: 1px solid rgba(0,0,0,0.06);
  display: inline-block;
  position: relative;
  box-shadow: 0 20px 50px -35px rgba(0,0,0,0.4);
  border-radius: 10px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.04)), linear-gradient(#fff, #fff);
}
.my-cards .my-cards-lists .my-card-list:nth-child(2n) {
  margin-left: 20px;
}
.my-cards .my-cards-lists .my-card-list .bank-card-title {
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 14px;
  color: #000;
  font-weight: 600;
}
.bank-card-number {
  position: absolute;
  left: 20px;
  top: 82px;
  z-index: 1;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 2.5px;
}
.bank-card-cancel {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.bank-card-cancel a {
  color: #1DA1F2;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: .3s;
}
</style>
