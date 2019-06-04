/**
 * Created by BIYY on 2017-10-12.
 *
 * @format
 */

// import env from 'env'
const env = process.env.VUE_APP_MX_ENV;
let config = Object.assign({}, window.PROJECT_CONFIG);
// let config = {}
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
config.defaultRequsetParams = {
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
};
// 定义一个全局使用的token占位符，网络请求设置该值则可以替换成正常的token发起请求
config.tokenPlaceholder = 'midea_sso_token';
config.testTokenPlaceholder = 'mideatest_sso_token';

config.cssDefaultData = {
    header: {
        // dev
        // userId: 'ck00020923004',
        // sit
        // userId: 'ck00065511',
        // userId: 'ck00006668001',
        // userId: 'ck00006668',
        userId: 'ck00001418',
        // userId: 'c0035967003',
        sourceSys: 'APP'
    }
};
// ck00065511 Ccs123456
// config.cssDefaultData = { header: { userId: 'ocs_admin', setsOfBooksId: '304', sourceSys: '1' } }

config.statusBarColor = [255, 255, 255, 1]; // 状态栏颜色
config.language = 'CN'; // 状态栏颜色 'CN,EN'

/**
 * 这里是配置环境变量的基础地址， 如果新增环境的时候，需要手动在这里添加基础环境地址
 */

// config.baseUrl = {
//   // 开发环境
//   local: 'http://10.16.69.207:8080/mobile-web/public-access/houseapp',
//   // 生产环境
//   prod: 'http://10.16.69.207:8080/mobile-web/public-access/houseapp',
//   // 测试环境
//   test: 'http://10.16.69.207:8080/mobile-web/public-access/houseapp',
//   // sit环境
//   sit: 'http://10.16.69.207:8080/mobile-web/public-access/houseapp'
// }

config.api = {
    // 接口配置范例
    // getTest: {
    //   // 接口名称
    //   url: `/houseapp/restful/simpleNews/list`, // 接口地址（必填）
    //   type: 'get' // 接口请求类型默认为get
    // },
    // postTest: {
    //   // 接口名称
    //   url: `/houseapp/restful/simpleNews/save`, // 接口地址（必填）
    //   type: 'post' // 接口请求类型默认为get
    // },
    // jsonpTest: {
    //   url: `/houseapp/restful/simpleNews/list`,
    //   type: 'jsonp'
    // }
};

export default config;
