---
title: vitepress启用giscus
date: 2024/06/19 22:59
isOriginal: false
author: 他佬
articleLink: https://github.com/aiktb/Rea/tree/main
categories:
  - 方案春秋志
tags:
  - vitepress
---
---
# How to Integrate Giscus Comments into VitePress


## Why Choose Giscus

There are various external comment providers for integration with VitePress, such as Disqus, Gitalk, Utterances, Giscus. However, I recommend using Giscus for its superior features. Let's compare it with other providers.

| Provider                                   | Hosting Location   | Adaptive Background | Style Design | Automatic Initialization |
| ------------------------------------------ | ------------------ | ------------------- | ------------ | ------------------------ |
| [Disqus](https://disqus.com/)              | Disqus Server      | ❌                   | Good         |                          |
| [Gitalk](https://github.com/gitalk/gitalk) | Github Issues      | ✅                   | Moderate     | ❌                        |
| [Utterances](https://utteranc.es/)         | Github Issues      | ❌                   | Moderate     |                          |
| [Giscus](https://giscus.app/)              | Github Discussions | ✅                   | Good         | ✅                        |
gitalk需要每次在文章下手动创建issue

如表所示，Disqus和Utterances不能很好地适应背景颜色。Gitalk使用Github Issues作为托管位置，但Giscus利用Github Discussions是更好的选择。它可以防止评论与实际的项目错误报告混合，减少不必要的噪音。此外，与Gitalk相比，Giscus有更好的风格设计。

In summary, Giscus is the best choice for integrating with VitePress. Now, let's dive into the specifics.

## Implementation Steps

注意，你不需要[vitepress-plugin-comment-with-giscus](https://github.com/T-miracle/vitepress-plugin-comment-with-giscus)。这甚至不需要80行代码，而且代码非常易于理解，因此没有必要为此引入依赖项。

### 获取 Github 仓库参数

首先，按照 [giscus.app](https://giscus.app/) 上的说明安装 Giscus Github 应用并获取关键参数：`data-repo`、`data-repo-id`、`data-category` 和 `data-category-id`。

### Coding

Next, create a new `components/comments.vue` component and configure your `Layout.vue` and `index.ts` files. Here is the code:

::: code-group

```vue [components/Comments.vue]
<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
  <div :key="title" class="giscus">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo=" .......... "
      data-repo-id=" .......... "
      data-category=" .......... "
      data-category-id=" .......... "
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-lang="en"
      data-theme="transparent_dark"
      data-loading="lazy"
      async
    />
  </div>
</template>
```

```vue [Layout.vue]
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import Comments from './components/Comments.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <Comments />
    </template>
  </Layout>
</template>
```

```typescript [index.ts]
import Layout from './Layout.vue'

export default {
  Layout,
}
```

:::

Use VitePress built-in [Layout slot](https://vitepress.dev/guide/extending-default-theme#layout-slots) to inject the Giscus comment section below all doc layout pages. It's a good starting point.

Use the `transparent_dark` theme, which adapts well to background color changes.

A few things to note:

- Vue cannot directly use the `<script />` tag in templates, so we use [\<component />](https://vuejs.org/api/built-in-special-elements.html#component) to simulate a `<script />` tag.
- The `:key` prop is essential; otherwise, due to [Vue's component reusability strategy](https://vuejs.org/api/built-in-special-attributes.html#key), you might encounter issues with the comment section not reloading when the page route changes.
- `<div class="giscus" />` is used for Giscus to position the comment section correctly. This ensures that when the `:key` changes, the Giscus comment section in the DOM is properly updated.
- `:key` prop should not be on the `<component />` because the `<script />` tag doesn't represent the actual DOM corresponding to the Giscus comment section. Placing `:key` on the `<script />` tag is meaningless.

You might see a warning and an error in the browser console saying "Discussion not found". This is expected behavior from Giscus, and it will disappear once a comment or reaction is added to create a corresponding discussion thread.

### Removing Giscus on Specific Pages

Even though you can lock discussions to disable comments, for better page design, you might want to hide the Giscus comment section altogether on some pages.

To achieve this, introduce [frontmatter](https://vitepress.dev/guide/frontmatter#frontmatter) in specific pages:

```markdown
---
comments: false
---
```

Then, modify the existing code as follows:

```vue
<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter, title } = useData()
</script>

<template>
  <div v-if="frontmatter.comments !== false" :key="title" class="giscus">
    <component ...... ...... />
  </div>
</template>
```

For the same reasons discussed earlier, do not place `v-if` on the `<component />`; it won't work.

## Conclusion

You can check the specific integration of Giscus with VitePress at the end of this article. It looks fantastic!

