import React from 'react'
import ReactDOM from 'react-dom'


class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            document.body
        )
    }
}

function Child() {
    return (
        <button>CLICK !</button>
    )
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicks: 0};
    }
    handelClick = () => {
        this.setState(state => ({
            clicks: state.clicks + 1
        }));
    }
    render() {
        return (
            <div onClick={this.handelClick}>
                <p>Number of clicks: {this.state.clicks}</p>
                <Modal>
                    <Child />
                </Modal>
            </div>
        )
    }
}

ReactDOM.render(
    <Parent />,
    document.getElementById('root')
);