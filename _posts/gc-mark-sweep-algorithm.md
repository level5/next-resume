---
title: 'GC 标记清除算法'
tags:
  - GC
  - mark sweep
date: '2019-06-02T00:00:00.000Z'
---

通过root引用递归标记所以能够被引用的对象。然后遍历内存清除未被引用的对象。

```
mark_sweep() {
  mark_phase()
  sweep_phase()
}

mark_phase() {
  for (r : $roots) {
    mark(*r)
  }
}

mark(obj) {
  if (obj.mark == FALSE) {
    obj.mark = TRUE
    for (child : children(obj)) {
      mark(*child)
    }
  } 
}

sweep_phase() {
  sweeping = $heap_start
  while (sweeping < $heap_end) {
    if (sweeping.mark == TRUE) {
      sweeping.mark = FALSE
    } else {
      sweeping.next = $free_list
      $free_list = sweeping
    }
    sweeping += sweeping.size
  }
}

new_obj(size) {
  chunk = pick_chunk(size, $free_list)
  if (chunk != NULL) {
    return tunk
  } else {
    allocation_fail()
  }
}

```

优点：
- 实现简单
- 与保守式GC算法兼容

什么是保守式GC？

不能识别指针和非指针的GC。因此不能使用需要复制和移动对象的GC算法。


缺点:
- 碎片化
- 分配速度
- 与写时复制技术不兼容

###### 将连续的分块合并

通过将连续的分块合并减少生成的碎片。

```
sweep_phase() {
  sweeping = $heap_start
  while (sweeping < $heap_end) {
    if (sweeping.mark == TRUE) {
      sweeping.mark = FALSE
    } else {
      if ($free_list + $free_list.size == sweeping) {
        $free_list.size += sweeping.size
      } else {
        sweeping.next = $free_list
        $free_list = sweeping
      }
    }
    sweeping += sweeping.size
  }
}

```
###### 利用多个空闲链表

按分块大小分成多个空闲链表，分配时，从合适的链表上获取，减少碎片的生成。

```

new_obje(size) {
  index = size / (WORD_LENGTH / BYTE_LENGTH)
  if (index <= 100) {
    if ($free_list[index] != NULL) {
      chunk = $free_list[index]
      $free_list[index] = $free_list[index].next
      return chunk
    }
  } else {
    chunk = pickup_chunk(size, $free_list[101])
    if (chunk != NULL) {
      return chunk
    }
  }
  allocation_fail()
}

sweep_phase() {
  for(i : 2..101) {
    $free_list[i] = NULL
  }
  sweeping = $head_start
  while (sweeping <= $heap_end) {
    if (sweeping.mark == TRUE) {
      sweeping.mark = FALSE
    } else {
      index = size / (WORLD_LENGTH / BYTE_LENGTH)
      if (index <= 100) {
        sweeping.next = $free_list[index]
        $free_list[index] = sweeping
      } else {
        sweeping.next = $free_list[101]
        $free_list[101] = sweeping
      }
    }
    sweeping += sweeping.size
  }
}

```

###### 使用bitmap来标记

兼容写时复制技术不兼容，通过bitmap来保存，而不是保存在对象头中。

```
mark (obj) {
  obj_num = (obj - $heap_start) / WORLD_LENGTH
  index = obj_num / WORLD_LENGTH
  offset = obj % WORLD_LENGTH
  
  // 等于0，表示mark == FALSE
  if (($bitmap_tbl[index] & (1 << offset)) == 0) {
    $bitmap_tbl[inde] |= (1 << offset)
    for (child : children(obj)) {
      mark(*child)
    }
  }
}

sweep_phase() {
  sweeping = $heap_start
  index = 0
  offset = 0
  
  while (sweeping < $heap_end) {
    if ($bitmap_tbl[index] & (1 << offset) == 0) {
      sweeping.next = $free_list
      $free_list = sweeping
    }
    index += (offset + sweeping.size) / WORD_LENGTH
    offset = (offset + sweeping.size) % WORD_LENGTH
    sweeping += sweeping.size
  }
  
  for (i : 0..(HEAP_SIZE / WORD_LENGT - 1)) {
    $bitmap_tbl[i] = 0
  }
}

```

###### 延迟清除

清除操作所花费的时间和堆的大小成正比，延迟清除发缩减因清除操作而导致的最大暂停时间。

```

new_obj(size) {
  chunk = lazy_sweep(size)
  if (chunk != NULL) {
  return chunk
  }
  
  mark_phase()
  
  chunk = lazy_sweep(size)
  if(chunk != NULL) {
    return chunk
  }
  
  allocation_fail()
}

lazy_sweep(size) {
  while($sweeping < $head_end) {
    if ($sweeping.mark = TRUE) {
      $sweeping.mark = FALSE
    } else  if ($sweeping.size >= size) {
      chunk = $sweeping
      $sweeping += $sweeping.size
      return chunk
    }
    $sweeping += $sweeping.size
  }
  $weeping = $heap_start
  return NULL
}

```
