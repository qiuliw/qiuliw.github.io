---
title: 静态网站部署阿里云ecs（ubantu）
date: 2024/06/20 21:01
isOriginal: false
author: 他佬
articleLink: https://www.jianshu.com/p/e23d3b7d7a91
categories:
  - '"杂碎"逆袭史'
tags:
  - 部署
  - 阿里云
  - nginx
---

# 静态网站部署阿里云ecs（ubantu）

文章简单的实现浏览器访问自己域名网址

这里我默认大家已经购买了阿里云 ESC 云服务器以及域名

## 1、登陆查看云服务器


![](../../../../../public/img/2024/e14c99f58ab68f73e38aafee36d26c65_MD5.webp)
## 2、重做服务器系统 --- 并不是必须

![](../../../../../public/img/2024/89dec7c7662671f993f9be26488d0a67_MD5.webp) image

![](../../../../../public/img/2024/88d27bbab6a9349883ad1d5739f3e627_MD5.webp)

![](../../../../../public/img/2024/329108a209c420eb5d62b25673a92549_MD5.webp) 

第一可以更换操作系统

![](../../../../../public/img/2024/3c27e70957fd7a0770a92612be1a29a5_MD5.webp)

第二可以重新初始化磁盘（跟第一选一个）

![](../../../../../public/img/2024/54458d1203538b47e079d4478d703a81_MD5.webp)

![](../../../../../public/img/2024/ed038b9756429efd323fedb04fea5d9b_MD5.webp)

![](../../../../../public/img/2024/4bb52a9cf23441ca9d0c11b283fa10c3_MD5.webp)

![](../../../../../public/img/2024/deed813d72931b2dc9cf6ce4793c792e_MD5.webp)

![](../../../../../public/img/2024/ea3f1933280dec6230097bf6ef8c9fc8_MD5.webp)

![](../../../../../public/img/2024/b394b17fe40c09e0f0894a786a0e6381_MD5.webp) 

![](../../../../../public/img/2024/d08caec1d9df1aa2e58b649b4e8b58a0_MD5.webp) 

## 3、准备连接服务器的工具


点击 [finalshell](https://links.jianshu.com/go?to=http%3A%2F%2Fmydown.yesky.com%2Fpcsoft%2F413551229.html) 

## 4. 连接服务器


![](../../../../../public/img/2024/441660fd304b9fbe2219224cfc183edc_MD5.webp)

选择 SSH 连接

![](../../../../../public/img/2024/58994c38cb5ae1772ba46728b21dcaf2_MD5.webp) 

![](../../../../../public/img/2024/38ca2b77fa64883090d276a07ed09ee1_MD5.webp) 

![](../../../../../public/img/2024/901475c287f3d7ba4e59a0083b5e4252_MD5.webp)

![](../../../../../public/img/2024/2025c731fbd9ad120ba1cc67438b044d_MD5.webp) 
## 5、nginx 介绍

Nginx 是一款轻量级的 Web 服务器 / 反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在 BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上 nginx 的并发能力确实在同类型的网页服务器中表现较好，中国大陆使用 nginx 网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。  
负载均衡、反向代理

## 6、安装 nginx


```
yum install -y nginx
```

![](../../../../../public/img/2024/ebbf75475c650b9e5e4400110efa6b6b_MD5.webp) 

设置开机启动

```
systemctl start nginx.service
systemctl enable nginx.service
```

![](../../../../../public/img/2024/ac9217a36d318db24c84ba386cd5d6f2_MD5.webp) 

浏览器输入服务器公网 IP 地址查看效果

![](../../../../../public/img/2024/6f2f29fc796713898f9a53b2c9799cef_MD5.webp)

由于 nginx 默认使用端口 80， ecs 实例没有开启端口 80，默认只有 22 和 3389

![](../../../../../public/img/2024/3842f6796a53859614e0476cce0a492a_MD5.webp)

![](../../../../../public/img/2024/7bf5f96f9fc69f3df9a576e5a994f892_MD5.webp)

![](../../../../../public/img/2024/aa78f6ad7915eef8a86698017a961dbf_MD5.webp)

![](../../../../../public/img/2024/62147a03ce34408f71ab22c095fa8391_MD5.webp)

此时浏览器再次访问，表明当前服务器中 nginx 安装配置完成

![](../../../../../public/img/2024/ab7a8a0742fe29acdcfa9ad27cd3bfe0_MD5.webp)image

## 7、然后使用域名代替 访问服务器 IP


![](../../../../../public/img/2024/80c252f5df91130bb08eaccfb44deb1b_MD5.webp) image.png

![](../../../../../public/img/2024/9038cdfc919b8f4af0a15b261c447624_MD5.webp) image.png

![](../../../../../public/img/2024/bf009ca42ccab4a5b5c68cb19ee62962_MD5.webp)image

然后就可以通过域名访问了

## 9、最最最最最终要的来了！！！


想让域名显示自己想要的页面 则需要提前准备一个 index.html 文件（这里不用项目部署）简单实现页面的渲染

### 1. 命令行输入

```
cd /usr/share/nginx/html
```

### 2. 将提前准备好的 index.html 文件拖入替换掉原来的 index.html 文件

![](../../../../../public/img/2024/018e6dfed0bb11974b8fde7017c521cd_MD5.webp) image.png

再次访问域名就成功了。

