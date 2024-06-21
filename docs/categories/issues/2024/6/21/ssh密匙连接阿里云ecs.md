---
title: 使用ssh密匙连接阿里云ecs
date: 2024/06/21 12:32
categories:
  - '"杂碎"逆袭史'
tags:
  - vitepress
  - 部署
---


# 使用ssh密匙连接阿里云ecs

 ## 1、创建密匙
 
[详细文档](https://help.aliyun.com/document_detail/51798.html?spm=a2c4g.11186623.6.665.1e227bfeFM3Scw)

在控制台创建密钥对并下载.pem私钥文件
将下载下来的 .pem 私钥文件放到 ~/.ssh/ 文件夹下，一会连接时候用。

## 2、绑定SSH密钥对

ECS实例绑定SSH密钥对
[详细步骤](https://help.aliyun.com/document_detail/51796.html?spm=a2c4g.11186623.2.11.2cfe47375ns6J5#concept-zzt-nl1-ydb)

> 服务器记得开放 22端口 给 ssh 连接

## 3、连接

**1. 通过命令配置所需信息并连接实例**

```
# 修改私钥文件属性
chmod 400 ~/.ssh/zy-server.pem
# 连接
ssh -i ~/.ssh/zy-server.pem root@公网ip
```

然后输入密码就连接上啦

**2. 通过 config 配置所需信息并通过命令连接实例**

![](../../../../../public/img/2024/Pasted%20image%2020240621190813.png)

可以在这里将实例的名称改的短一点，刚买回来的是一串随机的英文码，然后开始配置。
```yml
cd ~/.ssh
vi config
# 开始编辑config文件，加上下面代码

#my 阿里云server
        Host zy-server # ECS实例名称
        HostName xxx.xxx.xxx.xxx # ECS公网IP
        Port 22 # 输入端口号，默认22
        User root # 登录账户
        IdentityFile ~/.ssh/zy-server.pem # .pem私钥在本机的位置
```

接下来只需要输入` ssh zy-server `就可以进行连接啦


> 扩展知识：上面的ssh连接是支持ssh命令的环境，如linux、mac等；window是不支持的，需要下载PuTTY等远程工具。（mac的远程工具有secureCRT、goPanel2）；移动设备iOS或者Android可以下载SSH Control Lite或者JuiceSSH等App连接

