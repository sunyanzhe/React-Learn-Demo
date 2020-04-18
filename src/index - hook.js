import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function Example() {
    const [count, setCount] = useState(0);

    // 相当于compoenentDidMount 和 componentDidUpdate
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You click {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click Me
            </button>
        </div>
    )
}
ReactDOM.render(<Example />, document.getElementById('root'));