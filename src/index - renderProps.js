import React from 'react'
import ReactDOM from 'react-dom'

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <span style={{display: 'block', position: 'absolute', left: mouse.x, top: mouse.y}}>Cat</span>
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }
    handleMouseMove = event => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }
    render() {
        return (
            <div style={{ height: '100px' }} onMouseMove={this.handleMouseMove}>
                {this.props.children(this.state)}
            </div>
        )
    }
}

class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <h1>移动鼠标</h1>
                <Mouse>
                    {mouse => (<Cat mouse={mouse} />)}
                </Mouse>
            </div>
        )
    }
}

ReactDOM.render(
    <MouseTracker />,
    document.getElementById('root')
)