


import Vue from 'vue'
import Router from 'vue-router'


// Bootstrap CSS
// import BootstrapVue from 'bootstrap-vue'


import MainHome from '@/components/MainHome'

// import AuthSignIn from '@/components/auth/SignIn'
// import AuthSignUp from '@/components/auth/SignUp'

// NEW
import AuthIndex  from '@/components/auth/Index'
import AuthSignIn from '@/components/auth/SignIn'
import AuthSignUp from '@/components/auth/SignUp'
import AuthForgot from '@/components/auth/Forgot'

import Dashboard from '@/components/dashboard2/Index'
import DashboardHome from '@/components/dashboard2/Home'
import DashboardSettings from '@/components/dashboard2/Settings'


// Account
import AccountIndex       from '@/components/account2/new/Index'
import AccountLists       from '@/components/account2/new/lists/Index'
import AccountSettings    from '@/components/account2/new/Settings'
import AccountLogs        from '@/components/account2/new/Logs'
import AccountAnalyst     from '@/components/account2/Analyst'



import PageSupport      from '@/components/pages/Support'

Vue.use(Router)
// Vue.use(BootstrapVue)

const User = {
  template: '<div>Пользователь {{ $route.params.id }}</div>'
}

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'MainHome',
      component: MainHome
    },

    // Авторизация регистрация восстановление пароля
    {
      path: '/auth',
      component: AuthIndex,
      children: [
        {
          path: '',
          redirect: '/'
        },
        {
          path: 'signin',
          component: AuthSignIn
        },
        {
          path: 'signup',
          component: AuthSignUp
        },
        {
          path: 'forgot',
          component: AuthForgot
        }
      ]
    },

    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'settings',
          component: DashboardSettings
        },
        {
          path: 'support',
          component: PageSupport
        },
        {
          path: '',
          component: DashboardHome
        },
        {
          path: ':username',
          component: AccountIndex,
          children: [
            {
              path: '',
              component: AccountLists
            },
            {
              path: 'settings',
              component: AccountSettings
            },
            {
              path: 'logs',
              component: AccountLogs
            },
            {
              path: 'analyst',
              component: AccountAnalyst
            }
          ]
        }
      ]
    }

  ]
})
