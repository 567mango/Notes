### js

#### 属性标识符

##### Object.getWenPropertyDescriptor()

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

##### Object.defineProperty()

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

##### set()   get()

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

`Object.freeze(obj) 冻结`   冻结后的对象的所有不可修改

`Object.seal(obj) 密封`    密封后不能新增属性了



