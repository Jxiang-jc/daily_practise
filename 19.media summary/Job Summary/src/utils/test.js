/*
* WebStorageCache - 0.0.3
* https://github.com/WQTeam/web-storage-cache
*
* This is free and unencumbered software released into the public domain.
*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    (factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.WebStorageCache = factory()
  }
}(this, function () {


  // https://github.com/jeromegn/Backbone.localStorage/blob/master/backbone.localStorage.js#L63
  var defaultSerializer = {
    serialize: function (item) {
      return JSON.stringify(item)
    },
    // fix for "illegal access" error on Android when JSON.parse is
    // passed null
    deserialize: function (data) {
      return data && JSON.parse(data)
    }
  }

  function _isCacheItem(item) {
    if (typeof item !== 'object') {
      return false
    }
    if (item) {
      if ('c' in item && 'e' in item && 'v' in item) {
        return true
      }
    }
    return false
  }


  function _checkAndWrapKeyAsString(key) {
    if (typeof key !== 'string') {
      console.warn(key + ' used as a key, but it is not a string.')
      key = String(key)
    }
    return key
  }


  // cache api
  var CacheAPIImpl = {

    set: function (key, val, options) {

      key = _checkAndWrapKeyAsString(key)

      options = _extend({ force: true }, options)

      if (val === undefined) {
        return this.delete(key)
      }

      var value = defaultSerializer.serialize(val)

      var cacheItem = new CacheItemConstructor(value, options.exp)
      try {
        this.storage.setItem(key, defaultSerializer.serialize(cacheItem))
      } catch (e) {
        if (_isQuotaExceeded(e)) { // data wasn't successfully saved due to quota exceed so throw an error
          this.quotaExceedHandler(key, value, options, e)
        } else {
          console.error(e)
        }
      }

      return val
    },
    get: function (key) {
      key = _checkAndWrapKeyAsString(key)
      var cacheItem = null
      try {
        cacheItem = defaultSerializer.deserialize(this.storage.getItem(key))
      } catch (e) {
        return null
      }
      if (_isCacheItem(cacheItem)) {
        if (_checkCacheItemIfEffective(cacheItem)) {
          var value = cacheItem.v
          return defaultSerializer.deserialize(value)
        } else {
          this.delete(key)
        }
      }
      return null
    },

    delete: function (key) {
      key = _checkAndWrapKeyAsString(key)
      this.storage.removeItem(key)
      return key
    },

    clear: function () {
      this.storage.clear()
    }
  }

  /**
  * Cache Constructor
  */
  function CacheConstructor(options) {

    // default options
    var defaults = {
      storage: 'localStorage',
    }

    var opt = Object.assign(defaults, options)

    this.storage = _getStorageInstance(opt.storage)

  }

  CacheConstructor.prototype = CacheAPIImpl

  return CacheConstructor

}))