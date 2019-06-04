### Eslint的一些配置

- 首行缩进
``` JS
1. 修改.eslint.js  在rules中添加
    
    'indent' : 'off'

2. 修改.editorconfig

    把 indent_size = 2 更改为 indent_size = 4

3. 打开文件->设置 在右侧添加如下

    "editor.detectIndentation": false,

4. 下载vue-beautify插件

5. 选中某个需要格式化的文件，在文件里右键选择 Beautify vue
```

- 常用配置
``` js
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: { // 复制粘贴rules就可以了
    'generator-star-spacing': 'off',
    'object-curly-spacing': 'off',
    // 最常出现的错误
    'no-unused-vars': 'off',
    // 最常出现的错误
    "vue/no-use-v-if-with-v-for": ["error", {
      "allowUsingIterationVar": true
    }],

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off', // 首行缩进
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```
