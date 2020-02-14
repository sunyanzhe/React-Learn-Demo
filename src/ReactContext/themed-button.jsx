import React from 'react'
import { ThemeContext } from './theme-context.js'

class ThemedButon extends React.Component {
    render() {
        let props = this.props,
            theme = this.context;
        console.log(props)
        return (
            <button {...props} style={{backgroundColor: theme.background}} />
        )
    }
}

ThemedButon.contextType = ThemeContext;

export default ThemedButon