---
title: CPU负载和CPU使用率
date: '2020-08-05T00:00:00.000Z'
---

平均负载和CPU使用率并没有直接关系。

```bash
uptime
#  21:54:16 up 10 days, 12:10,  1 user,  load average: 0.00, 0.00, 0.00
```

`uptime`, 返回的结果：
- 当前时间
- 系统运行时间
- 正在登陆的用户
- 过去一分钟，五分钟，十五分钟的平均负载

***平均负载***，单位时间内，系统处于***可运行状态***和***不可中断状态***的平均进程数，也就是平均活跃进程数。
- 可运行状态，正在使用CPU或者正在等待CPU的进程，PS命令中状态处于R（Running， Runnable）的进程
- 不可中断状态，正处于内核态关键流程中的进程，并且这些流程是不可打断的。PS命令中，状态处于D(Uninterruptible Sleep, Disk Sleep)的进程


CPU个数：
```bash

grep 'model name' /proc/cpuinfo | wc -l
# 1

```

平均负载高于CPU数量的70%时（CPU数量为10时，平均负载超过7），需要排查。


```bash

watch -d uptime

```

```bash
# CPU使用率的变化
# -P ALL 监控所有CPU
# 5 每隔五秒输出一组数据
mpstat -P ALL 5

# 10:11:18 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
# 10:11:23 PM  all    0.40    0.00    0.20    0.00    0.20    0.00    0.00    0.00    0.00   99.20
# 10:11:23 PM    0    0.40    0.00    0.20    0.00    0.20    0.00    0.00    0.00    0.00   99.20

# 进程
pidstat -u 5 1
# 10:13:49 PM   UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
# 10:13:54 PM     0       436    0.00    0.20    0.00    0.00    0.20     0  xfsaild/vda1
# 10:13:54 PM     0      8154    0.20    0.20    0.00    0.00    0.40     0  AliYunDun

```


平均负载与CPU使用率的关系：
- CPU密集型进程，使用大量CPU会导致平均负载升高，此时两者是一致的。
- IO密集型进程，等待IO也会导致平均负载升高，但是CPU使用率不一定很高。
- 大量等待CPU的进程调度也会导致平均负载升高，此时的CPU使用率也会比较高



CPU上下文切换：
- 进程上下文切换
- 线程上下文切换
- 中断上下文切换


系统调用，需要从用户空间切换到内核空间。然后再切换回用户空间（发生两次CPU上下文切换）

系统调用过程中，并不会涉及到虚拟内存等进程用户态的资源切换，也不会切换进程。不同于我们通常所说的进程上下文切换。***系统调用过程通常称为特权模式切换***

过多上下文切换，会把CPU时间消耗在寄存器，内核栈级虚拟内存等数据的保存和恢复上。

查看上下文切换：

```bash

vmstat 5

# procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
# r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
# 2  0      0 250748   2104 1291372    0    0     1     7   30   17  1  1 99  0  0

```

- cs(context switch) 每秒上下文切换的次数
- in(interrupt) 每秒中断的次数
- r(Running or Runnable) 就绪队列长度，正在运行和等待CPU的进程数
- b(Blocked) 处于不可中断状态的进程数


```bash
# -w 查看进程的上下文切换情况
pidstat -w 5
# 10:38:04 PM   UID       PID   cswch/s nvcswch/s  Command
# 10:38:09 PM     0         9      0.40      0.00  ksoftirqd/0
# 10:38:09 PM     0        10     14.97      0.00  rcu_sched


# cswch - voluntary context switches
# nvcswch - non-voluntary context switches

```
- 自愿上下文切换，指进程无法获取所需要资源，导致的上下文切换；
- 非自愿上下文切换，进程由于时间偏已经到等原因，被系统强制调度，进而发生上下文切换。

是否为性能问题：
- 自愿上下文切换变多，说明进程在等待自愿，可能发生了IO等问题。
- 非自愿上下文切换变多，说明进程被强制调度，也就是在争抢CPU，说明CPU的确成了瓶颈。
- 中断次数变多，说明CPU被中断处理程序占用，需要通过/proc/interrupts文件来分析具体的中断类型。


```bash

cat /proc/interrupts

```


CPU使用率
- user （us） 用户态CPU时间，不包含nice时间，但包含guest时间
- nice （ni） 低优先级用户态CPU时间，进程nice值被调整为1-19之间的CPU时间（nice取值范围 -20 - 19，数值越大，优先级越低）
- system （sys） 内核态CPU时间
- idle （id） 空闲时间，不包含等待IO的时间（iowait）
- iowait （wa） 等待IO的CPU实际
- irq （hi） 处理硬中断的CPU时间
- softirq （si） 处理软中断的CPU时间
- steal （st） 系统运行在虚拟机中的时候，被其他虚拟机占用的CPU时间
- guest （guest）通过虚拟化运行其他操作系统的时间，也就是运行虚拟机的CPU时间
- guest_nice （gnice） 代表以低优先级运行虚拟机的时间


