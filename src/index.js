import React from 'react'
import ReactDOM from 'react-dom'

// function FancyBtn(props) {
//     const {forwardRef, ...rest} = props;
//     return (<button ref={forwardRef} {...rest} />)
// }

// const Fbtn = React.forwardRef((props, ref) => (
//     <button ref={ref} {...props}></button>
// ))

// class FancyButton extends React.Component {
//     render() {
//         const {forwardRef, ...rest} = this.props;
//         return <button ref={forwardRef} {...rest} />
//     }
// }

function logProps(Component) {
    class LogProps extends React.Component {
        render() {
            const {forwardedRef, ...rest} = this.props;
            //将自定义的prop属性 'forwardedRef' 定义为ref
            return <Component ref={forwardedRef} {...rest} />
        }
    }
    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />
    })
}

class Btn extends React.Component {
    focus() {
        console.log('focus')
    }
    render() {
        return <button {...this.props}>click!</button>
    }
}

const Hoc = logProps(Btn);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    click = () => {
        console.log(this.ref);
    }
    render() {
        return <Hoc onClick={this.click} ref={this.ref} />
    }
}

ReactDOM.render(<App />, document.getElementById('root'))