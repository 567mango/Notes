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

> ReactDOM是React提供的对象，它提供的render函数类似于vue的render   可以降react的dom挂在到react的容器中
>
> 传入两个参数
>
> 1. 显示的东西
> 2. 容器

#### 插件安装

>ESlint  :代码风格检查
>
>SE7 React/Redux/GraphQL/React-Native snippets :快速代码编写
>
>（就是规范的快捷代码，之后会有很难多方便的快捷键）

#### 使用脚手架创建react项目

>官方：**create-react-app** 
>
>第三方：**next.js**  、**umijs**    (后续使用umijs脚手架进行学习)

![image-20230713231502517](assets/image-20230713231502517.png)





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
>1. 本质是JS对象，由于没有被收录，需要用babel编译，最终会被转换为**React.createElement**相当于一个语法糖
>   ```js
>   const h1 = React.createElement('h1',{
>       title:'我是React元素',
>   },'hello','world',...)
>   //相当于
>   <h1 title="我是React元素">hello world ...</h1>
>   ```
>
>   
>
>2. 每个JSX表达式，有且仅有一个根节点   ##
>
>  - 当我们遇见必须两个元素并列的情况下我们可以使用 **<React.Ftagment></React.Ftagment>**（Ftagment：片段）来代替根元素 不会对应真实的dom  当然可以使用它的语法糖 **<></>**
>
>    // <> <h1>hello </h1>  <h2>world</h2></>
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
> 1. 会自动编码：我们输入的文本会自动编码 比如加上html的标签后不会被解析成dom元素
>
> 2. **dangerouslySetInnerHTML** 要求必须写成对象后设置内容
>
>    ```html
>    <div dangerouslySetInnerHTML = {{
>         __html:conntent
>    }}></div>
>    ```

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

### 组件

>和vue组件一样的概念，方便复用，模块化
>
>React组件**首字母**必须**大写**

#### 组件类型

**有两种使用方式**

- 函数式

>直接用function定义函数 返回JSX

```jsx
function MyFuncComp(){
    return <h1>组件内容</h1>
}
//也就是因为函数调用返回的是React的dom元素  React.createElement()
//第一种使用方式  不推荐！
//这种调用方式不会生成react组件结构
ReactDom.render({MyFuncComp()},document.getElementById('root'))
//第二种使用方式
//这种方式会有react的树形组件结构
//再次提醒组件首字母必须大写 不然会被当作为普通的react元素
ReactDom.render(<MyFuncComp/>,document.getElementById('root'))
```

- 类组件

>使用**class**创建一个类并且用**extends**来继承 ****
>
>必须提供**render()**方法，该方法必须返回React元素

```jsx
calss MyClassComp extends React.Compoent{
    render(){
        return <h1>类组件</h1>
    }
}
```

#### 组件传值

- 函数组件

  >传递的就是参数
  >
  >为了统一一般取名为**props**
  >
  >传进来的内容会放在props这个对象中

  ```jsx
  
  //子
  function MyFuncComp(props){
      return <h1>组件内容，传递来的数字 ： {props.number}</h1>
  }
  
  //父
  ReactDom.render(<>
                  <MyFuncComp number='2' />  //传递的是字符串
                  <MyFuncComp number={5} />//传递的是数字
                   <MyFuncComp ennable={true} />//传递的是布尔类型的数据
                  <MyFuncComp ennable={{name:'wwww'}} />//传递的是对象
                  </>
                  ,document.getElementById('root'))
  
  ```

- 类组件、

  >传递来的蚕食用构造函数 **constructor**来接受并且调用**super(props)**    
  >
  >**super(props)**  相当于调用了  this.props = props  将传递来的对象保存在这个对象里面	
  
  ```jsx
  //子
  calss MyClassComp extends React.Compoent{
      constructor(props){
          super(props) //this.props = props  将传递来的对象保存在这个对象里面
      }
      //constructor里面的其实会自动帮我们完成，可以不写
      render(){
          return <h1>类组件  {this.props.number}</h1>
          //用法多了个this
      }
  }
  
  //父
  ReactDom.render(<>
                  <MyClassComp number='2' />  //传递的是字符串
                  <MyClassComp number={5} />//传递的是数字
                   <MyClassComp ennable={true} />//传递的是布尔类型的数据
                  <MyClassComp ennable={{name:'wwww'}} />//传递的是对象
                  </>
                  ,document.getElementById('root'))
  
  ```

>**特别注意** : 组件不能改变自身的属性
>
>**数据属于谁谁才有权力改动**
>
>!或许我们可以在组件里面更改引用类型数据里面的数据 但是千万不要这么做 要保证数据只能在数据源那里修改

#### 组件状态

>组件可以自行维护的数据  (**state**)
>
>**组件状态仅在类组件中有效**

如果我们想做一个倒计时，要在父组件中一直调用React.render() 是不是有点别扭

这种情况我们就可以用到组件状态

```jsx
calss MyClassComp extends React.Compoent{
    
    
    //也可以写在构造函数外边  Js Next语法  目前处于试用阶段  但是可以随便用 因为我们有babel
    state = {
        left:this.props.number
    }
    constructor(props){
        super(props) //this.props = props  将传递来的对象保存在这个对象里面
        
        //初始状态
        
      	this.state={
            //初始化我们自己的数据
            //使用了传递进来的数据初始化 （当然也可以写死)
            left:this.props.number
        }
        
        //倒计时
        this.timer = setInterval(()=>{
           //this.state.left --; 
            //这样是不可以的   react没有vue的’魔法‘  无法监控到状态发生变化 
            //重新渲染?怎么初始化
            
            //状态的变化我们需要使用 （父组件提供)
            this.setState({
                left:this.state.left-1
            })  //表示重新设置状态  状态改变
            //一旦调用 会自动触发重新渲染
            if(this.state.left == 0){
                clearInterval(this.timer)
            }
           
        },1000)
    }
   
    render(){
        return <h1>倒计时剩余时间  {this.state.left}</h1>
        //用法多了个this
    }
}
```

>**this.setState({})**
>
>1. 底层是用 Object.assign() 来对state进行混入 覆盖掉原来的状态(相同覆盖，不同无影响)
>2. 一旦调用 会自动触发重新渲染

**注意**   当组件重新渲染后 它的子组件也都会跟着一起重新渲染