const webpack = require('webpack')

const path = require('path')

module.exports = {
    // entry: './src/index.js' 
    
    // 上述配置等同于
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: path.posix.join('', 'img/[name].[ext]')
                }
                // 添加到这并且会按照文件大小, 或者转化为base64, 或者单独作为文件
                // 在大小限制可以name属性/[name].[ext], 会将我们的文件在设定的文件下
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('这里是打包文件头部注释')
    ]
}