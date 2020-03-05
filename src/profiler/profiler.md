# Profiler API
Profiler测量渲染一个React应用多久渲染一次以及渲染一次的'代价'。它的目的是识别出应用中渲染较慢的部分，或是可以使用类似memoization优化的部分。并从先关优化中获益。

注意：Profiling增加了额外的开支，所以它在生产构建中会被禁用
为了将Profiling功能加入生产环境中，React提供了使profiling可用的特殊的生产构建环境的信息


## 用法
Profiler能添加在React树中的任何地方来测量树中这部分渲染所带来的开销。他需要两个prop：一个是id(string)，一个是当组件树中的组件‘提交’更新的时候被React调用的回调函数onRender(function)。

例如，为了分析Navigation组件和它的子代：
```jsx
render(
    <App>
        <Profiler id="Navigation" onRender={callback}>
            <Navigation {...props} />
        </Profiler>
        <Main />
    </App>
)
```

## onRender 回调
Profiler 需要一个onRender函数作为参数。 React会在profile包含的组件树中任何组件'提交'一个更新的时候调用这个函数。它的参数描述了渲染了什么和花费了多久。

```jsx
function onRenderCallback (
    id,     // 发生提交的Profiler树的id
    phase,  // mount或者update之一
    actualDuration, // 本次更新committed花费的渲染时间
    baseDuration,   // 估计不适用memoization的情况下渲染整颗子树需要的时间
    startTime,      // 本次更新中React开始渲染的时间
    commitTime,     // 本次更新中React committed的时间
    intractions     // 属于本次更新的interactions的集合
)
```