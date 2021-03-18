---
title: Python Scope
tags:
  - Python
  - Scope
date: '2019-08-01T00:00:00.000Z'

---
#### namespace

- built-in names
- global names in module
- local names in a function invocation
- the set of attribute of object


```python
import builtins

# builtin的方法都在builtins模块
print(builtins.abs)

```


- the innermost scope, which is searched first, contains the local names
- the scopes of any enclosing functions, which are searched starting with the nearest enclosing scope, contains non-local, but also non-global names
- the next-to-last scope contains the current module’s global names
- the outermost scope (searched last) is the namespace containing built-in names


If a name is declared global, then all references and assignments go directly to the middle scope containing the module’s global names.

```python
# 注意是statement
class ClassName:
    <statement-1>
    .
    .
    .
    <statement-N>

```

When a class definition is entered, a new namespace is created, and used as the local scope — thus, 
all assignments to local variables go into this new namespace. 
In particular, function definitions bind the name of the new function here.


```python

class Dog:

    kind = 'canine'         # class variable shared by all instances

    def __init__(self, name):
        self.name = name    # instance variable unique to each instance

```
