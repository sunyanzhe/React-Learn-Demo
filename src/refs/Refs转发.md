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