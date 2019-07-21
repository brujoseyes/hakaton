<template lang="html">

  <div class="AccountSettings">

    <div class="AccountSettingsBody">

      <b-row>

        <b-col sm="12" class="ItemContent">

          <div class="ItemContentHeader">
            <h3>Настройки</h3>
          </div>

          <div class="AccountSettingsForm">

            <b-button class="btn-remove-account" variant="danger" @click="RemoveAccount()">Удалить аккаунт</b-button>

          </div>

        </b-col>

      </b-row>

    </div>

  </div>

</template>

<script>
import HTTP_V3 from '../../../store/http.js'

export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    RemoveAccount() {
      this.$swal.fire({
        title: 'Вы уверены?',
        text: `Удаление аккаунта повлечет за собой удаление всех списков, но время оплаты @${this.$store.state.dashboard.account.body.username} сохраниться при добавлении нового аккаунта.`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          HTTP_V3.post('/account/settings/remove', {
            id: this.$store.state.dashboard.account.body.id
          })
          .then(res => {

            this.$swal.fire({
              title: 'Deleted!',
              text: 'Your list has been deleted.',
              type: 'success'
            })
            .then((willDelete) => {
              this.$router.push({
                path: `/dashboard`
              })
            })

          })
        }
      })
    }
  },
  created() {
    // code
  }
}
</script>

<style lang="css">

.AccountSettings {
  padding: 20px 0 0 0;
  margin: 0 0 20px 0;
  border-radius: 6px;
  box-shadow: 0 1px 0 0 #d7d8db80, 0 0 0 1px #e3e4e88c;
}
.AccountSettings .AccountSettingsBody {

}
.AccountSettings .AccountSettingsBody .row {
  margin: 0;
}
.AccountSettings .AccountSettingsBody .ItemContent {
  padding: 0 20px;
  position: relative;
}
.AccountSettings .AccountSettingsBody .ItemContent .ItemContentHeader {
  position: relative;
  margin: 0 0 20px 0;
}
.AccountSettings .AccountSettingsBody .ItemContent .ItemContentHeader h3 {
  font-size: 16px;
  font-weight: 900;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  line-height: 24px;
}

.AccountSettings .AccountSettingsBody .ItemContent .AccountSettingsForm {
  padding: 0 0 20px 0;
}



</style>
