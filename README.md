# Orca丶个人作品集

使用 Astro 实现的响应式单页作品集，参考提供的涂鸦风格设计图。

## 开发

```sh
npm install
npm run dev
```

## 构建

```sh
npm run build
npm run preview
```

## GitHub Pages 部署

推送至 `master` 会触发 `.github/workflows/deploy-pages.yml`，自动构建 `dist/` 并发布到 GitHub Pages。当前站点使用自定义域名 `https://dolphindream.cn/`；`public/CNAME` 必须保留，避免部署时丢失域名绑定。

## 页面与内容

- `/`：个人首页，展示项目、博客、简介与联系方式。
- `/lockknock/`：洛克的迷宫专题页，包含游戏介绍、海报、可放大截图和关注入口。
- `/blog/<slug>/`：由本地 Markdown 在构建时自动生成的博客详情页。
- `src/data/portfolio.ts`：个人资料与项目数据，两页共用联系方式。
- `src/components/ProjectCard.astro`：项目卡片。
- `src/styles/global.css`、`src/styles/portfolio.css`：首页样式。
- `src/styles/lockknock.css`：专题页样式。
- `src/content/blog/*.md`：博客文章源文件；除草稿外都会自动生成详情页。
- `src/content/blog/TEMPLATE.md`：新文章模板，复制后修改 frontmatter 并移除 `draft: true` 即可发布。

素材位于 `src/assets/`，由 Astro 静态导入并构建到产物中。目录按用途分为 `projects/`、`icons/` 和 `profile/`；所有文件与目录名称使用小写短横线格式。按用户确认，剑的世界暂用“制作中”文字封面，`projects/conan/` 与 `projects/seer-plan/` 的素材尚未被页面引用。

`public/reference.png` 保留为首页涂鸦装饰背景。字体使用 Google Fonts，并提供系统字体回退。项目没有提供下载或商店链接，因此页面仅提供已知的个人主页和邮件联系入口。

## 发布博客

复制 `src/content/blog/TEMPLATE.md` 到同一目录，使用英文短横线文件名，例如 `my-first-post.md`。填写标题、摘要、日期和标签，完成后删除 `draft: true`（或设为 `false`）。Markdown 正文会在 `npm run dev` 和 `npm run build` 时自动转换为 `/blog/my-first-post/`。
