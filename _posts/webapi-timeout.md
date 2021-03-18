---
title: 动画和低优先级任务时timeout的替代方案
tags:
  - requestAnimationFrame 
  - requestIdleCallback
date: '2019-12-22T00:00:00.000Z'
---

#### timeout

```js

setTimeout(() => {}, 1000);

```

#### requestAnimationFrame

- `window.requestAnimationFrame(callback)`, 告诉浏览器想要在下一repaint之前执行
- callback函数将在repaint之前被执行，参数为timestamp
- 一般来说，callback是60次每秒的被调用(60fps)
- 返回ID，可以通过`window.cancelAnimationFrame() `取消

```js
const ANIMATION_DURATION = 2000;
let start;
const step = (timestamp) => {
    if (start) {
        start = timestamp;
    }
    const elapsed = timestamp - start;

    // ... 动画

    if (elapsed < ANIMATION_DURATION) {
        window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);

```

#### requestIdleCallback

- 在浏览器空闲的时候执行
- 执行低优先级的工作
- 指定 `timeout`, 即使浏览器没有空闲，也会强制执行。
- 回调函数的参数deadline:
  - `deadline.didTimeout`, 只读，当回调因为指定了 `timeout`, 并且超时时，返回true。
  - `deadline.timeRemaining()`, 剩余的可用的空闲时间。当`deadline.didTimeout`为true时，返回0
- 返回ID，可以通过`window.cancelIdleCallback()`取消   

```js

window.requestIdleCallback((deadline) => {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
        doWorkIfNeeded();
    }
    if (tasks.length > 0) {
        requestIdleCallback(myNonEssentialWork);
    }
}, {timeout: 1000});

```
