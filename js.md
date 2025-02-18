## js

### 属性标识符

#### Object.getWenPropertyDescriptor()

` 在js里面，有属性标识符描述这个对象的属性的属性 可以用 Object.getWenPropertyDescriptor(obj，key)  来查看` 

```js
const obj = {
    a:'1',
    b.'2'
}

const desc = Object.getWenPropertyDescriptor(obj，'a') //查看a的属性描述符
// { value: '1', writable: true, enumerable: true, configurable: true }
//	value:属性值
//    writable：是否可以重写？（重新赋值）
//    enumerable：是否可以遍历 
//	  configurable：属性描述符本身能不能再修改

```

#### Object.defineProperty()

`js中提供了Object.defineProperty()来设置属性描述符`

```js
const obj = {
    a:'1',
    b.'2'
}

Object.defineProperty(obj,'a',{
    value:10,   //设置a的值为10
    writable: false,  //设置a不可重写
    enumerable:false, //设置不可遍历
    configurable:false //属性描述符本身不能再修改
})
//这样设置之后   1.不能修改属性的值
//			   2.不可遍历并且
//			   3.不能再使用Object.defineProperty()重新定义属性描述符

```

`我们修改属性描述符之后 设置了属性的值不可被修改 那我们的代码被别人用时候，怎么提示别人这个值不可修改？`

#### set()   get()

```js
Object.defineProperty(obj,'data',{
    get:()=> '123',   //读取器
    set:()=> '456',	  //设置器
})
//get 和  set 是当别人访问和设置值的时候返回的信息
//所以我们可以这样提示用户

Object.defineProperty(obj,'data',{
    get:()=> '123',
    set:()=> {
        throw new Error('data 属性是只读的  不能重新赋值');
    }
}) 



```

#### Object.freeze(obj)   Object.seal(obj)

`Object.freeze(obj) 冻结`   冻结后的对象的所有不可修改 

`Object.seal(obj) 密封`    密封后不能新增属性了

```js
//如果我们使用class 来构造类时  我们不想让我们这个对象得数据被修改  那么我们就可以
var aGoods = {
  pic: '.',
  title: '..',
  desc: `...`,
  sellNumber: 1,
  favorRate: 2,
  price: 3,
};
class UIGoods {
    constructor(g) {
    g = { ...g };
    Object.freeze(g);
    //在这里使用Object.freeze(obj) 冻结我们里面的g  让用户不可以修改
        
    Object.defineProperty(this, 'data', {
      get: function () {
        return g;
      },
      set: function () {
        throw new Error('data 属性是只读的，不能重新赋值');
      },
      configurable: false,
    });
        //最后用密封函数把自己密封后不能再添加新的数据了
   	    Object.seal(this); 
   }
}

```

### 事件循环

#### 事件循环

**浏览器是一个多进程多线程的应用程序**



渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：

- 解析 HTML
- 解析 CSS
- 计算样式
- 布局
- 处理图层
- 每秒把页面画 60 次
- 执行全局 JS 代码
- 执行事件处理函数
- 执行计时器的回调函数
- ......

其中的渲染进程启动后，会开启一个**渲染主线程**，主线程负责执行 HTML、CSS、JS 代码。

1. 在最开始的时候，渲染主线程会进入一个无限循环
2. 每一次循环会检查消息队列中是否有任务存在。如果有，就取出第一个任务执行，执行完一个后进入下一次循环；如果没有，则进入休眠状态。
3. 其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务

这样一来，就可以让每个任务有条不紊的、持续的进行下去了。

**整个过程，被称之为事件循环（消息循环）**

#### 异步

代码在执行过程中，会遇到一些无法立即处理的任务，比如：

- 计时完成后需要执行的任务 —— `setTimeout`、`setInterval`
- 网络通信完成后需要执行的任务 -- `XHR`、`Fetch`
- 用户操作后需要执行的任务 -- `addEventListener`

如果让渲染主线程等待这些任务的时机达到，就会导致主线程长期处于「阻塞」的状态，从而导致浏览器「卡死」

**渲染主线程承担着极其重要的工作，无论如何都不能阻塞！**

因此，浏览器选择**异步**来解决这个问题

所以，当主线程碰见这种无法立即处理的任务会

1. 将消息队列的这些任务放入计时线程中
2. 获取下一个任务执行
3. 当计时任务结束后，将回调函数放入消息队列的末尾

>面试题：如何理解 JS 的异步？
>
>
>
>参考答案：
>
>JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。
>
>而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。
>
>如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。
>
>所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。
>
>在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

#### 任务

任务没有优先级，在消息队列中先进先出

但**消息队列是有优先级的**

根据 W3C 的最新解释:

- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。
  在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。
- 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行

**浏览器必须有一个微队列**

> 随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法

在目前 chrome 的实现中，至少包含了下面的队列：

- 延时队列：用于存放计时器到达后的回调任务，优先级「中」
- 交互队列：用于存放用户操作后产生的事件处理任务，优先级「高」
- 微队列：用户存放需要最快执行的任务，优先级「最高」

> 添加任务到微队列的主要方式主要是使用 Promise、MutationObserver
>
> 
>
> 例如：
>
> ```js
> // 立即把一个函数添加到微队列
> Promise.resolve().then(函数)
> ```

>面试题：阐述一下 JS 的事件循环
>
>
>
>参考答案：
>
>事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。
>
>在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。
>
>过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。
>
>根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

>面试题：JS 中的计时器能做到精确计时吗？为什么？
>
>
>
>参考答案：
>
>不行，因为：
>
>1. 计算机硬件没有原子钟，无法做到精确计时
>2. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
>3. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
>4. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

## Object

### Object.entries()

>Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组。
>
>其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举**原型链**中的属性）。
>
>`Object.entries()`返回一个数组，其元素是与直接在`object`上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动**循环对象**的属性值所给出的顺序相同。

```js
const obj = { name: 'xiaoming', age: '18',sex: 'man'}; 
const res = Object.entries(obj) 
console.log(res); 
/*
[['name','xiaoming'],['age','18'],['sex','man']]
*/
```

#### Object.assign()

>object.assign()主要用于对象合并，将源对象中的属性复制到目标对象中，他将返回目标对象。
>
>用法：
>
>Object.assign(target, ...sources)
>
>参数：target--->目标对象
>
>​      source--->源对象
>
>返回值：target，目标对象

```js

var target = {name:'带你飞'}
var source = {age:18}
var result = Object.assign(target,source)
console.log(result,target===result); // {name: '带你飞', age: 18} true
```

>如果只是想将两个或多个对象的属性合并到一起，不改变原有对象的属性，可以用一个空的对象作为target对象。像下面这样：

```js
var source = {name:'带你飞'}
var source2 = {age:18}
var result = Object.assign({},source,source2)
console.log(result,source===result); // {name: '带你飞', age: 18} false
```

```js
var source1 = "abc";
var source2 = true;
var source3 = 10;

var result = Object.assign({}, source1, null, source2, undefined, source3); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(result); // {0: 'a', 1: 'b', 2: 'c'}
```

>Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。

```js
var object1 = {
  a: 1,
  b: 2,
  c: 3
};
 
var object2 = Object.assign({c: 4, d: 5}, object1);
 
console.log(object2.c, object2.d); // 3 5
console.log(object1)  // { a: 1, b: 2, c: 3 }
console.log(object2)  // { c: 3, d: 5, a: 1, b: 2 }
```

>对象的深拷贝
>
>深拷贝：深拷贝不会拷贝引用类型的引用，而是将引用类型的值全部拷贝一份，形成一个新的引用类型，这样就不会发生引用错乱的问题，使得我们可以多次使用同样的数据，而不用担心数据之间会起冲突。

```js
let object1 = {
		a: 1,
		b: 2
	};
let object2 = Object.assign({}, object1, {
    b: 20
});

console.log(object1); // { a: 1, b: 2 }
console.log(object2); // { a: 1, b: 20 }
```

>对象的浅拷贝
>
>浅拷贝：浅拷贝只是复制了对象的引用地址，两个对象指向同一个内存地址，所以修改其中任意的值，另一个值都会随之变化，这就是浅拷贝

```js
var object1 = {
		a: 1,
		b: {
			c: 2,
			d: 3
		}
	};
var object2 = Object.assign({}, object1);
	object2.a = 10;
	object2.b.c = 20;
	console.log(object1); // { a: 1, b: { c: 20, d: 3 } }
	console.log(object2) //{ a: 10, b: { c: 20, d: 3} }
```

#### encodeURIComponent() 

>encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
>
>该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
>
>其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

```js
var uri="https://www.runoob.com/my test.php?name=ståle&car=saab";
console.log(encodeURIComponent(uri))
//
//https%3A%2F%2Fwww.runoob.com%2Fmy%20test.php%3Fname%3Dst%C3%A5le%26car%3Dsaab
```



## promise

### promise

>promise是ES6新发布的一个构造函数，是ES6最重要的新特性之一
>
>promise接收一个函数作为参数，函数接收两个参数（resolve, reject）
>
>promise实例有三种状态 
>
>- pending: 初始状态，既不是成功，也不是失败状态。
>- fulfilled: 意味着操作成功完成。
>- rejected: 意味着操作失败。
>
>调用resolve()会让promise的状态从pending到fulfilled
>
>调用reject()会让promise的状态从pending到rejected
>
>then方法里面的任务是微任务
>
>resolve()和reject()里面的任务是异步

```js
const p = new Promise(function(resolve, reject){
    //做一些异步操作
   	if(f==1){
        resolve(); //promise的状态从pending到fulfilled
    }else{
        reject()  //promise的状态从pending到rejected
    }
});
```

>promise的实例对象可以调用then()和catch()分别对成功和错误进行处理
>
>其中要注意
>
>1. then方法必定会返回一个新的Promise
>2. 新任务的状态败决于后续处理
>   1. 若没有相关的后续处理，新任务的状态和前任务状态一致，数据为前任务的数据。
>   2. 若有后续处理但还未执行、新任务挂起。
>   3. 若后续处理执行了，则根据后续处理的情况确定新任务的状态
>      - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值后续
>      - 处理执行有错，新任务的状态为失败,数据为异常对象
>      - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

#### promise的静态方法

##### Promise.resolve()  (reject()同理)

```js
const p = new Promise.resolve(1);

//相当于

const p1 = new Promise((resolve)=>{
		resolve(1)
})
```

##### Promise.all()

>返回一个任务
>
>Promise.all()里面的promise同时运行，并且只有当所有的promise成功它才成功，不然就失败

```js
Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)  
])
```

##### Promise.any()

>只要有一个成功，就成功

##### Promise.race()

>竞速，谁先执行就返回谁的任务

##### Promise.allSetted()

>得到一个每一个promise最后的情况汇总结果

### async和await

>有了Promisc，异步任务就有了一种统一的处理方式
>有了境一的处理方式，ES官方就可以对其进一步优化
>ES7推出了两个关键字ssync和swoit ，用于更加优雅的表达Promise
>
>
>
>async和await
>
>解决promise的链式调用和回调地狱
>
>1. 被async修饰的函数一定返回Promise
>2. await表示等待某个promise完成，他必须在async中使用 可以在同步中获取到promise的返回值

## Object

### Object.setPrototypeOf(obj1,obj2)

```
相当于obj1.__propt__ = obj2
```

