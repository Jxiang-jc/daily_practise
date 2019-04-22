// 公共借口, 示例
import request from '@/utils/http'

const api = {
  // 接口1
  login (data) {
    return request('user/login', data)
  },
  // 接口2
  logout (data) {
    return request('user/logout', data)
  }
}

export default api
