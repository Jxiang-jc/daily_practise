import axios from 'axios'

import APPConfig from '@/config'

import axiosInstance from './axios'

// ---------------  axios配置：https://www.cnblogs.com/libin-1/p/6607945.html  -----------------
/**
 * @param api -Object: {url- 请求链接，type - 请求方法}： String：url，请求方法默认get
 * @param params 请求参数 Object "GET"
 * @param data 请求参数 Object "PUT"
 * @param headers 请求头， Object
 * @param timeout 请求超时时间
 * @param baseURL 与api组成完整的链接： String
 * @param showLoading 是否需要Loading，Boolean
 * @param showLoadingMask 是否在loading时添加背景遮罩层
 * @param isCache 是否缓存请求
 * @param duration 缓存时间
 * @param cancelToken 取消请求
 * @returns {AxiosPromise}
 */
let CancelToken = axios.CancelToken

let request = ({
	api,
	params,
	data,
	headers,
	timeout,
	responseType,
	showLoading = true,
	showLoadingMask = false,
	isCache = false,
	// 默认缓存时间24小时
	duration = 3600 * 24,
	cancelToken = new CancelToken(function executor(c) {})
}) => {
	let configTimeout = timeout || APPConfig.defaultRequestParams.timeout
	let configHeaders = headers || APPConfig.defaultRequestParams.headers
	let configApi = ''
	let configType = 'POST'
	
	if (typeof api === 'object' && api) {
		configApi = api.url
		configType = api.type.toUpperCase()
	} else {
		configApi = api
	}
	
	return axiosInstance({
		url: configApi,
		method: configType,
		data: data || {},
		params: params || {},
		headers: configHeaders,
		timeout: configTimeout,
		responseType: responseType,
		showLoading: showLoading,
		showLoadingMask: showLoadingMask,
		isCache: isCache,
		duration: duration,
		cancelToken: cancelToken
	})
}

export default request
