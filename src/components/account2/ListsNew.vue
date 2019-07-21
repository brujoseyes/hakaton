<template lang="html">

  <b-row>

    <b-col sm="12" class="m-0 p-0" v-if="this.$store.state.dashboard.account.ShowBody">

      <b-row class="m-0">

        <!-- Аудитории в работе -->
        <b-col sm="6" class="list-column">

          <b-tabs content-class="mt-0">
            <!-- <a :href="`https://www.instagram.com/${this.$route.params.username}`" target="_blank">
              <b-img :src="this.$store.state.dashboard.account.body.hdProfilePicUrlInfo" alt="left image" />
            </a> -->
            <b-tab title="Задачи" disabled>
              <b>Аудитория</b>
            </b-tab>

            <b-tab title="Активные" active>

              <!-- <h4>Аудитории в работе <b-badge>{{ this.$store.state.dashboard.account.lists.active.length }}</b-badge></h4> -->
              <b-row class="list-column-items">

                <div class="list-item" v-for="list in this.$store.state.dashboard.account.lists.active" :key="list.id">
                  <div class="list-item-group">

                    <!-- Шапка списка -->
                    <b-row class="item-group-header">

                      <!-- Название и фото списка -->
                      <b-col class="header-title" sm="12">

                        <!-- Пост -->
                        <div v-if="list.conf_str.post">
                          <span class="font-weight-bold">
                            <a :href="list.conf_str.post.url" target="_blank">{{list.conf_str.post.url}}</a>
                          </span>
                        </div>
                        <!-- Профиль -->
                        <div v-if="list.conf_str.profile">
                          <span class="font-weight-bold">
                            <img :src="list.conf_str.profile.parse_data.user.profile_pic_url" alt="" width="28" class="rounded mr-2">
                            <a :href="`https://www.instagram.com/${list.conf_str.profile.parse_data.user.username}`" target="_blank">{{list.conf_str.profile.parse_data.user.username}}</a>
                          </span>
                        </div>
                        <!-- Активные -->
                        <div v-if="list.conf_str.active">
                          <span class="font-weight-bold" v-if="list.conf_str.active.type == 'user'">
                            <img :src="list.conf_str.active.parse_data.user.profile_pic_url" alt="" width="28" class="rounded mr-2">
                            <a :href="`https://www.instagram.com/${list.conf_str.active.parse_data.user.username}`" target="_blank">{{list.conf_str.active.parse_data.user.username}}</a>
                          </span>
                          <span class="font-weight-bold" v-if="list.conf_str.active.type == 'place'">
                            <div class="sdfsojROIEw mr-2"></div>
                            <a :href="`https://www.instagram.com/explore/locations/${list.conf_str.active.parse_data.place.location.pk}/`" target="_blank">{{list.conf_str.active.parse_data.place.location.name}}</a>
                          </span>
                          <span class="font-weight-bold" v-if="list.conf_str.active.type == 'hashtag'">
                            <div class="sdKKEfjds mr-2"></div>
                            <a :href="`https://www.instagram.com/explore/tags/${list.conf_str.active.parse_data.hashtag.name}`" target="_blank">{{list.conf_str.active.parse_data.hashtag.name}}</a>
                          </span>
                        </div>

                      </b-col>

                      <!-- Прогресс бар -->
                      <b-row class="item-group-progress">
                        <b-col sm="12">
                          <b-progress class="mt-2 mb-2" :max="list.count" animated>
                            <b-progress-bar v-if="list.work" class="progressbar-line" :value="list.key" variant="success"></b-progress-bar>
                            <b-progress-bar v-if="!list.work" class="progressbar-line" :value="list.key" variant="warning"></b-progress-bar>
                          </b-progress>
                        </b-col>
                      </b-row>

                      <!-- Информация о списке -->
                      <b-row class="header-info">

                        <b-col class="item-block-mini" sm="3">
                          <span v-b-tooltip.hover title="Насыщенность списка, чем больше тем хуже.">
                            <font-awesome-icon class="icon-m conf" icon="burn" />
                          </span>
                          <strong>{{list.rate_media_like}}%</strong>
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
                          <!-- <b-button variant="outline-danger" class="add-work" @click="onUpdateList(list.id, 2)">Отключить</b-button> -->
                        </b-col>

                        <!-- <b-col class="item-block-mini" sm="2">
                          <span>
                            <font-awesome-icon class="icon-m conf" icon="genderless" />
                          </span>
                          <strong v-if="list.conf_str.type_id == 1">Ссылка на пост</strong>
                          <strong v-if="list.conf_str.type_id == 2">Аккаунт</strong>
                          <strong v-if="list.conf_str.type_id == 3">Активные</strong>
                        </b-col> -->



                      </b-row>
                    </b-row>

                    <!-- Прогресс бар
                    <b-row class="item-group-progress">
                      <b-col sm="12">
                        <b-progress v-if="list.work" class="mt-2" :max="list.count" show-value animated fluid>

                          <b-progress-bar class="progressbar-line" :value="list.key" variant="success" :id="`xProgress${list.id}`" style="min-width: 20%">
                            <b-tooltip :target="`xProgress${list.id}`" placement="top">
                              <b>Уже поставил лайков</b>
                            </b-tooltip>
                            <b>{{ list.key }}</b>
                          </b-progress-bar>

                          <b-progress-bar class="progressbar-line" :value="list.count - list.key" variant="warning" :id="`x2Progress${list.id}`" style="min-width: 20%">
                            <b-tooltip :target="`x2Progress${list.id}`" placement="bottom">
                              <b>Осталось {{ (list.count - list.key) }} поставить лайков из</b>
                            </b-tooltip>
                            <b>{{ (list.count - list.key) }}</b>
                          </b-progress-bar>

                        </b-progress>
                      </b-col>
                    </b-row>


                    <!-- Подвал списка -->
                    <!-- <b-row class="item-group-bottom">

                      <b-col class="item-block-mini" sm="3">
                        <span>Круг</span>
                        <strong>{{ list.round + 1 }}</strong>
                      </b-col>
                      <b-col class="item-block-mini" sm="3">
                        <span>Позиция</span>
                        <strong>{{ list.key }}</strong>
                      </b-col>
                      <b-col class="item-block-mini" sm="3">
                        <span><font-awesome-icon icon="trash-alt" /><i class="fas fa-trash"></i></span>
                        <strong>sdsd</strong>
                        <strong><b-button variant="outline-danger" class="add-work" @click="onUpdateList(list.id, 2)">Отключить</b-button></strong>
                      </b-col>
                    </b-row> -->

                  </div>
                </div>

              </b-row>

            </b-tab>

            <b-tab title="Не активные">

              <!-- Аудитории в ожидании -->
              <!-- <h4>Аудитории в ожидании <b-badge>{{ this.$store.state.dashboard.account.lists.ready.length }}</b-badge></h4> -->
              <b-row class="list-column-items">

                <div class="list-item" v-for="list in this.$store.state.dashboard.account.lists.ready" :key="list.id">
                  <div class="list-item-group">

                    <!-- Шапка списка -->
                    <b-row class="item-group-header">

                      <!-- Название и фото списка -->
                      <b-col class="header-title" sm="12">

                        <!-- Пост -->
                        <div v-if="list.conf_str.post">
                          <span class="font-weight-bold">
                            <a :href="list.conf_str.post.url" target="_blank">{{list.conf_str.post.url}}</a>
                          </span>
                        </div>
                        <!-- Профиль -->
                        <div v-if="list.conf_str.profile">
                          <span class="font-weight-bold">
                            <img :src="list.conf_str.profile.parse_data.user.profile_pic_url" alt="" width="28" class="rounded mr-2">
                            <a :href="`https://www.instagram.com/${list.conf_str.profile.parse_data.user.username}`" target="_blank">{{list.conf_str.profile.parse_data.user.username}}</a>
                          </span>
                        </div>
                        <!-- Активные -->
                        <div v-if="list.conf_str.active">
                          <span class="font-weight-bold" v-if="list.conf_str.active.type == 'user'">
                            <img :src="list.conf_str.active.parse_data.user.profile_pic_url" alt="" width="28" class="rounded mr-2">
                            <a :href="`https://www.instagram.com/${list.conf_str.active.parse_data.user.username}`" target="_blank">{{list.conf_str.active.parse_data.user.username}}</a>
                          </span>
                          <span class="font-weight-bold" v-if="list.conf_str.active.type == 'place'">
                            <div class="sdfsojROIEw mr-2"></div>
                            <a :href="`https://www.instagram.com/explore/locations/${list.conf_str.active.parse_data.place.location.pk}/`" target="_blank">{{list.conf_str.active.parse_data.place.location.name}}</a>
                          </span>
                          <span class="font-weight-bold" v-if="list.conf_str.active.type == 'hashtag'">
                            <div class="sdKKEfjds mr-2"></div>
                            <a :href="`https://www.instagram.com/explore/tags/${list.conf_str.active.parse_data.hashtag.name}`" target="_blank">{{list.conf_str.active.parse_data.hashtag.name}}</a>
                          </span>
                        </div>

                      </b-col>

                      <!-- Прогресс бар -->
                      <b-row class="item-group-progress">
                        <b-col sm="12">
                          <b-progress class="mt-2 mb-2" :max="list.count" animated>
                            <b-progress-bar v-if="list.work" class="progressbar-line" :value="list.key" variant="success"></b-progress-bar>
                            <b-progress-bar v-if="!list.work" class="progressbar-line" :value="list.key" variant="warning"></b-progress-bar>
                          </b-progress>
                        </b-col>
                      </b-row>

                      <!-- Информация о списке -->
                      <b-row class="header-info">

                        <b-col class="item-block-mini" sm="3">
                          <span v-b-tooltip.hover title="Насыщенность списка, чем больше тем хуже.">
                            <font-awesome-icon class="icon-m conf" icon="burn" />
                          </span>
                          <strong>{{list.rate_media_like}}%</strong>
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
                          <!-- <b-button variant="outline-danger" class="add-work" @click="onUpdateList(list.id, 2)">Отключить</b-button> -->
                        </b-col>

                      </b-row>

                    </b-row>

                  </div>

                </div>

              </b-row>

            </b-tab>

          </b-tabs>

        </b-col>

      </b-row>

    </b-col>

  </b-row>

</template>

<script>
import HTTP_V3 from '../../store/http.js'

export default {

  data() {
    return {

      hover: false,
      CollectionCount: 0,
      hide_info_c: true,
      form: {
        limit: null,
        checked: [],
        filter: {
          stop_words: 0,
          media_count: 0,
          following_limit: 0
        }
      },
      show: true
    }
  },

  methods: {

    mouseOver() {
      this.active = !this.active;
    },

    hide_info() {
      this.$cookie.set('hide_info', 0)
    },

    onRemoveList(id) {
      this.$swal.fire({
        title: 'Подтвердитe действие',
        text: 'Вы действительно хотите удалить список?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {

          HTTP_V3.post(`/account/collection/remove`, {
            id: id
          })
          .then(res => {
            this.$parent.loadAccount()
            this.$swal.fire(
              'Deleted!',
              'Your list has been deleted.',
              'success'
            )
          })

        }
      })
    },
    onUpdateList(id, i) {

      let obj = {}

      if (i == 2) {
        obj.ready  = 1
        obj.active = 0
      }

      if (i == 3) {
        obj.ready  = 0
        obj.active = 1
      }

      HTTP_V3.post(`/account/collection/update`, {
        list: {
          id: id,
          update: obj
        }
      })
      .then(res => {

        console.log(res.data)

        this.$parent.loadAccount()
        // .then(ok => {
        //   this.$swal.fire('Аудитория успешно перемещена.', {
        //     type: 'success',
        //   })
        // })

      })
    }

  },

  created() {
    // this.CollectionCount = this.$store.state.dashboard.account.collections.length
  }

}
</script>

<style lang="css">


.list-column {
  /* padding: 0;
  margin: 0 20px 0 0; */
}
.list-column h4 {
  margin: 0;
  font-size: 12px;
  color: #000;
  display: inline-block;
  font-weight: bold;
  border-bottom: 2px solid #545b62;
  line-height: 28px;
  float: left;
}
.list-column h4 .badge-secondary {
  background-color: #545b62;
}

.list-column-items {
  margin: 15px 0 0 0;
  clear: both;
  float: left;
  width: 100%;
}
.list-column-items .list-item {
  width: 100%;
  border-radius: 3px;
  margin: 0 0 15px 0;
  color: #000;
  background: #fff;
  -webkit-box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
}

.list-column-items .list-item .list-item-group {

}
.list-column-items .list-item .list-item-group a {
  color: #2f3940;
  font-size: 12px;
  line-height: 28px;
}
.list-column-items .list-item .list-item-group .item-group-header {
  margin: 15px 0 0 0;
}
.list-column-items .list-item .list-item-group .item-group-header .header-title {

}
.list-column-items .list-item .list-item-group .item-group-header .header-info {
  padding: 0 15px 0 15px;
  margin: 5px 0 0 0;
  width: 100%;
  height: 28px;
}
.list-column-items .list-item .list-item-group .item-group-header .item-block-mini {
  min-width: 10px;
  padding: 0;
  position: relative;
  float: left;
}
.list-column-items .list-item .list-item-group .item-group-header .url-media-post {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-column-items .list-item .list-item-group .item-group-progress {
  width: 100%;
  margin: 5px 0 0 0;
}

.list-column-items .list-item .list-item-group .item-group-bottom {
  padding: 0px 15px;
  margin: 10px 0px 0px;
}

.list-column-items .list-item .list-item-group h5 {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}
.list-column-items .list-item .list-item-group .progress {
  height: 4px;
}
.list-column-items .list-item .list-item-group .progress .progressbar-line {
  min-width: 20%;
}
.list-column-items .list-item .list-item-group span {
  display: block;
  min-height: 16px;
  line-height: 10px;
  color: #8d9faf;
  float: left;
}
.list-column-items .list-item .list-item-group span .icon-m {
  width: 16px;
  height: 16px;
  color: #a6adb9;
}

.list-column-items .list-item .list-item-group strong {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  left: 20px;
  min-height: 16px;
  line-height: 10px;
  margin-left: 3px;
}
.list-column-items .list-item .list-item-group strong .st-status {
  color: #fff;
  font-weight: bold;
  font-size: 8px;
  background: #000;
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
  display: block;
}

/* Othert */

.add-work {
  font-size: 11px;
}

.sdfsojROIEw {
  float: left;
  width: 16px;
  height: 20px;
  margin: 4px 0;
  background-position: -413px -253px;
  display: block;
  position: relative;
  background-image: url(/insta-sprite.png);
  background-size: 435px 401px;
}

.sdKKEfjds {
  float: left;
  width: 14px;
  height: 18px;
  margin: 5px 0;
  background-position: -225px -112px;
  display: block;
  position: relative;
  background-image: url(/insta-sprite.png);
  background-size: 435px 401px;
}


</style>
