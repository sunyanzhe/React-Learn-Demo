## API

### React.createContext
```js
    const MyContent = React.createContext(defaultValue);
```

创建一个Context对象.当React渲染一个订阅了这个Context对象的组件, 这个组件会从组件树中离自身最近的那个匹配的`Provider`中读取当前的`context`值.

只有当组件所处的树种没有匹配到`Provider`时, 其`defaultValue`参数才会生效. 这有助于在不适用`Provider`包装组件的情况下对组件进行测试.

注意: 将`undefined`传递给`Provider`的`value`时, 消费组件的`defaultValue`不会生效

### Context.Provider
```jsx
<MyContext.Provider value={/*某个值*/}>
```

每个`Context`对象都会返回一个`Provider React`组件, 他允许消费组件订阅`context`的变化

`Provider`接受一个`value`属性, 传递给消费组件.一个`Provider`可以和多个消费组件有对应关系.多个`Provider`也可以嵌套使用, 里层的会覆盖外层的数据.

当`Provider`的`value`值发生变化时, 它内部的所有消费组件都会重新渲染. `Provider`及其内部`consumer`组件都不受制于`shouldComponentUpdate`函数, 因此当`consumer`组件在其组件组件退出更新的情况下也能更新.

通过新旧值来确定变化, 使用了与`Object.is`同样的算法.

注意: 当传递对象给`value`时, 检测变化的方式会导致一些问题


### Class.contextType

```jsx
Class MyClass extends React.Component {
    componentDidMount() {
        let value = this.context;
        /* 在组件挂在完成后, 使用 MyContext 组件的值执行一些有副作用的操作 */
    }
    componentDidUpdate() {
        let value = this.context;
    }
    componentWillUnmount() {
        let value = this.context;
    }
    render() {
        let value = this.context;
        /* 基于MyContext组件的值进行渲染 */
    }
    MyClass.contextType = MyContext;
}
```

挂在在class上的contextType属性会被重赋值为一个由React.createContext()创建的Context对象. 这能让你使用this.context来消费最近Context上的那个值.你可以在任何生命周期中访问到它, 包括render函数中

注意: 你只通过该API订阅单一context. 如果正在使用实验性的publick class fields预发, 可以使用static这个来初始化contextType

```jsx
class MyClass extends React.Component {
    static contextType = MyContext;
    render() {
        let value = this.context;
    }
}
```

### Context.Consumer
```jsx
<MyContext.Consumer>
    {value => /*基于 context 值进行渲染*/}
</MyContext.Consumer>
```

这里, React组件也可以订阅到context变更. 这能让你在函数式组件中完成订阅context

这需要函数作为子元素这做法。这个函数接收当前context值，返回一个React节点。传递给函数的value值等同于往上组件树理这个context最近的Provider提供的value值。如果没有对应的Provider，value参数等同于传递给createContext()的defaultValue

### Context.displayName

context对象接受一个名为displayName的property，类型为字符串。 React DevTools使用该字符串来确定context要显示的内容

示例，下述组件在DevTools中将显示为MyDisplayName：
```jsx
const MyContext = React.createContext(/*some value*/);
MyContext.displayName = 'MyDisplayName'

<MyContext.Provider>    //'MyDisplayName.Provider' 在DevTools中
<MyContext.Consumer>    //'MyDisplayName.Consumer' 在DevTools中

```

