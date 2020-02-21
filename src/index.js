import React, {Component} from 'react'
import ReactDOM from 'react-dom'

function Col(props) {
    return (
        <>
            {props.cols.map(col => (
                <td key={col}>{col}</td>
            ))}
        </>
    )
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.tables = [['Hello', 'World'], ['Hi', 'CN']]
    }

    render() {
        return (
            <table>
                {this.tables.map((row, index) => (
                    <tr key={index}>
                        <Col cols={row} />
                    </tr>
                ))}
            </table>
        )
    }
}

ReactDOM.render(<Table />, document.getElementById('root'));