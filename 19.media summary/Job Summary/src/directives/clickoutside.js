function ClickoutSide (el, binding) {
  function documentHadler (e) {
    if (el.contains(e.target)) {
      return false
    }
    if (binding.expression) {
      binding.value(e)
    }
  }
  el.__vueVlickOutside__ = documentHadler
  document.addEventListener('click', documentHadler)
}

export default {
  bind: function (el, binding, vnode) {
    ClickoutSide(el, binding)
  },
  unbind: function (el, binding) {
    document.removeEventListener('click', el.__vueVlickOutside__)
    delete el.__vueVlickOutside__
  }
}
