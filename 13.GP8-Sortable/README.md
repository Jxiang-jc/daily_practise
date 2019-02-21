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

### Sortable.js其他参数接口设置

- ### group：string or object
```js
string：命名，个人建议用元素id就行,用处是为了设置可以拖放容器时使用，在array中的put的设置中再做介绍；
object：{name,pull,put}
    name：同string的方法，
    pull：pull用来定义从这个列表容器移动出去的设置，true/false/'clone'/function
        true:列表容器内的列表单元可以被移出；
        false：列表容器内的列表单元不可以被移出；
        'clone'：列表单元移出，移动的为该元素的副本；
        function：用来进行pull的函数判断，可以进行复杂逻辑，在函数中return false/true来判断是否移出；
    put：put用来定义往这个列表容器放置列表单元的的设置，true/false/['foo','bar']/function
        true:列表容器可以从其他列表容器内放入列表单元；
        false：与true相反；
        ['foo','bar']：这个可以是一个字符串或者是字符串的数组，代表的是group配置项里定义的name值；
        function：用来进行put的函数判断，可以进行复杂逻辑，在函数中return false/true来判断是否放入；
```

- ### sort: boolean(true) 
> &nbsp; &nbsp; &nbsp; &nbsp; 定义是否列表单元是否可以在列表容器内进行拖拽排序; false时候在自己的拖拽区域不能拖拽，但是可以拖拽到其他区域，true则可以做自己区域拖拽或者其他授权地方拖拽

- ### delay: number(0)
> &nbsp; &nbsp; &nbsp; &nbsp; 定义鼠标选中列表单元可以开始拖动的延迟时间; 延迟拖拽时间, 其实就是鼠标按下去拖拽延迟

- ### disabled: Boolean(false)
> &nbsp; &nbsp; &nbsp; &nbsp; 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序

- ### animation: number(0)
> &nbsp; &nbsp; &nbsp; &nbsp; 定义排序动画的时间；

- ### handle: selector(null)
> &nbsp; &nbsp; &nbsp; &nbsp; 这个参数是设置该标签，或者该class可以拖拽  但是不要设置 id的节点和子节点相同的tag不然会有bug

- ### filter: selector(null)
> &nbsp; &nbsp; &nbsp; &nbsp; 该参数可以传递一个函数,或者字符串,字符串可以是class或者tag,然后用于触发onFilter函数,这样可以用来自定义事件等(eg:删除当前节点)。 可设置为多个选择器, 中间用 “,” 分隔;

- ### draggable: selector(null)
> &nbsp; &nbsp; &nbsp; &nbsp; 简单css选择器的字符串，定义哪些列表单元可以进行拖放

- ### ghostClass: selector('.sortable-ghost')
> &nbsp; &nbsp; &nbsp; &nbsp; 排序镜像class,就是当鼠标拉起拖拽节点的时候添加该class

- ### chosenClass: selector('sortable-chosen')
> &nbsp; &nbsp; &nbsp; &nbsp; 为拖拽的节点添加一个class 开始拖拽鼠标按下去的时候 添加该class

- ### forceFallback: boolean(false)
> &nbsp; &nbsp; &nbsp; &nbsp; 如果设置为true时，将不使用原生的html5的拖放，可以修改一些拖放中元素的样式等;

- ### fallbackClass: string
> &nbsp; &nbsp; &nbsp; &nbsp; 当forceFallback设置为true时，拖放过程中鼠标附着单元的样式;

- ### scroll: boolean(true)
> &nbsp; &nbsp; &nbsp; &nbsp; 当排序的容器是个可滚动的区域, 拖放可以引起区域滚动. 设置拖拽的时候滚动条是否智能滚动。默认为真，则智能滚动，false则不智能滚动

- ### scrollSensitivity: 30
> &nbsp; &nbsp; &nbsp; &nbsp; 滚动的灵敏度,其实是拖拽离滚动边界的距离触发事件的距离边界+-30px的地方触发拖拽滚动事件，

- ### scrollSpeed 10 
> &nbsp; &nbsp; &nbsp; &nbsp; 滚动速度

- ### ignore 'a, img' // 忽略

- ###  setData
``` js
setData: function (dataTransfer, dragEl) { //设置拖拽传递的参数
    dataTransfer.setData('Text', dragEl.textContent);
},
```

- 使用 element-ui table 配合 sortable时， 必须在<el-table>中添加 row-key="id"。 否则有bug