---
title: Python MRO
tags:
  - Python
  - MRO  
date: '2019-07-29T00:00:00.000Z'
---

Method Resolution Order


#### 算法


```python

C1 C2 ... CN

head = C1

tail = C2 ... CN

```

The linearization of C is the sum of C plus the merge of the linearizations of the parents and the list of the parents.

```python

L[C(B1 ... BN)] = C + merge(L[B1] ... L[BN], B1 ... BN)

```

take the head of the first list, i.e `L[B1][0]`; if this head is not in the tail of any of the other lists, then add it to the linearization of C and remove it from the lists in the merge, otherwise look at the head of the next list and take it, if it is a good head. Then repeat the operation until all the class are removed or it is impossible to find good heads. In this case, it is impossible to construct the merge, Python 2.3 will refuse to create the class C and will raise an exception.


#### 例子：

```python

O = object


class F(O):
    def __init__(self):
        super().__init__()
        print("__init__ of F")


class E(O):
    def __init__(self):
        super().__init__()
        print("__init__ of E")


class D(O):
    def __init__(self):
        super().__init__()
        print("__init__ of D")


class C(D, F):
    def __init__(self):
        super().__init__()
        print("__init__ of C")


class B(D, E):
    def __init__(self):
        super().__init__()
        print("__init__ of B")


class A(B, C):
    def __init__(self):
        super().__init__()
        print("__init__ of A")

```

计算过程：

```python

L(O) = O
L(F) = F O
L(E) = E O
L(D) = D O
L(C) = C + merge(D O, F O, D F) 
       = C D + merge(O, F O, F) 
       = C D F + merge(O)
       = C D F O
L(B) = B + merge(D O, E O, D E) 
       = B D + merge(O, E O, E)  
       = B D E + merge(O)
       = B D E O

L[A] = A + merge(B D E O, C D F O, B C)       # B符合条件 
       = A B + merge(D E O, C D F O, C)       # D不符合条件，属于第二个的tail，C符合条件
       = A B C + merge(D E O, D F O)          # D符合条件
       = A B C D + merge(E O, F O)            # E符合条件
       = A B C D E + merge(O, F O)            # O不符合条件，属于第二个的tail，F符合条件
       = A B C D E F + merge(O, O)            # O符合条件
       = A B C D E F O
               
```

通过API获取MRO：

```python

A()
# __init__ of F
# __init__ of E
# __init__ of D
# __init__ of C
# __init__ of B
# __init__ of A

print(A.mro())
# [
#        <class '__main__.A'>, 
#        <class '__main__.B'>, 
#        <class '__main__.C'>, 
#        <class '__main__.D'>, 
#        <class '__main__.E'>, 
#        <class '__main__.F'>, 
#        <class 'object'>
# ]

```
