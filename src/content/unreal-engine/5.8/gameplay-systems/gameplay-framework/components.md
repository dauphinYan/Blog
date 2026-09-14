---
title: "组件"
description: "Components in Unreal Engine 的中文译文。"
sourceTitle: "Components in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/components-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 4
draft: false
tags: [Unreal Engine]
---

# 组件

组件（Component）是可以添加到 Actor 上的一段功能。将组件添加到 Actor 后，该 Actor 便获得组件所提供的功能。组件不能独立存在，通常必须附着在拥有它的 Actor 上。有关组件的更多背景知识，请参见[渲染系统概览](https://dev.epicgames.com/documentation/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine)。

## Actor 组件

Actor 组件（`UActorComponent` 类）是最通用的组件类型。它们由某个 Actor 持有，可以每帧更新。Actor 组件没有变换（Transform），也就是说它们在世界中没有物理位置或朝向。这使得它们适合承载抽象的行为逻辑，例如 AI、输入处理等。

## 注册与取消注册组件

组件向引擎注册后，引擎会将其加入更新列表，使其开始参与每帧更新、渲染或物理模拟。组件也可以在运行时取消注册：取消注册会将组件从引擎的更新列表中移除，使其不再被更新、渲染或参与物理。组件通常在创建时即被注册，但某些情况下你可能希望延迟注册，或在运行期间动态地注册与取消注册组件。

## 注册 / 取消注册事件

组件提供 `OnRegister` 和 `OnUnregister` 事件（委托）。你可以覆写或绑定这些事件，以便在组件注册时初始化资源、在取消注册时清理资源。

## 更新

Actor 组件可以通过 `TickComponent` 函数实现类似 Actor 每帧更新（Tick）的效果。不过，Actor 组件的更新是可选（opt-in）机制而非自动进行，并且你可以选择组件所属的更新分组（Ticking Group），以控制它相对于其他更新任务的执行时机。

## 渲染状态

需要被渲染的组件会维护一个渲染状态（Render State），它是渲染线程所需数据的一份快照。当游戏线程修改组件的数据时，渲染状态会被标记为"脏"（dirty），随后由渲染线程重建，从而保证画面与游戏逻辑保持一致。

## 物理状态

与渲染状态类似，参与物理模拟的组件会维护一个物理状态（Physics State）。物理状态缓存了物理引擎所需的数据，使组件能够高效地参与碰撞与物理计算。

## 可视化组件

某些组件（例如 `BillboardComponent`、`ArrowComponent` 和 `TextRenderComponent`）纯粹用于可视化——在编辑器中标注信息，或在游戏中显示简单的视觉元素——而不承载复杂的游戏逻辑。

## 场景组件

场景组件（`USceneComponent` 类）是带有变换（位置、旋转和缩放）的 Actor 组件，并且可以相互附着形成层级结构。层级中没有父级、或附着在 Actor 上位于最顶层的场景组件即为根组件（Root Component），它的变换决定了 Actor 的变换。

## 附着

场景组件可以附着到其他场景组件上，形成父子关系。父组件移动时，所有附着的子组件都会随之移动。组件可以附着在父组件的插槽（Socket）上——插槽是父组件上具有名称的附着点，可用于精确定位与动画联动。

## 图元组件

图元组件（`UPrimitiveComponent` 类）是带有某种几何或视觉表现的场景组件，例如网格体或粒子系统。这类组件可以被渲染，也能参与碰撞与物理模拟。

## 场景代理

图元组件通过场景代理（Scene Proxy）在渲染线程上表示其渲染数据。游戏线程拥有组件本身，渲染线程拥有场景代理；二者通过命令队列通信——游戏线程将命令入队，渲染线程执行这些命令，从而避免多线程访问冲突。
