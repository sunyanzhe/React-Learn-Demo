import {ThemeContext, themes} from './ReactContext/theme-context.js'
import ThemedButon from './ReactContext/themed-button.jsx'
import React from 'react'
import ReactDOM from 'react-dom'


// 一个使用ThemedButton的中间组件
function ToolBar(props) {
    return (
        <ThemedButon onClick={props.changeTheme}>
            Change Theme
        </ThemedButon>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        };
    }
    toggleTheme = () => {
        this.setState(state => ({
            theme: 
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark
        }))
    }
    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <ToolBar changeTheme={this.toggleTheme} />
                </ThemeContext.Provider>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));