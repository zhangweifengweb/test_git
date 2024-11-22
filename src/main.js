import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './resources/css/common.css'
import "./resources/css/styleInTable.less";
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//调用element
Vue.use(ElementUI);
Vue.config.productionTip = false
const myShoesVue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default myShoesVue
