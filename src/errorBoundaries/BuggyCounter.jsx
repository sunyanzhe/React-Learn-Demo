import React from 'react'

export default class BuggyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0}
    }
    handleClick = () => {
        this.setState(({count}) => ({
            count: ++count
        }))
    }
    render() {
        if (this.state.count >= 5)
            throw new Error ('error')
        return <h1 onClick={this.handleClick}>{this.state.count}</h1>
    }
}