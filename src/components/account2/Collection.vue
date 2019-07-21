<template lang="html">

  <b-row v-if="this.$store.state.dashboard.account.ShowBody">

    <div class="ModalCollection">

      <!-- <b-btn v-b-modal.modallg variant="primary">Large modal</b-btn> -->

      <!-- Modal Component -->
      <b-modal id="modallg" size="md" :hide-header="true">
        <b-col sm="12" class="CollectionBody box-shadow">

          <div class="CollectionHeader">
            <b-form-group class="m-0">
              <b-form-radio-group id="headTypeRadio"
                @change="onResetState"
                buttons
                v-model="form.type_id"
                :options="headTypeRadio.options"
                name="headTypeRadio" />
            </b-form-group>
          </div>

          <b-col sm="12" class="clearfix nav-page-content">

            <!-- Левая колонка -->
            <b-col sm="8" class="column left">

              <b-form v-if="show">

                <!-- URL пост -->
                <div class="collection-right post" v-show="form.type_id == 1">

                  <div class="label-title">Аудитория с поста</div>

                  <div class="desc">
                    Собирает до 1 000 лайков и всех комментаторов с любого рекламного или личного поста.
                  </div>

                  <b-form-group id="InputGroupPostUrl"
                    class="InputGroupSearch clearfix"
                    label="Ссылка на публикацию"
                    label-for="InputPostUrl">
                    <b-form-input id="InputPostUrl"
                      type="text"
                      v-model="form.post.url"
                      placeholder="https://www.instagram.com/p/BWIzsNcgdpl/"
                      required>
                    </b-form-input>
                    <b-button type="submit" variant="outline-primary" @click="onSubmitForm">Сохранить</b-button>
                  </b-form-group>

                </div>

                <!-- Профиль -->
                <div class="collection-right collection-right-profile" v-show="form.type_id == 2">

                  <div class="label-title">Аудитория аккаунта</div>

                  <b-form-group label="Лимит 30.000 аккаунтов" class="fieldset-type-radio">
                    <b-form-radio-group id="profileTypeRadio"
                      buttons
                      v-model="form.profile.type_id"
                      :options="profileTypeRadio.options"
                      name="profileTypeRadio"/>
                  </b-form-group>

                  <b-form-group id="InputGroupUserName"
                    class="InputGroupSearch clearfix"
                    label="Имя пользователя Instagram"
                    label-for="InputUserName">
                    <b-form-input id="InputUserName" @change="sendSearchProfile()"
                      type="text"
                      v-model="form.profile.username"
                      placeholder="Нажмите enter для поиска"
                      required>
                    </b-form-input>
                    <b-button type="submit" variant="outline-primary" @click="sendSearchProfile()">Поиск</b-button>
                  </b-form-group>

                  <div class="desc">
                    Собирает подписчиков или подписки аккаунта.<br>
                    Введите название аккаунта, выберите аккаунт и нажмите "Сохранить".
                  </div>

                  <!-- Поиск по профилю username -->
                  <div class="label-title" v-if="items_search_profile.users.length">Результат поиска</div>
                  <div class="topsearch-items" v-if="items_search_profile.users.length">

                    <!-- users -->
                    <div @click="SelectProfileItem(list)" class="topsearch-item" v-for="list in items_search_profile.users">
                      <div class="topsearch-item-block">

                        <div class="item-block-icon">
                          <i v-if="form.profile.pk == list.user.pk" class="item-selected"></i>
                          <div class="item-icon-user">
                            <div class="is_verified" v-if="list.user.is_verified"></div>
                            <img v-bind:src="list.user.profile_pic_url">
                          </div>
                        </div>

                        <div class="item-block-info">
                          <div class="block-info-title">{{ list.user.username }}</div>
                          <div class="block-info-desc">{{ list.user.byline }}</div>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

                <!-- Активные -->
                <div class="collection-right active" v-show="form.type_id == 3">

                  <div class="label-title">Активная аудитория</div>
                  <div class="desc active-desc">
                    Собирает лайки и комментарии с любого набора постов.<br>
                    Введите название <i class="geo">геолокации</i>, <i class="username">аккаунта</i> или <i class="hashtag">хэштега</i>, выберите источник сбора и нажмите "Сохранить".
                  </div>

                  <b-form-group label="Лимит 20.000 аккаунтов" class="fieldset-type-radio">
                    <b-form-radio-group id="profileTypeRadio"
                      buttons
                      v-model="form.active.type_id"
                      :options="activeTypeRadio.options"
                      name="profileTypeRadio" />
                  </b-form-group>

                  <b-form-group id="GroupInputSearch"
                    class="InputGroupSearch clearfix"
                    label="Поисковый запрос"
                    label-for="InputSearch">
                    <b-form-input id="InputSearch" @change="sendSearchActive()"
                      type="text"
                      v-model="form.active.search"
                      required
                      placeholder="@seva0812, #moscow, Los Angeles">
                    </b-form-input>
                    <b-button type="submit" variant="outline-primary" @click="sendSearchActive()">Поиск</b-button>
                  </b-form-group>

                  <div class="topsearch-items" v-if="items_search_active">

                    <!-- users -->
                    <div @click="SelectActiveItem(list)" class="topsearch-item" v-for="list in items_search_active.users" v-if="form.active.type_id == 1">
                      <div class="topsearch-item-block">
                        <div class="item-block-icon">
                          <i v-if="form.active.value == list.user.pk" class="item-selected"></i>
                          <div class="item-icon-user">
                            <div class="is_verified" v-if="list.user.is_verified"></div>
                            <img v-bind:src="list.user.profile_pic_url">
                          </div>
                        </div>
                        <div class="item-block-info">
                          <div class="block-info-title">{{ list.user.username }}</div>
                          <div class="block-info-desc">{{ list.user.byline }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- place -->
                    <div @click="SelectActiveItem(list)" class="topsearch-item" v-for="list in items_search_active.places" v-if="form.active.type_id == 2">
                      <div class="topsearch-item-block">
                        <div class="item-block-icon">
                          <i v-if="form.active.value == list.place.location.pk" class="item-selected"></i>
                          <div class="item-block-icon">
                            <div class="item-icon-place coreSpriteItemSearch"></div>
                          </div>
                        </div>
                        <div class="item-block-info">
                          <div class="block-info-place">{{ list.place.location.name }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- hashtags -->
                    <div @click="SelectActiveItem(list)" class="topsearch-item" v-for="list in items_search_active.hashtags" v-if="form.active.type_id == 3">
                      <div class="topsearch-item-block">
                        <div class="item-block-icon">
                          <i v-if="form.active.value == list.hashtag.name" class="item-selected"></i>
                          <div class="item-block-icon">
                            <div class="item-icon-hashtag coreSpriteItemSearch"></div>
                          </div>
                        </div>
                        <div class="item-block-info">
                          <div class="block-info-title">{{ list.hashtag.name }}</div>
                          <div class="block-info-desc">{{ list.hashtag.media_count }}</div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </b-form>

            </b-col>

            <b-col sm="4" class="column left">
              <b-form @submit="onSubmitForm" v-if="showBtnSave">
                <b-button type="submit" variant="primary">Сохранить</b-button>
              </b-form>
            </b-col>

          </b-col>

        </b-col>
      </b-modal>

    </div>

  </b-row>

</template>

<script>
import swal  from 'sweetalert'
import HTTP_V3 from '../../store/http.js'

export default {
  data() {
    return {

      response: {},

      // Данные поиска по профилю
      items_search_profile: {
        users: []
      },

      // Данные поиска по активным
      items_search_active: {
        users: [],
        places: [],
        hashtags: []
      },

      form: {

        type_id: 3,

        post: {
          url: ''
        },

        // Профиль
        profile: {
          pk: '',
          type_id: 1,
          username: ''
        },

        // Активная аудитория
        active: {
          type: '',
          type_id: 1,
          value: '',
          search: ''
        }

      },

      headTypeRadio: {
        options: [
          { text: 'Пост', value: 1 },
          { text: 'Аккаунт', value: 2 },
          { text: 'Активные', value: 3 }
        ]
      },

      profileTypeRadio: {
        options: [
          { text: 'Подписчики', value: 1 },
          { text: 'Подписки', value: 2 }
        ]
      },

      activeTypeRadio: {
        options: [
          { text: 'Аккаунт', value: 1 },
          { text: 'Геолокация', value: 2 },
          { text: 'Хэштег', value: 3 }
        ]
      },

      show: true,
      showBtnSave: false

    }
  },
  methods: {

    onResetState() {
      this.showBtnSave = false
    },

    clickShowBtn() {
      this.showBtnSave = true
    },

    // Функция поиска по instagram
    topSearch(val) {
      return new Promise((resolve, reject) => {
        HTTP_V3.get('/instagram/topsearch', {
          params: {
            q: val
          }
        })
        .then(res => {
          if (res.data.items) {
            resolve(res.data.items)
          } else {
            reject({
              message: `Not found search ${val}`
            })
          }
        })
      })
    },

    sendSearchPost() {

      alert(`sendSearchPost`)

      HTTP_V3.get('/instagram/topsearch-posturl', {
        params: {
          url: this.form.post.url
        }
      })
      .then(res => {
        if (res.data.items) {
          resolve(res.data.items)
        } else {
          reject({
            message: `Not found search ${val}`
          })
        }
      })

    },

    // Поиск по профилю
    sendSearchProfile() {

      const val = this.form.profile.username

      this.topSearch(val)
      .then(items => {

        console.log(items)
        this.items_search_profile = items

      })
      .catch(err => {

        console.log(err)

      })

    },

    // Поиск по активным
    sendSearchActive() {

      // this.showBtnSave = false

      const val = this.form.active.search

      this.topSearch(val)
      .then(items => {

        console.log(items)

        this.items_search_active = items

      })
      .catch(err => {
        console.log(err)
      })

    },

    // Клик поиска профиля
    SelectProfileItem(data) {

      if (data.user) {

        const user = data.user

        if (user.is_private) {
          this.$swal.fire({
            title: 'Предупреждение',
            text: `Приватный аккаунт @${user.username} сбор невозможен`,
            type: 'warning'
          })
        } else {

          this.form.profile.pk = user.pk

          this.showBtnSave = true

        }

      }

      this.form.profile.parse_data = data

    },

    // Клик #хэштэгу, @username, geo location поиска активные
    SelectActiveItem(data) {

      const show = () => {
        this.form.active.parse_data = data
        this.showBtnSave = true
      }

      if (data.user) {

        const user = data.user

        if (user.is_private) {
          this.$swal.fire({
            title: 'Предупреждение',
            text: `Приватный аккаунт @${user.username} сбор невозможен`,
            type: 'warning'
          })
        } else {

          this.form.active.type  = 'user'
          this.form.active.value = user.pk

          show()

        }

      }

      if (data.hashtag) {

        const hashtag = data.hashtag

        this.form.active.type  = 'hashtag'
        this.form.active.value = hashtag.name

        show()

      }

      if (data.place) {

        const place = data.place

        this.form.active.type  = 'place'
        this.form.active.value = place.location.pk

        show()

      }

    },

    onSubmitForm(evt) {

      evt.preventDefault()

      const UserInstagramId = this.$store.state.dashboard.account.body.id

      const DefaultFormData = {
        type_id: this.form.type_id,
        instagram_user_id: UserInstagramId
      }

      const onSendData = data => {

        console.log(data)

        const sendData = data => {

          HTTP_V3.post('/account/collection/create', {
            form_data: data
          })
          .then(res => {

            const data = res.data

            if (data.code === 200) {
              this.$swal.fire({
                title: 'Успешно',
                text: `Список успешно добавлен.\nНачинается сбор.\nЧерез некоторое время он появится в готовых списках и будет готов к добавлению`,
                type: 'success',
              })
              this.$parent.loadAccount()
            }

            if (data.code === 220) {
              this.$swal.fire({
                title: 'Ошибка',
                text: data.message,
                type: 'error',
              })
            }

            if (data.code === 500) {
              this.$swal.fire({
                title: 'Ошибка',
                text: data.message,
                type: 'error',
              })
              this.$parent.click_pay_account()
            }

          })

        }

        sendData(data)

      }

      // url пост
      if (this.form.type_id === 1) {

        if (this.form.post.url) {

          onSendData({
            post: this.form.post,
            ...DefaultFormData
          })

        } else {
          swal({
            title: 'Предупреждение',
            text: `Введите url публикации`,
            icon: 'warning'
          })
        }

      }

      // профиль
      if (this.form.type_id === 2) {

        if (this.form.profile.username) {

          if (this.form.profile.parse_data) {

            onSendData({
              profile: this.form.profile,
              ...DefaultFormData
            })

          } else {
            this.$swal.fire({
              title: 'Предупреждение',
              text: `Выберите instagram аккаунт из списка`,
              type: 'warning'
            })
          }

        } else {
          this.$swal.fire({
            title: 'Предупреждение',
            text: `Введите имя пользователя instagram`,
            type: 'warning'
          })
        }

      }

      // активные
      if (this.form.type_id === 3) {

        if (this.form.active.search) {

          if (this.form.active.parse_data) {

            onSendData({
              active: this.form.active,
              ...DefaultFormData
            })

          } else {
            this.$swal.fire({
              title: 'Предупреждение',
              text: `Выберите источник сбора `,
              type: 'warning'
            })
          }

        } else {
          this.$swal.fire({
            title: 'Предупреждение',
            text: `Введите поисковый запрос`,
            type: 'warning'
          })
        }

      }

    },

    clickPay() {

      const amount = 990.00

      this.$parent.linkPayAccount(amount)

    }

  },
  created() {
    console.log(`created collection`)
  }
}
</script>

<style>

.ModalCollection {
  padding: 0 15px;
}
.ModalCollection .modal-body {
  padding: 0;
  overflow: hidden;
}
.ModalCollection .modal-content {
  border-radius: 6px;
  overflow: hidden;
  border: none;
}

.ModalCollection .CollectionHeader {
  background-color: #363a3e;
  padding: 20px;
}
.ModalCollection .CollectionHeader button {
  float: left;
  font-size: 12px;
  font-weight: 300;
  border: 1px solid #edeeef;
}
.ModalCollection .CollectionHeader button:nth-child(2n) {
  margin: 0 15px 0 15px;
}

.ModalCollection .CollectionBody {
  background: #fff;
  padding: 0;
  position: relative;
  overflow: hidden;
  margin: 0 0 40px 0;
}



.ModalCollection {}
.ModalCollection {}
.ModalCollection {}
.ModalCollection {}
.ModalCollection {}
.ModalCollection {}


.block-card-check {
  background: #000;
  color: #fff;
  padding: 25px;
  font-weight: 400;
  margin: 20px 0 0 0;
  position: relative;
}

.block-card-check a {
  color: #ddd;
}


.nav-page-content .column {
  /* padding: 0 15px 0 0; */
  float: left;
}
.nav-page-content .column.left {
  /* padding-top: 30px; */
  padding: 0 5px;
}
.nav-page-content .column.left button.pay-btn {
  font-weight: bold;
  border: none;
  margin: 20px 0 0 0;
  width: 180px;
  display: block;
  line-height: 30px;
  font-size: 14px;
  background: #ffd920;
  color: #654b22;
}
.nav-page-content .column.right {
  /* border-left: 1px solid #f1f5f8;
  padding: 0 0 15px 0; */
}



.collection-right {
  font-size: 11px;
  padding: 20px 0;
  color: #000;
  min-height: 400px;
}
.collection-right .label-title {
  font-weight: bold;
  font-size: 18px;
  margin: 0 0 20px;
}
.collection-right .form-control {
  font-size: 13px;
}
.collection-right .col-form-label {
  font-weight: bold;
  color: #333;
}
.collection-right .desc {
  line-height: 170%;
  margin: 0 0 20px 0;
  font-weight: bold;
  font-size: 10px;
  color: #69757e;
  padding: 0 30px 0 0;
}

.collection-right .InputGroupSearch {
  margin: 0 0 20px 0;
}
.collection-right .InputGroupSearch input {
  width: 240px;
  float: left;
  margin: 0 10px 0 0;
  font-size: 10px;
}
.collection-right .InputGroupSearch button {
  float: left;
  font-size: 10px;
}

/* Профиль */
.collection-right-profile {

}
.collection-right-profile .fieldset-type-radio {
  margin: 0 0 20px 0;
}

.active-desc i {
  font-weight: bold;
}
.active-desc i.hashtag {
  color: #713fff;
}
.active-desc i.username {
  color: #ff53cf;
}
.active-desc i.geo {
  color: #2196f3;
}


.topsearch-items {
  clear: both;
  width: 100%;
  padding: 0 40px 0 0;
}
.topsearch-items .topsearch-item {
  position: relative;
  width: 100%;
  height: 60px;
  color: #003569;
  text-decoration: none;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 #8fa6b36b;
  overflow: hidden;
  margin: 6px 0;
}
.topsearch-items .topsearch-item:nth-child(2n) {
  margin: 10px 0;
}

.topsearch-item:hover {
  background: #fafafa;
}
.topsearch-item-block {
  position: relative;
  white-space: nowrap;
  width: 100%;
  display: block;
  height:100%;
}
.topsearch-item-block .item-block-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  border-right: 1px solid #efefef;
  z-index: 333;
}
.topsearch-item-block .item-block-icon .item-selected {
  background: #007bff;
  width: 100%;
  height: 100%;
  position: absolute;
}
.coreSpriteItemSearch{display:block;position:relative;background-image:url(/insta-sprite.png);background-size:435px 401px}
.topsearch-item-block .item-block-icon .item-icon-hashtag{width:14px;height:18px;margin:21px 23px;background-position:-225px -112px}
.topsearch-item-block .item-block-icon .item-icon-place{width:16px;height:20px;margin:20px 22px;background-position:-413px -253px}
.item-icon-user{width:36px;height:36px;margin:12px;border-radius:50%;overflow:hidden;position: relative;}
.item-icon-user .is_verified{height:12px;width:12px;background-image:url(/de09421ae2c6.png);background-position:-413px -207px;background-size:429px 401px;position:absolute;right:6px;top:6px}
.item-icon-user img{width:100%}
.item-block-info{overflow:hidden;display:block;position:relative;width:100%;font-size:14px;line-height:60px;padding:0 0 0 80px}
.item-block-info .block-info-place{color:#262626;font-weight:600}
.item-block-info .block-info-title{color:#262626;font-weight:700;padding:8px 0 0;line-height:22px}
.item-block-info .block-info-desc{color:#999;line-height:22px}
._h79r0{display:block;margin:0 18px 0 10px;width:14px;height:17px}
.br-rad-6{border-radius:6px}.page-wrap{background:#fff}

</style>
