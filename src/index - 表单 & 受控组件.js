import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 在React里，Html表单元素的工作方式和其他的DOM元素有些不同
 * 这是因为表单元素通常会保持一些内部的state。
 * 例如这个纯HTML表单只接受一个名称
 * <form>
 *  <label>
 *      名字：
 *      <input type="text" name="name" />
 *  </label>
 *  <input type="submit" value="提交" />
 * </form>
 * 
 * 此表单具有默认的HTML表单行为，即在用户提交表单后浏览到新页面
 * 如果你在React中执行相同的代码，它依然有效
 * 但是在大多数情况下，使用JavaScript函数可以很方便的处理表单的提交
 * 同时还可以访问用户填写的表单数据，实现这种效果的标准方式是使用‘受控组件’
 */

/**
 * 受控组件
 * 在HTML中，表单元素（如<input> <textarea> <select>）之类的表单元素通常自己维护state
 * 并根据用户输入进行更新，而在React中，可变状态通常保存在数组的state属性中
 * 并且只能通过使用setState()来更新
 * 
 * 我们可以把两者结合，使React的state成为‘唯一数据源’。
 * 渲染表单的React组件还控制着用户输入过程中表单发生的操作
 * 被React以这种方式控制取值的表单输入元素叫做‘受控组件’
 * 
 * 例如，如果我们想让前一个示例在提交时打印出来名称，我们可以将表单写为受控组件
 */
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', textValue: '', selectValue: 'coconut' };
        this.list = [
            {
                name: '葡萄柚',
                value: 'grapefruit'
            },
            {
                name: '酸橙',
                value: 'lime'
            },
            {
                name: '椰子',
                value: 'coconut'
            },
            {
                name: '芒果',
                value: 'mango'
            }
        ]

        //   this.handleChange = this.handleChange.bind(this);
        //   this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleTextChange = (event) => {
        this.setState({ textValue: event.target.value });
    }

    handleSelectChange = (event) => {
        this.setState({ selectValue: event.target.value });
    }

    handleSubmit = (event) => {
        alert('名字: ' + this.state.value);
        alert('文章: ' + this.state.textValue);
        alert('Select:' + this.state.selectValue);
        event.preventDefault();
    }

    render() {
        let elemList = this.list.map((item) => (
            <option key={item.value} value={item.value}>
                {item.name}
            </option>
        ))
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    文章:
                    <textarea value={this.state.textValue} onChange={this.handleTextChange} />
                </label>
                <br />
                <select value={this.state.selectValue} onChange={this.handleSelectChange}>
                    {elemList}
                </select>
                <br />
                <input type="submit" value="提交" />
            </form>
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
)