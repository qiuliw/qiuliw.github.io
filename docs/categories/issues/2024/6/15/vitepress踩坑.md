---
title: vitepress踩坑
author: 邱荔枝
date: 2024/06/15 10:05
categories:
 - Bug万象集
tags:
 - vitepress
---

# vitepress踩坑

## 侧边栏遍历路径下文件不能为空

```ts
TypeError: Cannot set properties of undefined (setting 'collapsed')
    at getItemsByDate (file:///Users/qiuliwei/devTools/Github/qiu-blog/docs/.vitepress/config.ts.timestamp-1718444267026-eabdd6fe65dfa.mjs:226:29)
```

issues目录下只有一个index，报错。注释掉getItemsByDate这行恢复正常

```ts{3}
export const sidebar: DefaultTheme.Config['sidebar'] = {
    // 注释掉
  // '/categories/issues/': getItemsByDate("categories/issues"),
}
```

