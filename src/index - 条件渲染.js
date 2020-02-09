import React from 'react'
import ReactDOM from 'react-dom'

function UserGreeting(props) {
    return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
    return <h1>Please sign up!</h1>
}

function Greeting(props) {
    if (props.isLogin) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}

function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLogin: false};
    }
    handleLonginClick = () => {
        this.setState({isLogin: true})
    }
    handleLongOutClick = () => {
        this.setState({isLogin: false})
    }
    render() {
        const isLogin = this.state.isLogin;
        return (
            <div>
                <Greeting isLogin={isLogin} />
                <Button text='login' onClick={this.handleLonginClick} />
                <Button text='logout' onClick={this.handleLongOutClick} />
            </div>
        )
    }
}

// 与运算符&&
function MailBox(props) {
    const unreadMessage = props.unreadMessage;
    return (
        <div>
            {
                unreadMessage.length > 0 &&
                <h2>
                    You have {unreadMessage.length} unread messages.
                </h2>
            }
        </div>
    )
}

function App() {
    const messages = ['1', '2', '3'];
    return (
        <div>
            <LoginControl />
            <MailBox unreadMessage={messages} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)