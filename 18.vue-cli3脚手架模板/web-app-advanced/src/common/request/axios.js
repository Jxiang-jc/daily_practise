import axios from 'axios'

import APPConfig from '@/config'

import Vue from 'vue'

import store from '@/store'

import Toast from '@/components/toast'

import loading from '@/components/loading'

let qs = require('qs')

Vue.use(Toast)
Vue.use(loading)

let axiosInstance = null

// loading计算器，当loading=0的时候，取消loading
let showLoading = 0
let showLoadingMask = false

let toast = str => {
	Vue.$toast(str, {
		noNetwork: true
	})
}

let complet = res => {
	let resData = res.data
	// 处理返回结果
	if (!resData.data && resData.code === 40002) {
		store.commit('loginOut', true)
		console.error('LOG_OUT')
		return resData
	}
	
	let masCheckObj = masCheck(res) // mas 校验, 如果不需要校验可以删掉
	if (typeof masCheckObj === 'object' && typeof masCheckObj.then !== 'function') {
		// 如果返回对象不是Promise对象，即mas没有报错
		if (resData.header && resData.header.resultCode !== '0000') {
			// 用户查询为空，不弹出错误信息提示
			// if (resData.content && resData.content.code && resData.content.code === '0500') return resData
			// 错误处理
			toast(resData.header.resultMsg || '页面开了点小差, 请稍候再试')
		}
	} else {
		Promise.resolve(masCheckObj).catch(data => {
			toast(`提示 ${data}`)
		})
	}
	
	// 项目中，默认resultCode === 0000为正常返回
	if (res.config.isCache && resData.header.resultCode === '0000') {
		// 判断数据是否与缓存接口对应
		let tempKey = res.config.data
			? `${res.config.url.replace(res.config.baseURL, '')}?${qs.stringify(JSON.parse(res.config.data))}`
			: `${res.config.url.replace(res.config.baseURL, '')}?${qs.stringify(JSON.parse(res.config.params))}`

		// 建立缓存， 记录内容和录入时间
		let obj = { result: res.data, expire: Date.parse(new Date()) }
		sessionStorage.setItem(tempKey, JSON.stringify(obj))
	}
	
	return resData
}

// mas 检验
let masCheck = res => {
	if (res.status && res.status !== 200) {
		if (res.status === 500 || res.status === 403 || res.status === 400 || res.status === 502) {
			Vue.$toast(res.message, {
				noNetwork: true
			})
			return Promise.reject(res)
		}
	} else {
		if (res.data.hasOwnProperty('code') && res.data.hasOwnProperty('error')) {
			if (res.data.data) {
				let msg = res.data.data[0] === '{' ? JSON.parse(res.data.data).message : res.data.data
				res.data.code === 403 && toast(`登录已失效 ${msg}`)
				res.data.code === 500 && toast(`提示 ${msg}`)
				res.data.code === 400 && toast(`系统错误 ${msg}`)
				res.data.code === 502 && toast(`提示 ${msg}`)
			} else {
				// MAS层级报错
				toast(`提示 ${res.data.msg}`)
			}
			
			return Promise.reject(res.data.msg)
		} else if (res.data.hasOwnProperty('message') && res.data.message.hasOwnProperty('status') && (parseInt(res.data.message.status) !== 0 && res.data.message.status !== null)) {
			toast(`提示 ${res.data.message.errorMsg || res.data.message.errormsg}`)
			return Promise.reject(res.data.message.errorMsg || res.data.message.errormsg)
		} else if (res.data.hasOwnProperty('exception')) {
			toast(`提示, ${res.data.exception.message}`)
			return Promise.reject(res.data.exception.message)
		}
		
		return res.data
	}
}

let create = () => {
	if (!axiosInstance) {
		axiosInstance = axios.create({
			timeout: APPConfig.defaultRequestParams.timeout,
			headers: APPConfig.defaultRequestParams.headers,
			baseURL: APPConfig.baseUrl
		})
		
		let ccsDefaultData = APPConfig.ccsDefaultData
		
		// 请求拦截，给入参添加固定头部
		axiosInstance.interceptors.request.use(config => {
			showLoadingMask = config.showLoadingMask
			
			if (config.showLoading) {
				Vue.$showLoading({
					showMask: showLoadingMask
				})
				
				showLoading++
			}
			
			// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
			// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
			// 这里对post json 进行对象转字符串处理，可以添加其他处理
			if (config.method.toUpperCase() === 'POST' && config.headers['Content-Type'] === 'application/json') {
				config.transformRequest = [
					function (data) {
						return JSON.strigify(data)
					}
				]
			}
			
			// `data` 是作为请求主体被发送的数据
			// 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
			// 在没有设置 `transformRequest` 时，必须是以下类型之一：
			// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
			// - 浏览器专属：FormData, File, Blob
			// - Node 专属： Stream
			if (
			    config.method.toUpperCase() === 'POST' ||
			    config.method.toUpperCase() === 'PUT' ||
			    config.method.toUpperCase() === 'PATCH'
			) {
				let $data = Object.assign({}, ccsDefaultData, config.data)
				config.data = $data
			} else {
				let $param = Object.assing({}, ccsDefaultData, config.params)
				config.params = $params
			}
			
			// 判断是否需要缓存
			if (config.isCache) {
				let key = config.data
					? `${config.url}?${qs.stringify(config.data)}`
					: `${config.url}?${qs.stringify(config.params)}`
					
				let temp = JSON.parse(sessionStorage.getItem(key))
				
				// 判断缓存数据是否还存在
				if (temp) {
					// temp = {result, expire} content 缓存数据 expire 存入时间
					// 判断缓存是否过期。不过期条件：存入时间+有效时间段>当前时间
					if (parseInt(temp.expire) + config.duration > Data.parse(new Date())) {
						let source = axios.CancelToken.source()
						// 这个source.cancel会被catch所捕获, 以及response的err捕获
						source.cancel({
							...temp,
							// 用于response时，err可返回当前请求是否需要showloading的情况
							config: {
								showLoading: config.showLoading
							}
						})
						
						return config
					} else {
						// 已过期，删除缓存
						sessionStorage.removeItem()
					}
				}
			}
			
			// 当有token且token存在时间不超过1个小时的时候
			// 直接在headers上面加token，否则
			// 重新获取一次用户信息，然后再在headers上面加token
			return new Promise(resolve => {
				// 这里异步处理设置token
				store.dispatch('getMxUserInfo').then(newUserInfo => {
					if (newUserInfo.ssoToken) {
						if (config.headers) {
							if (APPConfig.env === 'prod') {
								config.headers[APPConfig.tokenPlaceholder] = newUserInfo.ssoToken
							} else {
								config.headers[APPConfig.testTokenPlaceholder] = newUserInfo.ssoToken
							}
						}
						
						if (config.param) {
							if (APPConfig.env === 'prod') {
								config.params[APPConfig.tokenPlaceholder] = newUserInfo.ssoToken
							} else {
								config.params[APPConfig.testTokenPlaceholder] = newUserInfo.ssoToken
							}
						}
					} else {
						toast('获取token失败')
					}
					
					resolve(config)
				})
			})
		}, error => {
			if (error.config.showLoading && showLoading > 0) {
				showLoading--
				if (showLoading === 0) {
					Vue.$hideLoading()
				}
			}
			
			// 请求出错
			Vue.$toast('网络请求错误，请稍后重试', {
				noNetwork: true
			})
			
			return Promise.reject(error)
		})
		
		axiosInstance.interceptors.response.use(res => {
			if (res.config.showLoading && showLoading > 0) {
				showLoading--
				if (showLoading === 0) {
					Vue.$hideLoading()
				}
			}
			return complete(res)
		}, err => {
			// 是否有缓存数据
			if (axios.isCancel(err)) {
				if (!err.message.result) {
					// 手动取消请求
					// todo： sth wrong loading
					if (err.message.showLoading && showLoading > 0) {
						showLoading--
						if (showLoading === 0) {
							Vue.$hideLoading()
						}
					}
					return Promise.reject(err)
				} else {
					// 取消请求但返回缓存结果
					if (err.message.config.showLoading && showLoading > 0) {
						showLoading--
						if (showLoading === 0) {
							Vue.$hideLoading()
						}
					}
					return Promise.resolve(err.message.result)
				}
				
				// 以下判断可以考虑不要
				if (err.config.showLoading && showLoading > 0) {
					showLoading--
					if (showLoading === 0) {
						Vue.$hideLoading()
					}
				}
				
				if (err.response) {
					// 请求已发送，服务器回复状态码在2xx之外
					console.error(err.response)
				} else if (err.request) {
					// 请求已发送，但没有收到回应
					console.error(err.request)
				} else {
					// 请求的某些设置引发的问题，此处设置断网逻辑
					console.error('NO_NETWORK')
				}
				Vue.$toast('网络响应错误，请稍后重试', {
					noNetwork: true
				})
				return Promise.reject(err)
			}
		})
		
	}
}

create()

export default axiosInstance
