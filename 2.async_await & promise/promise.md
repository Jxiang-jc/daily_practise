## Abstract
<hr/>

&nbsp;&nbsp;&nbsp;&nbsp;本文主要讲的是如何实现Promise的链式调用。也就是`promise()`.`then()`.`then()`.`catch()`的形式， 然后讨论如何在某一个`then`()里面中止`promise`, 主要思想就是使用`reject`来中止`promise`的`then`继续执行。

&nbsp;&nbsp;&nbsp;&nbsp;在程序中，只要返回了一个`promise`对象，如果`promise`对象不是`Rejected`或`Fulfilled`状态，`then`方法就会继续调用。利用这个特性， 可以处理多个异步逻辑。但有时候某个`then`方法的执行结果可能会决定是否需要执行下一个`then`，这个时候就需要中止`promise`，主要思想就是使用reject来中止`promise`的`then`继续执行

&nbsp;&nbsp;&nbsp;&nbsp;“中止” 这个词，应该说用`break`更加精确， 跳出本次`promise`，不继续执行后面的then方法。但`promise`依旧会继续执行

## Promise
<hr/>

`Promise`其实就是一个处理异步的方法。一般可以通过new方法来调用`Promise`的构造器来实例化一个`promise`对象

```js
var promise = new Promise((resolve, reject) => {
  // 异步处理
  // 处理结束后，调用 resolve 或 reject
  // 成功时就调用 resolve
  // 失败时就调用 reject
})
```

> 用 `new Promise` 实例化的promise对象有以下三个状态

- `"has-resolution" - Fulfilled`. `resolve`(成功)时，此时会调用`onFulfilled`
- `"has-rejection" - Rejected`. `reject`(失败)时， 此时会调用`onRejected` 
- `"unresolved" - Pending`. 既不是`resolve`也不是`reject`的状态， 也就是`promise`对象刚被创建后的初始状态

关于上面这三种状态的读法，其中左侧为在 ES6 Promises 规范中定义的术语， 而右侧则是在 Promises/A+ 中描述状态的术语。基本上状态在代码中是不会涉及到的，所以名称也无需太在意。

<img src="./img/promise1.png" />

## Promise Chain
<hr/>

> &nbsp;&nbsp; 先来假设一个业务需求：在系统中使用教务系统账号进行登录。首先用户在登录页面输入用户名（教务系统账号）和密码（教务系统密码）；然后判断数据库中是否存在该用户；如果不存在则使用用户名和密码模拟登录教务系统，如果模拟登录成功，则存储用户名和密码，并返回登录成功。

> 如果用传统的回调函数 `callback` 来处理上面的逻辑，嵌套的层级就会比较深，上面的业务因为有三个异步操作所以有三层回调，代码大概会是下面的样子：

```js
// 根据 name 查询用户信息
findUserName (name, function (err, userinfo) {
  if (err) {
    return res.json({
      code: 1000,
      message: '查询用户信息，数据库操作数出现异常'
    })
  }

  if (userinfo.length > 0) {
    // 用户存在
    if (userinfo[0].pwd === psw) {
      // 密码正确
      return res.json({
        code: 0,
        message: '登录成功'
      })
    }
  }

  // 数据库中不存在该用户， 模拟登录教务系统
  loginEducationSystem (name, pwd, function (err, result) {
    if (err) {
      return res.json({
        code: 1001,
        message: '模拟登录教务系统出现异常'
      })
    }

    // 约定正确情况下， code为 0
    if (result.code !== 0) {
      return res.json({
        code: 1002,
        message: '模拟登录教务系统失败，可能是用户名或密码错误',
      })
    }

    // 模拟登录成功， 将用户名密码存入数据库
    saveUserToDB (name, pwd,
     function (err, result) {
       if (err) {
         return res.json({
           code: 1003,
           message: '将用户名密码存入数据库出现异常'
         })
       }

       if (result.code !== 0) {
         return res.json({
           code: 1004,
           message: '将用户名密码存入数据库出现异常'
         })
       }

       return res.json({
         code: 0,
         message: '登录成功！'
       })
     })
  })
})
// 上面的代码可能存在的不优雅之处：
// 1. 随着业务逻辑变服务， 回调层级越来越深
// 2. 代码耦合度较高， 不易修改
// 每一步操作都需要手动进行异常处理 比较麻烦
```

## How to Use Promise Chain
<hr/>

```js
function start () {
  return new Promise((resolve, reject) => {
    resolve('start')
  })
}

start()
  .then(date => {
    // promsise start
    console.log('result of start：' data)
    return Promise.resolve(1) // p1
  })
  .then(data => {
    // promise p1
    console.log('result of p1:' data)
    return Promise.resolve(2) // p2
  })
  .then(data => {
    // promise p2
    console.log('result of p2:' data)
    return Promise.resolve(3)
  })
  .catch(ex => {
    // promise p3
    console.log('ex:', ex)
    return Promise.resolve(4) // p4
  })
  .then(data => {
    // promise p4
    console.log('result of p4:', data)
  })
```

```js
// 上面代码最终会输出

result of start: start

result of p1: 1

ex: 2

result of p4: 4
```

> 从上面结果可以得出： `promise start --> promise p1 --> promise p3 --> promsise p4`

- `promise` 的 `then` 方法里可以继续返回一个新的 `promise` 对象
- 下一个 `then` 方法的参数是上一个 `promise` 对象的 `resolve` 参数
- `catch` 方法的参数是其之前某个 `promise` 对象的 `reject` 参数
- 一旦某个 `then` 方法里面的 `promise` 状态改变了为 `rejected`, 则 `promise` 方法会跳过后面的 `then` 直接执行 `catch`
- `catch` 方法里面依旧可以返回一个新的 `promise`对象


## How to Break Promise Chain
<hr/>

- 重构上面的回调函数的异步逻辑
```js
// 根据 name 查询用户信息
const findUserByName = (name, pwd) => {
  return new Promise((resolve, reject) => {
    // 数据库查询操作
    if (dbError) {
      // 数据库查询出错， 将promise设置为 rejected
      reject({
        code: 1000,
        message: '查询用户信息， 数据库操作出现异常'
      })
    }

    // 将查询结果赋给 userinfo 变量
    if (userinfo.length === 0) {
      // 数据库中不存在用户
      resolve()
    }

    // 数据库存在该用户， 判断密码是否正确
    if (psd === userinfo[0].pwd) {
      // 密码正确，中止promise执行
      reject({
        notRealPromiseException: true,
        data: {
          code: 0,
          message: '密码正确，登录成功'
        }
      })

      // 密码不正确，登陆失败，将promise设置为Rejected状态
      reject({
        code: 1001,
        message: '密码不正确，登录失败'
      })
    }
  })
}

// 模拟登录教务系统
const loginEducationSystem = (name, pwd) => {
  retrun new Promise((resove, reject) => {
    // 登录逻辑
    // 登录成功
    resolve()

    // 登录失败
    reject({
      code: 1002,
      message: '模拟登录教务系统失败'
    })
  })
}

// 将用户名密码存入数据库
const saveUserToDB = (name, pwd) => {
  return new Promise((resolve, reject) => {
    // 数据库存储操作
    if (dbError) {
      // 数据库存储出错， 将promise设置为 rejected
      reject({
        code: 1004,
        message: '数据库存储出错， 将出现异常'
      })
    }

    // 数据库存储操作成功
    resolve()
  })
}

findUserByName(name)
  .then(() => {
    return loginEducationSystem(name, pwd)
  })
  .then(() => {
    return saveUserToDB(name, pwd)
  })
  .catch(e => {
    // 判断异常出现原因
    if (e.notRealPromiseException) {
      // 正常中止 promise 而故意设置的异常
      return res.json(e.data)
    }
    // 出现错误或异常
    return res.json(e)
  })
```
> &nbsp;&nbsp; 在上面的代码中，实例化了三个 promise 对象，分别实现业务需求中的三个功能。然后通过 promise 方法链来调用。相比用回调函数而言，代码结构更加清晰，也更易读易懂耦合度更低更易扩展了。

## Promise.all
<hr/>

> 仔细观察可以发现，在上面的 promise 代码中，loginEducationSystem 和 saveUserToDB 两个方法执行有先后顺序要求，但没有数据传递。

> 其实 promise 方法链更好用的一点是，当下一个操作依赖于上一个操作的结果的时候，可以很方便地通过 then 方法的参数来传递数据。前面页提到过，下一个 then 方法的参数就是上一个 then 方法里面 resolve 的参数，所以当然就可以把上一个 then 方法的执行结果作为参数传递给下一个 then 方法了

> 还有些时候，可能 then 方法的执行顺序也没有太多要求，只需要 promise 方法链中的两个或多个 promise 全部都执行正确。这时，如果依旧一个一个去写 then 可能就比较麻烦，比如：

```js
function p1() {
  return new Promise((resolve) => {
    console.log(1);
    resolve();
  });
}

function p2() {
  return new Promise((resolve) => {
    console.log(2);
    resolve();
  });
}

function p3() {
  return new Promise((resolve) => {
    console.log(3);
    resolve();
  });
}
// 现在只需要 p1 p2 p3 这三个 promise 都执行，并且 promise 最终状态都是 Fulfilled，那么如果还是使用方法链，这是这样调用：

p1()
 .then(() => {
   return p2()
 })
 .then(() => {
   return p3()
 })
 .then(() => {
   console.log('all done')
 })
 .catch(e => {
   console.log('e', e)
 })

 // 输出结果
 // 1
 // 2
 // 3
 // all done
```

上面的代码就不那么精炼，这个时候就可以使用`promise.all`这个方法

```js
p1()
.then(() => {
  return Promise.all([p2(), p3()])
})
.then(() => {
  console.log('all done')
})
.catch(e => {
  console.log('e', e)
})

// 同样可以输出上面的结果
```