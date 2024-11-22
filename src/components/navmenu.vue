<template>
  <div class="navbox">
    <el-menu default-active="saleInfo" @select="handleOpen" class="el-menu-vertical-demo">
      <el-menu-item index="saleInfo">
        <i class="el-icon-setting"></i>
        <span slot="title">球鞋销售信息总览</span>
      </el-menu-item>
      <el-menu-item index="perInfo">
        <i class="el-icon-menu"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="shoesInfo">
        <i class="el-icon-document"></i>
        <span slot="title">球鞋管理</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key) {
      if (key == 'saleInfo') {
        this.$router.push({
          path: "/home/shoesSaleInfo"
        })
      } else if (key == 'perInfo') {
        this.$router.push({
          path: "/home/perInfo"
        })
      } else if (key == 'shoesInfo') {
        this.$router.push({
          path: "/home/shoeslist"
        })
      }

    },
  }
}
</script>
<style lang="less" scoped>
.navbox {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}
</style>
