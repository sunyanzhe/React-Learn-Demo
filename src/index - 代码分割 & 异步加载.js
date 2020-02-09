import React from 'react'
import ReactDOM from 'react-dom'
import App from './AppCodeSplit.jsx'

// 异常捕获边界
// 如果模块加载失败,他会出发一个错误,你可以通过异常捕获便捷技术来处理这些情况
// 以显示良好的用户体验并管理回复事宜

// 命名到处
// React.lazy目前只支持默认导出(default exports) 
// 如果你想被引入的模块使用命名到处, 你可以创建一个中间模块, 来重新导出默认模块


ReactDOM.render(
    <App />,
    document.getElementById('root')
)