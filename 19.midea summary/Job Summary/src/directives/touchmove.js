import common from '../js/common'
import util from '../js/util'

const isIOS = common.isIOS()
const minX = -66

function TouchMove (el, bind) {
  this.el = el
  this.bind = bind
  this.startX = 0
  this.startY = 0
  this.x = 0
  this.transformed = false
  this.timer = null
  if (bind.value.container) {
    this.closest = util.closest(el, bind.value.container)
  }
}