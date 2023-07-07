## vue

### vue响应式原理

>vue2中就是用了**Object.defineProperty()**中的 **get() set()** 对数据进行处理
>
>其实就是当用户给data里面的属性赋值的时候调用函数去更新页面

```js
const user = {
    name:'567',
    age:23
}
//更新页面上的name
function RefreshName(){
    ~~~~~
}
//更新页面上的age
function RefreshAge(){
    ~~~~~
}

 //然后我们将这个对象
```
