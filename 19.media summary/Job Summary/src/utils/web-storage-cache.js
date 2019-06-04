/*
* WebStorageCache - 0.0.3
* https://github.com/WQTeam/web-storage-cache
*
* This is free and unencumbered software released into the public domain.
*/

// (function (root, factory) {
    
//     if (typeof module !== 'undefined' && module.exports) {
//         console.log(2)
//         module.exports = factory();
//     } else if (typeof define === 'function' && define.amd) {
//         console.log(1)
//         define(factory);
//     } else {
//         console.log(3)
//         console.log("TCL: root", root)
//         root.WebStorageCache = factory();
//     }


// }(typeof window !== "undefined" ? window : this, function () {
//     "use strict";

    // var _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
    // var _defaultExpire = _maxExpireDate;
    // https://github.com/jeromegn/Backbone.localStorage/blob/master/backbone.localStorage.js#L63
    // var defaultSerializer = {
    //     serialize: function (item) {
    //         return JSON.stringify(item);
    //     },
    //     // fix for "illegal access" error on Android when JSON.parse is
    //     // passed null
    //     deserialize: function (data) {
    //         return data && JSON.parse(data);
    //     }
    // };

    // function _extend (obj, props) {
    //     for (var key in props) obj[key] = props[key];
    //     return obj;
    // }


    // function _isStorageSupported (storage) {
    //     var supported = false;
    //     if (storage && storage.setItem ) {
    //         supported = true;
    //         var key = '__' + Math.round(Math.random() * 1e7);
    //         try {
    //             storage.setItem(key, key);
    //             storage.removeItem(key);
    //         } catch (err) {
    //             supported = false;
    //         }
    //     }
    //     return supported;
    // }
    // console.log(444)

    // get storage instance
    // function _getStorageInstance (storage) {
    //     var type = typeof storage;
    //     if (type === 'string' && window[storage] instanceof Storage) {
    //         return window[storage];
    //     }
    //     return storage;
    // }

    // function _isValidDate (date) {
    //     return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
    // }

    // function _getExpiresDate (expires, now) {
    //     now = now || new Date();

    //     if (typeof expires === 'number') {
    //         expires = expires === Infinity ?
    //         _maxExpireDate : new Date(now.getTime() + expires * 1000);
    //     } else if (typeof expires === 'string') {
    //         expires = new Date(expires);
    //     }

    //     if (expires && !_isValidDate(expires)) {
    //         throw new Error('`expires` parameter cannot be converted to a valid Date instance');
    //     }

    //     return expires;
    // }

    // // http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
    // function _isQuotaExceeded(e) {
    //     var quotaExceeded = false;
    //     if (e) {
    //         if (e.code) {
    //             switch (e.code) {
    //                 case 22:
    //                 quotaExceeded = true;
    //                 break;
    //                 case 1014:
    //                 // Firefox
    //                 if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
    //                     quotaExceeded = true;
    //                 }
    //                 break;
    //             }
    //         } else if (e.number === -2147024882) {
    //             // Internet Explorer 8
    //             quotaExceeded = true;
    //         }
    //     }
    //     return quotaExceeded;
    // }

    // // cache item constructor
    // function CacheItemConstructor (value, exp) {
    //     // createTime
    //     this.c = (new Date()).getTime();
    //     exp = exp || _defaultExpire;
    //     var expires = _getExpiresDate(exp);
    //     // expiresTime
    //     this.e = expires.getTime();
    //     this.v = value;
    // }

    // function _isCacheItem(item) {
    //     if (typeof item !== 'object') {
    //         return false;
    //     }
    //     if(item) {
    //         if('c' in item && 'e' in item && 'v' in item) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // // check cacheItem If effective
    // function _checkCacheItemIfEffective(cacheItem) {
    //     var timeNow = (new Date()).getTime();
    //     return timeNow < cacheItem.e;
    // }

    // function _checkAndWrapKeyAsString(key) {
    //     if (typeof key !== 'string') {
    //         console.warn(key + ' used as a key, but it is not a string.');
    //         key = String(key);
    //     }
    //     return key;
    // }

    // // cache api
    // var CacheAPI = {

    //     set: function (key, value, options) {},

    //     get: function (key) {},

    //     delete: function (key) {},
    //     // Try the best to clean All expires CacheItem.
    //     deleteAllExpires: function() {},
    //     // Clear all keys
    //     clear: function () {},
    //     // Add key-value item to memcached, success only when the key is not exists in memcached.
    //     add: function (key, options) {},
    //     // Replace the key's data item in cache, success only when the key's data item is exists in cache.
    //     replace: function (key, value, options) {},
    //     // Set a new options for an existing key.
    //     touch: function (key, exp) {}
    // };

    // // cache api
    // var CacheAPIImpl = {

    //     set: function(key, val, options) {

    //         key = _checkAndWrapKeyAsString(key);

    //         options = _extend({force: true}, options);

    //         if (val === undefined) {
    //             return this.delete(key);
    //         }

    //         var value = defaultSerializer.serialize(val);

    //         var cacheItem = new CacheItemConstructor(value, options.exp);
    //         try {
    //             this.storage.setItem(key, defaultSerializer.serialize(cacheItem));
    //         } catch (e) {
    //             if (_isQuotaExceeded(e)) { //data wasn't successfully saved due to quota exceed so throw an error
    //             this.quotaExceedHandler(key, value, options, e);
    //         } else {
    //             console.error(e);
    //         }
    //     }

    //     return val;
    // },
    // get: function (key) {
    //     key = _checkAndWrapKeyAsString(key);
    //     var cacheItem = null;
    //     try{
    //         cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
    //     }catch(e){
    //         return null;
    //     }
    //     if(_isCacheItem(cacheItem)){
    //         if(_checkCacheItemIfEffective(cacheItem)) {
    //             var value = cacheItem.v;
    //             return defaultSerializer.deserialize(value);
    //         } else {
    //             this.delete(key);
    //         }
    //     }
    //     return null;
    // },

    // delete: function (key) {
    //     key = _checkAndWrapKeyAsString(key);
    //     this.storage.removeItem(key);
    //     return key;
    // },

    // deleteAllExpires: function() {
    //     var length = this.storage.length;
    //     var deleteKeys = [];
    //     var _this = this;
    //     for (var i = 0; i < length; i++) {
    //         var key = this.storage.key(i);
    //         var cacheItem = null;
    //         try {
    //             cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
    //         } catch (e) {}

    //         if(cacheItem !== null && cacheItem.e !== undefined) {
    //             var timeNow = (new Date()).getTime();
    //             if(timeNow >= cacheItem.e) {
    //                 deleteKeys.push(key);
    //             }
    //         }
    //     }
    //     deleteKeys.forEach(function(key) {
    //         _this.delete(key);
    //     });
    //     return deleteKeys;
    // },

    // clear: function () {
    //     this.storage.clear();
    // },

    // add: function (key, value, options) {
    //     key = _checkAndWrapKeyAsString(key);
    //     options = _extend({force: true}, options);
    //     try {
    //         var cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
    //         if (!_isCacheItem(cacheItem) || !_checkCacheItemIfEffective(cacheItem)) {
    //             this.set(key, value, options);
    //             return true;
    //         }
    //     } catch (e) {
    //         this.set(key, value, options);
    //         return true;
    //     }
    //     return false;
    // },

    // replace: function (key, value, options) {
    //     key = _checkAndWrapKeyAsString(key);
    //     var cacheItem = null;
    //     try{
    //         cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
    //     }catch(e){
    //         return false;
    //     }
    //     if(_isCacheItem(cacheItem)){
    //         if(_checkCacheItemIfEffective(cacheItem)) {
    //             this.set(key, value, options);
    //             return true;
    //         } else {
    //             this.delete(key);
    //         }
    //     }
    //     return false;
    // },

    // touch: function (key, exp) {
    //     key = _checkAndWrapKeyAsString(key);
    //     var cacheItem = null;
    //     try{
    //         cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
    //     }catch(e){
    //         return false;
    //     }
    //     if(_isCacheItem(cacheItem)){
    //         if(_checkCacheItemIfEffective(cacheItem)) {
    //             this.set(key, this.get(key), {exp: exp});
    //             return true;
    //         } else {
    //             this.delete(key);
    //         }
    //     }
    //     return false;
    // }
    // };

    // /**
    // * Cache Constructor
    // */
    // function CacheConstructor (options) {
    //     console.log("TCL: Storage -> _getStorageInstance -> window[stor] instanceof Storage", window.localStorage instanceof Storage)
    //     // default options
    //     var defaults = {
    //         storage: 'localStorage',
    //         exp: Infinity  //An expiration time, in seconds. default never .
    //     };

    //     var opt = _extend(defaults, options);

    //     var expires = opt.exp;

    //     if (expires && typeof expires !== 'number' && !_isValidDate(expires)) {
    //         throw new Error('Constructor `exp` parameter cannot be converted to a valid Date instance');
    //     } else {
    //         _defaultExpire = expires;
    //     }

    //     var storage = _getStorageInstance(opt.storage);

    //     var isSupported = _isStorageSupported(storage);

    //     this.isSupported = function () {
    //         return isSupported;
    //     };

    //     if (isSupported) {

    //         this.storage = storage;

    //         this.quotaExceedHandler = function (key, val, options, e) {
    //             console.warn('Quota exceeded!');
    //             if (options && options.force === true) {
    //                 var deleteKeys = this.deleteAllExpires();
    //                 console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!');
    //                 try {
    //                     options.force = false;
    //                     this.set(key, val, options);
    //                 } catch (err) {
    //                     console.warn(err);
    //                 }
    //             }
    //         };

    //     } else {  // if not support, rewrite all functions without doing anything
    //         _extend(this, CacheAPI);
    //     }

    // }

    // CacheConstructor.prototype = CacheAPIImpl;
    
    // return CacheConstructor;

// }));

// plugin.js
;(function () {
    // "use strict"
    var _global;
    
    function Storage (isLocalStorage = true) {
        this._storage = isLocalStorage ? localStorage : sessionStorage;

        this.defaultSerializer = {
            
            // fix for "illegal access" error on Android when JSON.parse is
            // passed null
            
          }
        
    }

    Storage.prototype = {
        constructor: Storage,
        _serialize: function (item) {
            return JSON.stringify(item)
        },
				_deserialize: function (data) {
				  return data && JSON.parse(data)
				},
        _checkAndWrapKeyAsString: function () {
            if (typeof key !== 'string') {
                console.warn(key + ' used as a key, but it is not a string.');
                key = String(key);
            }
            return key;
        },

         _extend: function (obj, props) {
            for (var key in props) obj[key] = props[key];
            return obj;
        },

        set: function(key, val, options={}) {

            if (!key || !val) return;

            key = _checkAndWrapKeyAsString(key);

            options = _extend({force: true}, options);


            var value = this.serialize(val);

            try {
                this.storage.setItem(key, value);
            } catch (e) {
                
            }

            return val;
        },
    }
		
		window.Storage = Storage

    
    // var storage = {
    //     add: function(n1,n2){ return n1 + n2; }, // 加
    //     sub: function(n1,n2){ return n1 - n2; }, // 减
    //     mul: function(n1,n2){ return n1 * n2; }, // 乘
    //     div: function(n1,n2){ return n1 / n2; }, // 除
    //     sur: function(n1,n2){ return n1 % n2; } // 余
    // }

    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    console.log(module.exports)
    if (typeof module !== "undefined" && module.exports) {
        console.log(123123)
        module.exports = Storage;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Storage;});
    } else {
        !('Storage' in _global) && (_global.Storage = Storage);
    }
}());
