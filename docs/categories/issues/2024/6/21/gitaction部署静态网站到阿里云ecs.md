---
title: gitaction部署静态网站到阿里云ecs
date: 2024/06/21 19:38
categories: 
  - '"杂碎"逆袭史'
tags:
---

前置: [ssh密匙连接阿里云ecs](ssh密匙连接阿里云ecs.md)

# gitaction部署静态网站到阿里云ecs


**1. github的setting设置中添加密匙**

![](../../../../../public/img/2024/Pasted%20image%2020240621062013.png)
注意密匙要与后面代码里的名字一样
![](../../../../../public/img/2024/Pasted%20image%2020240621062030.png)

**2. 设置工作流**

.github/workflows/deploy-pages.yml 

```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
        with:
          version: 9
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install  # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./docs/.vitepress/dist"
      # 部署到阿里云
      - name: Deploy to Aliyun
      # 使用第三方action rsync推送 https://github.com/AEnterprise/rsync-deploy
        uses: AEnterprise/rsync-deploy@v1.0.2
        env:
          # 私钥
          DEPLOY_KEY: ${{ secrets.PRIVATE_KEY }}
          ARGS: "-e -c -r --delete" # 设置环境变量 ARGS，用于指定 rsync 命令的参数，包括归档模式、详细输出、压缩传输、递归传输以及删除目标位置中源位置不存在的文件 
          SERVER_PORT: 22 # SSH端口
          # 源目录，编译后生成的文件目录 ;要推送的文件夹，路径相对于代码仓库的根目录，视情况替换为自己的文件夹路径
          FOLDER: docs/.vitepress/dist
          # 服务器ip：换成你的服务器IP（IP或者域名domain.com）
          SERVER_IP: ${{ secrets.IP }}
          # 用户 服务器登录名
          USERNAME: root
          # 目标地址 你在服务器上部署代码的地方
          SERVER_DESTINATION: /usr/share/nginx/html
          
  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**3. 配置nginx**

默认静态目录为html下的index，现改为工作流推送到的dist下的index

进入nginx配置文件（不同版本目录可能不一样
```
vim /etc/nginx/nginx.conf
```

修改root这行为你工作流推送到的目录，其他不变，:wq保存退出
```yml{5}
    server {
       listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html/dist;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
```

检查配置文件语法正确性
```
sudo nginx -t
```

重启nginx
```
nginx -s reload
```


等十几秒就可以正常访问了