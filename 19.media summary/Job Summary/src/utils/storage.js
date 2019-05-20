const init = function (option={}) {
	// console.log('option', option);
	window.$storage = new Storage(option);
	
	return window.$storage;
}
class Storage {
  constructor (options) {
		// 用于设置过期时间
		var _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
		this._defaultExpire = _maxExpireDate;
		
    // default options
    var defaults = {
      storage: 'localStorage',
			exp: Infinity // An expiration time, in secounds .default never delete.
    };
		
    var opt = Object.assign(defaults, options);
		
		this.storage = window[String(opt.storage)];
		
		this.isSupported = this._isStorageSupported(this.storage);
		
  }
	// 序列化
	_serialize (item) {
		return JSON.stringify(item);
	}
	
	_deserialize (data) {
		return data && JSON.parse(data);
	}
	
  // 检验key值是否为String
  _checkKeyIfString (key) {
    if (typeof key !== 'string') {
      console.warn(key + ' used as a key, but it is not a string.')
      key = String(key);
    }
    return key ;
  }
	
	// 浏览器是否支持storage
	_isStorageSupported (storage) {
		var supported = false;
		if (storage && storage.setItem) {
			supported = true;
			var key = "_" + Math.round(Math.random() * 1e7);
			try {
				storage.setItem(key, key);
				storage.removeItem(key);
			} catch (err) {
				supported = false;
			}
			return supported;
		}
	}
	
	// 判断是否容量储存超出了最大限度
	// http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
	_isQuotaExceded (e) {
		var quotaExceeded = false;
		if (e) {
			if (e.code) {
				switch (e.code) {
					case 22:
						quotaExceeded = true;
						break;
					case 1014:
						// Firefox
						if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
							quotaExceeded = true;
						}
						break;
				}
			} else if (e.number === -2147024882) {
				  // Internet Explorer 8
				  quotaExceeded = true;
				}
			}
		return quotaExceeded;
	}
	
	// 对容量超过限定的处理
	_quotaExceedhandler (key, val, options, e) {
		console.warn('Quota exceeded!');
		
		if (options && options.force === true) {
			// 如果超出容量了。先尝试删除过期的storage
			var deleteKeys = this.removeAllExpires();
			console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!');
			try {
				options.force = false;
				this.set(key, val, options);
			} catch (err) {
				console.warn(err);
			}
		} else {
			console.log('需要手动情理，无法自动清除过期storage');
		}
	}
	
	_getExpiresDate (expires, now) {
		// expires 传进来的是秒。 转毫秒 * 1000
		now = now || new Date();

		if (typeof expires === 'number') {
			expires = expires === Infinity ?
			this._defaultExpire :
			new Date(now.getTime() + expires * 1000);
		} else if (typeof expires === 'string') {
			expires = new Date(expires);
		}
		
		if (expires && !this._isValidDate(expires)) {
			// 如果时间格式有误，直接抛出错误。
			throw new Errow(`${expires} parameter cannot be converted to a valid Date instance`);
		}
		 
		return expires.getTime();
	}
	
	// 验证日期
	_isValidDate (date) {
		return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
	}
	
	// 验证是否过期
	_checkCacheItemIfEffective (cacheItem) {
		console.log('timeNow < cacheItem.exp;', timeNow < cacheItem.exp)
		var timeNow = (new Date()).getTime();
		return timeNow < cacheItem.exp;
	}
	
	_cacheItemConstructor (value, exp) {
		var cacheItem = {};
		// 获取创建时的时间戳
		cacheItem.createTime = (new Date()).getTime();
		
		exp = exp || this._defaultExpire;
		cacheItem.exp = this._getExpiresDate(exp)
		
		cacheItem.value = value;
		
		return this._serialize(cacheItem);
	}
	
  set (key, val, options={}) {
    console.log
    if (!key || !val) return;

    key = this._checkKeyIfString(key);
		
		// force: true(主动添加成功)。 false (先自动删除过期的storage再添加的)
		Object.assign(options, {force: true});

		// 如果storage传的不是JSON字符串会变成 "[object Object]"
    var value = this._serialize(val);
	
		var catchItem = this._cacheItemConstructor(value, options.exp)

    try {
      this.storage.setItem(key, catchItem);
			
    } catch (e) {
			// data wasn't successfully saved due to quota exceed so throw an error
			if (this._isQuotaExceeded(e)) {
				this._quotaExceedhandler(key, value, options, e);
			} else {
				console.error(e);
			}
    }

    return val;

  }

  get (key) {
    if (!key) return;

    key = this._checkKeyIfString(key);

    var cacheItem = null;
		
    try {
      cacheItem =  this._deserialize(this.storage.getItem(key));
    } catch (e) {
      return null;
    }
	console.log('value123', this._checkCacheItemIfEffective(cacheItem))	
		// 判断是否过期，过期则删除
		if (cacheItem && this._checkCacheItemIfEffective(cacheItem)) {
			console.log(777)
			return cacheItem;
		} else {
			console.log(888)
			this.remove(key);
		}
		
    return null;
  }
	
	remove (key) {
		if (!key) return;
		
		key = this._checkKeyIfString(key);
		
		this.storage.removeItem(key);
		
		return null;
	}
	
	removeAllExpires () {
		var len = this.storage.length;
		var removeKeys = [];
		var that = this;
		for (var i = 0; i < len; i++) {
			var key = this.storage.key(i);
			var cacheItem = null;
			try {
				cacheItem = this._deserialize(this.storage.getItem(key));
			} catch (e) {}
			
			if (cacheItem !== null && cacheItem.e !== undefined) {
				var timeNow = (new Date()).getTime();
				if (timeNow >= cacheItem.e) {
					removeKeys.push(key);
				}
			}
		}
		
		removeKeys.forEach(function (key) {
			that.remove(key);
		})
		
		return removeKeys;
	}

	clear () {
		this.storage.clear();
	}
	
}

export default init
