/**
 * ajax请求配置
 */
import axios from 'axios'
import { Message } from 'element-ui'

// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
axios.defaults.baseURL = 'http://sf28090049.wicp.vip:8082/conn' // 默认地址
// axios.defaults.headers.common['Language'] = val
// axios.defaults.baseURL = 'http://60.186.197.171:8081'
axios.interceptors.request.use(
  config => {
    let val = localStorage.langNum || 0
    config.headers['Language'] = val
    return config
  }
)
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
        localStorage.removeItem('AutoSystemID')
        window.location.href = '/console/login'
      } else if (response.data.code === 3) {
        Message.warning(response.data.msg)
        return response
      } else if (response.data.code === 4) {
        Message.error(response.data.msg)
        setTimeout(() => {
          localStorage.removeItem('AutoSystemID')
          window.location.href = '/console/login'
        }, 1000)
      } else {
        // Message.error(response.data.msg)
        return response
      }
    }
  },
  error => {
    // if (error && error.response) {
    //   switch (error.response.status) {
    //     case 404:
    //       router.push({ name: 'errorPage' })
    //       // error.message = '请求出错(404)'
    //       break
    //     case 500:
    //       router.push({ name: 'error-500' })
    //       //  error.message = '服务器错误(500)';
    //       break
    //     default: error.message = `连接出错(${error.response.status})!`;
    //   }
    // }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  }
)

export default axios
