# gatsby-doc
**以markdown文档为数据源，使用gatsby构建个性话定制的文档页面**

## 如何使用
+ 1、node环境切换到14.15以上，拉取该项目代码库，执行`npm i`安装依赖
+ 2、准备markdown文档数据，替换掉docs中的现有的文档
+ 3、执行npm run build

## 文档基本信息
markdonw本身支持配置一些信息，在graphql中保存在node.frontmatter中，例：
```markdonw
---
slug: "/docs/HTTP演进"
date: "2019-05-04"
title: "HTTP演进"
---
```
#### 1、标题
如果在页面中有配置标题的话，使用**配置的标题**，否则使用**文件名**去除后缀作为标题

#### 2、文档时间
+ **创建时间**：托管在git上的文档，从git中拉取该文档第一次commit时间；如果没有git信息，则使用文件信息中的ctime
+ **更新时间**：托管在git上的文档，从git中拉取该文档最近一次commit时间；如果没有git信息，则使用文件信息中的mtime

#### 3、文档部署路径
所在文件夹路径+文档标题，例如: 文档路径为`docs/React18/Automatic Batching.md`，如果文档内没有配置title的信息，则部署路径为`/docs/React18/Automatic Batching`
