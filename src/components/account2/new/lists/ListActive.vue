<template>

  <div class="list-item">

    <!-- {{list}} -->

    <div class="ListItemButtons">
      <b-button-group>
        <b-button v-b-tooltip.hover title="Перемещение аудитории в режим ожидания" @click="onUpdateList(list.id, 2)">
          <font-awesome-icon class="icon-m conf" icon="stop" />
        </b-button>
      </b-button-group>
    </div>

    <div class="list-item-group">

      <!-- Шапка списка -->
      <b-row class="item-group-header">

        <b-col sm="2">
          <div class="item-header-icon">
            <img :src="list.icon_pic_url" alt="">
          </div>
        </b-col>

        <b-col sm="8">
          <div class="item-header-title">
            <a v-bind:class="{ ListTitleWork: list.work }" :href="list.title_link" target="_blank">{{list.title}}</a>
          </div>
        </b-col>

        <!-- Название и фото списка -->
        <!-- <b-col class="header-title d-inline-flex" sm="12">
          <div class="d-inline-flex">
            <span class="font-weight-bold">
              <div class="header-title-icon" v-bind:class="{ AccountWorkBg: list.work}">
                <img src="https://instagram.fbeg5-1.fna.fbcdn.net/vp/3156fb3cbd654804d43bf280d09a9b4f/5D37FAA9/t51.2885-19/50234423_220092142165611_8593016883869908992_n.jpg?_nc_ht=instagram.fbeg5-1.fna.fbcdn.net" alt="">
              </div>
              <a v-bind:class="{ ListTitleWork: list.work }" :href="list.title_link" target="_blank">{{list.title}}</a>
            </span>
          </div>
        </b-col> -->

        <!-- Прогресс бар -->
        <!-- <b-col class="header-progress" sm="12" v-if="list.work">
          <div class="process-row">
            <b-progress class="mt-2 mb-2" :max="list.count">
              <b-progress-bar class="progressbar-line AccountWorkBg" :value="list.key" variant="success"></b-progress-bar>
            </b-progress>
          </div>
        </b-col> -->

        <!-- Информация о списке -->
        <!-- <b-col class="header-info-row active" sm="12">

          <div class="header-info">

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Насыщенность списка, чем больше тем хуже.">
                <font-awesome-icon class="icon-m conf" icon="burn" />
              </span>
              <strong>{{list.rate_media_like}}</strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Количество аккаунтов в списке."><font-awesome-icon class="icon-m conf" icon="users" /></span>
              <strong>
                <div class="">{{list.count}}</div>
              </strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Текущий круг."><font-awesome-icon class="icon-m conf" icon="retweet" /></span>
              <strong>{{list.round+1}}</strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <div class="buttons-click-wrap">
              </div>
            </b-col>

          </div>

        </b-col> -->

      </b-row>

      <b-row class="item-group-body">
        <b-col sm="2"></b-col>
        <b-col class="header-info-row" sm="8">

          <div class="header-info">

            <b-col class="item-block-mini" sm="2">
              <span></span>
              <strong>#{{list.id}}</strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Насыщенность списка, чем больше тем хуже.">
                <font-awesome-icon class="icon-m conf" icon="burn" />
              </span>
              <strong>{{list.rate_media_like}}</strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Количество аккаунтов в списке."><font-awesome-icon class="icon-m conf" icon="users" /></span>
              <strong>
                <div class="">{{list.count}}</div>
              </strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Текущий круг."><font-awesome-icon class="icon-m conf" icon="retweet" /></span>
              <strong>{{list.round+1}}</strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <!-- <b-badge v-if="list.work" variant="primary">В работе</b-badge> -->
            </b-col>

          </div>

        </b-col>
      </b-row>

    </div>

  </div>

</template>




<script>
export default {

  name: 'ItemList',
  props: ['list'],

  data() {
    return {
      ListItemTest: 0,
    }
  },

  methods: {

    onUpdateList(id, i) {
      this.$parent.onUpdateList(id, i)
    }

  },

  created() {
    // code...
  }

}
</script>
