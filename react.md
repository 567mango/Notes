## react

### 认识react

### 环境配置

#### emmet

配置emmet   在设置里面找到配置 添加上 javascript : javascriptreact

![image-20230710140923194](assets/image-20230710140923194.png)

配置过后我们就可以在js里面书写 元素结构了   

这样当我们打上 h1 + tab键时就会自动你打出 <h1></h1>

>注意我们这样写的不是dom元素，本质上还是一个对象

```js
ReactDOM.render(<h1>Hello World</h1>,document.getElementById('root'));
```

#### 插件安装

>ESlint  :代码风格检查
>
>SE7 React/Redux/GraphQL/React-Native snippets :快速代码编写
>
>（就是规范的快捷代码，之后会有很难多方便的快捷键）



#### Chrome插件安装

React Developer Tools

>最好科学上网到谷歌商店下载
>
>相当于vue一样的调试工具

### JSX

#### JSX简介

>什么是JSX
>
>是facebook起草的JS扩展语法
>
>1. 本质是JS对象，由于没有被收录，需要用babel编译，最终会被转换为React.createElement
>
>2. 每个JSX表达式，有且仅有一个根节点   ##
>
>   - 当我们遇见必须两个元素并列的情况下我们可以使用 **<React.Ftagment></React.Ftagment>**（Ftagment：片段）来代替根元素 不会对应真实的dom  当然可以使用它的语法糖 **<></>**
>
>     // <> <h1>hello </h1>  <h2>world</h2></>
>
>3. 每个JSX元素必须结束（XML规范）  ( / )

#### JSX表达式

>使用 **{}**
>
>- **null** **false**  **undefined**  不会显示
>
>- 普通对象，不可以作为子元素 （react元素对象可以）
>
>- 数组会依次遍历 并且把数组里面的每一个元素作为子元素加进来（子元素是react元素的话，需要给子元素加上唯一的key保证唯一，不加也可以，加了更好）
>
>- 属性也可以用表达式 （属性使用小驼峰命名法）
>
>- style要当作对象进行书写（属性部分有些可以接收对象）
>
>- 防止注入攻击
>
>  1. 会自动编码：我们输入的文本会自动编码 比如加上html的标签后不会被解析成dom元素
>
>  2. **dangerouslySetInnerHTML** 要求必须写成对象后设置内容
>
>     <div dangerouslySetInnerHTML = {{
>
>     __html:conntent
>
>     }}></div>

```js
const a=10,b=20;
<div>
    {a } * {b } = {a *b }
</div>
console.log(a*b) //200

//react元素对象
const  span = <span>这是一个span元素</span>

//数组
const arr = [1,2,3,4,5,6,7]
{arr}
// 1234567

const url = xxxx;
const cls = 'image'
//属性用表达式
<img scr = {url}  className={cls} />
//className 就是class

    
//style
<img scr = {url}  className={cls}  style={ {width:'500px'} } />
//style里面的大括号相当于对象。。。


```

在JSX里面写**注释**需要用 **{/* */}**

#### 元素不可变

>虽然JSX是一个对象 但是元素一旦被创建，就不能能被修改了
>
>底层使用**Object.freeze(obj)** 冻结了创建的对象

```js
const div = (<div title = 'fff'>
             {num}
             </div>)
div.props = 2 //报错
```

>那我们要是想改变怎么办
>
>使用**ReactDom.render(obj,dom)**重新渲染

```js
ReactDom.render(div,document.getElementById('root')）
```

**重新渲染  效率不会低 我们只是创建了一个对象 而不是修改真实dom 我们的div元素没有改变**