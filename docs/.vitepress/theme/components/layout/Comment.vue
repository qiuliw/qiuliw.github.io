<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
  <div :key="title" class="giscus">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="qiuliw/qiuliw.github.io"
      data-repo-id="R_kgDOMJt8Kg"
      data-category="Announcements"
      data-category-id="DIC_kwDOMJt8Ks4CgM2e"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-theme="preferred_color_scheme"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async
    />
  </div>
</template>

<style scoped>
.giscus{
  margin-top: 10px;
}
</style>