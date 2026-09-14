---
title: "游戏性框架"
description: "Gameplay Framework in Unreal Engine 的中文译文。"
sourceTitle: "Gameplay Framework in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-framework-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 1
draft: false
tags: [Unreal Engine]
---

# 游戏性框架

Gameplay Framework（游戏性框架）提供了一组基础类，用于创建和监控核心游戏循环。本文介绍这些类是什么、它们之间如何关联，以及如何使用它们完成常见的游戏性任务。

## 概述

虚幻引擎（UE）游戏性框架是一组协同工作的核心类，用于管理一局游戏的高层级规则、将玩家的游戏呈现渲染到屏幕上，并处理诸如跟踪玩家在世界中的进度（例如关卡构建、角色能力或生命值）、显示角色生命值、管理摄像机视角和切换关卡等常规任务。虽然不使用游戏性框架也可以构建游戏，但该框架能带来诸多好处，包括：

- 游戏性框架涵盖了游戏中最常见的用例，包括单人游戏和多人游戏，因此适用于绝大多数（即使不是全部）游戏类型。
- 游戏性框架为引擎在游戏执行过程的特定节点上调用、且与游戏性相关的所有虚幻运动图形 UI（UMG）控件、事件和函数提供了基础。

如果你打算使用引擎的任何高层级内置系统（例如 UMG），就需要在一定程度上使用游戏性框架。

无论一款游戏看起来多么独特，大多数游戏都有某些共同特征。例如，所有游戏都需要在游戏世界中呈现玩家，通常以某种可以被玩家控制来完成游戏目标的化身（例如角色或载具）的形式存在。游戏还需要一种向玩家呈现世界的方式，通常是通过玩家控制的摄像机视角，并展示游戏中正在发生的事情——直接显示在屏幕上，或者通过平视显示器（HUD）或其他用户界面（UI）呈现。

游戏还有许多因其类型或风格而异的特征。在竞速游戏中，玩家控制一辆载具，与其他玩家或 AI 控制的载具在赛道上竞速；而在横版平台游戏中，玩家让角色在二维环境中奔跑、跳跃、攀爬并与各种不同的对象交互。所有类型的游戏都需要一种方式来跟踪游戏世界中正在发生的事情以及玩家在游戏中的进度——换句话说，就是游戏规则——以及一种向玩家展示当前游戏状态的方式。

游戏性框架提供了处理这些常见游戏性特征所需的全部构件，同时让你可以自由决定如何实现那些让你的游戏与众不同的部分。

从高层级来看，游戏性框架的目的是提供以下能力：

- 让项目能够定义或覆盖游戏规则，包括玩家能做什么、不能做什么、胜负条件等。
- 让不同的玩家能够加入游戏并（在本地或通过网络）与世界互动。
- 让玩家和其他特殊代理（例如 AI 控制器）能够在世界中移动并与世界互动，同时让摄像机跟随并展示玩家眼中的世界。

## 游戏性框架类

下表列出了最重要的游戏性框架类及其职责：

| 功能 | 类 | 说明 |
| --- | --- | --- |
| 表示可以进行游戏性交互的人、生物或对象，例如飞船、地面开关或投石机。 | [Actor](actors.md) | 可以放置或生成到关卡中的对象。Actor 可以附着 [组件](components.md)，可以在游戏过程中移动、旋转、改变大小与缩放，还可以执行许多其他游戏内功能。 |
| 表示接收玩家或 AI 的输入并以某种游戏内动作响应的能力。 | [Controller](controllers.md) | Controller 可以占有（possess）并控制一个 Pawn（可以是 Character 或其他类型的 Actor）。Controller 可以是使用 AI 逻辑控制实体的 AIController，也可以是根据人类玩家输入控制实体的 PlayerController。 |
| 表示玩家或 AI 代理可以在世界中控制的实体。 | [Pawn](https://dev.epicgames.com/documentation/unreal-engine/pawn-in-unreal-engine) | Pawn 是任何可以被 Controller 占有并在世界中控制的 Actor。 |
| 以人形角色形式表示玩家或 AI 代理可以在世界中控制的实体。 | [Character](https://dev.epicgames.com/documentation/unreal-engine/characters-in-unreal-engine) | Character 是一种特殊的 Pawn，借助角色移动组件（Character Movement Component）具备在世界中行走、奔跑、跳跃、游泳和飞行的能力。 |
| 表示控制游戏的玩家或实体，并管理摄像机视角和其他玩家专属逻辑。 | [Player Controller](https://dev.epicgames.com/documentation/unreal-engine/player-controllers-in-unreal-engine) | PlayerController 代表人类玩家的意愿与输入，并将其转换为游戏中的动作。 |
| 表示负责使用 AI 控制实体的代理。 | [AI Controller](https://dev.epicgames.com/documentation/unreal-engine/ai-controllers-in-unreal-engine) | AIController 是一种 Controller，通过运用 AI 逻辑（例如行为树）来控制 Pawn。 |
| 表示游戏规则，包括胜负条件、生成方式与游戏进程。 | [Game Mode](game-mode-and-game-state.md#游戏模式) | GameMode 类定义了正在进行的游戏及其规则，包括玩家如何加入、如何生成以及其他游戏专属行为。 |
| 表示游戏状态，包括所有玩家都知晓的信息，例如队伍得分、经过的时间等。 | [Game State](game-mode-and-game-state.md#游戏状态) | GameState 类跟踪所有玩家需要知晓的信息，例如队伍得分、比赛是否进行中以及其他共享状态。 |
| 管理用户界面（UI），包括菜单和 HUD。 | [User Interface](user-interfaces-and-huds.md) | 可以使用 UMG 和 Slate 构建用户界面。 |
| 表示玩家的游戏世界视图信息层。 | [HUD](user-interfaces-and-huds.md) | HUD 类为在玩家屏幕上显示信息提供了基础。 |
| 表示玩家的游戏世界视图。 | [Camera](cameras.md) | CameraActor 和 PlayerCameraManager 定义了玩家所看到的内容。 |
