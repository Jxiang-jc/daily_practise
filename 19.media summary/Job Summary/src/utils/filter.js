const filters = {
  /**
   * 传入毫秒，格式化时间
   *
   * @param {*} second 毫秒数(时间戳)
   * @param {*} fmt 格式， 常见： 'yyyy-MM-dd hh:mm:ss'、 'yyyy-M-d h:m:s'
   * @return {*}
   */
  formatDate (second, fmt) {
    if (!Number(second)) return
    fmt = fmt || 'yyyy/MM/dd hh:mm:ss'
    let date = new Date(Number(second)) // 后台时间转javascript时间戳
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 24 === 0 ? 0 : date.getHours() % 24, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((o[k].toString()).length)))
      }
    }

    return fmt
  }
}

export default filters
