<template lang="html">

  <b-row>

    <b-col sm="12" class="">

      <div class="acccount-analyst-wrapper">

        <div class="acccount-analyst-feed">

          <b-row v-if="AnalystItems.length">

            <b-col sm="3" class="" v-for="item in AnalystItems">

              <div class="analyst-feed-post">
                <a class="block-black-er" :href="item.web_link" target="_blank"><i>ER</i> {{item.er_str}}</a>
                <img :src="item.post_image" width="100%" alt="">
              </div>

            </b-col>

          </b-row>

        </div>

        </div>

      </div>

    </b-col>

  </b-row>

</template>

<script>

import moment from 'moment'
import HTTP_V3 from '../../store/http.js'

export default {
  data() {
    return {
      loading: true,
      AnalystItems: []
    }
  },

  methods: {
    get_analyst() {

      return new Promise((resolve, reject) => {

        const account_id = this.$parent.account.body.id

        HTTP_V3.get('/account/analyst', {
          params: {
            account_id: account_id
          }
        })
        .then(res => {
          console.log(res.data)
          // res.data.items.forEach(item => {
          //   item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss')
          // })
          resolve(res.data.items)
        })

      })

    }
  },

  created() {
    setTimeout(() => {
      this.get_analyst()
      .then(items => {
        // this.loading = false
        this.AnalystItems = items
      })
    }, 800)
  }

}


</script>

<style lang="css">
.acccount-analyst-wrapper {

}
.acccount-analyst-wrapper .acccount-analyst-feed {

}
.acccount-analyst-wrapper .acccount-analyst-feed .analyst-feed-post {
  height: 200px;
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;
  border-radius: 4px;
}
.acccount-analyst-wrapper .acccount-analyst-feed .analyst-feed-post img {
  width: 100%;
}
.acccount-analyst-wrapper .acccount-analyst-feed .analyst-feed-post .block-black-er {
  position: absolute;
  background: #1b121294;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 200px;
  font-size: 30px;
  color: #ddd;
  font-weight: bold;
  display: block;
  text-decoration: none;
}
.acccount-analyst-wrapper .acccount-analyst-feed .analyst-feed-post .block-black-er i {
  font-size: 10px;
  font-style: normal;
}
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
