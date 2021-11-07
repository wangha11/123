import axios from 'axios'
const service= axios.create({
    baseURL:  "/api",
    // baseURL:"http://127.0.0.1:7001/api", process.env.VUE_APP_BASE_API +
    timeout: 1000,
});
// 请求拦截器
service.interceptors.request.use(
    config => {
      // 发送请求前做什么
      if (localStorage.getItem('token')) {
        // 若是有做鉴权token,就给头部带上token 每次请求头部携带token
        config.headers.token = localStorage.getItem('token')
      }
      return config
    },
    error => {
      // 在此定义请求错误需要做什么
      console.log(error)
      return Promise.reject(error)
    }
  )
  
export default service