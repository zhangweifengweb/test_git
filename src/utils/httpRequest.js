/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import {Message, Loading} from 'element-ui';
import router from "@/router";
// loading设置
let globalLoading
// 环境的切换
axios.defaults.baseURL = '/devShoes';
// if (process.env.NODE_ENV == "development") {
//   //开发环境
//   axios.defaults.baseURL = '/devShoes';
// } else if (process.env.NODE_ENV == "production") {
//   //生产环境
//   axios.defaults.baseURL = '/wcc';
// } else {
//   //本地环境
// }

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截器
axios.interceptors.request.use(config => {
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  globalLoading = Loading.service({
    lock: true, text: '加载中…', background: 'rgba(0, 0, 0, 0.7)'
  })
  const token = localStorage.getItem("token");
  token && (config.headers.token = token);
  if (!token && !config.url.includes("login")) {
    globalLoading.close()
    // 说明没有token，直接踢回去让登录
    router.push("/login");
    return;
  }

  return config;
}, error => {
  return Promise.error(error);
});


// 响应拦截器
axios.interceptors.response.use(response => {
    globalLoading.close()
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login', query: {redirect: router.currentRoute.fullPath}
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: '登录过期，请重新登录', duration: 1000, type: 'warning'
          });
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login', query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在', duration: 1500, type: "warning"
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message, duration: 1500, type: 'warning'
          });
      }
      return Promise.reject(error.response);
    }
  });

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

// 导出Excel文件的函数
export function exportExcel(url) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post", url: url, responseType: "blob"
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}

