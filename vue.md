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

### vue3实现路由缓存

![image-20231207153202782](assets/image-20231207153202782.png)

```
<router-view  v-slot="{ Component }">
      <!-- include它会根据组件的 name 选项进行匹配，所以组件如果想要条件性地被 KeepAlive 缓存，就必须显式声明一个 name 选项。 -->
        <keep-alive :include="'index'">
           <component :is="getComponent(Component)"  />
        </keep-alive>
</router-view>
```

其中include传入需要缓存的组件名字  vue3中使用setup会自动讲文件名作为组件名

### <component>

一个用于渲染动态组件或元素的“元组件”。

- ```
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **详细信息**

  要渲染的实际组件由 `is` prop 决定。

  - 当 `is` 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。
  - 或者，`is` 也可以直接绑定到组件的定义。

###  watch监听多个对象

![image-20240522152522166](./assets/image-20240522152522166.png)

### 生命周期v2  vs  v3

![image-20240522154226213](./assets/image-20240522154226213.png)

## Vue3

### vue3传递多个修饰符  使用方法

![image-20240522101633812](./assets/image-20240522101633812.png)

![image-20240522101612338](./assets/image-20240522101612338.png)

### 异步组件

#### 定义异步组件

![image-20240522104612408](./assets/image-20240522104612408.png)

#### 延时

![image-20240522104829749](./assets/image-20240522104829749.png)

#### 设置占位组件LoadingComponent

加载中的时候先展示LoadingComponent

![image-20240522105041098](./assets/image-20240522105041098.png)

#### 出错组件ErrorComponent

![image-20240522105412910](./assets/image-20240522105412910.png)

### Teleport 将组件的dom移动到指定位置

![image-20240522111351634](./assets/image-20240522111351634.png)
