---
title: redux和react-redux的实现原理
tags:
- react
- redux  
date: "2021-02-26T16:00:00.000Z"
---

### Redux的实现

redux就是实现了一个观察者模式。简化版的实现，大概就是这样。

```js

function createStore(reducer, preloadState) {
    let currentReducer = reducer;
    let currentState = preloadState;
    let listeners = [];

    return {
        getState() {
            return currentState;
        },

        subscribe(listener) {
            listeners.push(listener);
            // 返回删除此lister的方法
            return () => {
                const index = listeners.indexOf(listener)
                listeners.splice(index, 1)
            } 
        },

        dispatch(action) {
            // 通过reduce计算新的state。
            currentState = reducer(currentState, action);
            for(let i = 0; i < listeners.length; i++) {
                const listener = listeners[i];
                listener();
            }
            return action;
        },
    }
}

```


### react-redux的实现

react-redux的目的就是讲redux与react集成，
通过`connect(mapStateToProps, mapDispatchToProps)(component)`的方式，
生成一个高阶组件，将store中指定的数据绑定到props上，当store中的状态变化时，自动刷新组件。

首先，会通过一个provider将store对象保存到context中。

```jsx
import { Provider } from 'react-redux';
const store = createStore(myReducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

在HOC中，每次subscribe到store的变化，强制当前component进行一次re-render。

```jsx
function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return class extends React.Component {
      // 从context中获取store。
      static contextType = ReactReduxContext;
      
      render() {
        const store = this.context;
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(store.getState(), this.props)}
            {...mapDispatchToProps(store.dispatch, this.props)}
          />
        )
      }
      componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleChange);
      }
      
      componentWillUnmount() {
        this.unsubscribe();
      }
    
      handleChange = () => {
        this.forceUpdate();
      }
    } 
  } 
}
```


