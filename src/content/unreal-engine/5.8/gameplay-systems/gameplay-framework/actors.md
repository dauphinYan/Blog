---
title: "Actor"
description: "Actors in Unreal Engine 的中文译文。"
sourceTitle: "Actors in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 2
draft: false
tags: [Unreal Engine]
---

# Actor

Actor 是任何可以放置到关卡中的对象。Actor 是存在于世界（World）中的有形游戏性对象，支持平移、旋转和缩放等矩阵变换。Actor 可以通过游戏性代码（C++ 或蓝图）生成（创建）和销毁。

在 C++ 中，`AActor` 类是所有 Actor 的基类。

Actor 自身并不直接存储其变换（Transform，即位置、旋转和缩放）数据。如果 Actor 存在根组件（Root Component），其变换数据便来自根组件；否则 Actor 的根组件将位于世界原点，对场景中的位置而言没有实际意义。

## 创建 Actor

创建 `AActor` 的实例称为"生成"（spawning）。该过程可以使用 `SpawnActor()` 函数或其某个模板化版本来完成。有关如何创建和销毁 Actor 的更多信息，请参见[生成和销毁 Actor](https://dev.epicgames.com/documentation/unreal-engine/spawning-and-destroying-unreal-engine-actors)。

## 组件

Actor 可以被视为容纳若干组件（Component）的容器，组件负责控制 Actor 的移动方式、渲染方式等。它们通常在 C++ 中定义，也可以在蓝图类中添加。

以下是几个关键的组件类型：

- `UActorComponent` —— Actor 组件的基类。它可以与某个 Actor 关联，但没有与某个世界位置绑定的变换。这类组件用于抽象概念，例如 AI、输入处理或行为树。
- `USceneComponent` —— `UActorComponent` 的派生类，携带变换（位置、旋转和缩放）。Scene Component 可以分层级相互附着，其中一个组件作为 Actor 的根组件，即该组件的变换定义了 Actor 在世界中的位置和方向。许多游戏性相关的功能都需要使用 Scene Component。
- `UPrimitiveComponent` —— `USceneComponent` 的派生类，带有可供渲染的视觉表现，例如网格体（Mesh）或粒子系统。该类型包含许多与视觉呈现和物理碰撞相关的属性与函数。

例如，一个名为 GoldPickup（拾取金币）的 Actor 可以按如下层级组装组件：

- **根组件**：`SceneComponent` —— 仅作为整体变换的锚点，没有视觉表现；
- **`StaticMeshComponent`** —— 展示一块金矿石的静态网格体；
- **`ParticleSystemComponent`** —— 附着在金矿石上、持续闪烁的火花粒子效果；
- **`AudioComponent`** —— 循环播放的清脆音效；
- **`BoxComponent`** —— 用于拾取触发器碰撞的盒体碰撞组件。

## 每帧更新（Ticking）

所有 Actor 都可以通过 Tick 函数每帧更新一次，或者以自定义的时间间隔更新，从而实现随时间推移或按事件触发的行为。Actor 组件使用 `TickComponent()` 完成 `Tick()` 在 Actor 上的同类工作。有关 `Tick()` 与 `TickComponent()` 在用法与注意事项上的差异，请参见[Actor 的每帧更新](https://dev.epicgames.com/documentation/unreal-engine/actor-ticking-in-unreal-engine)。

## 生命周期

Actor 的创建与销毁遵循一定的规则与流程，包括垃圾回收、网络同步中的删除等细节。完整说明请参见 Actor 生命周期文档（官方原文链接当前已失效）。

## 网络复制（Replication）

在联网多人游戏中，Actor 通过"复制"（Replication）机制保持在各个客户端之间同步。Actor 的属性值可以被复制，函数调用（远程过程调用，RPC）也可以被复制，从而在不同机器上触发一致的行为。

## 销毁 Actor

Actor 不会像普通对象那样被直接垃圾回收，因为世界（World）持有对它们的引用。调用 Actor 的 `Destroy()` 函数会将其从关卡中移除，并将其标记为"待销毁"（pending kill）状态，直到下一次垃圾回收将其彻底清除。
