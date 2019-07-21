<template>
  <div class="MainHome">

    <index-main2 v-if="!this.$store.state.session.auth"/>

  </div>
</template>

<script>

import IndexMain from './pages/IndexMain'
import IndexMain2 from './pages/IndexMain2'

export default {
  name: 'MainHome',
  components: {
    'index-main': IndexMain,
    'index-main2': IndexMain2,
  },

  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Hello', vmid: 'test' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  created() {

    setTimeout(() => {
      if (this.$store.state.session.auth) {
        this.$router.push('dashboard')
      }
    }, 1000)

  }
}

</script>
