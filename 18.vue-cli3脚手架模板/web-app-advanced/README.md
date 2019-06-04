# interior-design

## 执行命令

> 安装依赖 `yarn install`

> 运行项目 `yarn run dev`

> 测试环境打包 `yarn run build`

> 正式环境打包 `yarn run prod`

> 新增打包环境 `yarn run newEnv`

> 打包新增的环境，举例 _sit_ 环境 `yarn run sit`

> 打包默认自增版本号，如果不需要版本自增，则在打包命令后面添加 `-- --cur` 举例： `yarn run build -- --cur`

> 打包默认不生成 sourceMap，如果需要打包版本需要，则添加 `-- --map` 举例： `yarn run build -- --map`

> lints 检查与修复 `yarn run lint`

## 相关文档

1. JavaScript 框架 [Vue](https://cn.vuejs.org/).
2. Vue.js 开发的标准工具 [Vue Cli 3](https://cli.vuejs.org/).
3. 模块打包器 [Webpack](https://webpack.github.io/).
4. 移动端 Vue 组件库 [Vant](https://youzan.github.io/vant/#/zh-CN/intro).

-   .editorconfig 配置

| 属性                     | 说明                                                                         |
| ------------------------ | ---------------------------------------------------------------------------- |
| indent_style             | 缩进使用 tab 或者 space                                                      |
| indent_size              | 缩进为 space 时，缩进的字符数                                                |
| tab_width                | 缩进为 tab 时，缩进的宽度                                                    |
| end_of_line              | 换行符的类型。lf, cr, crlf 三种                                              |
| charset                  | 文件的 charset。有以下几种类型：latin1, utf-8, utf-8-bom, utf-16be, utf-16le |
| trim_trailing_whitespace | 是否将行尾空格自动删除                                                       |
| insert_final_newline     | 是否使文件以一个空白行结尾                                                   |
| root                     | 表明是最顶层的配置文件，发现设为 true 时，才会停止查找.editorconfig 文件     |

项目中配置了 ESlint + prettier.具体点击 👉 [package.json 配置 ESlint + prettier](https://nice.lovejade.cn/zh/article/beautify-vue-by-eslint-and-prettier.html#%E5%88%9D%E5%A7%8B%E5%8C%96-vue-%E9%A1%B9%E7%9B%AE%E6%8E%A8%E4%BB%8B)
