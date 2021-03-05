---
title: 'soft, weak, phantom references的区别'
tags:
  - java
  - reference
date: '2018-05-14T00:00:00.000Z'
---

总的来说：
- soft reference在没有强引用的时候，GC会保证在out of memory前被回收，但是可能存在很长时间。
- weak reference在没有强引用的时候，下一次GC会回收他
- phantom reference不能通过`get()`获取对象，在没有强引用的时候，会被加入到reference queue，但是此时对象不会被回收。只有等到调用`clear()`方法，或者phantomReference对象不可达时才会被真正回收。

### soft reference

- ***A softly reachable object has no strong references pointing to it***

- ***all soft references to softly-reachable objects are guaranteed to be cleared before a JVM throws an OutOfMemoryError.***

### weak reference

***A weakly referenced object is cleared by the Garbage Collector when it's weakly reachable( object has neither strong nor soft references pointing to it).***

### soft reference vs. weak reference

- a soft reference may be available for minutes or even hours after the referent becomes unreachable
-  a weak reference will be available only for as long as its referent is still around

```java

    StringBuffer sb = new StringBuffer("Hello World");
    SoftReference<StringBuffer> softReference = new SoftReference<>(sb);
    sb = null;
    System.gc();
    System.out.println(softReference.get()); // Hello World (or null ?)

```


```java

    StringBuffer sb = new StringBuffer("Hello World");
    WeakReference<StringBuffer> softReference = new WeakReference<>(sb);
    sb = null;
    System.gc();
    System.out.println(softReference.get()); //null

```


### Phantom reference


- Can't get a referent of a phantom reference.
- Unlike soft and weak references, ***phantom references are not automatically cleared by the garbage collector*** as they are enqueued. An object that is reachable via phantom references will remain so until all such references are cleared or themselves become unreachable.


```java

    StringBuffer sb = new StringBuffer("Hello World");
    ReferenceQueue<StringBuffer> referenceQueue = new ReferenceQueue<>();
    PhantomReference<StringBuffer> phantomReference = new PhantomReference<>(sb, referenceQueue);
    System.out.println(referenceQueue.poll());
    sb = null;
    System.gc();
    System.out.println(phantomReference.clear()); // 这个时候才会被回收

```
