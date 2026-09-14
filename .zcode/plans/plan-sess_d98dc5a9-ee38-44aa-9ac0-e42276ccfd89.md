# Gameplay Systems 板块翻译 + 全量进度跟踪文档

## 目标
1. 创建**全量进度跟踪文档**：记录 Epic 官方 Gameplay Systems 分类下所有文档（约 190 篇、14 个子板块），供后续新对话直接参考。
2. 新建与「使用 C++ 编程」平级的「游戏性系统」专区，本批翻译：板块根页 + Gameplay Framework 全部一级页面（11 篇）。

## 一、进度跟踪文档 `Docs/gameplay-systems-translation.md`（先行创建）

全量目录已通过抓取官方各板块页面获得，按子板块分组记录，结构：

```
# Gameplay Systems 翻译进度
> 官方入口：https://dev.epicgames.com/documentation/unreal-engine/gameplay-systems-in-unreal-engine（UE 5.8）
> 约定：完成一篇 → 在「已完成」表中添加一行（日期/文件/原文链接），并从「待翻译」清单删除该条目。

## 待翻译
### Gameplay Systems（根页）
- [ ] Gameplay Systems in Unreal Engine — /documentation/unreal-engine/gameplay-systems-in-unreal-engine
### Gameplay Framework（子板块，11 篇一级）
- [ ] Gameplay Framework in Unreal Engine — …/gameplay-framework-in-unreal-engine
- [ ] Actors in Unreal Engine — …
- …（Cameras / Components / Controllers / Game Mode and Game State / Input 及其子页 Input Overview、Enhanced Input / Gameplay Timers / User Interfaces and HUDs 及 UMG、Slate 子页 / Game Features and Modular Gameplay）
### Gameplay Ability System（5 篇）
### Artificial Intelligence（~30 篇：Behavior Trees、StateTree、Smart Objects、EQS、Navigation System、MassEntity、NNE、AI Perception、AI Debugging、AI Components 及各自子页）
### Physics（~45 篇：Collision、Raycasts、Chaos Destruction、Physics Bodies、Cloth、Physical Materials、Hair Physics 及各自子页）
### Large World Coordinates（3 篇）
### Data-Driven Gameplay Elements（2 篇）
### Vehicles（~12 篇：Chaos Vehicles、Chaos Modular Vehicles 及子页）
### Networking and Multiplayer（~28 篇：含 Iris、Replication Graph、Replay、专用服务器等）
### Online Subsystems and Services（~27 篇：OSS、Online Services EOS、Voice Chat 等及接口页）
### Gameplay Camera System（3 篇）
### Gameplay Targeting System（3 篇）
### Mover（5 篇）
### Class Creation Basics（4 篇）
### Gameplay Tutorials（9 篇）

## 已完成
| 日期 | 文件 | 官方原文 |
```

每条含中英文标题与官方 URL；翻译时若发现某板块还有未收录的深层子页，随手补录。失效的官方链接（如 Actor Lifecycle 指向 404）记录时标注。

## 二、站点基础设施（3 处改动）

1. **`src/content.config.ts`**：新增 `gameplaySystems` collection（base `./src/content/unreal-engine/5.8/gameplay-systems`），schema 提取为公共变量复用。
2. **`src/data/unreal-cpp.ts` 参数化**：硬编码的 rootDocumentSlug / hubPath / articleBasePath / sectionTitle / 根文档回退标题抽成工厂函数，现有导出不变（C++ 专区零改动）；新建 `src/data/unreal-gameplay.ts`：rootDocumentSlug=`gameplay-systems`，hubPath=`/unreal-engine/gameplay-systems`，articleBasePath=`/article/unreal-engine/gameplay-systems`。
3. **新增两个页面路由**（仿 C++ 专区）：`src/pages/unreal-engine/gameplay-systems/index.astro`（专区首页）与 `src/pages/article/unreal-engine/gameplay-systems/[...slug].astro`（文章页）。

## 三、内容翻译（本批 11 篇，模板 = 现有 `gameplay-architecture.md`）

```
src/content/unreal-engine/5.8/gameplay-systems/
├── gameplay-systems.md                        # Gameplay Systems in Unreal Engine
└── gameplay-framework/
    ├── gameplay-framework.md                  # Gameplay Framework in Unreal Engine
    ├── actors.md  ├── cameras.md  ├── components.md  ├── controllers.md
    ├── game-mode-and-game-state.md  ├── gameplay-timers.md  ├── input.md
    ├── user-interfaces-and-huds.md  └── game-features-and-modular-gameplay.md
```

每篇流程：抓取原文 → 1:1 翻译（标题层级/段落/列表/表格一一对应）→ frontmatter 与模板一致（sourceUrl、engineVersion 5.8、reviewedAt 2026-09-14、order、tags [Unreal Engine]）→ 图片热链 Epic 官方 API + 中文 alt → 本批已译页面间用相对 `.md` 链接，未译目标给官方绝对 URL → **完成后立即更新进度文档（已完成 +1，待翻译 -1）**。

## 四、验证
- `npm run build` 通过（schema、路由、相对链接）。
- C++ 专区页面代码零改动。
