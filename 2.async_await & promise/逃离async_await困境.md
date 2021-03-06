<h1 align="center">逃离async/await困境</h1>

> &#160; &#160; &#160; &#160; 在 JavaScript 异步编程中，async/await 将 JavaScript 开发者从回调函数的困境中解救出来。但是随着人们对 async/await 的滥用，诞生出了新的 async/await 困境。
<img src="./img/async_await困境.jpg" />

<h3 align="center"><u>什么是 async/await 困境</u></h3>  

> &nbsp; &nbsp; &nbsp; &nbsp; 进行 JavaScript 异步编程时，人们通常一个接一个写多条语句，并在每个函数调用前标注一个 await。这导致了性能问题，因为大多数时候，一条语句并不依赖于其之前的那条语句——但是你还是必须等待之前的语句执行完毕。


<h3 align="center"><u>async/await 困境的一个例子</u></h3>  

> 假设写一个脚本来订一份披萨和一份饮料，这个脚本可能会是这样的：
```js
    (async () => {
        const pizzaData = await getPizzaData() // async call
        const drinkData = await getDrinkData() // async call
        const chosenPizza = choosePizza()      // sync call
        const chosenDrink = chooseDrink()      // sync call
        await addPizzaToCart(chosenPizza)      // async call
        await addDrinkToCart(chosenDrink)      // async call
    })()
```


- #### 解释
> &nbsp; &nbsp; &nbsp; &nbsp; 我们已经将我们的代码包括在一个异步的IIFE (Immediately Invoked Function Expression, 立即执行函数表达式)中. 其准确的执行顺序如下
1. 获取披萨列表。
2. 获取饮料列表。
3. 从披萨列表中选择一份披萨。
4. 从饮料列表中选择一份饮料。
5. 将选中的披萨加入购物车。
6. 将选中的饮料加入购物车。
7. 订购购物车中的物品。


- #### 错在哪里 ?
> &nbsp; &nbsp; &nbsp; &nbsp; 所有这些语句一个接一个地执行。这里没有并行逻辑。细想一下：为什么我们要在获取饮料列表之前等待获取披萨列表？我们应该尝试一起获取这两个列表。然而，当我们需要选择一个披萨的时候，我们确实需要在这之前获取披萨列表。对于饮料来说，道理类似。  

> &nbsp; &nbsp; &nbsp; &nbsp; 因此，我们可以总结如下：披萨相关的任务和饮料相关的任务可以并行发生，但是披萨（或饮料）各自的相关步骤需要按顺序（一个接一个地）发生


- #### 另一个糟糕实现的例子

> &nbsp; &nbsp; &nbsp; &nbsp; 下面的 JavaScript 片段会获取购物车中的物品并发起一个请求去订购它们
```js
    async function orderItems () {
        const items = await getCartItems() // async call
        const len = items.length
        for (var i = 0; i < len; i++) {
            await sendRequest(items[i]) // async call
        }
    }
```
> &nbsp; &nbsp; &nbsp; &nbsp; 在这个例子中, for循环必须等待sendReques()函数执行完毕才能继续下一轮循环, 然后, 我们事实上并不需要等待. 我们想要尽快地发送请求, 然后等待所有这些请求响应完毕


- #### 如果我们忘了使用 await 关键字会怎么样？

> &nbsp; &nbsp; &nbsp; &nbsp; 如果你在调用一个 async 函数时忘了使用 await 关键字，那个函数还是会开始执行。这意味着，await 关键字对于函数执行不是必需的。async 函数会返回一个 promise，你可以稍后使用这个 promise。  
```js
(async () => {
    const value = doSomeAsyncTask()
    console.log(value) // an unresolved promise
})
```
> &nbsp; &nbsp; &nbsp; &nbsp; 另外一个后果是，编译器不会知道你想要等待这个函数完全执行完毕。因此，编译器会在完成异步任务之前就退出了程序。因此我们确实需要 await 关键字。

> &nbsp; &nbsp; &nbsp; &nbsp; Promise的一个比较吸引人的属性是, 你可以在一行语句上得到一个promise, 然后再另一行语句中等待promise来进行后续处理, 这就是逃离async/await困境的关键

> &nbsp; &nbsp; &nbsp; &nbsp; 正如你所见，doSomeAsyncTask()返回了一个 promise。在这个点上，doSomeAsyncTask()已经开始了执行过程。为了得到 promise 的处理结果，我们使用 await 关键字而它会告诉 JavaScript 不要马上执行下一行语句，而是等待 promise 处理完毕再执行下一行语句。  


<h3 align="center"><u>如何走出 async/await 困境？</u></h3>

- ##### 1. 找出那些依赖其它语句执行的语句

    - 在第一个例子中, 我们要选择一份披萨和一份饮料, 我们得出结果, 在选择一份披萨之前, 我们需要获取披萨列表, 而在将披萨增加到购物车之前, 我们需要先选择一份披萨, 因此, 我们可以说, 这三个步骤是彼此依赖的. 我们不能再一件事完成之前做下一件事

    - 但是, 选择一份披萨并不依赖选择一份饮料, 因此, 我们可以并行选择他们
    
    - 我们发现, 一些语句依赖于其它语句的执行, 而一些语句不依赖于其它语句的执行.

- ##### 2. 将相互依赖的语句包在一个 async 函数中

    - 正如我们所见，选择披萨涉及一些依赖语句，例如获取披萨列表，选择一份披萨，然后将选中的披萨添加到购物车中。我们应该将这些语句包在一个 async 函数中。通过这种方式，我们会得到 2 个 async 函数，selectPizza()和selectDrink()。

- ##### 3. 并行执行这些async函数

    - 然后，我们可以利用事件循环来并行运行这些异步非阻塞函数。这样做的两种常见模式是 先返回 promise 和 Promise.all 方法。


<h3 align="center"><u>让我们修复上述示例</u></h3>

> 让我们遵循上述的三个步骤，将它们应用到我们的例子中。
```js
    async function selectPizza () {
        const pizzaData = await getPizzaData() // async call
        const chosenPizza = choosePizza()      // sync call
        await addPizzaToCart(chosenPizza)      // async call
    }

    async function selectDrink () {
        const drinkData = await getDrinkData() // async call
        const chosenDrink = chooseDrink()      // sync call
        const addDrinkToCart(chosenDrink)      // async call
    }

    (async () => {
        // async函数默认返回promise对象
        const pizzaPromise = selectPizza()
        const drinkPromise = selectDrink()

        // 这种写法与 const pizzaPromise = await selectPizza() 有区别喔
        await pizzaPromise
        await drinkPromise

        orderItems() // async call
    }) ()

    // Although I prefer it this way
    (async () => {
        Promise.all([selectPizza(), selectDrind()]).then(orderItems) // async call
    }) ()
```
> &nbsp; &nbsp; &nbsp; &nbsp; 现在，我们将语句分组到两个函数中。在函数内部，每行语句依赖其之前语句的执行。然后我们并行地执行这两个函数selectPizza()和selectDrink()。


> &nbsp; &nbsp; &nbsp; &nbsp; 在第二个例子中, 我们需要处理不确定数量的promise. 处理这种情况超级简单, 我们只需创建一个数组, 然后将所有的promise放进数组中, 然后s会用Promise.all(), 我们就可以并行等待所有的promise处理.
```js
    async function orderItems () {
        const items = await getCartItems() // async call
        const len = items.length

        let promises = []

        for (var i = 0; i < len; i++) {
            const orderPromise = sendRequest(items[i]) // async call
            promises.push(orderPromise) // sync call
        }

        await Promise.all(promises) // async call
    }
```
