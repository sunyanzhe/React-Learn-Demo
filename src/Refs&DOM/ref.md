# Refs and the DOM

> Refs提供了一种方式，允许我们访问DOM节点或在render方法中创建的React元素

在典型的React数据流中，props是父组件与子组件交互的文艺方式。
要修改一个子组件，你需要使用新的props重新渲染它。
但是，在某些情况下，你需要在典型数据流之外强制修改子组件，被修改的子组件可能是一个React组件的实例，也可能是一个DOM元素。
对于这两种情况，React都提供了解决办法

## 何时使用Refs

下面是几个适合使用refs的情况：
1. 焦点管理，文本选择或媒体播放
2. 触发强制动画
3. 集成第三方DOM库

避免使用refs来做任何可以通过声明式实现来完成的事情
举个例子，避免在Dialog组件里暴露open()和close()方法，最好传递isOpen属性


## 勿过度使用Refs

你可能首先会想到使用refs在你的app中‘让事情放生’
如果这种情况，请花一点时间，认真思考一下state属性应该被安排在那个组件层中。
通常你会想明白，让更高的组件层级拥有这个state，更恰当的。

## 创建Refs

Refs是使用React.createRef()创建的，并通过ref属性附加到React元素。
在构造组件时，通常将Refs分配给示例属性，以便可以在整个组件中引用它们
```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef}></div>;
    }
}
```

## 访问Refs

当ref被传递给render中的元素时，对该节点的引用可以在ref的current属性中被访问。

```jsx
const node = this.myRef.current;
```

ref的值根据节点的类型而有所不同：
1. 当ref属性用于HTML元素时，为DOM元素
2. 当用于class组件时，为组件的挂载实例
3. 不能在函数组件上使用ref，因为它们没有实例



## 为DOM元素添加ref
```jsx
class CustomTextInupt extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    focusTextInput = () => {
        this.textInput.current.focus();
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    ref={this.textInput} />
                <input type="button" value="Focus the text input"
                    onClick={this.focusTextInput} />
            </div>
        )
    }
}

```

React会在组件挂载时给current属性传入DOM元素，并在组件卸载时传入null值。
ref会在componentDidMount或componentDidUpate生命周期钩子触发前更新

## 为class组件添加Ref
如果我们想包装上面的 CustomTextInput，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 focusTextInput 方法：

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```