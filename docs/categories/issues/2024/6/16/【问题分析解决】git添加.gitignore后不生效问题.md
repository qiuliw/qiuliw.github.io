---
title: 【问题分析解决】git添加.gitignore后不生效问题
date: 2024/06/16 18:11
isOrigin: false
author: 他佬
articleLink: https://blog.csdn.net/xuxu_123_/article/details/131710549
categories:
  - Bug万象集
tags:
---


#### [git](https://so.csdn.net/so/search?q=git&spm=1001.2101.3001.7020) 添加. gitignore 后不生效问题

一，问题现象
------

在已经提交过的 git 管理的项目中，新增加一个. gitignore 文件，或者修改. gitignore 文件之后，新增的内容不生效。

二，问题原因
------

因为我们误解了. gitignore 文件的用途，该文件只能作用于 Untracked Files，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。

之所以你的规则不生效，是因为那些 .log 文件曾经被 Git 记录过，因此. gitignore 对它们完全无效。

三，解决方法
------

1，从 Git 的[数据库](https://so.csdn.net/so/search?q=%E6%95%B0%E6%8D%AE%E5%BA%93&spm=1001.2101.3001.7020)中删除对于该文件的追踪；  
2，把对应的规则写入. gitignore，让忽略真正生效；  
3，提交＋推送。

具体指令：

```
git rm -r --cached .
git add .
git commit 
```
