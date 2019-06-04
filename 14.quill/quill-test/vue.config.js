// vue.config.js
//这是vue 的配置文件
const webpack = require('webpack');

module.exports = {
  // 选项...

  //设置vue运行的目录地址
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/vueapp/' //发布路径一般配置为vueapp
    :
    '/', //开发服务器默认路径为根目录

  //css、js等静态资源的路径
  //assetsDir: '',

  //开发环境API
  devServer: {
    //proxy: 'http://dev.mp.umier.cn'
    proxy: {
      '/': {
        target: 'http://dev.admin.nowbook.sup.services/',
        ws: false,
        changeOrigin: true,
      }
    },
    hot: true, // 设置热替换
    hotOnly: true,
    inline: true, //实时刷新
  },

  //保存时自动格式化
  lintOnSave: process.env.NODE_ENV !== 'production',

  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       'window.Quill': 'quill/dist/quill.js',
  //       'Quill': 'quill/dist/quill.js'
  //     }),
  //   ]
  // },
  // chainWebpack: config => {
  //   config.module
  //     .rule('js')
  //     .exclude
  //     .add(/node_modules(?!\/quill-image-drop-module|quill-image-resize-module-withfix|image-resize.min)/)
  // },
  // chainWebpack: config => {
  //   config
  //     .plugin('Quill')
  //     .use(webpack.ProvidePlugin, [{
  //       'window.Quill': 'quill/dist/quill.js',
  //       'Quill': 'quill/dist/quill.js'
  //     }])
  // }
}