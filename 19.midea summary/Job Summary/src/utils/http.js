import axios from 'axios'
// import qs from 'qs' 看项目需要
import APIUrl from '@/project-config.js'

const service = axios.create({
  // baseURL: APIUrl.baseURL,
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 请求超时时间
  retry: 4, // 重连次数
  retryDelay: 1000,
  withCredentials: true // 配置允许跨域携带cookie
})

// 输出方法
export default function request (url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    }
    service(options)
      .then(res => {
        console.log('返回数据', res)
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
        console.error(error)
      })
  })
}
