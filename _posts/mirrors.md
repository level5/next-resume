---
title: Maven, NPM, Google Font 常用的镜像仓库和代理
tags: 
  - proxy
  - registry
date: '2021-02-25T00:00:00.000Z'
keys: 
    - maven
    - npm
    - google font
    - proxy
    - registry
    - 代理
    - 镜像
---

#### maven仓库的镜像配置

在settings.xml(settings.xml有多个可能的位置，需要了解配置文件生效的优先级)中添加：


设置镜像：

```xml
<mirrors>
    <mirror>
      <id>ali mirror</id>
      <name>ali mirror</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>        
    </mirror>
</mirrors>
```

设置Proxy：

```xml
<proxies>
    <proxy>
        <id>example-proxy</id>
        <active>true</active>
        <protocol>http</protocol>
        <host>proxy.example.com</host>
        <port>8080</port>
        <username>proxyuser</username>
        <password>somepassword</password>
        <nonProxyHosts>www.google.com|*.example.com</nonProxyHosts>
    </proxy>
</proxies>
```
#### npm仓库的镜像配置方式

仓库镜像配置：

淘宝的npm镜像：[https://developer.aliyun.com/mirror/NPM](https://developer.aliyun.com/mirror/NPM)

可以按照上面网页的描述来安装cnpm模块，或者修改自己的registry的配置。：
 
```bash
npm config set registry https://registry.npm.taobao.org
```

这等同于修改当前用户目录下的`.npmrc`文件
(.npmc文件有四个位置, npm config命令可以修改global的或者用户目录下的配置)。

```ini
registry=https://registry.npm.taobao.org/
```

如果镜像的TLS证书npm无法校验其是否为对应域名的合法拥有者。可以添加配置来忽略证书的校验。
但是需要了解添加此配置的风险(可以去参考https链接建立的流程，了解证书校验的目的)。
```ini
strict-ssl=false
```

或者设置环境变量`npm_config_registry`。


也可以在单次安装的时候通过命令来指定registry。

```bash
npm install lodash --registry=https://registry.npm.taobao.org
```

Proxy设置：

当环境变量中设置了`http_proxy`或者`HTTP_RPOXY`有配置的话，npm的`request`库会直接使用这个proxy。

也可以通过config配置proxy键，值为url。url的定义如下， 如果需要设置用户密码，可以在其中配置
（密码的特殊字符可能需要转码，可以在浏览器console中encodeURIComponent(str)来转码）：
```
<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>
```

#### google font的镜像及配置

https://fonts.googleapis.com 的镜像： 
https://fonts.googleapis.cnpmjs.org。

使用方式：
```css

/* 对于: https://fonts.googleapis.com/css?family=Exo+2:200, 将host部分替换 */
@import url('https://fonts.googleapis.cnpmjs.org/css?family=Exo+2:200');

```

