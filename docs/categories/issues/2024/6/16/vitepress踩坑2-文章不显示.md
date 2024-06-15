---
title: vitepress踩坑2-文章不显示
author: 邱荔枝
date: 2024/06/16 04:48
categories:
 - Bug万象集
tags:
 - vitepress
---

# vitepress踩坑2-文章不显示

图片路径需要使用相对于public的绝对路径
```markdown
![](../../../public/img/2024/f4fc3f0e308b0345d20a16818fc5519b.png) // [!code error]
![](/img/2024/f4fc3f0e308b0345d20a16818fc5519b.png) // 需要这样写

```