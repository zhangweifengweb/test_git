<template>

  <el-container>
    <el-aside>
      <navmenu></navmenu>
    </el-aside>
    <el-container>
      <el-header height="4vh">
        <header-compontent></header-compontent>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
import navmenu from "@/components/navmenu.vue";
import headerCompontent from "@/components/headerCompontent.vue";

export default {
  name: "App",
  components: {
    navmenu,
    headerCompontent
  }
}
</script>
<style lang="less">
.el-container {
  height: 100%;
}
</style>
