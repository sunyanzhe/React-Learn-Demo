// 事件处理

import React from 'react'
import ReactDOM from 'react-dom'

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.g = this.gen();
        this.state = {
            text: this.g.next().value
        }
    }
    * gen() {
        while(true) {
            yield 'OFF';
            yield "ON"
        }
    }
    handleClick = (e) => {
        console.log(e);
        console.log(this);
        this.setState(state => ({
            text: this.g.next().value
        }))
    }
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.text}
            </button>
        )
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
)