<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style>

html,
body,
#app {
  width: 100%;
  height: 100%;
  /* font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; */
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 12px;
  font-weight: 200;
  line-height: 1.53846;
  color: #43494d;
  background-color: #fff;
  /* background-color: #fafafa; */
  /* background-color: #edeef0; */
  /* background-color: #f2f4f8; */
}

.box-shadow {
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
  -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
  -moz-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
}
.v-tour {
  z-index: 9999;
}


</style>
