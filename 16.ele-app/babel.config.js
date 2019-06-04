module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [ // vue-cli3使用按需引入的方法
    [
      'component',
      {
        'libraryName': 'mint-ui',
        'style': true
      }
    ]
  ]
}
