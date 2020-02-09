import React, { Suspense } from 'react'
// 代码分割 异步加载组件

const Lazycom = React.lazy(() => import('./components/LazyCom.jsx'));

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLazy: false}
    }
    clickHandle = (e) => {
        this.setState({
            isLazy: !this.state.isLazy
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.clickHandle}>load Component</button>
                {this.state.isLazy && (
                    <Suspense fallback={<div>loading...</div>}>
                        <Lazycom />
                    </Suspense>
                )}
                
            </div>
        )
    }
}