<template>

  <div class="accounts">

    <b-container>
      <b-container>
        <div class="accounts-head-title">Аккаунты</div>

        <h5>Toggleable Button</h5>
        <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
        <p>Pressed State: <strong>{{ myToggle }}</strong></p>

      </b-container>
    </b-container>

    <div class="myToggle" v-if="myToggle">
      <h4>add acccount</h4>
    </div>

    <b-container>

      <div class="AccountPanel" v-for="account in this.$store.state.dashboard.accounts">

        <b-container>

          <div class="account-card-info-er" v-if="account.analyst_er.start">
            <div class="card-info-er">
              <div class="card-info-er-end">
                ER <i>{{account.analyst_er.end.value}}</i>
              </div>
              <div class="plus" v-if="account.analyst_er.diff_plus">+{{account.analyst_er.diff}}%</div>
              <div class="minus" v-if="account.analyst_er.diff_minus">{{account.analyst_er.diff}}%</div>
            </div>
            <!-- <div class="card-info-er-text">Рост вовлеченности с {{account.analyst_er.start.date_created}}</div> -->
          </div>

          <div class="card-list-photo">
            <img :src="account.obj_data.hdProfilePicUrlInfo">
          </div>

          <div class="info">
            <div class="info-username">{{ account.username }}</div>

            <div class="account-card-info">

              <div class="work-like" v-if="account.work">
                <b><i>{{ account.count_like }}</i> лайков</i></b>
              </div>

              <div class="no-work-status" v-if="!account.work">
                <b v-if="account.date_like_label.plus">Запуск через {{ account.date_like_label.plus }}</b>
                <b v-if="account.date_like_label.minus">В очереди на запуск</b>
              </div>

              <div class="work-like" v-if="account.relogin">
                <b class="re-login">Требуется переавторизация</b>
              </div>

              <div class="account-card-pay" v-if="account.date_pay_label.plus"><b>Осталось {{ account.date_pay_label.plus }}</b></div>
              <!-- <div class="account-card-pay" v-if="account.date_pay_label.minus"><b>Не оплачен {{ account.date_pay_label.minus}}</b></div> -->
              <div class="account-card-pay" v-if="account.date_pay_label.minus"><b>В ожидании {{ card_label }}</b></div>
            </div>



          </div>

        </b-container>

      </div>

    </b-container>

  </div>

</template>

<script>

export default {
  data() {
    return {
      myToggle: false,
      card_label: '232323',
      banner: {
        url: '',
        image: ''
      },
      ImagesAccounts: [
        'https://pp.userapi.com/c638620/v638620434/3f5e6/52j_QkMms_Q.jpg',
        'https://pp.userapi.com/c837435/v837435434/4a146/J-Aviz8Fr_M.jpg',
        'https://pp.userapi.com/c837435/v837435434/4a110/NOIFrFvJxXo.jpg',
        'https://pp.userapi.com/c837435/v837435434/4a134/x4LSdeHnp5s.jpg',
        'https://pp.userapi.com/c837435/v837435434/4a119/O8nQUb4nKN0.jpg',
        'https://pp.userapi.com/c626817/v626817669/2d087/hjgeUir8pq0.jpg',
        'https://pp.userapi.com/c638128/v638128827/3468/GCHoRQh8bBM.jpg',
        'https://pp.userapi.com/c604425/v604425300/23865/NJDF7Okn3kc.jpg',
        'https://pp.userapi.com/c837438/v837438127/6983/ZwzPpV8tC7g.jpg',
        'https://pp.userapi.com/c604826/v604826006/6be1/vEh5yDpTalU.jpg',
        'https://pp.userapi.com/c626429/v626429816/458c1/ZCMXczN8u88.jpg',
        'https://pp.userapi.com/c836138/v836138006/3b597/zqyBWNYrqHQ.jpg',
        'https://pp.userapi.com/c836428/v836428024/42d20/R_A8JMCt5Os.jpg',
        'https://pp.userapi.com/c637417/v637417138/510d6/te8FniyRlpI.jpg',
        'https://pp.userapi.com/c638921/v638921163/2fc8e/EYHVUZexnss.jpg',
        'https://pp.userapi.com/c837334/v837334163/2ecf6/mSfZY6uLGec.jpg',
        'https://sun7-4.userapi.com/c543100/v543100162/3357c/lA1-aHFeJQQ.jpg',
        'https://sun7-2.userapi.com/c840723/v840723684/43fb/P63kETHr64Y.jpg'
      ],
      ImagesBanners: [
        {
          url: 'http://smm24.ru/services/kompleksnoevedenie-i-prodvizhenie-akkaunta-instagram/',
          image: '/static/img/banners/range-of-services.jpg',
        },
        {
          url: 'https://t.me/likefinitychat',
          image: '/static/img/banners/commenting-chat-telegram.jpg'
        }
      ],
      searchQuery: '',
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
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
    click_pay() {
      this.pay()
    }
  },
  created() {

    this.getRandBanner()

    const twit = document.createElement('script')

    twit.async = true
    twit.setAttribute('src', '//platform.twitter.com/widgets.js')
    document.head.appendChild(twit)

    this.$store.dispatch('getAccounts')
    .then(() => {

      // this.form.events.email = this.$store.profile.email_event
      this.card_label = `${this.$store.state.profile_cards.items[0].CardFirstSix} ***** ${this.$store.state.profile_cards.items[0].CardLastFour}`

    })

  }
}
</script>
<style>

.accounts {}
.accounts .accounts-head-title {
  font-size: 24px;
  font-weight: 300;
  margin: 70px 0 15px 0;
}

.AccountPanel {
  padding: 15px;
  border-bottom: 1px solid #93959826;
}
.AccountPanel .container {
  height: 100px;
  position: relative;
}
.AccountPanel .container .card-list-photo {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14);
  overflow: hidden;
  left: 160px;
}

.AccountPanel .container .card-list-photo img {
  width: 100%;
}

.container .info {
  top: 0;
  left: 280px;
  width: 430px;
  position: absolute;
}
.container .info .info-username {
  font-size: 20px;
  font-weight: 300;
}
.account-card-info {
  position: absolute;
  top: 35px;
  left: 0;
}

.account-card-info .work-like {
  line-height: 19px;
}
.account-card-info .work-like b {
  font-weight: bold;
  font-size: 10px;
}
.account-card-info .work-like b i {
  font-style: normal;
  background: #ffffff;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 100px;
  font-weight: bold;
  color: #000000;
  border: 1px solid #6c757d4d;
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
  line-height: 24px;
  font-weight: 400;
  font-size: 10px;
  margin: 5px 0 0 0;
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
  color: #f0f7fa;
  line-height: 30px;
}
.account-card-info-er .card-info-er .card-info-er-end i {
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  padding: 0 0 0 2px;
}
.account-card-info-er .card-info-er .minus {
  color: #dddddd;
  float: right;
  /* background: #91ff00b0; */
  font-size: 10px;
  padding: 5px;
  /* border-radius: 2px; */
  font-weight: normal;
  border-bottom: 1px solid #ff2265b0;
  /* letter-spacing: 1.9px; */
}
.account-card-info-er .card-info-er .plus {
  color: #dddddd;
  float: right;
  /* background: #91ff00b0; */
  font-size: 10px;
  padding: 5px;
  /* border-radius: 2px; */
  font-weight: normal;
  border-bottom: 1px solid #91ff00b0;
  /* letter-spacing: 1.9px; */
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

.twitter-news {
  margin: 20px 0 0 0;
  width: 300px;
  border-radius: 12px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  padding: 20px;
  background: #fff;
}


.accounts-cards {

}
.accounts-cards-lists {
  width: 100%;
  width: -webkit-calc(100% - 40px);
  width: -moz-calc(100% - 40px);
  width: calc(100% - 40px);
  float: right;
}
.accounts-cards-lists .account-card-list:nth-child(2n) {
  border-top: 1px solid #dddddd7a;
  border-bottom: 1px solid #dddddd7a;
}
.accounts-cards-lists .account-card-list {
  min-height: 110px;
  margin-bottom: 20px;
  color: #fff;
  background: #fff;
  cursor: pointer;
  width: 100%;
  padding: 15px;
  position: relative;
  -webkit-transition: all 0.3s ease;;
  -moz-transition: all 0.3s ease;;
  -o-transition: all 0.3s ease;;
  transition: all 0.3s ease;
  border-radius: 6px;
  background-image: url(//pp.userapi.com/c837136/v837136605/3f9eb/M458q_DLl70.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 -92px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
}
.accounts-cards-lists .account-card-list .bg-black-opacity {
  width: 100%;
  height: 100%;
  position: absolute;
  /* background: #00000087; */
  /* background: -webkit-linear-gradient(left,#000000bd 50%, #7ef3352b); */
  background: -webkit-linear-gradient(left, #000000bd 40%, #2f2c2c9c);
  top: 0;
  right: 0;
  border-radius: 6px;
}
.accounts-cards-lists .account-card-list:hover {
  background-position: 0 -140px;
}


.accounts-cards-lists .account-card-list .account-card-info {
  position: absolute;
  top: 0;
  left: 55px;
  padding: 15px 0;
}

.accounts-cards-lists .account-card-list .account-card-info .work-like {
  line-height: 19px;
}
.accounts-cards-lists .account-card-list .account-card-info .work-like b {
  font-weight: bold;
  font-size: 10px;
}
.accounts-cards-lists .account-card-list .account-card-info .work-like b i {
  font-style: normal;
  background: #91ff00b0;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: bold;
}

.accounts-cards-lists .account-card-list .account-card-info .no-work-status {
  font-size: 10px;
  font-weight: bold;
}

.accounts-cards-lists .account-card-list .account-card-info .account-card-name {
  font-size: 18px;
  font-weight: bold;
}


.accounts-cards-lists .account-card-list .account-card-info .work-like .re-login {
  font-style: normal;
  background: #ff2265b0;
  font-size: 10px;
  padding: 3px 4px;
  border-radius: 2px;
  font-weight: bold;
}

.accounts-cards-lists .account-card-list .account-card-info .account-card-pay {
  line-height: 24px;
  color: #ffffffb5;
  font-weight: 400;
  font-size: 10px;
}
.accounts-cards-lists .account-card-list .account-card-info .account-card-msg-exceptions {

}
.accounts-cards-lists .account-card-list .account-card-info .account-card-pay.wanted {
  color: #fe3e30;
}

/* ER */
.accounts-cards-lists .account-card-list .account-card-info-er {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 0;
}
.accounts-cards-lists .account-card-list .account-card-info-er .card-info-er {
  float: right;
  width: 130px;
  font-weight: bold;
  text-align: right;
  margin: 0 0 5px 0;
  letter-spacing: 0.5px;
  font-size: 8px;
}
.accounts-cards-lists .account-card-list .account-card-info-er .card-info-er .card-info-er-end {
  font-size: 10px;
  font-weight: bold;
  color: #f0f7fa;
  line-height: 30px;
}
.accounts-cards-lists .account-card-list .account-card-info-er .card-info-er .card-info-er-end i {
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  padding: 0 0 0 2px;
}
.accounts-cards-lists .account-card-list .account-card-info-er .card-info-er .minus {
  background: #ff2265b0;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 2px;
  font-weight: bold;
  float: right;
}
.accounts-cards-lists .account-card-list .account-card-info-er .card-info-er .plus {
  color: #fff;
  float: right;
  background: #91ff00b0;
  font-size: 10px;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: bold;
}

.accounts-cards-lists .account-card-list .account-card-info-er .card-info-er-text {
  font-size: 10px;
  float: left;
  font-weight: 400;
  letter-spacing: 0.5px;
  width: 100%;
  text-align: right;
}
</style>
