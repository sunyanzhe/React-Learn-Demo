import React from 'react'
import ReactDOM from 'react-dom'

class BaseComponent extends React.Component {
    componentWillMount() {
        console.log('BaseComponent will mount');
    }
    componentDidMount() {
        console.log('BaseComponent is mounted');
    }
    render() {
        return (
            <button>{this.props.context}</button>
        )
    }
}

function discription(Component) {
    return class Discription extends React.Component {
        static displayName = `DiscriptionWith${Component.name || 'Component'}`;
        componentWillMount() {
            console.log('HOC will mount');
        }
        componentDidMount() {
            console.log('HOC is mounted');
        }
        render() {
            return <Component {...this.props} />
        }
    }
}

const DisBase = discription(BaseComponent)

ReactDOM.render(
    <DisBase context="click!" />,
    document.getElementById('root')
)
