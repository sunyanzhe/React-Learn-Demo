# 基础HOOK

## useState
```jsx
const [state, setState] = useState(initialState);
```
返回一个state,以及更新state的函数
在初始渲染期间,返回的状态(state)与传入的第一个参数(initialState)值相同

setState函数用于更新state.它接收一个新的state值并将组件的一次重新渲染加入队列

```jsx
setState(newState)
```

### 函数式更新
如果新的state需要通过先前的state计算得出,那么可以将函数传递给setState.该函数将接收先前的state,并返回一个更新后的值.下面的计数器组件示例展示了setState的两种用法
```jsx
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
```

### 惰性初始state
initialState参数只会在组件的初始渲染中起作用,后续渲染会被忽略.如果初始state需要通过复杂计算获得,则可以传入一个函数,在函数中计算并返回初始的state,此函数只在初始渲染时被调用;

```jsx
const [state, setState] = useState(() => {
    const initialState = somExpensiveConputations(props);
    return initialState;
})
```

### 跳过state更新
调用State Hook的更新函数并传入当前的state时,React将跳过子组件的渲染及effect的执行(React使用Object.is比较算法来比较state)

需要注意的是,React可能仍需要在跳过渲染前渲染该组件.不过由于React不会对组件树的深层节点进行不必要的渲染,所以大可不必担心.如果你在渲染期间执行了高开销的计算,则可以使用useMemo来进行优化

## useEffect
```jsx
useEffect(didUpdate)
```

该Hook接收一个包含命令式,且可能有副作用代码的函数
在函数组件主体内(这里指React渲染阶段)改变DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的,因为这可能会产生莫名其妙的bug并破坏UI的一致性.

使用useEffect完成副作用操作,赋值给useEffect的函数会在组件渲染到屏幕之后执行

### 清除effect
通常,组件卸载时需要清除effect创建的诸如订阅或者计时器ID等资源.要实现这一点,useEffect函数需返回一个清除函数
```jsx
useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
        // 清除订阅
        subscription.unsubscribe()
    }
})
```

为防止内存泄漏,清除函数会在组件卸载前执行.另外,如果组件多次渲染,则在执行下一个effect之前,上一个effect就已被清除.在上述实例中,意味着组件的每一次更新都会创建新的订阅.若想避免每次更新都出发effect的执行,请参阅下一小节

### effect的执行时机

与componentDidMount componentDidUpdate不同的是,在浏览器完成布局与绘制之后,传给useEffect的函数会延迟调用.这使得它适用于许多常见的副作用场景,比如设置订阅和事件处理等情况,因此不应在函数中执行阻塞浏览器更新屏幕的操作.

然而,并非所有effect都可以被延迟执行.例如,在浏览器执行下一次绘制前,用户可见的DOM变更就必须同步执行,这样用户才不会感觉到视觉上的不一致.(概念上类似于被动监听事件和主动监听事件的区别).React为此提供了一个额外的`useLayoutEffect`Hook来处理这类effect.它和useEffect的结构相同,区别只是调用时机不同

虽然useEffect会在浏览器绘制后延迟执行,但会保证在任何新的渲染前执行.
React将在组件更新前刷新上一轮渲染的effect.

### effect的执行条件
默认情况下, effect会在每轮组件渲染完成后执行.这样的话,一旦effect的依赖发生变化,它就会被重新创建.

然而, 在某些情况下这么做可能会矫枉过正.
比如,之前的订阅示例中,我们不需要在每次组件更新时都创建新的订阅,而是仅需要在source props改变时重新创建

要实现这一点,可以给useEffect传递第二个参数,它是effect所依赖的值的数组

```jsx
useEffect(
    () => {
        const subscription = props.source.subscribe();
        return () => {
            subscription.unsubscribe();
        };
    },
    [props,source]
)
```
此时,只有当props.source改变后才会重新订阅.

> 如果使用此优化方式,请确保数组中包含了所有外部作用域中会发生改变且在effect中使用的变量,否则你的代码会引用到先前渲染中的就变量. 如果想只执行一次effect(仅在组件挂载和卸载时执行), 可以传递一个空数组([])作为第二个参数.这就告诉React你的effect不依赖于props或state中的任何一个值.所以他永远都都不需要重复执行.这并不属于特殊情况

## useContext
```jsx
const value = useContext(MyContext);
```

接受一个context对象(React.createContext的返回值)并返回该context的当前值.
当前的context值由上层组件中距离当前组件最近的<MyContext.Provider>的value prop决定

