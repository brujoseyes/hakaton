<template>

  <div class="DashboardHome">
    <index-accounts/>
  </div>

</template>

<script>

import Accounts from './AccountsNew'

export default {
  components: {
    'index-accounts': Accounts
  },
  created() {
    // code...
  }
}

</script>
