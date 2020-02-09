// clock
// state 和生命周期
import React from 'react'
import ReactDOM from 'react-dom'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    render() {
        return (
            <div>
                <h1>{this.props.text}</h1>
                <FormattedDate date={this.state.date} />
            </div>
        )
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillMount() {
        clearInterval(this.timerID);
    }
}

function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}</h2>
}

function App() {
    return (
        <div>
            <Clock text="Hello, world" />
            <br/>
            <Clock text="你好，世界" />
            <br/>
            <Clock text="ハローワールド"/>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)