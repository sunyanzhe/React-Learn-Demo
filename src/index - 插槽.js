import React from 'react';
import ReactDOM from 'react-dom'

function FancyBorder(props) {
    return (
        <div>
            {props.title}
            ----中间的间隔----
            {props.content}
        </div>
    )
}
function Welcome() {
    return <h1>Welcome</h1>
}
function Content() {
    return <p>This is content</p>
}

function WelconmeDialog(props) {
    return (
        <FancyBorder 
        title = { <Welcome /> }
        content = { <Content /> }
        />
    )
}
    
ReactDOM.render(
    <WelconmeDialog />,
    document.getElementById('root')
)