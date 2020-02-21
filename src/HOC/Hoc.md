# 高阶组件
高阶组件（HOC）是React中用于复用组件逻辑的一种高级技巧。HOc自身不是React API的一部分，它是一种基于React的组合特性而形成的设计模式

具体而言，高阶组件是参数为组件，返回值是新组件的函数
```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件是将props转为UI，而高阶组件是将组件转换为另一个组件

HOC在React的第三方库中很常见，例如Redux的connect和Relay的createFragmentContainer

在本文档中，我们将他概论为什么尕姐组件有用，以及如何编写自己的HOC函数



组件是React中代码复用的基本单元，但你会发现某些模式并不适合传统组件。

例如，假设有一个CommentList组件，他订阅外部数据源，用以渲染评论列表：
```jsx
class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: DataSource.getComments()
        };
    }
    componentDidMount() {
        // 订阅修改
        DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
        // 清除订阅
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        // 当数据源更新时，更新组件状态
        this.setState({
            commnets: DataSource.getComments();
        });
    }

    render() {
        return (
            <div>
                {this.state.comments.map(comment => (
                    <Commnet comment={comment} key={comment.id} />
                ))}
            </div>
        );
    }
}
```

稍后，编写了一个用于订阅单个博客帖子的组件，该帖子遵循类似的模式

```jsx
class BlogPost extends React.Component {
    construtor(props) {
        super(props);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        })
    }

    render() {
        return <TextBlock text={this.state.blogPost} />;
    }
}
```

我们可以编写一个创建组件函数。该函数接受一个子组件作为它的其中一个参数，该组件将订阅数据作为prop。
```jsx
const CommentListWithSubscription = withSubscription(
    CommnetList,
    (DataSource) => DataSource.getComments()
)

const BlogPostWithSubscription  = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
)
```

第一个参数是被包装组件，第二个参数通过DataSource和当前的props返回我们需要的数据

当渲染CommentListWithSubscription和BlogPostWithSubscription时，CommentList和BlogPost将传递一个data prop，其中包含从DataSource检索到的最新数据

```jsx
function withSubscription(WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: selectData(DataSource, props)
            };
        }
        componentDidMount() {
            DataSource.addChageListener(this.handleChange);
        }
        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }
        handleChange = () => {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />
        }
    }
}
```

请注意，HOC不会修改传入的组件，也不会使用继承来赋值其行为。相反，HOC通过将组件包装在容器组件中来组成新组件。HOC是纯函数，没有副作用。

被包装组件接受来自容器组件的所有prop，同时也接受一个新的用于render的data prop。 HOC不需要关心数据的使用方式或原因，而被包装组件也不需要关心数据是怎么来的

因为withSubscription是一个普通函数，你可以根据需要对参数进行添加或删除。例如，希望是data prop的名称可配置，以进一步将HOC与包装组件隔离开来。或者你可以接受一个配置shouldComponentUpdate的参数， 或者一个配置数据源的参数。因为HOC可以控制组件的定义方式，这一些都变得很可能

与组件一样，withSubscription和包装组件之间的契约完全基于之间传递的props。这种依赖方式使得tihuanHOC变得容易， 只要它们为包装的组件提供相同的prop即可。

## 不要改变原始组件。使用组合
不要试图在HOC中修改组件原型
```jsx
function logProps(InputComponents) {
    InputComponents.prototype.componentWillReceiveProps = function(nextprops) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextprops);
    }
    // 返回原始的input组件，暗示它已经被修改
    return InputComponents;
}
// 每次调用logProps时， 增强组件都会有log输出
const EnhancedComponent = logProps(InputComponent);
```

这样做会产生一些不良后果。其一时输入组件再也无法像HOC增强之前那样使用了。更严重的是，如果你再用另一个同样会修改

componentWillReceiveProps的HOC增强它，那么前面的HOC就会失效！同时，这个HOC也无法应用于没有生命周期的函数组件。

修改传入组件的HOC是一种糟糕的抽象方式。调用者必须知道他们是如何实现的，以避免与其他HOC发生冲突。

HOC不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能：
```jsx
function logProps(WrappedComponent) {
    return class extends React.Component {
        componentWillReceiveProps(nextprops) {
            console.log('Current props: ', this.props);
            console.log('Next props: ', nextprops);
        }
        render() {
            // 将 input 组件包装在容器中，而不对其进行修改。Good!
            return <WrappedComponent {...this.props} />;
        }
    }
}
```

该HOC与上文中修改传入组件的HOC功能相同，同时避免了出现冲突的情况。它同样适用于class组件和函数组件。而且因为它是一个纯函数，他可以与其他HOC组合，甚至可以与自身组合


## 约定：将不相关的props传递给被包裹的组件
HOC为组件添加特性。自身不应该大幅改变约定。HOC返回的组件与原组件应保持类似的接口。

HOC应该透传与自身无关的props。大多数HOC都应该包含一个类似于下面的render方法：
```jsx
render() {
    // 过滤掉非此HOC额外的props，也不需要进行透传
    const { extraProp, ...passThroughProps } = this.props;

    // 将props注入被包装的组件中
    // 通常为state的值或者实例方法
    const injectedProp = someStateOrInstanceMethod;

    // 将props传递给被包装组件
    return (
        <WrappedComponent 
            injectedProp = {injectedProp}
            {...passThroughProps}    
        />
    )
}
```
这样约定保证了HOC的灵活性以及可复用性

## 约定：最大化可组合性
并不是所有的HOC都一样。有时候它仅接收一个参数，就是被包裹的组件

```jsx
const NavbarWithRouter = withRouter(Navbar);
```

HOC通常可以接收多个参数。比如Relay中，HOC额外接收了一个配置对象用于指定组件的数据依赖：

```jsx
const CommentWitRelay = Relay.createContainer(Comment, config);
```

最常见的HOC签名如下：

```jsx
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

这种形式可能看起来令人困惑或不必要，但它有一个有用的属性。想connect函数返回的单参数HOC具有签名`Component => Component`。输出类型与输入类型相同的函数很容易组合在一起。
```jsx
// 而不是这样
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// 你可以编写组合工具函数
// compose(f,g,h)等同于(...arg) => f(g(h(...args)))

const enhance = compose(
    // 这些都是单参数的HOC
    withRouter,
    connect(commentSelector)
)

const EnhancedComponent = enhance(WrappedComponent)
```

同样的属性也允许connect和其他HOC承担装饰器的角色，装饰器是一个实验性的JavaScript天

许多第三方都提供了compose工具函数，包括lodash（比如lodash.flowRight），Redux和Ramda


## 约定： 包装显示名称以便轻松调试
HOC创建的容器组件会与任何其他组件一样，会显示在React DEveloper Tools中。为了方便调试，请选择一个显示名称，以表明它是HOC的产物。

最常见的方式是用HOC包住被包装组件的显示名称。比如高阶组件名为`withSubscription`，并且被包装组件的显示名称为CommentList，显示名称应该为WithSubscription(CommentList)：

```jsx
function withSubscrption(WrappedComponent) {
    class WithSubscription extends React.Component {/* */}
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

## 注意事项
高阶组件有一些需要注意的地方，对于React新手来说可能并不容易发现

### 不要在render方法中使用HOC
React的diff算法(成为协调)使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。如果从render返回的组件与前一个渲染中的组件相同(===)，则React通过将子树与新子树进行区分来递归更新子树。如果它们不相等，则完全卸载前一个子树。

通常，你不需要考虑这一点。但对HOC来说这一点很重要，因为这代表着你不应在组件的render方法中对一个组件应用HOC：
```jsx
render() {
    // 每次调用render函数都会创建一个新的EnhaancedComponent
    // EnhancedComponent1 != EnhancedComponent2
    const EnhanceComponent = enhance(MyComponent);
    // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
    return <EnhanceComponent />
}
```

这不仅仅是性能问题 - 重新挂载组件会导致该组件及其所有子组件的状态丢失

如果在组件之外创建HOC，这样一来组件只会创建一次。因此，每次render时都会是同一个组件。一般来说，这跟你的预期表现是一致的

在极少数情况下，你需要动态调用HOC。你可以在组件的生命周期方法或其构造函数中进行调用。

### 务必复制静态方法

有时在React组件上定义静态方法很有用。例如，Relay容器暴露了一个静态方法getFragment以方便组合GraphQL片段。

但是，当你将HOC应用于组件时，原始组件将使用容器组件进行包装。这意味着新组建没有原始组件的任何静态方法
```jsx
WrappedComponent.staticMethod = function() {/*...*/}

const EnhancedComponent = enhance(WrappedComponent);

typeof EnhancedComponent.staticMethod === 'undefined' // true
```

为了解决这个问题，你可以在返回之前把这些方法都拷贝到容器组件上
可以使用hoist-non-react-statics自动拷贝所有非React静态方法
```jsx
function enhance(WrappedComponent) {
    class Enhance extends React.Component { /*...*/}
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
}
```

除了导出组件，另一个可行的方案是再额外导出这个静态方法
```jsx
MyComponent.someFunction = someFunction;
export default MyComponent;

export { someFunction };

import MyComponent, {someFunction} from './MyComponent.js'
```

### Refs不会传递