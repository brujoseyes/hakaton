<template>
  <div class="PaymentInfo">
    <b-row>
      <b-col sm="12">
        <div class="PaymentInfoBody mb-3">
          <h3 class="mb-3">Платежная информация</h3>

          <div>

            <div v-if="this.$store.state.profile_cards.check" class="PaymentInfoCheck">
              <div class="CardTitle">Visa ** 1565</div>
              <button type="button" class="btn CardUp btn-primary" @click="click_pay()">Обновить карту</button>
            </div>

            <div v-if="!this.$store.state.profile_cards.check" class="PaymentInfoCheck">
              <button type="button" class="btn CardUp btn-primary" @click="click_pay()">Добавить карту</button>
            </div>

            <div class="LogoCards mt-3">
              <div class="ImageUrl"></div>
            </div>

            <div v-if="this.$store.state.profile_cards.check" class="DescText DescTextPay mt-3">
              Планируемые расходы на продление аккаунтов в следующем месяце: <small>18810<b>₽</b></small>
            </div>

            <div v-if="!this.$store.state.profile_cards.check" class="DescText mt-3">
              Чтобы использовать все преимущества севриса в полном объеме необходимо привязать банковскую карту.<br>
              Сервис запомнит данные карты, но никогда не спишет с нее деньги без вашего разрешения.<br>
              Все данные защищены по международному<br>стандарту <a href="https://yandex.ru/support/money/cards/security.html?_openstat=cardlink%3Bpcidss&amp;id=525916" target="_blank">PCI DSS</a>.<br>
            </div>

          </div>

        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Accounts from './AccountsNew'
// profile_cards.check

export default {
  components: {
    'index-accounts': Accounts
  },
  methods: {

    click_pay() {

      console.log(`CLOUDPAYMENTS_PK: ${process.env.VUE_APP_CLOUDPAYMENTS_PK}`)

      const widget = new cp.CloudPayments()

      const data = {
        bankCardBinding: true,
        user_id: this.$store.state.user_id
      }

      console.log(this.$store.state.user_id)

      widget.auth({ // options
        publicId: process.env.VUE_APP_CLOUDPAYMENTS_PK, //id из личного кабинета
        description: 'Авторизация банковской карты на сайте yambalike.com', //назначение
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
    // code...
  }
}

</script>

<style scoped>

.PaymentInfo{margin:0 0 30px 0;background:#fafafa;padding:20px;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.16);-webkit-box-shadow:0 1px 4px 0 rgba(0,0,0,.16);-moz-box-shadow:0 1px 4px 0 rgba(0,0,0,.39)}
.PaymentInfo .LogoCards{display:block;margin:0 auto;width:220px}
.ImageUrl2{width:100%;height:46px;background-size:cover;background-image:url(http://flexbounce.com/wp-content/uploads/2016/02/3-logo%C5%9B.png)}
.PaymentInfo .LogoCards .ImageUrl{width:100%;height:40px;background-size:100%;background-position:top;background-image:url(http://solarboat.ru/upload/medialibrary/8d8/8d868066a49a51a751696ef0a7d2287b.png)}
.PaymentInfo .LogoCards .ImageUrl.Visa{width:62px;background-position:-20px 0}
.PaymentInfo .LogoCards .ImageUrl.MasterCard{width:62px;background-position:-82px 0}
.PaymentInfo .LogoCards .ImageUrl.Mir{width:62px;background-position:-145px 0}
.PaymentInfo .PaymentInfoBody{text-align:center;line-height:180%}
.PaymentInfo .PaymentInfoBody h3{font-size:20px;color:#000;font-weight:900;line-height:40px;text-transform:uppercase}
.PaymentInfo .PaymentInfoBody .DescText{color:#000;font-size:10px;font-weight:500}
.PaymentInfo .PaymentInfoBody .DescText.DescTextPay{text-align:center;padding:0 10px;font-weight:400;font-size:13px;color:#444}
.PaymentInfo .PaymentInfoBody .DescText.DescTextPay small{display:block;font-size:22px;text-transform:uppercase;letter-spacing:2px;margin:10px 0 0 0;font-weight:800;color:#000}
.PaymentInfo .PaymentInfoBody .DescText.DescTextPay small b{font-size:70%;margin-left:2px}
.PaymentInfo .PaymentInfoBody .PaymentInfoCheck{display:block;margin:0 auto;width:220px}
.PaymentInfo .PaymentInfoBody .PaymentInfoCheck .CardTitle{font-size:14px;color:#000;margin:10px 0;font-weight:700;text-transform:uppercase;letter-spacing:1px}
.PaymentInfo .PaymentInfoBody .PaymentInfoCheck .btn{display:block;width:100%;line-height:24px;font-size:14px;font-weight:700;background:transparent;color:#007bff}

</style>
