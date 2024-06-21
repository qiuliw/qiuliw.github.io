---
title: react中css插件styled-components类似Vue-Scoped
date: 2024/05/23 016:47
categories:
  - '"杂碎"逆袭史'
tags:
  - react
---

# react中css插件styled-components类似Vue-Scoped


```JSX
import styled from "styled-components"

export default function PriceOrTransaction() {
    return (
        <Scoped>
            {/* 在这里写JSX代码 */}
        </Scoped>
    )
}

// styled.div 是导入的模块函数，先于当前模块被执行。虽然看起来后声明，但实际先被处理。
//PriceOrTransaction()被调用时，styled已被初始化完成
const Scoped = styled.div`
    // 这里写css，类选择器标签选择器都可以使用
`
```

> vscode css样式提示插件：vscode-styled-components