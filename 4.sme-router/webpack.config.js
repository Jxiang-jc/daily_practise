// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: { // 基于webpack的微服务器 哈哈
        contentBase: path.join(__dirname, "src")
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: __dirname + 'node_modules', // 不打包的路径
            include: __dirname + 'src', // 打包的路径
            options: {
                presets: ['env'] //这个是ES6 转 ES5的
            }
        }]
    },

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};