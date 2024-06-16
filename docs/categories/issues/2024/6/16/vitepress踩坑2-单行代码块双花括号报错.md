---
title: vitepress踩坑2-单行代码块双花括号报错
date: 2024/06/16 18:05
categories:
  - Bug万象集
tags:
  - vitepress
---

# vitepress踩坑2-单行代码块双花括号报错

错误提示
```
[vite:vue] Error parsing JavaScript expression: Unexpected token, expected "," (1:4)
file: /Users/qiuliwei/devTools/Github/qiuliw.io/docs/courses/react18/01-基础使用/01-JSX组件.md:82:27
✖ building client + server bundles...
build error:
SyntaxError: Error parsing JavaScript expression: Unexpected token, expected "," (1:4)
    at createCompilerError (/Users/qiuliwei/devTools/Github/qiuliw.io/node_modules/.pnpm/@vue+compiler-core@3.3.9/node_modules/@vue/compiler-core/dist/compiler-core.cjs.prod.js:17:17)
```

报错的文档内容
```markdown
1. 内联样式，要用 `style={{key:value}}`的形式去写。
```

原因：双花括号为vue的插值语法

## 方法1 

解决：使用`v-pre` 跳过vue解析过程

改正后的文档内容
```markdown
<span v-pre>
1. 内联样式，要用`style={{key:value}}`的形式去写。
</span>

```

显示为

<span v-pre>
1. 内联样式，要用`style={{key:value}}`的形式去写。
</span>

> 但是markdown语法同样不会被解析


## 方法2

**在行内代码中使用`<code v-pre></code>`来包裹**：

```
1. 内联样式，要用 <code v-pre>{{ biz.xxx }}</code> 的形式去写
```

显示为

1. 内联样式，要用 <code v-pre>{{ biz.xxx }}</code> 的形式去写



