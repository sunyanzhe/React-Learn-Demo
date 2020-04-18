import React, { useState } from 'react'
import ReactDOM from 'react-dom'
function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
        <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
        </>
    )
}

ReactDOM.render(<Counter initialCount={0} />, document.getElementById('root'));