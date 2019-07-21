


import Vue from 'vue'
import App from './App.vue'
import LyTab from 'ly-tab'
import VueMeta from 'vue-meta'

import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'

// register globally
const YmapPlugin =  require('vue-yandex-maps');
Vue.use(YmapPlugin)

// or for a single instance
const { yandexMap, ymapMarker } = require('vue-yandex-maps');

// Fortawesome START
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faReply, faCoffee, faTrashAlt, faStopCircle,
         faDirections,  faEllipsisH, faUsers, faPercentage, faCookieBite,
         faSync, faUserAlt, faDatabase, faGenderless, faRetweet, faDiceD6, faBurn, faInfo, faHeart,
         faStop
       } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faPlay,
  faReply,
  faCoffee,
  faTrashAlt,
  faStopCircle,
  faDirections,
  faEllipsisH,
  faUsers,
  faPercentage,
  faCookieBite,
  faSync,
  faUserAlt,
  faDatabase,
  faGenderless,
  faRetweet,
  faDiceD6,
  faBurn,
  faInfo,
  faHeart,
  faStop
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// Fortawesome END

import 'vue-tour/dist/vue-tour.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false


import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

Vue.use(LyTab)
Vue.use(VueMeta)
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:4100',
//   vuex: {
//   store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))

new Vue({
  store,
  router,
  render: h => h(App),
  components: { yandexMap, ymapMarker },
  metaInfo: () => ({
    title: 'Basic',
    titleTemplate: '%s | Vue Meta Examples',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    },
    headAttrs: {
      test: true
    },
    meta: [
      { name: 'description', content: 'Hello', vmid: 'test' }
    ],
    script: [
      { innerHTML: '{ "@context": "http://www.schema.org", "@type": "Organization" }', type: 'application/ld+json' },
      { innerHTML: '{ "body": "yes" }', body: true, type: 'application/ld+json' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  })
}).$mount('#app')
