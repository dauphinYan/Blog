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

- `/`：个人首页，展示三个项目、简介与联系方式。
- `/lockknock/`：洛克的迷宫专题页，包含游戏介绍、海报、可放大截图和关注入口。
- `src/data/portfolio.ts`：个人资料与项目数据，两页共用联系方式。
- `src/components/ProjectCard.astro`：项目卡片。
- `src/styles/global.css`、`src/styles/portfolio.css`：首页样式。
- `src/styles/lockknock.css`：专题页样式。

素材直接从 `assets` 导入，由 Astro 构建到产物中。洛克的迷宫使用 `LockKnock` 目录，赛尔号记牌器使用 `SeerAssistant` 目录，头像使用 `Hinami Aoi.jpg`。按用户确认，剑的世界暂用“制作中”文字封面，未使用 Conan、SeerPlan 素材。

`public/reference.png` 保留为首页涂鸦装饰背景。字体使用 Google Fonts，并提供系统字体回退。项目没有提供下载或商店链接，因此页面仅提供已知的个人主页和邮件联系入口。
