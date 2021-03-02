---
title: 'D3基本操作'
date: '2018-03-01T00:00:00.000Z'
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/6.5.0/d3.min.js" integrity="sha512-0XfwGD1nxplHpehcSVI7lY+m/5L37PNHDt+DOc7aLFckwPXjnjeA1oeNbru7YeI4VLs9i+ADnnHEhP69C9CqTA==" crossorigin="anonymous"></script>
```js

// 创建元素
d3.create('div').style('background', 'grey');

```

```js

// selector, data, join
// data, 对应到前面selection的元素。
//   第一个参数为数据；
//   第二个参数是key函数，如果没有指定key函数，就是按选定的顺序来对应数据；指定的话，
//   传入对应位置的data，生成的string将作为用于对比的数据来确定为新增，删除，还是修改
// join, 默认行为，应用默认逻辑到，加入，删除的元素。可以通过call调用transition
d3.selectAll('div')
    .data([1, 2, 3]) 
    .join('div') // 
    .text(d => d)

// join可以定义更多行为
d3.selectAll('div').data([1, 2, 3])
    .join(enter => ..., update => ..., exit => ...);  

```


select的元素的操作:

```js

selection.style('key', 'value');

selection.attr('key', 'value');

selection.classed('calss', isEnable);

selection.text('value');

```

```js

// continuous 将 0 - 50 映射到 0 - 420
x = d3.scaleLinear()
    .domain([0, 50])
    .range([0, 420]);

// 计算 5 的scale的值
x(5);

// evenly-space， evenly-sized band
y = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, 20 * data.length])

// ordinal
z = d3.scaleOrdinal()
    .domain(["apples", "limes", "blueberries"])
    .range(["red", "green", "blue"])

```

<div class="text-01"></div>
<script>
var text01 = ['a', 'b', 'c'];
var text01Container = d3.selectAll('.text-01')
        .style('background', 'grey')
        .style('color', 'white')
        .style('height', '100px');
text01Container.selectAll('div')
        .data(text01)
        .join('div')
        .style('display', 'inline-block')
        .style('margin', '2px')
        .text(d => d);
</script>
