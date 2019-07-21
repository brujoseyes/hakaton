


import axios from 'axios'
import VueCookie from 'vue-cookie'


const instance = axios.create({
  baseURL: process.env.VUE_APP_HOST_API,
  headers: {
    'Authorization': 0 || VueCookie.get('access_token')
  }
})

export default instance
