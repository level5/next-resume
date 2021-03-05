---
title: USE方法
---

### 性能术语：
- IOPS 
- Throughput
- Response Time
- Latency
- Utilizaton
- Saturation
- Bottleneck
- Workload
- Cache

### 时间量级：3.3GHz的CPU

| 事件 | 延时 | 相对时间比例 |
|-|-|-|
| 1CPU周期 | 0.3ns | 1s |
| L1缓存访问 | 0.9ns | 3s |
| L2缓存访问 | 2.8ns | 9s |
| L3缓存访问 | 12.9ns | 43s |
| 主存访问（CPU访问DRAM）| 120ns | 6mins |
| 固态硬盘I/O（闪存） | 50-150μs | 2-6days |
| 旋转磁盘I/O | 1-10ms | 1-12months |
| 互联网：从旧金山到纽约 | 40ms | 4years |
| 互联网：从旧金山到英国 | 81ms | 8years |
| 互联网：从旧金山到澳大利亚 | 183ms | 19years |
| TCP包重传 | 1-3s | 105-317years |
| OS虚拟化系统重启 | 4s | 423years |
| SCSI命令超时 | 30s | 3 thousand years |
| 硬件虚拟化系统重启 | 40s | 4 thousand years | 
| 物理系统重启 | 5m | 32 thousand years |


### USE方法

对于所有的资源，查看他的使用率(utilization)，饱和度(saturation)和错误(errors)。
- resource
- utilization
- saturation
- errors


过程：
1. 识别资源
2. 选择一项资源，出现问题则进行调查：
   1. 是否出现错误
   2. 是否使用率高
   3. 是否饱和
3. 看看问题是否被识别（可能找到问题，需要判断是否是自己关心的问题）？没有的话返回2，直到所有资源都检查完。


资源列表：
- CPU：插槽，核，硬件线程（虚拟CPU）
- 内存：DRAM
- 网络接口：以太网端口
- 存储设备：磁盘
- 控制器：存储，网络
- 互联：CPU，内存，I/O

软件资源：
- 互斥锁
- 线程池
- 进程/线程容量
- 文件描述符容量




