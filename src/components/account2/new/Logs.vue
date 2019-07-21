<template lang="html">

  <b-row>
    <b-col sm="12">

      <div class="nav-page box-shadow">

        <div class="nav-page-title">История действий в аккаунте</div>

        <div class="nav-page-content">

          <div class="logs-loading" v-if="loading">
            <h5 class="m-0">
              Загрузка данных...
            </h5>
          </div>

          <div class="item-log" v-for="(log, index) in logsItems">

            <div class="message"><b>{{log.date}} - </b> {{ log.message }} <img v-if="log.profilePicUrl" width="80" :src="log.profilePicUrl"></div>
          </div>
        </div>

      </div>

    </b-col>
  </b-row>

</template>

<script>

import moment from 'moment'
import HTTP_V3 from '../../../store/http.js'

export default {
  data () {
    return {
      loading: true,
      logsItems: []
    }
  },

  methods: {
    get_logs() {

      return new Promise((resolve, reject) => {

        const account_id = this.$store.state.dashboard.account.body.id

        HTTP_V3.get('/account/logs', {
          params: {
            account_id: account_id
          }
        })
        .then(res => {
          console.log(res.data)
          res.data.items.forEach(item => {
            item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss')
          })
          resolve(res.data.items)
        })

      })

    }
  },

  created() {
    setTimeout(() => {
      this.get_logs()
      .then(logs => {
        this.loading = false
        this.logsItems = logs
      })
    }, 800)
  }

}

</script>

<style lang="css">
.item-log {
  width: 100%;
  padding: 6px 20px;
  border-bottom: 1px solid #f5f5f5;
  line-height: 22px;
}
.item-log .message {
  color: #000;
  font-size: 10px;
  letter-spacing: 1px;
}
.logs-loading {
  color: #000;
  padding: 20px;
  border-bottom: 1px solid rgba(221, 221, 221, 0.34);
}
</style>
