> 1. 拖拽排序, 使用的是sortable.js插件. 

> 2. 点击排序, 根据后端返回的字段是否可排序  

> 3. quill 富文本编辑。 使用了quill-image-resize-module-withfix插件， 点击图片时， 可拖拽缩放。 其次， withfix是修复了quill-image-resize-module一个bug。当滚动条滚动时，隐藏可缩放边框。还有一个需要注意的是， quill-image-resize-module需要在全局配置（vue.config.js）quill，否则会报找不到quill。

> 4. 封装组件的时候， 真正重要的是业务组件封装，而不是单纯的ui组件封装，这是一种思想的转变，需要记住

> 5. element-ui的使用。多使用，我建议可以把demo过一遍， 这样的话，以后遇到类似的情况的时候， 至少知道有这么一种情况， 而不是像无头苍蝇一样。不知道往哪飞

> 6. 很重要的一点， 在做项目的时候， 先想好方案， 方案想好了，做起来就快。 如果想要别人认可你， 那么就得付出200%的努力