---
title: Python的特殊方法
tags:
  - Python
date: '2019-07-29T00:00:00.000Z'
---

```python

# x.__init__()          构造函数
# x.__repr__()          the goal of repr is to be unambiguous
# x.__str__()           the goal of str is to be readable


```



#### iterator


```python

# x.__iter__()
# x.__next__()
# x.__reversed__()

```

#### function

```python

# x.__call__()

```


#### set

```python

# s.__len__()
# s.__contains__(k)

```


#### dictionary

```python

# x.__getitem__(k)
# x.__setitem__(k, v)
# x.__delitem__(k)
# x.__missing__(not_exist_key)

```


#### number

```python

# x.__add__(y)
# x.__sub__(y)
# x.__mul__(y)
# x.__truediv__(y)
# x.__floordiv__(y)
# ...

```


#### compare

```python

# x.__eq__(y)           x == y
# x.__ne__(y)           x != y
# x.__lt__(y)           x < y
# x.__le__(y)           x <= y
# x.__gt__(y)           x > y
# x.__ge__(y)           x >= y 
# x.__bool__()          if x

```

#### with block

```python

# x.__enter__()
# x.__exit__(exc_type, exc_value, traceback)

```
