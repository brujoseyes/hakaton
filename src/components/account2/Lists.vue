<template lang="html">

  <b-row>


    <!-- <pre>{{DashboardAccount}}</pre> -->

    <!-- <pre>{{this.$store.state.dashboard.account}}</pre> -->

    <b-col sm="12" class="m-0 p-0" v-if="this.$store.state.dashboard.account.ShowBody">

      <b-row class="m-0">

        <!-- <pre>{{this.$store.state.dashboard.account}}</pre> -->

        <!-- Аудитории в работе -->
        <b-col sm="6" class="list-col">
          <h4>Аудитории в работе <b-badge>{{ this.$store.state.dashboard.account.lists.active.length }}</b-badge></h4>
          <b-row class="account-lists-items">

            <div class="list-item" v-for="list in this.$store.state.dashboard.account.lists.active" :key="list.id">
              <div class="list-item-group">

                <!-- Прогресс бар -->
                <b-row class="m-0">
                  <b-col sm="12">
                    <b-progress :value="list.progress" variant="success" striped :animated="true" v-if="list.work"></b-progress>
                    <b-progress :value="list.progress" variant="warning" striped :animated="true" v-if="!list.work"></b-progress>
                  </b-col>
                </b-row>

                <b-row class="item-group-header">

                  <b-col class="header-title" sm="12">

                    <div v-if="list.conf_str.post">
                      <span class="font-weight-bold">
                        <a :href="list.conf_str.post.url" target="_blank">{{list.conf_str.post.url}}</a>
                      </span>
                    </div>

                    <div v-if="list.conf_str.profile">
                      <span class="font-weight-bold">
                        <img :src="list.conf_str.profile.parse_data.user.profile_pic_url" alt="" width="28" class="rounded mr-2">
                        <a :href="`https://www.instagram.com/${list.conf_str.profile.parse_data.user.username}`" target="_blank">{{list.conf_str.profile.parse_data.user.username}}</a>
                      </span>
                    </div>

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

                  <!-- <b-col sm="12" class="mt-3">
                    <b-progress :value="list.progress" variant="success" striped :animated="true" v-if="list.work"></b-progress>
                    <b-progress :value="list.progress" variant="warning" striped :animated="true" v-if="!list.work"></b-progress>
                  </b-col> -->


                  <b-row style="padding: 0px 15px; margin: 10px 0 0 0">

                    <b-col class="item-block-mini" sm="4">
                      <span>Насыщенность</span>
                      <strong>{{list.rate_media_like}}%</strong>
                    </b-col>

                    <b-col class="item-block-mini" sm="4">
                      <span>Количество</span>
                      <strong>
                        <div class="">{{list.count}}</div>
                      </strong>
                    </b-col>

                    <b-col class="item-block-mini" sm="4" :id="`exButton${list.id}`" fluid>
                      <span>
                        <!-- HTML title specified via default slot -->
                        <b-tooltip :target="`exButton${list.id}`" placement="leftbottom">
                          Hello <strong>World!</strong>
                        </b-tooltip>
                        Тип
                      </span>
                      <strong v-if="list.conf_str.type_id == 1">Ссылка на пост</strong>
                      <strong v-if="list.conf_str.type_id == 2">Аккаунт</strong>
                      <strong v-if="list.conf_str.type_id == 3">Активные</strong>
                    </b-col>

                  </b-row>



                </b-row>


                <!-- Прогресс бар -->
                <b-row class="m-0">
                  <b-col sm="12">
                    <b-progress :value="list.progress" variant="success" striped :animated="true" v-if="list.work"></b-progress>
                    <b-progress :value="list.progress" variant="warning" striped :animated="true" v-if="!list.work"></b-progress>
                  </b-col>
                </b-row>


                <b-row class="item-group-bottom">

                  <b-col class="item-block-mini" sm="3">
                    <span>Круг</span>
                    <strong>{{ list.round + 1 }}</strong>
                  </b-col>
                  <b-col class="item-block-mini" sm="3">
                    <span>Позиция</span>
                    <strong>{{ list.key }}</strong>
                  </b-col>
                  <b-col class="item-block-mini" sm="3">
                    <strong><b-button variant="outline-danger" class="add-work" @click="onUpdateList(list.id, 2)">Отключить</b-button></strong>
                  </b-col>
                </b-row>

              </div>
            </div>

          </b-row>
        </b-col>

        <!-- Аудитории в ожидании -->
        <b-col sm="6" class="list-col">
          <h4>Аудитории в ожидании <b-badge>{{ this.$store.state.dashboard.account.lists.ready.length }}</b-badge></h4>
          <b-row class="account-lists-items">

            <div class="list-item" v-for="list in this.$store.state.dashboard.account.lists.ready" :key="list.id">
              <div class="list-item-group">

                <!-- <pre>Place location pk: {{list.conf_str.active.parse_data.place.location.pk}}</pre>
                <pre>Place location name: {{list.conf_str.active.parse_data.place.location.name}}</pre> -->


                <!-- <pre v-if="list.conf_str">{{ list.conf_str }}</pre> -->

                <b-row class="item-group-header">

                  <b-col class="header-title" sm="12">

                    <div v-if="list.conf_str.post">
                      <span class="font-weight-bold">
                        <a :href="list.conf_str.post.url" target="_blank">{{list.conf_str.post.url}}</a>
                      </span>
                    </div>

                    <div v-if="list.conf_str.profile">
                      <span class="font-weight-bold">
                        <img :src="list.conf_str.profile.parse_data.user.profile_pic_url" alt="" width="28" class="rounded mr-2">
                        <a :href="`https://www.instagram.com/${list.conf_str.profile.parse_data.user.username}`" target="_blank">{{list.conf_str.profile.parse_data.user.username}}</a>
                      </span>
                    </div>

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

                      <!-- <strong>Активные</strong> -->

                      <!-- <strong v-if="list.conf_str.active.type == 'user'">
                        <a :href="`https://www.instagram.com/${list.conf_str.active.parse_data.user.username}`" target="_blank">{{list.conf_str.active.parse_data.user.full_name}}</a>
                      </strong>
                      <strong v-if="list.conf_str.active.type == 'place'">
                        <a :href="`https://www.instagram.com/explore/locations/${list.conf_str.active.parse_data.place.location.pk}/`" target="_blank">{{list.conf_str.active.parse_data.place.location.name}}</a>
                      </strong>
                      <strong v-if="list.conf_str.active.type == 'hashtag'">
                        <a :href="`https://www.instagram.com/explore/tags/${list.conf_str.active.parse_data.hashtag.name}`" target="_blank">#{{list.conf_str.active.parse_data.hashtag.name}}</a>
                      </strong> -->

                    </div>

                  </b-col>

                  <b-col sm="4">
                    <span></span>
                    <!-- <strong>
                      <b class="st-status" v-if="list.compiled">Готово</b>
                      <b class="st-status" v-if="list.install">В процессе</b>
                      <b class="st-status" v-if="!list.install && !list.compiled">В очереди</b>
                    </strong> -->
                    <strong>
                      <b-button variant="outline-success" class="add-work" @click="onUpdateList(list.id, 3)" v-if="list.compiled">В работу</b-button>
                    </strong>
                  </b-col>

                  <b-col sm="4">
                    <span>Количество</span>
                    <strong>
                      <div class="">{{list.count}}</div>
                    </strong>
                  </b-col>

                  <b-col sm="4" :id="`exButton${list.id}`" fluid>

                    <span>
                      <!-- HTML title specified via default slot -->
                      <b-tooltip :target="`exButton${list.id}`" placement="leftbottom">
                        Hello <strong>World!</strong>
                      </b-tooltip>
                      Тип
                    </span>

                    <strong v-if="list.conf_str.type_id == 1">Ссылка на пост</strong>
                    <strong v-if="list.conf_str.type_id == 2">Аккаунт</strong>
                    <strong v-if="list.conf_str.type_id == 3">Активные</strong>
                  </b-col>

                </b-row>

                <b-row class="item-group-bottom">
                  <b-col sm="12">
                    <!-- <b-dropdown id="ddown-dropright" dropright text="Drop-Right" variant="primary" class="m-0">
                      <b-dropdown-item href="#">Action</b-dropdown-item>
                      <b-dropdown-item href="#">Another action</b-dropdown-item>
                      <b-dropdown-item href="#">Something else here</b-dropdown-item>
                    </b-dropdown> -->
                    <!-- <b-button variant="outline-danger" class="add-work" @click="onRemoveList(list.id)" style="float: left;">Удалить</b-button>
                    <b-button variant="outline-success" class="add-work ml-3" @click="onUpdateList(list.id, 3)" v-if="list.compiled">В работу</b-button> -->
                  </b-col>
                </b-row>

              </div>
            </div>

          </b-row>
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

.account-lists-items {
  margin: 20px 0 0 0;
}
.account-lists-items .list-item {
  width: 100%;
  border-radius: 3px;
  margin: 0 0 20px 0;
  color: #000;
  background: #fff;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,.04);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.13);
}

.account-lists-items .list-item .list-item-group {

}
.account-lists-items .list-item .list-item-group a {
  color: #2f3940;
  font-size: 12px;
}
.account-lists-items .list-item .list-item-group .item-group-header {
  margin: 15px 0 0 0;
}
.account-lists-items .list-item .list-item-group .item-group-header .header-title {
  border-bottom: 1px solid #dddddd96;
  padding-bottom: 10px;
}
.account-lists-items .list-item .list-item-group .item-block-mini {
  min-width: 120px;
  padding: 0;
}
.account-lists-items .list-item .list-item-group .item-group-header .url-media-post {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-lists-items .list-item .list-item-group .item-group-bottom {
  padding: 0px 15px;
  margin: 10px 0px 0px;
}

.account-lists-items .list-item .list-item-group h5 {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}
.account-lists-items .list-item .list-item-group .progress {
  height: 6px;
}
.account-lists-items .list-item .list-item-group span {
  display: block;
  font-size: 10px;
  color: #000;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 28px;
  min-height: 28px;
}
.account-lists-items .list-item .list-item-group strong {
  display: inline-block;
  font-size: 10px;
  font-weight: bold;
  min-height: 28px;
}
.account-lists-items .list-item .list-item-group strong .st-status {
  color: #fff;
  font-weight: bold;
  font-size: 8px;
  background: #000;
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
  display: block;
}


/* sdfsdfsdfsdf */


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
/* old */

/*  */


.account-lists-description {
  padding: 10px 15px;
  line-height: 160%;
  margin-bottom: 20px;
  border-radius: 6px;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,.04);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,.04);
  font-weight: 300;
  color: #222;
  background: #fff;
}
.account-lists-description b {
  font-weight: 500;
}
.list-col {
  /* padding: 0;
  margin: 0 20px 0 0; */
}
.list-col h4 {
  margin: 0;
  font-size: 14px;
  color: #000;
  background: #fff;
  padding: 10px 15px;
  border-radius: 3px;
  display: inline-block;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.13); */
  font-weight: bold;
  border-bottom: 1px solid #d3d5d78f;
  width: 100%;
}

</style>
