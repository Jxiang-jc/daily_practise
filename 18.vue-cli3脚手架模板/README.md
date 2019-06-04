### axios 二次封装的总结

> 通常而言, 我们在开发过程中, 都会遇到跨域情况, 一般情况下, 我们可以使用 `devServer.proxy` . 但通常情况是这样的, 项目在开发环境请求的接口地址和生产环境下的不一样, 跟测试环境下的又不一样, 因此需要我们根据不同的环境, 切换不同的接口地址域名

> ok, 首先, 我们要分清楚, `devServer.proxy` 与 `axios.defaults.baseURL` 是两回事,
他们可以说互不影响吧. 但又可以相辅相成. 

> 我自己的理解是: `devServer.proxy` 只是webpack替我们做了一个服务器代理而已, 而 `axios.defaults.baseURL` 是改变我们的初始域名, 好比如下
```js
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8085' : 'http://localhost:8080'
```
- 上面这里怎么理解呢?
  
  - 首先, `process` 是 `nodejs` 全局变量, 无需 `require` 引入, 其次, `process.env.NODE_ENV` 可以得到当前是 生产环境(`production`) 或是 开发环境(`development`) 等等. 这样我们就能根据不同的环境, 得到不同的接口地址域名.

#### 上面的铺垫有点啰嗦, 接下来, 干货来了

> 在 `src` 同级目录下, 即更目录下, 新增文件(新增多少个看具体项目具体分析), 这里暂时增加两个. `.env` 文件会在默认被运行. 
[具体请看官网介绍](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

> **注意注意：官方说明：只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。**

> `.env.production`（注意：这里的文件名就叫这个，不要再加后缀名）：
```js
NODE_ENV = 'production'
VUE_APP_BASE_API = 'http://localhost:8085' //请求后台域名
VUE_APP_VERSION = '0.0.1' // 版本号
```

> `.env.development`:
```js
NODE_ENV = 'development'
VUE_APP_BASE_API = 'http://localhost:8080' // 接口域名
VUE_APP_VERSION = '0.0.2' // 版本号
```

- 有了以上的配置以后, 我们就可以在 `axios` 配置中, 这样写:
```js
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
```