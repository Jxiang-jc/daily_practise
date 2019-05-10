/**
 * Created by Jxiang on 5-9
 */
// localStorage 和 sessionStoage 的二次封装
let storage = {
  // 默认是localStorage
  get(key, isLocalStorage = true) {
    if (!key) return null
    let _storage = isLocalStorage ? localStorage : sessionStorage,
    props = key.split('.'),
    k = props.shift(),
    itemStr = _storage.getItem(k),
    itemObj = null
    try {
      itemObj = JSON.parse(itemStr)
      if (typeof itemObj != 'object') throw ('Not an object!')
    } catch (e) {
      return props.length ? null : itemStr
    }
    while (props.length && itemObj) {
      itemObj = itemObj[props.shift()]
    }
    return itemObj
  },
  set(key, value, isLocalStorage = true) {
    if (!key) return
    let _storage = isLocalStorage ? localStorage : sessionStorage,
    props = key.split('.'),
    k = props.shift()
    if (!props.length) {
      if (typeof value === 'object') value = JSON.stringify(value)
      _storage.setItem(k, value)
      return
    }
    let itemStr = _storage.getItem(k),
    itemObj = null
    if (itemStr) {
      try {
        itemObj = JSON.parse(itemStr)
        if (typeof itemObj != 'object') throw ('Not an object!')
      } catch (e) {
        throw ('storage.set: key ' + k + ' 已被占用并且不是一个对象，无法为其设置属性值')
      }
    }
    let copy = itemObj = itemObj || {}
    while (props.length > 1) {
      let p = props.shift()
      copy[p] = copy[p] || {}
      copy = copy[p]
    }
    copy[props[0]] = value
    _storage.setItem(k, JSON.stringify(itemObj))
  },
  
  remove (key, isLocalStorage = true) {
    if (!key) return
    let _storage = isLocalStorage ? localStorage : sessionStorage
    _storage.removeItem(key)
  },
  
  clear (isLocalStorage = true) {
    let _storage = isLocalStorage ? localStorage : sessionStorage
    _storage.clear()
  }
}

let methods = {
  isIOS() {
    let isIphone, ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
      // alert("iphone")
      isIphone = true
    } else if (/android/.test(ua)) {
      // alert("android")
      isIphone = false
    }
    return isIphone
  },

  storage: storage
}

export {
  storage
}
export default methods
