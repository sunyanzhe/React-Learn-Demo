import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        //更新state使下一次渲染能够显示降级后的UI
        return {hasError: true};
    }
    componentDidCatch(error, errorInfo) {
        //你同样可以将错误日志上报个服务器
        // logErrorToMyServic(error, errorInfo);
    } 
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}