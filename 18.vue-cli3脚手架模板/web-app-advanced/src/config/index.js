/**
 * Created by Jxiang on 2019-06-04.
 *
 * @format
 */

const env = process.env.VUE_APP_MX_ENV;
let config = Object.assign({}, window.PROJECT_CONFIG);
config.env = env; // product,local,test
config.userTest = {
    // 模拟获取的用户uid
    uid: 'yezh1',
    // 模拟token，在这里写入
    ssoToken: 'T3218055365182464'
};
/**
 * axios 默认的设置内容
 * 如果无需设置，采用axios的默认设置，删除即可
 */
config.defaultRequestParams = {
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
};
// 定义一个全局使用的token占位符，网络请求设置该值则可以替换成正常的token发起请求
config.tokenPlaceholder = 'sso_token';
config.testTokenPlaceholder = 'test_sso_token';

config.ccsDefaultData = {
    header: {
        userId: 'ck00001418',
        sourceSys: 'APP'
    }
};
// ck00065511 Ccs123456
/* config.ccsDefaultData = { 
	   header: { 
		   userId: 'ocs_admin',
		   setsOfBooksId: '304',
		   sourceSys: '1' 
	   } 
   } */

export default config;
