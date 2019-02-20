<font color="#58bc58">** **</font>

<h1 align="center">使用Sortable.js的心得</h1>

> 拖拽主要又一下这几个事件完成

- ondragstart 事件: 当拖拽元素<font color="#58bc58">**开始被拖拽** </font>的时候触发的事件, 此事件作用在 **被拖拽元素** 上

- ondragenter 事件: 当拖拽元素<font color="#58bc58"> **进入目标** </font>元素的时候触发的事件,此事件作用在 **目标元素** 上

- ondragover 事件: 当拖拽元素<font color="#58bc58"> **在目标元素上移动** </font>的时候触发的事件, 此事件作用在 **目标元素** 上

- ondrop 事件: 被拖拽的元素<font color="#58bc58"> **在目标元素上同时鼠标放开** </font>触发的事件，此事件作用在**目标元素**上

- ondragend 事件: 当<font color="#58bc58"> **拖拽完成** </font>后触发的事件，此事件作用在 **被拖曳元素** 上


> &nbsp; &nbsp; &nbsp; &nbsp; 主要是拖拽的时候发生 **ondragstart** 事件和 **ondragover** 事件的时候节点交换位置，其实就是把他们的节点互相调换  
> &nbsp; &nbsp; &nbsp; &nbsp; 当然这只是最简单的拖拽排序方式，里面用到了许多技术比用判断拖拽滚动条的时候是滚动拖拽元素上面的根节点的父节点滚动，还是滚动window上面的滚动条， 还有拖拽的时候利用getBoundingClientRect() 属性判断鼠标是在dom节点的左边，右边，上面，还是下面。还有利用回调和函数式编程声明函数，利用布尔值相加相减去，做0和1判断，利用了事件绑定来判定两个列表中的不同元素，这些都是很有趣的技术。


> 源码解读 1
```js

   /** _dispatchEvent
     * [创建一个事件,事件参数主要由name提供,并且触发该事件,其实就是模拟事件并且触发该事件]
     * @param {obj} sortable [ sortable ]
     * @param {node} rootEl [ 鼠标按下去拖拽节点的根节点 ]
     * @param {string} name [ 需要创建的事件 ]
     * @param {node} targetEl [ 鼠标按下去拖拽节点，触屏到发生事件ondragover的节点的根节点，就是目标节点的根节点。但是如果是start事件的时候传进来的,该参数就是鼠标按下去拖拽节点的根节点 ]
     * @param {node} fromEl [ 鼠标按下去拖拽节点的根节点,参数和第二个一样，为什么重写参数进来呢，可能是为了兼容这样的的吧 ]
     * @param {number} startIndex [ 鼠标按下去拖拽节点的索引 ]
     * @param {number} newIndex [ 拖拽完之后现在节点的索引 ]
     */

    function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
        var evt = document.createEvent('Event'),   // 创建一个事件
            options = (sortable || rootEl[expando]).options,   // 获取options参数

            // name.charAt(0) 获取name的第一个字符串
            // toUpperCase() 变成大写
            // name.substr(1) 提取从索引为1下标到字符串的结束位置的字符串
            // name.substr(1) 提取从索引为1下标到字符串的结束位置的字符串
            onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

        evt.initEvent(name, true, true); //自定义一个事件

        evt.to = rootEl; // 在触发该事件发生evt的时候，将evt添加多一个to属性,值为rootEl
        evt.from = fromEl || rootEl;  // 在触发该事件发生evt的时候，将evt添加多一个to属性，值为rootEl
        evt.item = targetEl || rootEl;  // 在触发该事件发生evt的时候，将evt添加多一个to属性，值为rootEl
        evt.clone = cloneEl;   // 在触发该事件发生evt的时候，将evt添加多一个to属性，值为rootEl
        evt.oldIndex = startIndex; // 开始拖拽节点
        evt.newIndex = newIndex; // 现在节点
        // 触发该事件，并且是在rootEl 节点上面 。触发事件接口就这这里了。onAdd: onUpdate: onRemove:onStart:onSort:onEnd: 

        rootEl.dispatchEvent(evt);

        if (options[onName]) {
            options[onName].call(sortable, evt);
        }
    }
```