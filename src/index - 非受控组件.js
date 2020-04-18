import React from 'react'
import ReactDOM from 'react-dom'

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef()
        this.state = {fileName: ''}
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.fileInput.current.files[0].name);
        this.setState({
            fileName: this.fileInput.current.files[0].name
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.fileName && <h1>{this.state.fileName}</h1>}
                <label>
                    Upload file:
                    <input type="file" multiple ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">submit</button>
            </form>
        )
    }
}

ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
)
