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



​	

