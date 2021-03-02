---
title: Scroll的效果
tags:
  - css
  - javascript
  - scroll
date: '2020-11-03T00:00:00.000Z'
---

#### 实现scroll的时候，滚动到下一个元素

<style>
.scroll-snap-container {
    margin: 0 auto;
    height: 400px;  
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}
.snap-1, .snap-2, .snap-3, .snap-4 {
    height: 400px;
    scroll-snap-align: center;
    padding: 1rem;
}
.snap-1 {
    background-color: darkkhaki;
}
.snap-2 {
    background-color: cadetblue;
}
.snap-3 {
    background-color: #ff7a18;
}
.snap-4 {
    background-color: darkslategray;
}
</style>
<div class="scroll-snap-container">
    <section class="snap-1"></section>
    <section class="snap-2"></section>
    <section class="snap-3"></section>
    <section class="snap-4"></section>
</div>

```html

<div class="scroll-snap-container">
    <section class="snap-1"></section>
    <section class="snap-2"></section>
    <section class="snap-3"></section>
    <section class="snap-4"></section>
</div>

```


```css

.scroll-snap-container {
    margin: 0 auto;
    height: 400px;  
    overflow-y: scroll;
    /* y 方向； mandatory和proximity两个可能取值 */
    scroll-snap-type: y mandatory;
}
.snap-1, .snap-2, .snap-3, .snap-4 {
    height: 400px;
    scroll-snap-align: center;
    /* chrome bug，不添加的话，回滚动两个div */
    padding: 1rem;
}

```


#### 滚动后，修改header的样式

当scroll只有，给html添加`data-scroll`，设置为当前scroll的位置，当位置不为0时，就修改header的css


```js

// passive为true，表示保证不调用 preventDefault, 这样有利于浏览器对scroll的优化。
window.addEventListener('scroll', () => {
  // document.documentElement html元素
  // .dataset.scroll 设置data-scroll属性
  document.documentElement.dataset.scroll = window.scrollY;
}, {passive: true});

```

`{passive: true}`: 

All modern browsers have a threaded scrolling feature to permit scrolling to run smoothly even when expensive JavaScript is running, but this optimization is partially defeated by the need to wait for the results of any `touchstart` and `touchmove` handlers, which may prevent the scroll entirely by calling `preventDefault()` on the event.

***This frees the browser up to respond to scrolling immediately without waiting for JavaScript, thus ensuring a reliably smooth scrolling experience for the user***

```css
/* 滚动之后的css */
.header {
  position: fixed;
  left: 0;
  top: 0;
  height: 7rem;
  padding: 1rem 2rem;
  width: 100%;

}

/* 滚动到顶的css */
html[data-scroll="0"] .header {
  background-color: transparent;
  padding: 3rem 2rem 1rem 2rem;
  height: 9rem;
}


```

#### 元素进入viewpoint之后，增加动画

- 对所有元素都添加一个hidden的CSS
- 使用CSS```keyframe```和```animation```创建动画
- 当元素滚动进入视窗时，添加对应的CSS来应用动画
  - 使用JS来实现这一步，具体操作是：
    - 保存所有有hidden属性的元素
    - 添加resize的监听，保存要更新的元素，保存视窗高度
    - 添加scroll的监听，当滚动时，计算所有保存的原始是否出现在view中。
  


```javascript
// 相对于viewport的top的位置。
const positionOfElementFromTop =  element.getBoundingClientRect().top;
// 表示当前元素的顶边在视窗底部的上面，window.innerHeight为当前窗口的高度。
if (positionOfElementFromTop - window.innerHeight < 0) {
    // ... 更新class 
    
}
```

优化：
- 添加debounce
- 使用IntersectionObserver而不是scroll event来更新class


实现此功能的lib: [aos](https://github.com/michalsnik/aos)
