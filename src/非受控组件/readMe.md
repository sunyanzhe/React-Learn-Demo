# 非受控组件
在大多数情况下，我们推荐使用受控组件来处理表单数据
在一个受控组件中，表单数据是由React组件来管理的
另一种替代方案是使用非受控组件，这时候表单数据将由DOM节点来处理

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用ref来从DOM节点中获取表单数据

```jsx
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    handleSubmit = event => {
        alert('A name was submitted: ' + this.input.current.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
```

因为非受控组件将真实数据储存在DOM节点中，所以在使用非受控组件时，有时候反而更容易同时继承React和非React代码。如果你不介意代码美观，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该是用受控组件。


## 默认值
在React渲染声明周期时，表单上的value将会覆盖DOM节点中的值，在非受控组件中，你经常希望React能赋予组件一个初始值，但是不去控制后续的更新。在这种情况下，你可以制定一个defaultValue属性，而不是value

## 文件输入
在HTML中， <input type="file">可以让用户选择一个或多个文件上传到服务器，或者通过使用File API进行操作

```jsx
<input type="file" />
```

在React中，file始终是一个非受控组件，因为他的值只能由用户设置，而不能通过代码控制。

你应该使用File API与文件进行交互。
```jsx
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }
    handSubmit = event => {
        event.preventDefault();
        alert(
            `Selected file - ${
                this.fileInput.current.file[0].name      
            }`
        );
    }
    render() {
        return (
            <form>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

```