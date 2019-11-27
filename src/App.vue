<template>
  <div id="app" style="padding: 8px; height: 100%;">
  <router-view></router-view>   
  </div>
</template>
<script>
export default {
  watch: {
      '$route' (to, from) {
        console.log("from: " + from.path + " to: " + to.path)
      }},
}
</script>
<style>
body, html{
  height: 100% !important;
}
</style>