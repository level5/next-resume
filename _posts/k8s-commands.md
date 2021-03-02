---
title: K8s基本概念
tags:
  - k8s
date: '2018-11-05T00:00:00.000Z'
---


#### 基本概念
- service
  - 拥有唯一的ID
  - 拥有一个虚拟IP和Port
  - 提供某种远程服务
  - 映射到提供这种服务的一组容器
- pod
  - 运行在node，node既可以是物理的，也可以是虚拟机
  - Pause容器 + 业务容器
  - 业务容器共享Pause容器的Volume和网络栈
  - Label
- master
  - kube-apiserver
  - kube-controller-manager
  - kube-scheduler
- node
  - kubelet
  - kube-proxy K8s Service的通信和负载均衡机制的重要组件
  - Docker Engine
- RC(Replication Controller)
  - 目标Pod的定义
  - 目标pod的副本数
  - 要监控的目标pod的Label


```bash

# 执行RC文件
kebctl create -f mysql-rc.yaml

kebctl get rc

kebctl get pod

kebctl create -f mysql-svc.yaml

# 创建Service
kebctl get svc

```


```bash

kubectl get nodes

kubectl describe node <node-name>


```

#### Pod

- 一组容器，作为一个整体
- 共享Pause container的IP，挂载的Volume
- Pod IP
- 普通Pod
- 静态Pod
- Label

#### RC

定义了一个期望的场景，即声明某种Pod的副本数量在任意时刻都符合某个预期值。

- Pod期待的副本数
- 用于筛选Pod的Label selector
- 当Pod副本数小于预期，用于创建新Pod的Pod的模板


注意：
- 删除RC不会影响通过RC创建好了的Pod，可以先将replicas的值设置为0，再更新RC
- 有stop和delete命令一次性删除RC和RC控制的全部Pod

```bash

# 运行时修改RC的副本数量
kubectl scale rc redis-slave --replicas=3

```

滚动升级


#### Deployment

目的：
- 创建一个Deployment对象，生成对应的Replica Set并完成Pod副本的创建过程
- 检查Deployment的状态查看部署是否完成
- 更新Deployment以创建新的Pod
- 回滚到前一个版本
- 暂停，修改，进行新的发布
- 扩展Deployment应对高负载
- 检查Deployment状态，确定是否成功发布
- 清理旧版本的Replica set


```bash

kubctl create -f tomcat-deployment.yaml

kubectl get deployments

kubectl get rs


```

#### StatefulSet



#### Service



- 全局虚拟IP
- Servcie name到Cluster IP的DNS映射
- 注入环境变量



node ip, pod ip cluster ip
- node ip - node的ip
- pod ip - pod的pid
  - docker0网桥的ip
- cluster ip - service的ip

外部如何访问：
- NodePort - 在K8s集群的每个Node上为需要外部访问的Service开启一个对应的TCP监听端口。


#### Volume

