/* 该插件的以用：
	1. 下拉菜单本身是不会关闭的
	2. 点击下拉菜单以外的所有区域都要关闭
	思路：点击所有区域可以在document上绑定click事件来实现，
			 同时只要过滤出点击的目标元素内部的元素即可
 */

/* 首先，在bind钩子内声明了一个函数documentHandler， 并将它作为句柄绑定在document的click事件上。 documentHandler函数做了两个判断， 第一个判断点击的区域是否是指令所在的元素内部， 如果是，就跳出函数 */

function ClickoutSide (el, binding) {
  function documentHandler (e) {
		// contains方法是用来判断元素A是否包含了元素B，包含返回true， 不包含返回false
    if (el.contains(e.target)) {
      return false
    }
		// 判断当前的指令v-clickoutside有没有写表达式， 在该自定义表达式中，表达式应该是一个函数，在过滤了内部元素后， 点击外面任何区域应该执行用户表达式中的函数，所以binding.value()就是用来执行当前上下文methods中指定的函数
    if (binding.expression) {
      binding.value(e)
    }
  }
	// 修饰符选用ESC关闭下拉菜单
	if (binding.modifiers.esc) {
		function keyboardHandler (e) {
			if (binding.expression && e.keyCode === 27) {
				binding.value(e)
			}
		}
		el.__vueKeyBoard__ = keyboardHandler
		document.addEventListener('keydown', keyboardHandler)
	}

	// 在此使用el.__vueClickOutside__ 引用documentHandler，这样就可以在unbind钩子里移除对document的click事件监听，如果不移除，当组件或元素销毁时，它仍然存在于内存
  el.__vueClickOutside = documentHandler
  document.addEventListener('click', documentHandler)
}

export default {
  bind: function (el, binding, vnode) {
    ClickoutSide(el, binding)
  },
  unbind: function (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside)
    delete el.__vueClickOutside
		
		if (binding.modifiers.esc) {
			document.removeEventListener('keydown', el.__vueKeyBoard__)
			delete el.__vueKeyBoard__
		}
  },
	update: function(el, binding){
		binding.expression = binding.expression === 'handleClose' ? '' : 'handleClose'
  }
}

