import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './errorBoundaries/ErrorBoundary.jsx'
import BuggyCounter from './errorBoundaries/BuggyCounter.jsx'

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <BuggyCounter />
            </ErrorBoundary>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));