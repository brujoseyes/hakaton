<template>

  <div class="list-item">

    <!-- {{list.install}} -->

    <div class="ListItemButtons">
      <b-button-group>
        <b-button v-if="list.compiled" v-b-tooltip.hover title="Перемещение аудитории в работу." @click="onUpdateList(list.id, 3)">
          <font-awesome-icon class="icon-m conf" icon="reply" />
        </b-button>
        <b-button v-if="list.compiled" v-b-tooltip.hover title="Удаление аудитории." @click="onRemoveList(list.id)">
          <font-awesome-icon class="icon-m conf" icon="trash-alt" />
        </b-button>
      </b-button-group>
    </div>

    <div class="list-item-group">

      <!-- Шапка списка -->
      <b-row class="item-group-header">

        <!-- Название и фото списка -->
        <b-col sm="2">

          <div class="item-header-icon" v-bind:class="{ AccountWorkBg: list.work}">
            <img :src="list.icon_pic_url" alt="">
          </div>
        </b-col>

        <b-col sm="8">
          <div class="item-header-title">
            <a v-bind:class="{ ListTitleWork: list.work }" :href="list.title_link" target="_blank">{{list.title}}</a>
          </div>
        </b-col>
        <!-- <b-col class="header-title d-inline-flex" sm="12">
          <div class="d-inline-flex">
            <span class="font-weight-bold">
              <div class="header-title-icon">
                <img src="https://instagram.fbeg5-1.fna.fbcdn.net/vp/3156fb3cbd654804d43bf280d09a9b4f/5D37FAA9/t51.2885-19/50234423_220092142165611_8593016883869908992_n.jpg?_nc_ht=instagram.fbeg5-1.fna.fbcdn.net" alt="">
              </div>
              <a v-bind:class="{ ListTitleWork: list.work }" :href="list.title_link" target="_blank">{{list.title}}</a>
            </span>
          </div>
        </b-col> -->

        <!-- Прогресс бар -->
        <!-- <b-row sm="12">
          <b-col class="d-inline-flex" sm="4">
            <span>
              <b class="st-status" v-if="list.compiled">Готово</b>
              <b class="st-status" v-if="list.install">В процессе</b>
              <b class="st-status" v-if="!list.install && !list.compiled">В очереди</b>
            </span>
          </b-col>
        </b-row> -->

        <!-- Информация о списке -->
        <!-- <b-col class="header-info-row ready" sm="12">

          <div class="header-info">

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Количество аккаунтов в списке."><font-awesome-icon class="icon-m conf" icon="users" /></span>
              <strong>
                <div class="">{{list.count}}</div>
              </strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <strong>
                <b class="st-status" v-if="list.compiled">Готово</b>
                <b class="st-status" v-if="list.install">В процессе</b>
                <b class="st-status" v-if="!list.install && !list.compiled">В очереди</b>
              </strong>
            </b-col>

          </div>

        </b-col> -->

      </b-row>

      <b-row class="item-group-body">
        <b-col sm="2"></b-col>
        <b-col class="header-info-row" sm="8">

          <div class="header-info">

            <b-col class="item-block-mini" sm="3">
              <span></span>
              <strong>#{{list.id}}</strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <span v-b-tooltip.hover title="Количество аккаунтов в списке."><font-awesome-icon class="icon-m conf" icon="users" /></span>
              <strong>
                <div class="">{{list.count}}</div>
              </strong>
            </b-col>

            <b-col class="item-block-mini" sm="3">
              <strong>
                <b-badge v-if="list.compiled" variant="success">Готово</b-badge>
                <b-badge v-if="list.install" variant="warning">В процессе</b-badge>
                <b-badge v-if="!list.install && !list.compiled" variant="secondary">В очереди</b-badge>
              </strong>
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
    },
    onRemoveList(id) {
      this.$parent.onRemoveList(id)
    }

  },

  created() {
    // code...
  }

}
</script>

<style scoped>
</style>
