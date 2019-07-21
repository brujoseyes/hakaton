<template>

  <transition name="fade">

    <div class="">

      <header>
        <b-container>

          <b-row class="m-0 header-center">
            <b-col sm="4">
              <div class="header-logo">
                <a href="/dashboard"><h3>YambaLike</h3></a>
              </div>
            </b-col>
          </b-row>

        </b-container>
      </header>

      <!-- <index-accounts/> -->

      <b-container>
        <router-view/>
      </b-container>

    </div>

  </transition>

</template>

<script>

import Accounts from './Accounts'

export default {
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$cookie.delete('user_id')
      this.$cookie.delete('access_token')
      location.href = '/'
    }
  },
  created() {

    // // Проверяем авторизацию
    // setTimeout(() => {
    //   if (!this.$store.state.session.auth) {
    //     location.href = '/'
    //   }
    // }, 1000)

  },
  mounted() {

  },
  components: {
    'index-accounts': Accounts
  }
}
</script>

<style>

  .notification {
    letter-spacing: 1px;
  }

  header {
    background: #fff;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #6c757d4d;
  }
  header .header-center {
    margin: 0;
  }
  header .header-logo {
    width: 50px;
    margin: 15px 0;
  }
  header .header-logo h3 {
    font-weight: bold;
    position: relative;
    display: inline-block;
    font-family: "Museo Sans Cyrl 900 normal",sans-serif;
    font-size: 28px;
    line-height: 54px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #000;
    margin: 0;
  }
  header .header-logo img {
    width: 100%;
  }

  .dashboard h3 {
    font-size: 28px;
    color: #000;
    font-weight: 600;
  }

  .nav-menu-left {
    margin: 0 0 20px 0;
    padding: 0 15px;
  }
  .nav-menu-left li {
    width: 100%;
  }
  .nav-menu-left .nav-item .nav-link {
    padding: 0px 4px;
    color: #000;
    letter-spacing: 0.6px;
    font-size: 10px;
    font-family: sans-serif;
    font-weight: bold;
    float: left;
  }
  .nav-menu-left .nav-item .nav-link.disabled {
    padding: 2px 4px;
    color: #000;
    letter-spacing: 0.6px;
    font-size: 10px;
    font-family: sans-serif;
    font-weight: bold;
    float: left;
  }
  .nav-menu-left .nav-item:nth-child(2n) {
    margin: 10px 0;
  }
  .nav-menu-left .nav-item a.nav-link:hover {
    color: #fff;
    background: #000;
  }

  .nav-page {
    background: #fff;
    padding: 0;
    border-radius: 6px;
  }
  .nav-page-title {
    padding: 20px;
    font-size: 16px;
    letter-spacing: 1px;
    color: #000;
    font-weight: 600;
  }
  .nav-page-content {
    margin: 0;
    border-top: 1px solid #f1f5f8;
  }
  .nav-page-content button, select, input {
    font-weight: 400;
    font-size: 12px;
  }


</style>
