# Protals
Portal提供了一种将子节点渲染到父组件以外的DOM节点的优秀的方案
```jsx
ReactDOM.createPortal(child, container)
```

第一个参数是任何可渲染的React子元素，例如一个元素，字符串或者fragment。第二个参数(container)是一个DOM元素


## 用法
通常来讲，当你重组件的render方法返回一个元素时，该元素将被挂载到DOM节点中离其最近的父节点
```jsx
render() {
    // React挂载了一个新的div，并且把子元素渲染其中
    return (
        <div>
            {this.props.children}
        </div>
    )
}
```

然而，有时候将子元素插入到DOM节点中的不同位置也是有好处的：

```jsx
render() {
    // React并没有创建一个新的div。他只是把子元素渲染到了`domNode`中
    // `domNode`是一个可在任何位置都有效的DOM节点
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    )
}
```

一个portal的典型用例是当父组件有overflow:hidden 或者 z-index样式时，但你需要子组件能够在视觉上跳出容器，例如，对话框，悬浮卡以及提示框

注意：当在使用portal时，记住管理键盘焦点变得尤为重要
对于模态对话框，通过醉熏WAI-ARIA模态开发实践，来确保每个人都能够运用它。

## 通过Portal进行事件冒泡

尽管portal可以被放置在DOM树种的任何地方，但在任何其他方面，其行为和普通的React子节点行为一致。由于portal仍存在于React树，且与DOM树中的位置无关，那么无论妻子点是否是portal，像context这样的功能特性是不变的

这包含事件冒泡。一个从portal内部触发的事件会一直冒泡至包含React树的祖先，及时这些函数并不是DOM树的组件。假设存在如下HTML结构
```html
<html>
    <body>
        <div id="app-root"></div>
        <div id="modal-root"></div>
    </body>
</html>
```

在#app-root里的Parent组件能够捕获到未被捕获的兄弟节点#modal-root冒泡上来的事件

```jsx
// 在DOM中有两个容器是兄弟级
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        // 在 Modal 的所有子元素被挂在后，
        // 这个portal元素会被嵌入到DOM树中
        // 这意味着子元素将被挂载到一个分离的DOM节点中
        // 如果要求子组件在挂载时可以立刻接入DOM树
        // 例如衡量一个DOM节点
        // 或者在后代节点使用'autoFocus'
        // 则需添加state到Modal中
        // 仅当Modal被插入DOM树中才能渲染子元素
        modalRoot.appendChild(this.el);
    }
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {click: 0};
    }
    handleClick = () => {
        this.setState(state => ({
            click: state.clicks + 1
        }))
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                <p>Number of clicks: {this.state.clicks}</p>

                <Modal>
                    <Child />
                </Modal>
            </div>
        )
    }
}
function Child() {
    return (
        <div className="modal">
            <button>Click</button>
        </div>
    )
}
ReactDOM.render(<Parent />, appRoot);
```

在父组件里捕获一个来自portal冒泡上来的事件，是指能够在开发时具有不完全依赖于portal的更为灵活的抽象。例如，如果你在渲染一个<Modal />组件，无论其是否采用portal实现，父组件都能够捕获其事件。