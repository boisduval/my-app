/**
 * ajax请求配置
 */
import axios from 'axios'
import { Message } from 'element-ui'

// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
axios.defaults.baseURL = 'http://36.24.130.99:8081' // 默认地址
// axios.defaults.baseURL = 'http://192.168.0.200'
// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  response => {
    // eslint-disable-next-line eqeqeq
    if (response.data.code == 0) {
      // Message.success(response.data.msg)
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //      cookie.del("ticket")
      //      window.location.href='http://login.com'
      return response
    } else {
      // eslint-disable-next-line
      if (response.data.code == 2) {
        Message.error(response.data.msg)
        localStorage.clear()
        window.location.href = '/login'
      } else if (response.data.code === 3) {
        Message.warning(response.data.msg)
        return response
      } else if (response.data.code === 4) {
        Message.error(response.data.msg)
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/login'
        }, 1000)
      } else {
        // Message.error(response.data.msg)
        return response
      }
    }
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  }
)

export default axios
