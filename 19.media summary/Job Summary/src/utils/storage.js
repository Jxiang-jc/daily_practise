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
      storage: 'localStorage'
    };
		
    var opt = Object.assign(defaults, options);
		
		this.storage = window[String(opt.storage)]
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
	
  set (key, val, options) {
    
    if (!key || !val) return;

    key = this._checkKeyIfString(key);

		// 如果storage传的不是JSON字符串会变成 "[object Object]"
    var value = this._serialize(val);
		
    try {
      // localStorage.setItem(key, value)
      this.storage.setItem(key, value);
			
    } catch (e) {
			console.log("TCL: Storage -> set -> e", e);
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
    return cacheItem;
  }
	
	delete (key) {
		if (!key) return;
		
		key = this._checkKeyIfString(key);
		
		this.storage.removeItem(key);
		
		return null;
	}
	
	clear () {
		this.storage.clear();
	}
	
	
}

export default init
