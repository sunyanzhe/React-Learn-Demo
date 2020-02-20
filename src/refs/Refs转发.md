# Refs 转发
Ref转发是一项将ref自动地通过组件传递到其一子组件的技巧。对于大多数应用的组件来说，这通常不是必需的。但其对某些组件，尤其是可重用的组件库是很有用的

## 转发refs 到 DOM组件
考虑这个渲染原生DOM元素的button的FancyButton组件：
```jsx
function FancyButton(props) {
    return (
        <button className="FancyButton">
            {props.children}
        </button>
    )
}
```
React组件隐藏其实现细节，包括其渲染结果。其他使用FancyButton的组件通常不需要获取内部的DOM元素button的ref。这很好，因为防止组件过度依赖其他组件的DOM结构。

虽然这种封装对类似FeedStory或Comment这样的应用级组件是理想的，但是对其FancyButton或MyTextInput这种的高可复用‘叶’组件来说可能是不方便的。这些组件倾向于在整个应用中以一种类似常规DOM button和input 的方式被使用， 并且访问其DOM节点对管理焦点，选中或动画来说是不可避免的

Ref转发是一个可选特性，其允许某些组件接受ref，并将其向下传递给子组件

在下面的实例中， FancyButton使用React.forwardRef来获取传递给它的ref，然后转发到它渲染的DOM button：
```jsx
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// 你可以直接获取DOM button 的 ref
const ref = React.createRef();
<FancyButton ref={ref}>Click Me!</FancyButton>
```

这样，使用 FancyButton的组件可以获取底层DOM节点button的ref，并在必要时访问，就像其直接使用DOM button一样

以下是对上述事例发生情况的逐步解释：
1. 我们通过调用React.createRef创建一个React ref将其赋值给ref变量。
2. 我们通过指定 ref 为JSX属性， 将其向下传递给 `<FancyButton ref={ref}>`。
3. React传递 ref 给 forwardRef内函数(props, ref) => ... ,作为其第二个参数。
4. 我们向下转发该ref参数到`<button ref={ref}>`，将其指定为JSX属性
5. 当 ref 挂载完成， ref.current将指向<button>DOM节点

## 在高阶组件中转发refs
这个技巧对高阶组件特别有用。
```jsx
function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }
        render() {
            return <Component {...this.props} />
        }
    }
    return LogProps;
}
```

"logPorps"HOC透传所有props到其包裹的组件，所以渲染结果是相同的。例如： 我们可以使用该HOC记录所有传递到"fancybutton"组件的props
