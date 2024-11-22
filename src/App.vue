<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import navmenu from "@/components/navmenu.vue";
export default {
  name: "App",
  components: {
    navmenu
  }
}
</script>
<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  box-sizing: content-box;
  overflow: hidden;
}
</style>
