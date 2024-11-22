const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  //关闭eslint语法校验
  lintOnSave: false,
  outputDir: "dist",
  devServer: {
    proxy: {
      "/devShoes": {
        target: "http://123.60.21.129:8088/", // 测试环境
        changeOrigin: true,
        pathRewrite: {
          "^/devShoes": "",
        },
      },
    },
    client: {
      overlay: false,
    },
  }
})
