# Fragments
React中的一种常见模式是一个组件返回多个元素。Fragments允许你将子列表分组，而无需向DOM添加额外节点
```jsx
render() {
    return (
        <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    )
}
```

还有一种新的短预发可用于声明它们

## 动机
一种常见的模式是组件返回一个子元素列表
```jsx
class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Colums />
                </tr>
            </table>
        )
    }
}

class Colums extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        )
    }
}
```

这样可以正确输出<Table />
```jsx
<table>
    <tr>
        <td>Hello</td>
        <td>World</td>
    </tr>
</table>
```

## 短语法

你可以使用一种新的，且更简短的语法来声明Fragments。他看起来就像空标签
```jsx
class Colums extends React.Component {
    render() {
        return (
            <>
                <td>Hello</td>
                <td>World</td>
            </>
        )
    }
}
```

你可以像使用任何其他元素一样使用<></> 除了它不支持key或属性

## 带key的Fragment

使用显示<React.Fragment>语法声明的片段可能具有key。一个使用场景是将一个集合映射到一个Fragments数组。

```jsx
function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            ))}
        </dl>
    )
}
```

key是唯一可以传递给Fragment的属性。
