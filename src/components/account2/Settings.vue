<template lang="html">

  <b-row>
    <b-col sm="6">
      <div class="nav-page box-shadow">

        <div class="nav-page-title">Настройки аккаунта</div>

        <div class="nav-page-content settings-form">
          <b-button class="btn-remove-account" variant="danger" @click="RemoveAccount()">Удалить аккаунт</b-button>
        </div>

      </div>
    </b-col>
  </b-row>

</template>

<script>
import HTTP_V3 from '../../store/http.js'

export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
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

<style>
.settings-form {
  padding: 20px;
}
button.btn-remove-account {
  font-size: 11px;
  height: 34px;
  padding: 0 15px;
  letter-spacing: 1px;
}

</style>
