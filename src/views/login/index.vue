<template>
  <div class="loginBox">
    <div class="formBox">
      <el-form :model="formData" label-position="left" :inline="true">
        <el-row>
          <el-col>
            <el-form-item label="账号">
              <el-input v-model="formData.userName" multiple placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="密码">
              <el-input v-model="formData.password" multiple placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" @click="loginHandle">登录</el-button>
            <el-button @click="resetHandle">重置</el-button>
          </el-col>
        </el-row>


      </el-form>
    </div>

  </div>
</template>

<script>
import {loginHandle} from "@/api/shoesApi/shoesApis";
import publicFunc from "@/utils/publicFunc";


export default {
  name: "index",
  data() {
    return {
      publicFunc: publicFunc,
      formData: {
        userName: "www",
        password: "11"
      }
    }
  },
  mounted() {
    // this.login()
  },
  methods: {
    resetHandle() {
      this.formData.userName = ""
      this.formData.password = ""
    },
    loginHandle() {
      this.login()
    },
    login() {
      loginHandle(this.formData).then(res => {
        if (res.code == 0) {
          let info = res.data
          localStorage.setItem("token", info.token)
          localStorage.setItem("perInfo", JSON.stringify(info))
          publicFunc.showModalTips("登录成功！！！");
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
  },
}
</script>

<style lang="less" scoped>
.loginBox {
  height: 100%;
  background-image: url("@/resources/img/backgroundImg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  /*设置为弹性布局*/
  display: flex;
  /*设置主轴的方向，row,column*/
  flex-direction: row;
  /*项目在主轴上的对其方式*/
  justify-content: center;
  /*项目在交叉轴上对齐方式*/
  align-items: center;

  .formBox {
    width: 15vw;
    height: 15vh;

    /deep/ .el-form-item {
      width: 100%;

      .el-form-item__label {
        width: 80px;
        color: white;
        font-size: 20px;
      }

      .el-form-item__content {
        width: calc(100% - 90px);
      }
    }

    .el-row:nth-child(3) {
      text-align: right;
      padding-right: 2%;
    }
  }
}
</style>
