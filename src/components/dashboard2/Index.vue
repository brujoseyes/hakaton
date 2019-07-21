<template>

  <transition name="fade">

    <div v-if="this.$store.state.session.auth">

      <header>
        <b-container>

          <div class="menu-list">
            <b-nav>
              <b-nav-item :to="{ path: '/dashboard' }">Dashboard</b-nav-item>
              <b-nav-item :to="{ path: '/dashboard/support' }">Поддержка</b-nav-item>
              <!-- <b-nav-item :to="{ path: '/dashboard/parser-email' z">Парсер email</b-nav-item> -->

              <b-nav-item-dropdown id="nav6_ddown" text="Аккаунты" extra-toggle-classes="nav-link-custom" left>
                <b-dropdown-item :to="{ path: '/dashboard/' + account.username }" v-for="account in this.$store.state.dashboard.accounts">{{ account.username }}</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown id="nav7_ddown" :text="this.$store.state.profile.name" extra-toggle-classes="nav-link-custom" left>
                <b-dropdown-item :to="{ path: '/dashboard/settings' }">Настройки</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="logout">Выход</b-dropdown-item>
              </b-nav-item-dropdown>

            </b-nav>
          </div>

        </b-container>
      </header>

      <b-container class="dashboard">
        <b-row>
          <b-col sm="12">
            <router-view/>
          </b-col>
        </b-row>
      </b-container>

    </div>

  </transition>

</template>

<script>

export default {
  data() {
    return {
      valueIndex: 'Index'
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

    const ckeditor = document.createElement('script')
    ckeditor.setAttribute('src', '//widget.cloudpayments.ru/bundles/cloudpayments')
    document.head.appendChild(ckeditor)

    // console.log(this.$store.state)

    // Проверяем авторизацию
    setTimeout(() => {
      if (!this.$store.state.session.auth) {
        location.href = '/'
      }
    }, 700)

  }
}
</script>

<style>

  .notification {
    letter-spacing: 1px;
  }

  header {
    background: #1a1f2c;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #6c757d4d;
    -webkit-box-shadow: 0 2px 5px rgba(0,0,0,0.5);
    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
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
    line-height: 44px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #000;
    margin: 0;
  }
  header .header-logo img {
    width: 100%;
  }


  header .menu-list {
    padding: 0;
    height: 44px;
  }
  header .menu-list .nav {
    margin: 0;
    padding: 12px 0;
  }
  header .menu-list .nav .nav-item {
    line-height: 20px;
  }
  header .menu-list .nav .nav-item .nav-link:hover {
    color: #eee;
  }
  header .menu-list .nav .nav-item .nav-link {
    padding: 0 10px;
    font-weight: 800;
    font-size: 10px;
    color: rgba(99, 113, 138, 0.9);
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
    color: rgba(99, 113, 138, 0.9);
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
  .nav-page-content button, select, input {
    font-weight: 400;
    font-size: 12px;
  }


</style>
