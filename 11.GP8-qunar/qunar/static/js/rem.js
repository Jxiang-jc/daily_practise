/*
 *  computed_rem 计算rem
 *  @params picture_width: 设计图的宽度 number ( 750 )
 *  @params rem_width    : 使用的rem宽度 number ( 100 )
 *  return void
 */

const computedRem = (picture_width = 750, rem_width = 100) => {
  let html = document.documentElement
  html.style.fontSize = html.clientWidth / (picture_width / (2 * rem_width)) + 'px'

  window.onresize = () => {
    let html = document.documentElement
    html.style.fontSize = html.clientWidth / (picture_width / (2 * rem_width)) + 'px'
  }
}

export default computedRem
