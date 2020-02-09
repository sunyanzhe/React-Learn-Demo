import React from 'react'
import ReactDOM from 'react-dom'
import "./assets/index.css"

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div className="warning">
            warning!
        </div>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
    }
    handleToggleClick = () => {
        this.setState((state) => ({
            showWarning: !state.showWarning
        }))
    }
    render() {
        return (
            <div>
                < WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>  
            </div>
        )
    }
}
ReactDOM.render(
    <Page />,
    document.getElementById('root')
)