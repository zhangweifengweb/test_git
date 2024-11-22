<template>
  <div class="headBox">
    <div class="headBox_left">
      <!--      <h3>页面名称</h3>-->
    </div>
    <div class="headBox_right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ perInfo.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="liginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {loginOut} from "@/api/shoesApi/shoesApis";
import publicFunc from "@/utils/publicFunc";

export default {
  name: "headerCompontent",
  data() {
    return {
      perInfo: JSON.parse(localStorage.getItem("perInfo")),
      publicFunc: publicFunc
    }
  },
  mounted() {
    console.log("this", this.$router)
  },
  methods: {
    handleCommand(liginOut) {
      if (liginOut == 'liginOut') {
        this.liginOutHandle()
      }
    },
    liginOutHandle() {
      loginOut().then(res => {
        if (res.code == 200) {
          localStorage.clear()
          publicFunc.showModalTips(res.message);
          this.$router.push({
            path: "/home"
          })
        } else {
          publicFunc.showModalTips(res.msg || `查询失败，请稍后重试~\n错误码：${res.code}`);
        }
      }).catch(err => {
        console.log(err, "err")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.headBox {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .headBox_right {
    padding-right: 1%;

    .el-dropdown-link {
      font-size: 20px;
    }
  }
}
</style>
