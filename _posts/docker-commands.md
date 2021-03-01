---
title: 常用docker命令
tags:
  - container
  - docker
date: '2018-08-03T00:00:00.000Z'
---


```
docker run -d -p 80:80 httpd
```
发生了什么：
1. 从docker hub下载httpd镜像；
2. 启动httpd容器，并将容器的80端口映射到host的80端口


docker的核心组件：
1. docker客户端
2. docker服务器
3. docker image
4. registry
5. docker container


```shell

# 从Registry下载镜像
docker pull 

# 先下载image(如果没有的话),然后再启动container
docker run


# 显示已下载的image
docker images

# 显示运行中的容器
docker ps
docker container ls


```

#### Dockerfile

```Dockerfile

# 从0开始
FROM scratch
# 将文件hello拷贝到根目录
COPY hello /
# 容器启动时，执行/hello
CMD ["/hello"]

```

```dockerfile

# 通过扩展其他镜像
FROM debian
RUN apt-get install emacs
CMD ["/bin/bash"]

```

分层，新的镜像从base一层层叠加生成。每安装一个软件，叠加一层。当容器启动时，一个新的可写层被加载到镜像的顶部。

只有容器层可写，所有镜像层都是只读。


```bash

# 交互的方式运行容器
docker run -it ubuntu

# 执行命令修改容器，比如安装软件

#生成新的镜像
docker commit

```


```bash
# 通过dockerfile构建
docker build

coker build --no-cache

```

dockerfile常用命令：
- FROM 指定base image
- MAINTAINER 作者，字符串
- COPY 从***build context***复制文件到镜像
  - COPY src dest
  - COPY ["src", "dest"]
- ADD 类似COPY，区别是如果src是压缩文件（tar, zip, tgz, xz），文件会自动解压到dest
- ENV 设置环境变量,环境便令会被后面的指令使用
  - ENV JAVA_HOME /opt/java/bin
- EXPOSE 指定容器中的进程监听某个端口
- VOLUME
- WORKDIR 为后面的RUN， CMD ENTRYPOINT ADD COPY等指令设定工作目录
- RUN 在容器中运行指定的命令
- CMD 
- ENTRYPOINT 

CMD vs ENTRYPOINT
[(stackoverflow)](https://stackoverflow.com/questions/21553353/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile):
- docker的默认entrypoint是`/bin/sh -c`,但没有默认的cmd。
- cmd是通过entrypiont来执行，比如`docker run -it ubuntu bash`，默认`/bin/sh -c`, 命令是`bash`.
- 当指定entrypoint为`/bin/cat`, 执行`docker run img /etc/passwd`, 执行结果就是`/bin/cat /etc/passwd`



CMD不停止，container就会一直运行


```bash

# -d 后台运行
docker run -d ubuntu xxx


docker stop <id>

docker history httpd

# attach到启动命令行，可以通过ctrl+p，然后ctrl + q组合退出attach
docker attach <id>

docker exec -it <id> bash

# 单纯查看启动命令的output的话， -f类似于tail -f
docker logs -f <id>

```

#### attach vs exec:
- attach进入***启动命令***的终端
- exec则是在容器中打开新的终端


#### 容器运行
- docker run命令行指定的命令执行完，容器就停止。
- 通过-d参数在后台执行
- 通过exec -it可进入容器并执行命令
- 指定容器的方式：
  - 短id
  - 长id
  - 容器名字，--name给容器命名，docker rename重命名


```bash

docker stop

docker kill

# 启动停止了的容器
docker start

docker restart

# 暂停容器
docker pause/unpause

# 删除容器
docker rm

# 删除镜像
docker rmi

# 创建但是不启动
docker create

```


```bash
# -m --memory: 限制内存大小， 1M 1G
# --memory-swap: 内存+swap的大小
# 200M的内存，和100M的swap空间
docker run -m 200M --memory-swap=300M ubuntu


# --cpu-shares CPU权重，默认1024
docker run --cpu-shares=512 ubuntu

# -blkio-weight block IO权重，默认500
# bps， iops
```

```bash

# 自动创建的三个网络 bridge, host, none
docker network ls

# none 就没有网络 
docker run -it --network=none ubuntu

# host 主机的网络
docker run -it --network=host ubuntu

# Docker 安装时会创建一个 命名为 docker0 的 linux bridge
# 不指定，自动加入这个
docker run -it ubuntu

# 查看网络信息
docker network inspire bridge


# 三种类型的网络驱动 bridge， overlay, macvlan
# 自己创建网络
docker network create --driver bridge mynet
# 指定网段 --subnet, --gateway
docker network create --driver bridge --subnet 172.22.16.0/24 --gateway 172.22.16.1 mynet
# 指定网络 
docker run -it --network=mynet ubuntu
# 指定ip --ip
docker run -it --network=mynet --ip=172.22.16.8 ubuntu

# 查看网络
brctl show

docker network inspire mynet


# 给一个容器添加一个网卡，来链接到一个网卡
docker network connect mynet <id>


```

#### docker DNS Server

docker daemon内建了DNS Server。但是只能在自定义网络中使用。

```bash

# --name 为容器命名
docker run -it --network=mynet --name=u1 ubuntu
docker run -it --network=mynet --name=u2 ubuntu

```

#### joined容器

join的容器共享一个网络栈，可以通过127.0.0.1来通讯。

```bash

docker run -d -it --name=web httpd
docker run -it --network=container:web ubuntu

```

#### 与外界通讯

docker容器通过NAT访问外部网络。

外部访问docker容器的话，通过端口映射的方式。

```bash

# 动态映射容器的80端口到host
docker run -d -p 80 httpd
# 指定映射容器的80端口到host的8080
docker run -d -p 8080:80 httpd

# 查看port的映射
docker ps
docker port <id>

```

#### docker的数据存放方式

- storage driver管理的镜像层和容器层。- 容器由最上面一个可写的容器层，以及若干只读的镜像层组成，容器的数据就存放在这些层中。
  - 新数据会直接存放在最上面的容器层。
  - 修改现有数据会先从镜像层将数据复制到容器层，修改后的数据直接保存在容器层中，镜像层保持不变。
  - 如果多个层中有命名相同的文件，用户只能看到最上面那层中的文件。
- Data Volume
  - 本质就是直接将host的文件mount到容器
  - 容器可以读写volume中的数据
  - volume的数据可以永久保存，即使容器被删除。


```bash

# -v bind mount
# host中的位置：容器中的位置：读写权限
docker run -d -p 8080:80 -v ~/html:/usr/nginx/html nginx

# ready-only
docker run -d -p 8080:80 -v ~/html:/usr/nginx/html:ro nginx

```

bind mount 需要指定 host 文件系统的特定路径，这就限制了容器的可移植性，当需要将容器迁移到其他 host，而该 host 没有要 mount 的数据或者数据不在相同的路径时，操作会失败。


docker managed volume:

```bash

# 只指定目的
# 会在/var/lib/docker/volumes 中创建一个目录，并将镜像中的/usr/nginx/html拷贝到这个目录
docker run -d -p 8080:80 -v /usr/nginx/html nginx


# 查看volume，只能查看docker managed volume
docker volume ls
```


在host和容器之间复制数据

```bash

docker cp <path in host> <id>:><path in container>

```

或者直接将数据拷贝到docker managed volume对应的目录（/var/lib/docker/voluems下对应的目录。）


容器之间拷贝数据

将一个目录通过bind mount的方式 mount到三个容器上。


volume container： 专门为其他容器提供volume的容器。

```bash

# 创建volume container，不需要运行。
docker create --name my_data -v ~/html:/usr/nginx/html -v /usr/tools ubuntu


# 其他容器使用volume container
docker run --name web1 -d -p 80 --volume-from my_data nginx
docker run --name web2 -d -p 80 --volume-from my_data nginx
docker run --name web3 -d -p 80 --volume-from my_data nginx

```

目的：有什么问题，多加一层。
其实就是通过添加一个层的方式来解耦容器和host


```dockerfile

FROM ubuntu:latest
ADD html /usr/nginx/html
VOLUME /usr/nginx/html
```


```bash

# 生成新的image命名为my_data_img
docker build -t my_data_img .

# 不需要指定-v了。
docker create --name my_data my_data_img

# 使用
docker run --name web1 -d -p 80 --volume-from my_data nginx
docker run --name web2 -d -p 80 --volume-from my_data nginx
docker run --name web3 -d -p 80 --volume-from my_data nginx
```


```bash

# 不带-v不会删除对应的volume
docker rm <id>

# 但是可以通过volume命令查询
docker volume ls

# 在通过volume rm删除
docker volume rm <volume-id>

```


#### 跨host的网络

- sandbox
- enterpoint
- network



#### 监控

```bash

# 当前运行的容器
docker container ps


# 
docker container top <命令>
docker container top sysdig

# 显示容器的各种资源
docker container stats

```