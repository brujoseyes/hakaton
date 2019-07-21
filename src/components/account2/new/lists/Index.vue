<template lang="html">

  <div class="AccountLists">

    <div class="AccountListsBody">

      <b-row>

        <b-col sm="12" class="lists-column">

          <div class="list-columns-header">
            <!-- <h1>Аудитория</h1> -->
            <h3>Аудитория</h3>
            <b-button-group size="sm">
              <b-button @click="selectMenu(1, 0)" variant="outline-dark">Активная <b-badge v-if="this.$store.state.dashboard.account.lists.active.length" variant="dark">{{this.$store.state.dashboard.account.lists.active.length}}</b-badge></b-button>
              <b-button @click="selectMenu(0, 1)" variant="outline-dark">Не активная <b-badge v-if="this.$store.state.dashboard.account.lists.ready.length" variant="dark">{{this.$store.state.dashboard.account.lists.ready.length}}</b-badge></b-button>
            </b-button-group>
            <b-button class="btn-create-collection" variant="primary" v-b-modal.modallg>Собрать аудиторию</b-button>
          </div>

          <!-- Активная -->
          <b-row class="list-columns-items" v-if="typeMenu.active">

            <b-alert v-if="!this.$store.state.dashboard.account.lists.active.length" show variant="warning">Cписки аудиторий которые работают с аккаунтом.</b-alert>

            <b-col sm="12" class="p-0">
              <item-list-active v-for="list in this.$store.state.dashboard.account.lists.active" :key="list.id" :list="list" />
            </b-col>

          </b-row>

          <!-- Не активная -->
          <b-row class="list-columns-items" v-if="typeMenu.ready">

            <b-alert v-if="!this.$store.state.dashboard.account.lists.ready.length" show variant="warning">Здесь находяться списки не работающие в данный момент с аккаунтом.<br>
            Для запуска аккаунта необходимо "Собрать аудиторию".</b-alert>

            <b-col sm="12" class="p-0">
              <item-list-ready v-for="list in this.$store.state.dashboard.account.lists.ready" :key="list.id" :list="list" />
            </b-col>

          </b-row>

        </b-col>

      </b-row>

    </div>

  </div>

</template>

<script>
import HTTP_V3 from '../../../../store/http.js'
import ListActive from './ListActive'
import ListReady from './ListReady'

export default {

  components: {
    'item-list-active': ListActive,
    'item-list-ready': ListReady
  },

  data() {
    return {
      typeMenu: {
        active: true,
        ready: false
      }
    }
  },

  methods: {

    loadAccount() {
      const username = this.$route.params.username
      this.$store.dispatch('DashboardAccount', username)
      .then(ok => {
        console.log(ok)
      })
    },

    selectMenu(a, b) {
      this.typeMenu.active = a
      this.typeMenu.ready = b
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

        this.loadAccount()
        // .then(ok => {
        //   this.$swal.fire('Аудитория успешно перемещена.', {
        //     type: 'success',
        //   })
        // })

      })
    }

  },

  created() {
    // code...
  }

}
</script>

<style lang="css">


.AccountLists {
  padding: 20px 0 0 0;
  margin: 0 0 20px 0;
  border-radius: 6px;
  box-shadow: 0 1px 0 0 #d7d8db80, 0 0 0 1px #e3e4e88c;
}

.AccountLists .AccountListsBody {

}
.AccountLists .AccountListsBody .row {
  margin: 0;
}
.AccountLists .AccountListsBody .lists-column {
  padding: 0 20px;
  position: relative;
}

.AccountLists .AccountListsBody .lists-column .list-columns-header {
  position: relative;
  margin: 0 0 20px 0;
}
.AccountLists .AccountListsBody .lists-column .list-columns-header .btn-create-collection {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  line-height: 24px;
  padding: 0px 8px;
  background: transparent;
  color: #191f2c;
  font-weight: 900;
  font-size: 10px;
  height: 24px;
  box-shadow: 0 1px 0 0 #d7d8db80, 0 0 0 1px #e3e4e88c;
  text-transform: uppercase;
}
.AccountLists .AccountListsBody .lists-column .list-columns-header h3 {
  font-size: 16px;
  font-weight: 900;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  line-height: 24px;
}
.AccountLists .AccountListsBody .lists-column .list-columns-header .btn-group {
  display: block;
}
.AccountLists .AccountListsBody .lists-column .list-columns-header .btn-group .btn {
  font-weight: 700;
  font-size: 12px;
  padding: 4px 10px;
}
.AccountLists .AccountListsBody .lists-column .list-columns-header .btn-group .btn.btn-outline-dark {
  color: #191f2c;
  border-color: #e4e4e7;
}
.AccountLists .AccountListsBody .lists-column .list-columns-header .btn-group .btn-outline-dark:hover {
  background: #f0f0f2;
}
.AccountLists .AccountListsBody .lists-column .nav-tabs {
  margin: 0;
  font-size: 12px;
  color: #000;
  display: inline-block;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
  padding: 0;
  text-transform: uppercase;
  font-style: normal;
  border: none;
  margin: 20px 0;
}
.AccountLists .AccountListsBody .lists-column .nav-tabs .nav-item {
  margin: 0;
  font-size: 10px;
  display: inline-block;
  font-weight: bold;
  line-height: 44px;
  text-align: center;
  /* padding: 0 20px 0 0; */
  height: 30px;
  line-height: 30px;
}
.AccountLists .AccountListsBody .lists-column .nav-tabs .nav-link {
  border: none;
  font-weight: 900;
  padding: 0 10px;
  color: #999;
  font-size: 14px;
  width: 120px;
  min-width: 100px;
}
.AccountLists .AccountListsBody .lists-column .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  color: #000;
  font-size: 20px;
  display: initial;
}



@-webkit-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@-moz-keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

@keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}



.AccountLists .AccountListsBody .list-columns-items {
  margin: 0;
  width: 100%;
}
.AccountLists .AccountListsBody .alert {
  margin: 0 0 20px 0;
  font-weight: bold;
  padding: 6px 12px;
  font-size: 10px;
}
.AccountLists .AccountListsBody .list-columns-items .list-item {
  width: 100%;
  margin: 0;
  color: #000;
  display: inherit;
  position: relative;
  /* display: inline-block; */
  -webkit-transition: background-color 0.5s ease-out;
  -moz-transition: background-color 0.5s ease-out;
  -o-transition: background-color 0.5s ease-out;
  transition: background-color 0.5s ease-out;
}
.AccountLists .AccountListsBody .list-columns-items .list-item:nth-child(2n) {
  border-top: 1px solid #e8ecef;
  padding: 15px 0 0 0;
}
.AccountLists .AccountListsBody .list-columns-items .list-item:hover .ListItemButtons {
  display: block;
}
.AccountLists .AccountListsBody .list-columns-items .list-item:hover {
  /* background: #dbdbdb36; */
  /* border-left: 1px solid #e8ecef; */
}
.AccountLists .AccountListsBody .list-columns-items .list-item:hover .buttons-click-wrap {
  display: block;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group {
  position: relative;
  display: block;
  padding: 0;
}





/* Заголовок списка */
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header {
  margin: 0;
  position: relative;
  padding: 0;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-body {
  margin: 0 0 15px 0;
  position: relative;
  padding: 0;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .item-header-title {
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .col-sm-8,.col-sm-2 {
  padding: 0;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .item-header-icon {
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.59);
  -webkit-box-shadow:0 1px 4px 0 rgba(0, 0, 0, 0.59);
  -moz-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.59);
  width: 48px;
  margin: 0 auto;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .item-header-icon img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .item-header-title a {
  color: #16191b;
  font-size: 18px;
  line-height: 48px;
  position: relative;
  font-weight: 900;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .item-header-title a.ListTitleWork {
  background: linear-gradient(110deg,#00dcff,#0073ff 50%,#aa5aff 75%,#ff4169);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  font-weight: 900;
  font-size: 18px;
}



/* Прогрес бар */
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .header-progress {
  width: 100%;
  margin: 0;
  position: relative;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .header-progress .process-row {
  width: 240px;
  position: relative;
  display: block;
  margin: 0 0 0 52px !important;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-header .header-progress .progress {
  height: 3px;
  border-radius: 100px;
}




/* Инфо списка */
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .header-info-row {
  width: 100%;
  padding: 0;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .header-info-row.ready {
  margin: 0 0 10px 0;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .header-info-row.active {
  margin: 0 0 10px 0;
}




.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .header-info-row .header-info {
  width: 100%;
  display: inline-flex;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .header-info-row .header-info .item-block-mini {
  min-width: 10px;
  padding: 0;
  position: relative;
  height: 20px;
  line-height: 20px;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group span {
  display: inline-flex;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group span .icon-m {
  display: inline-flex;
  color: #8d9faf;
  width: 14px;
  height: 14px;
  position: relative;
  margin: 0 4px 0 0;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group span .icon-m.cube32 {
  width: 32px;
  height: 32px;
}

.buttons-click-wrap {
  /* display: none; */
  position: absolute;
  right: 0;
}
.buttons-click-wrap .add-work {
  height: 26px;
  line-height: 20px;
  padding: 0 7px;
  font-weight: 900;
  font-size: 10px;
}
.buttons-click-wrap span .dark {
  color: #999;
  cursor: pointer;
}

.ListItemButtons {
  right: 15px;
  top: 15px;
  color: #ddd;
  position: absolute;
  z-index: 333;
  display: block;
}
.ListItemButtons .sdfsdfdsfs {
  position: static;
  cursor: pointer;
  display: inline-flex;
  color: #383838;
  width: 28px;
  height: 28px;
  margin: 0 4px 0 0;
}
.ListItemButtons .btn-group .btn.btn-secondary {
  color: #191e2bf0;
  border-color: #dddddd7a;
  font-size: 12px;
  font-weight: 600;
  line-height: 28px;
  padding: 0;
  background: transparent;
  min-width: 30px;
}

.buttons-click-wrap .btn-group .btn.btn-secondary {
  color: #191e2bf0;
  border-color: #dddddd7a;
  font-size: 12px;
  font-weight: 600;
  line-height: 28px;
  padding: 0;
  background: transparent;
  min-width: 30px;
}



.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group .item-group-bottom {
  padding: 0px 15px;
  margin: 10px 0px 0px;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group h5 {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}

.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group strong {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  top: -2px;
  position: relative;
  line-height: 14px;
}
.AccountLists .AccountListsBody .list-columns-items .list-item .list-item-group strong .st-status {
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


.sdfsojROIEw {
  width: 16px;
  height: 20px;
  background-position: -413px -253px;
  display: block;
  position: relative;
  background-image: url(/insta-sprite.png);
  background-size: 435px 401px;
  display: inline-block;
}

.sdKKEfjds {
  width: 14px;
  height: 18px;
  background-position: -225px -112px;
  display: block;
  position: relative;
  background-image: url(/insta-sprite.png);
  background-size: 435px 401px;
  display: inline-block;
}

.tab-content > .active p {
  background: #eee;
  padding: 10px;
}

</style>
