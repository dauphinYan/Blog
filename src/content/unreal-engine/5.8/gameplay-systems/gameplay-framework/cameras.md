---
title: "摄像机"
description: "Cameras in Unreal Engine 的中文译文。"
sourceTitle: "Cameras in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/cameras-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 3
draft: false
tags: [Unreal Engine]
---

# 摄像机

虚幻引擎的摄像机系统提供关卡内与游戏性相关的观察视角。有多种方式可以控制摄像机，从直接手动操控，到让引擎根据规则自动控制。例如，你可以直接对 `CameraActor` 的视角做补间（tween）处理，也可以构建一个由弹簧臂组件（Spring Arm Component）驱动的第三人称摄像机系统。

## CameraActor

`CameraActor` 暴露了大多数摄像机共有的许多属性，包括视场（Field of View）、宽高比和后期处理效果。可以通过两种方式将 CameraActor 添加到关卡中：

- 在"放置 Actor"（Place Actors）面板中将 CameraActor 拖放到关卡里；
- 在蓝图中通过"类"（Classes）面板添加 CameraActor。

在编辑器视口中预览摄像机的渲染画面时，你可以直接编辑 CameraActor 的多项属性。

## CameraComponent

除了向关卡添加 CameraActor 之外，你还可以将 `CameraComponent` 附着到某个 Actor 上，就像添加任何其他组件一样。CameraComponent 特别适合附着到 PlayerController 的 Pawn 上，让 Pawn 成为玩家观察世界的视角。例如，将 CameraComponent 附着到人类角色 Actor 的肩部上方，即可实现越肩（over-the-shoulder）摄像机效果。

## Actor 与 PlayerController

你可以直接控制摄像机视角的位置和旋转，也可以让 Pawn 或 PlayerController 自动管理摄像机视角的位置和旋转。PlayerController 会占有（possess）Pawn；Pawn 是玩家在游戏世界中的物理化身，PlayerController 决定玩家能与什么交互、不能与什么交互，而 PlayerCameraManager 则负责管理最终呈现的混合摄像机视角。

## PlayerCameraManager

`PlayerCameraManager` 负责管理特定玩家的最终摄像机视角。它会计算最终的摄像机属性，包括视角混合、切换、后期处理效果以及玩家在其他方面的摄像机体验。每个 PlayerController 都拥有一个专属的 PlayerCameraManager。

## ViewTarget

`ViewTarget` 是 PlayerCameraManager 当前用于渲染画面的 Actor。它封装了摄像机最终视角所依赖的 Actor 及其组件信息。随着游戏性逻辑的推进，ViewTarget 可以在不同 Actor 之间切换或混合，从而实现平滑的视角过渡。

## 摄像机职责链

虚幻引擎中与摄像机相关的类形成了一条职责链，各自承担明确的分工：

- **PlayerController** —— 代表玩家的意愿与输入，是摄像机逻辑的发起者；
- **PlayerCameraManager** —— 根据游戏状态计算最终的摄像机视角；
- **ViewTarget** —— 当前为玩家提供视角的 Actor；
- **CameraComponent** —— 最终定义视口实际画面属性的组件。

## 摄像机相关主题

以下页面提供了关于摄像机系统的更多信息：

- [使用摄像机](https://dev.epicgames.com/documentation/unreal-engine/using-cameras-in-unreal-engine) —— 介绍如何在项目中使用摄像机。
- [摄像机动画](https://dev.epicgames.com/documentation/unreal-engine/camera-animation-in-unreal-engine) —— 介绍如何为摄像机制作动画。
