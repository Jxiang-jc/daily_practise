/* eslint-disable no-console */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 参考配置https://cli.vuejs.org/config/#devserver-proxy
  // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
  css: {
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
            /*
              之所以设为37.5，是为了引用像mint-ui这样的第三方UI框架，因为第三方框架没有兼容px2rem ，将remUnit的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原mint-ui的组件，否则会样式会有变化，例如按钮会变小。

              既然设置成了37.5 那么我们必须在写样式时，也将值改为设计图的一半。 */
          })
        ]
      } // 这里的选项会传递给 postcss-loader
    }
  },
  // 设置vue运行的目录地址
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/' // 发布路径一般配置为production-sub-path
    : '/', // 开发服务器默认路径为根目录
  devServer: {
    // disableHostCheck: true,
    // host: 'localhost.midea.com',
    port: '8080',
    open: true,
    proxy: {
      '/': {
        target: 'http://dev.admin.nowbook.sup.services/',
        ws: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map' // 用来解决js报错时查找错误文件
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  }
}
