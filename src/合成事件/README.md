# 合成事件

## 概览
合成事件是浏览器的原生事件的跨浏览器包装器。
除兼容所有浏览器之外，它还拥有和浏览器原生事件相同的接口，包括stopPropagation()和preventDefault()

如果因为某些原因，当你需要使用浏览器的底层事件时，只需要使用nativeEvent属性来获取即可

其对象包含以下属性：
```js
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

## 事件池
`SyntheticEvent`是合并而来。这意味着`SyntheticEvent`对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑，你不能通过异步访问事件
```jsx
function onClick(event) {
    console.log(event) // => nullified object
    console.log(event.type) // => 'click'
    const eventType = event.type // => 'click'

    setTimeout(() => {
        console.log(event.type) // => null
        console.log(eventType) // => 'click'
    }, 0)

    // 不起作用，this.state.clickEvent的值将会只包含null
    this.setState({clickEvent: event});

    // 你仍然可以导出事件属性
    this.setState({eventType: event.type});
}
```

> 注意如果你想异步访问事件属性，你需在事件上调用event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。


## 支持的事件
React通过将事件normalize以让他们在不同浏览器中拥有一致的属性

以下的事件处理函数在冒泡阶段被触发。如需注册捕获阶段的事件处理函数，则应为事件名添加Capture。

例如，处理捕获阶段的点击事件请使用，onClickCapture，而不是onClick。

### 剪贴板事件
事件名：
```
onCopy onCut onPaste
```

属性：
```
DOMDataTransfer clipboardData
```

### 复合事件
事件名：
```
onCompositionEnd onCompositionStart onCompositionUpdate
```

属性：
```
string data
```


### 键盘事件 
事件名：
```
onKeyDow onKeyPress onKeyUp
```

属性：
```
boolean altKey
number charCode
boolean ctrlKey
boolean GetModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

### 焦点事件
事件名：
```
onFocus onBlur
```
这些焦点事件在React DOM上的所有元素都有效， 不只是表单元素

属性：
```
DOMEventTarget relatedTarget
```

### 表单事件 
事件名：
```
onChange onInput onInvalid onSubmit
```

### 
事件名：
```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeact onDragOver onDragStart
onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove
onMouseOut onMouseOver onMouseUp
```


属性：
```

```