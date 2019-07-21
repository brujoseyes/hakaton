<template lang="html">
  <div class="AuthIndex">

    <div class="auth-bg-block"></div>

    <b-container>

      <div class="AuthLogo">
        <router-link :to="{ path: '/' }">
          <!-- <img src="http://pngimg.com/uploads/instagram/instagram_PNG3.png" alt="YambaLike.ru"> -->
        </router-link>
      </div>

      <router-view/>

    </b-container>

  </div>
</template>

<script>
export default {

}
</script>

<style>

.AuthIndex .auth-bg-block {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #eee;
}

.AuthLogo {
  position: relative;
  top: 60px;
}
.AuthLogo img {
  width: 180px;
  margin: 0 auto;
  display: block;
}

.SignIn {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(21, 32, 43);
}

.FormAuth {
  margin: 0 auto;
  /* width: 530px; */
  z-index: 44;
  position: relative;
  top: 100px;
  background: #3a3b4c;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.69);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.69);
  border-radius: 12px;
  margin-bottom: 100px;
  overflow: hidden;
}
.FormAuth.SignIn {
  height: 560px;
}
.FormAuth.SignUp {
  height: 960px;
}

.FormAuth .FormAuthTitle {
  position: relative;
  padding: 0 30px;
  margin: 30px 0;
  top: 30px;
}
.FormAuth .FormAuthTitle h1 {
  color: #fff;
  top: 30px;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  display: block;
  margin: 0;
}

.FormAuth .FormAuthBody {
  padding: 30px;
}

.FormAuth .FormAuthBody .form-group {
  margin-bottom: 30px;
}
.FormAuth .FormAuthBody .form-group .form-control {
  display: block;
  width: 100%;
  height: 54px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 54px;
  color: #495057;
  background-color: rgb(19, 31, 44);
  background-clip: padding-box;
  border: 1px solid rgba(136, 153, 166, 0.14);
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
.FormAuth .FormAuthBody form .PrivacyCookie {
  line-height: 180%;
  font-size: 14px;
  color: #ddd;
  margin: 0 0 30px 0;
}
.FormAuth .FormAuthBody .BtnSignIn {
  background-image: linear-gradient(155deg, #2292d9 40%, #1d48ba);
      color: #fff;
      border: none;
      width: 160px;
      line-height: 32px;
      font-size: 16px;
      font-weight: bold;
      outline: none;
      overflow: hidden;
      border-radius: 30px;
      /* letter-spacing: 1px; */
      /* -webkit-box-shadow: 0 1px 1px rgb(86, 91, 95); */
      /* box-shadow: 0 1px 1px rgb(86, 91, 95); */
      /* text-align: left; */

  }

.FormAuth .FormAuthFooter {
  background-color: #182430;
  padding: 30px;
  font-size: 14px;
  line-height: 20px;
  color: #8899a6;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.FormAuth .FormAuthFooter a {
  color: #1c94e0;
  text-align: left;
}
.FormAuth .FormAuthFooter .AuthFooterLine {
  margin-bottom: 15px;
}
</style>
