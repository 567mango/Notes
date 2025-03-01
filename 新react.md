# react

`react主要用于构建ui的JavaScript库`

## react重大更新

react16 ：出现了fiber，整个更新可中断、可分片、具有优先级

react 16.8：退出了Hooks，标志着从类组件正式转为函数组件

react17：过渡版本

react18: 

>transiton
>
>suspense
>
>新的Hooks
>
>offscreen
>
>...

## react特点

1. 声明式

2. 组件化

3. 一次学习，跨平台编写
4. 单向数据流
5. 虚拟dom
6. diff算法

package和package-lock的区别

package-lock记录每一个依赖的版本

# react基础语法

在react中 使用jsx来描述页面

1. jsx只允许一个根节点（支持空标签<>)
2. jsx中使用js表达式。写在{   }里面
3. 属性值指定为字符串字面量，或在属性值中插入一个js表达式   （对比vue不用加：  加的是{}
4. style对应样式对象，class要写做className
5. 注释需要写在花括号中 { /* */ }
6. jsx允许在模板中插入数组，数组会自动展开所有成员

## createElement 方法

`jsx是一种js的语法扩展，babel会把jsx转译为一个名为React.createElement函数调用`

```
React.createElement(type,[props],[...children])
```

参数说明：

1. type:创建的React元素类型 （可选值有：标签名字符串、React组件）
2. props ：React元素的属性
3. children：React元素的子元素

例如，下面两种代码作用完全是相同的

```
<h1 className="y1">'hello,world!<h1/>

React.createElement(
'h1',
{className:'y1'},
'hello,world!'
)
```

`可以看出 jsx本质就是React.createElement的语法糖`

# 组件与事件绑定

### react中的组件

#### 通过类名创建组件

```
class 类名 extends React.component(
	render(){
		return {
			//jsx
		}
	}
)
```

#### 通过函数创建组件

```
function 组件名（）{
	return {
		//jsx
	}
}
```

 `早起函数组件称之为无状态组件，一般用于纯ui展示，里面不会有复杂的逻辑`

 `react16.8之后推出hooks后，都是用的函数组件`

### react类组件绑定事件

```
<组件 onClick={clickHandle} > </组件>
```

`事件使用驼峰命名法`

react中无法使用return  false来阻止默认行为

`只有使用e.preventDefault()来阻止默认行为`

`react组件中的e是一个合成事件对象，不是原生的，原生的通过e.nativeEvent拿到原生事件对象`

![image-20250218173356674](./assets/image-20250218173356674.png)

![image-20250220152105298](./assets/image-20250220152105298.png)

`this的修正只针对类组件`

#### 向事件处理程序传参

1. 箭头函数
2. function.prototype.bind

![image-20250220170238102](./assets/image-20250220170238102.png)



### 组件状态

组件状态写在 this.state中

![image-20250220171534133](./assets/image-20250220171534133.png)

`this.setState可能是异步的，可能会将react的异步调用合并成一个`

如果改变状态的代码（**this.setState**）处于某个html元素事件中，则其是异步的，否则是同步

![image-20250220172902316](./assets/image-20250220172902316.png)

- this.setState第二个参数是回调函数，它会在state更新后调用

- 如果新的状态需要根据上一次的状态来改变，使用函数的方式来调用
- ![image-20250220173807724](./assets/image-20250220173807724.png)



#### props

![image-20250220174104803](./assets/image-20250220174104803.png)

react使用  props.children 可以实现类似于vue的插槽功能

`react使用defaultprops来给props 默认值`

函数组件

![image-20250221153926151](./assets/image-20250221153926151.png)

类组件还可以写在static里面

![image-20250221153827913](./assets/image-20250221153827913.png)

#### props类型检查

![image-20250221153912424](./assets/image-20250221153912424.png)

![image-20250221154102771](./assets/image-20250221154102771.png)

### 状态提升

`其实就是类似vue中的子传父，子组件通过emit触发父组件的方法来修改父组件的状态`

父组件通过props传递给子组件一个函数，子组件通过props.xxx()来调用父组件传来的方法  进而改变父组件的状态

在官网称之为“状态提升”

## 表单

### 受控组件

![image-20250221164933617](./assets/image-20250221164933617.png)

### 非受控组件

![image-20250221165222198](./assets/image-20250221165222198.png)

![image-20250221174019717](./assets/image-20250221174019717.png)

`如果想给非受控初始值，需要使用defaultValue赋值`

## 生命周期

![image-20250221183150391](./assets/image-20250221183150391.png)

常用的生命周期钩子函数如下

![image-20250224110059773](./assets/image-20250224110059773.png)

![image-20250224111838198](./assets/image-20250224111838198.png)

![image-20250224112643423](./assets/image-20250224112643423.png)

![image-20250224112657321](./assets/image-20250224112657321.png)

# react函数组件  

## Hooks

`hook是react16.8的新增特性，可以让你在不编写class的情况下使用state以及其他React特性`

hook解决了如下的一些问题

1. 告别令人疑惑的生命周期
   1. 不同生命周期执行相同的代码（相同的代码有多份
2. 告别类组件中烦人的this
   1. 类组件会存在this的指向问题
3. 告别繁重的类组件，回归前端程序员更熟悉的函数

![image-20250224172558046](./assets/image-20250224172558046.png)

### 使用useState  类似vue3

返回一个设置的state  一个setState的函数，用数组解构出来

```react
import { useState } from 'react';


function App(props) {
  let [count, setCount] = useState(1);

  function handleClick() {
    setCount(++count);
  }

  return (
    <div className="App" >
      <h1>{count}</h1>
      <button onClick={handleClick}>click me</button>
    </div>
  )
}

export default App;
```

### useEffect

`useEffect会在组件渲染完成后执行`

- 副作用的概念

  ![image-20250224174907174](./assets/image-20250224174907174.png)

![image-20250224175156059](./assets/image-20250224175156059.png)

- useEffect可以返回清理函数




![image-20250224180454526](./assets/image-20250224180454526.png)

![image-20250224180924076](./assets/image-20250224180924076.png)

- 副作用的依赖


![image-20250224181032679](./assets/image-20250224181032679.png)

- 依赖项

  ​	第二个参数里面写依赖项，只有当依赖项更新时才会执行该useEffect函数

  ​	没有依赖项的话只执行一次

- 自定义hook

  ![image-20250225140344594](./assets/image-20250225140344594.png)

使用流程

1. 书写你要执行的副作用

   

2. 配置依赖项

# react-router v6

![image-20250225142807665](./assets/image-20250225142807665.png)

![image-20250225171812730](./assets/image-20250225171812730.png)

类似于vue-router中的router入口

根组件需要用BrowserRouter（history模式，也有其他模式的router）包裹起来

![image-20250225171926416](./assets/image-20250225171926416.png)

Hash模式

![image-20250226150536190](./assets/image-20250226150536190.png)

### 跳转带参数

1.使用useNavigate  hooks进行跳转 

```react
const navigate = useNavigate()
```



![image-20250225180247471](./assets/image-20250225180247471.png)

​	

2.获取页面跳转所带的参数

```react
const location = useLocation()
```

 ![image-20250225181247288](./assets/image-20250225181247288.png)

3.动态参数获取

![image-20250225182214628](./assets/image-20250225182214628.png)

![image-20250225182028883](./assets/image-20250225182028883.png)

```react
const params = useParams()
```

![image-20250225182143410](./assets/image-20250225182143410.png)

### 总结

#### 组件

![image-20250226151742762](./assets/image-20250226151742762.png)

#### hooks

![image-20250226152215541](./assets/image-20250226152215541.png)

##### useRoutes

定义routes

![image-20250226154143785](./assets/image-20250226154143785.png)

app.js导入使用

![image-20250226154205335](./assets/image-20250226154205335.png)

##### 嵌套路由

在children中定义

![image-20250226154415563](./assets/image-20250226154415563.png)

使用Outlet

![image-20250226154513792](./assets/image-20250226154513792.png)

默认选中：在children中写，path为空字符，element写  <Navigate replace to="xxx"/>

![image-20250226154642990](./assets/image-20250226154642990.png)

# Redux Toolkit 和 React Redux

`使用`

![image-20250301141748101](./assets/image-20250301141748101.png)

![image-20250301141825332](./assets/image-20250301141825332.png)

```react
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。
      // 它实际上并没有 mutate state 因为它使用了 Immer 库，
      // 它检测到草稿 state 的变化并产生一个全新的基于这些更改的不可变 state
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

![image-20250301141849058](./assets/image-20250301141849058.png)

```react

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
```

![image-20250301141925136](./assets/image-20250301141925136.png)

# render

![image-20250301143242632](./assets/image-20250301143242632.png)
