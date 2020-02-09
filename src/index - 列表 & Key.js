import React from 'react'
import ReactDOM from 'react-dom'


/**
 * key帮助React识别哪些元素改变了，比如被添加或删除
 * 因此应当给数组中的每一个元素赋予一个确定的表示
 * 
 * 一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串
 * 通常，我们使用数据中的id作为元素的key
 * 当元素没有确定id的时候，万不得已你可以使用元素索引index作为key
 */

/**
 * 如果列表项目的顺序可能会变化，我们不建议使用索引来用作key值
 * 因为这样做会导致性能变差，还可能引起组件状态的问题
 * 如果你选择不指定显式的key值，那么React将默认使用索引作为列表项目的key值
 */

function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) => 
                <li key={post.id}>{post.title}</li>
            )}
        </ul>
    );

    const content = props.posts.map((post) => 
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
)