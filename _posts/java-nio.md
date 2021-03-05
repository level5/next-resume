---
title: NIO的Channel, Buffer, Selector
date: '2019-04-08T00:00:00.000Z'
tags:
- java
- NIO
references:
  - 'http://tutorials.jenkov.com/java-nio/selectors.html'
---

## Channel
- Channel类似于Stream，但是Channel可以读写；
- Stream只能读或者写。Channel可以进行异步的读写；
- Channel读取数据到Buffer中，从Buffer中读取数据来写；

```java

RandomAccessFile aFile = new RandomAccessFile("data/nio-data.txt", "rw");
FileChannel inChannel = aFile.getChannel();

ByteBuffer buf = ByteBuffer.allocate(48);

int bytesRead = inChannel.read(buf);

while (bytesRead != -1) {

  System.out.println("Read " + bytesRead);
  buf.flip(); // buffer切换模式，从写变成读。

  while(buf.hasRemaining()){
      System.out.print((char) buf.get());
  }

  buf.clear(); // 清除，并从读切换成写
  bytesRead = inChannel.read(buf);
}
aFile.close();

```


## Buffer

buffer有两个模式，读模式和写模式。可以切换模式：
- 从写模式到读模式：
    - `buf.flip()`
- 从读模式到写模式：
    - `buf.clear()`, 清除并切换。
    - `buf.compact()`，清除已经读的数据，并切换。未读的数据会移动到buffer的开头。

Buffer
- capacity，这个很好理解，就是buffer的容量。
- position， 初始值为0。表示读写开始的位置。比如从写模式切换到读模式，position就被设置为0。
- limit，就是可以读写到的位置，在写模式中，limit就和capacity一样，表示可以写满了。读模式中，表示可以读取到的位置。所以当从写模式切换到读模式的时候，limit就被设置为开始的position了。

使用Buffer的流程：

1. 数据写入到Buffer
2. 调用`buffer.clip()`
3. 从Buffer中读取数据
4. 调用`buffer.clear()`或者`buffer.compact()`

## TransferTo

```java

RandomAccessFile fromFile = new RandomAccessFile("fromFile.txt", "rw");
FileChannel      fromChannel = fromFile.getChannel();

RandomAccessFile toFile = new RandomAccessFile("toFile.txt", "rw");
FileChannel      toChannel = toFile.getChannel();

long position = 0;
long count    = fromChannel.size();

fromChannel.transferTo(position, count, toChannel);

```


## Selector

selector可以用判断多个channel是否准备好读或者写。这样可以使用一个thread来管理多个channel。

```java

Selector selector = Selector.open();

// 需要切换到 non-blocking mode 
channel.configureBlocking(false);

// 支持的Event：
// OP_CONNECT
// OP_ACCEPT
// OP_READ
// OP_WRITE
SelectionKey key = channel.register(selector, SelectionKey.OP_READ);

while(true) {

  int readyChannels = selector.selectNow();

  if(readyChannels == 0) continue;


  Set<SelectionKey> selectedKeys = selector.selectedKeys();

  Iterator<SelectionKey> keyIterator = selectedKeys.iterator();

  while(keyIterator.hasNext()) {

    SelectionKey key = keyIterator.next();

    if(key.isAcceptable()) {
        // a connection was accepted by a ServerSocketChannel.

    } else if (key.isConnectable()) {
        // a connection was established with a remote server.

    } else if (key.isReadable()) {
        // a channel is ready for reading

    } else if (key.isWritable()) {
        // a channel is ready for writing
    }

    // 需要手动将其移除，下次ready之后，会被重新加入。
    keyIterator.remove();
  }
}

```

