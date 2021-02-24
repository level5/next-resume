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
1. the x offset，为负值的时候，就是向上投影；
2. the y offset，为负值的时候，就是向左投影；
3. the blur radius；
4. the color of the shadow。


有意思的应用效果：

##### 给字体加边框

通过给字体周围设置一圈text-shadow，blur radius设置为0，来生成一个边框颜色。同样的效果可以通过`-webkit-text-stroke-color`和`-webkit-text-stroke-width`来实现。


##### 灯光效果

将字体设置为白色，然后通过多个白色的text-shadow的值，渐进增加每个blur radius的值，形成白色灯光效果。最后通过多个灯管颜色的text-shadow的值，渐进增加每个blur radius的值，形成彩灯的效果。

##### 3D效果

