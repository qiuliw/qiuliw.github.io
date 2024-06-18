---
title: react搜索高亮的简易实现
date: 2024/06/18 21:57
categories:
  - 方案春秋志
tags:
  - react
---
# react搜索高亮的简易实现

**效果**![](../../../../../public/img/2024/Pasted%20image%2020240618220230.png)

**代码**

> 使用react的`dangerouslySetInnerHTML` ，类似`innerHtml`。`__html`属性的值会被解析到视图

Js

```TS{9}
async function getFilterResultArray(term: string) {
    return domainList.filter(item => (
        item.id?.toLocaleLowerCase().includes(term.toLocaleLowerCase()) || 
        item.domainName?.toLocaleLowerCase().includes(term) || 
        item.secondDomain?.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )).map((item)=>{
            let i={...item};
            if(item.id?.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
                    i.id=i.id?.replace(term,`<span class="mark">${term}</span>`)
            }
            return i;
        })
}
```

html

```TSX
  <div className="shopTitle" dangerouslySetInnerHTML={{
      __html: item?.id
  }}/>
```

css

```CSS
.mark{
    color: #008db1;
    font-weight: 600;
}
```

## dangerously

::: danger 为什么叫  dangerouslySetInnerHTML（危险的设置内部HTML）
要知道有这么一句话：“永远不要相信用户的输入”。用户有时候不会按照程序员所设想的规则来进行数据的输入，比如想要用户输入数字，用户却输入的是文本，类似的情况比比皆是。

不合时宜的插入HTML可能会导致网站**被某些不良分子进行XSS攻击**，作者取名dangerouslySetInnerHTML也是为了警示程序员，不要随意的使用该属性。
:::

