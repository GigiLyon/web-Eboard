<template>
  <div id="app"  app-data="true" style="padding:0px; margin:0px;">
    <router-view></router-view> 
  </div>
</template>


<script> 
  export default {
    //   created: function () {
    //     this.$http.interceptors.response.use(undefined, function (err) {
    //       return new Promise(function (resolve, reject) {
    //         if(err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //           this.$store.dispatch(logout)
    //         }
    //         throw err;
    //       })
    //     })
    // }
  }

</script>


<style>
</style>
