---
title: text-shadow
tags: 
  - css
  - text-shadow
date: '2021-02-24T00:00:00.000Z'
references: 
  - 
---

```css

/* 定义text-shadow */
p {
    text-shadow: 10px 10px 10px #000;
                 
}
/* 多个text-shadow的值，逗号分隔 */
p {
    text-shadow: 10px 10px 10px #000,
                 20px 20px 20px #777;
                 
}
```

几个值得含义：
1. the x offset，为正数时，向右投影，为负值时，向左投影；
2. the y offset，为正数时，向下投影，为负值时，向上投影；
3. the blur radius；
4. the color of the shadow。

和box-shadow相比，少了blur radius之后的那个值。


#### 有意思的应用效果

##### 给字体加边框

通过给字体周围设置一圈text-shadow，blur radius设置为0，来生成一个边框颜色。同样的效果可以通过`-webkit-text-stroke-color`和`-webkit-text-stroke-width`来实现。

<style>
:root {
  --background-color: black;
  --stroke-color: grey;
}
.stroke {
  display: flex;
  justify-content: space-around;
  font-size: 10rem;
  font-weight: 700;
  background-color: var(--background-color);  
}

.stroke span:first-child {
  -webkit-text-stroke-color: var(--stroke-color);
  -webkit-text-stroke-width: 1px;
  color: transparent;
}

.stroke span:last-child {
  text-shadow: 
        1px 1px 0 var(--stroke-color), 
        -1px -1px 0 var(--stroke-color), 
        1px -1px 0 var(--stroke-color), 
        -1px 1px 0 var(--stroke-color);
  color: var(--background-color);  
}
</style>
<div class="stroke">
  <span>test</span>
  <span>test</span>
</div>

实现：
```html
<div class="stroke">
  <span>test</span>
  <span>test</span>
</div>
```

```css
:root {
  --background-color: black;
  --stroke-color: grey;
}
.stroke {
  display: flex;
  justify-content: space-around;
  font-size: 10rem;
  font-weight: 700;
  background-color: var(--background-color);  
}

.stroke span:first-child {
  -webkit-text-stroke-color: var(--stroke-color);
  -webkit-text-stroke-width: 1px;
  color: transparent;
}

.stroke span:last-child {
  text-shadow: 
        1px 1px 0 var(--stroke-color), 
        -1px -1px 0 var(--stroke-color), 
        1px -1px 0 var(--stroke-color), 
        -1px 1px 0 var(--stroke-color);
  color: var(--background-color);  
}
```

##### 灯光效果

将字体设置为白色，然后通过多个白色的text-shadow的值，渐进增加每个blur radius的值，形成白色灯光效果。最后通过多个灯管颜色的text-shadow的值，渐进增加每个blur radius的值，形成彩灯的效果。

<style>
:root {
  --color-light: white;
  --color-red: red;
  --background-color: black;
}

.container {
  background-color: var(--background-color);
}

.neon {
  font-size: 10rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1rem;
  
  color: var(--color-light);

  animation: blink 2s linear infinite;
}

@keyframes blink {
  0%, 18%, 20%, 30%, 100% {
      text-shadow: 
        1px 1px 0 var(--color-light), 
        -1px -1px 0 var(--color-light), 
        1px -1px 0 var(--color-light), 
        -1px 1px 0 var(--color-light),

        0 0 .5rem var(--color-light),
        0 0 1rem var(--color-light),
        0 0 1.5rem var(--color-light),

        0 0 2rem var(--color-red),
        0 0 4rem var(--color-red),
        0 0 6rem var(--color-red);
      opacity: 1;
  }
  19%, 29% {
    text-shadow: unset;
    opacity: 0.5;
  }
}
</style>
<div class="container">
  <div class="neon">
    Hello world
  </div>
</div>

实现：
```html

<div class="container">
  <div class="neon">
    Hello world
  </div>
</div>

```

```css

:root {
  --color-light: white;
  --color-red: red;
  --background-color: black;
}

.container {
  background-color: var(--background-color);
}

.neon {
  font-size: 10rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1rem;
  
  color: var(--color-light);

  animation: blink 2s linear infinite;
}

@keyframes blink {
  0%, 18%, 20%, 30%, 100% {
      text-shadow: 
        1px 1px 0 var(--color-light), 
        -1px -1px 0 var(--color-light), 
        1px -1px 0 var(--color-light), 
        -1px 1px 0 var(--color-light),

        0 0 .5rem var(--color-light),
        0 0 1rem var(--color-light),
        0 0 1.5rem var(--color-light),

        0 0 2rem var(--color-red),
        0 0 4rem var(--color-red),
        0 0 6rem var(--color-red);
      opacity: 1;
  }
  19%, 29% {
    text-shadow: unset;
    opacity: 0.5;
  }
}

```

待增加...

