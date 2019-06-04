/** @format */

// 自定义webpack插件，内容包含cubemodule版本升级、文件转换，zip打包等等
const MxBuild = require('./mx-build/MxBuildPlugin.js');
const path = require('path');
const { buildProjectConfig, buildVConsole } = require('./mx-build/until');

// 判断是否生成sourceMap
const sourceMapEnabled =
    process.env.NODE_ENV === 'production' ? process.argv.slice(2).includes('--map') : true;

console.log(sourceMapEnabled ? '调试模式启动' : '调试模式关闭');

/**
 * 地址格式化
 * @param {以项目根目录为根的目录地址} dir
 */
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // index.html资源根目录
    publicPath: './',
    // 统一输出目录
    outputDir: resolve('release/dist'),
    // sourceMap显示控制
    productionSourceMap: sourceMapEnabled,
    configureWebpack: {
        plugins: [new MxBuild()],
        resolve: {
            alias: {
                '@': resolve('src'),
                'mx-styles': resolve('src/assets/mx-styles'),
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'html-loader'
                        },
                        {
                            loader: 'markdown-loader',
                            options: {
                                /* your options here */
                            }
                        }
                    ]
                }
            ]
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            // 在Html-webpack-plugin生成模板的時候在public資源文件夾生成配置文件
            args[0].configFile = buildProjectConfig();
            // 控制vconsole的显示:当打包环境是test 或者 命令行带--map 则显示vconsole
            args[0].vconsole = buildVConsole();
            return args;
        });

        // 生产调试模式
        config.optimization.minimize(!sourceMapEnabled);
        config.devtool(sourceMapEnabled ? 'source-map' : false);
        // config.devtool(sourceMapEnabled ? 'cheap-module-eval-source-map' : false)
    },
    css: {
        loaderOptions: {
            css: {}, // 这里的选项会传递给 css-loader
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
    },
    devServer: {
        port: '8080',
        open: true
    }
};
