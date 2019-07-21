
<template>

<div class="IndexMain">

  <b-container>

    <b-jumbotron>
      <template slot="header">
        Yamba Like
      </template>
      <template slot="lead">
        <div>Прокачай вовлеченность своего Instagram аккаунта.</div>
        <div>В данный момент сервис работает в режиме бета тестирования. 👍🏻💖🔥😉</div>
      </template>
      <hr class="my-4">
      <div class="BtnsInUp">
        <b-btn variant="primary" :to="{ path: '/auth/signin' }" class="mr-2">Войти</b-btn>
        <b-btn variant="success" :to="{ path: '/auth/signup' }">Регистрация</b-btn>
      </div>
    </b-jumbotron>

  </b-container>

</div>

</template>

<style scoped>

.IndexMain {}
.IndexMain .BtnsInUp {

}
.IndexMain .BtnsInUp .btn {
  font-size: 18px;
  font-weight: bold;
  padding: 0 30px;
  line-height: 40px;
}

</style>
