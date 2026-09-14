---
title: "控制器"
description: "Controllers in Unreal Engine 的中文译文。"
sourceTitle: "Controllers in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/controllers-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 5
draft: false
tags: [Unreal Engine]
---

# 控制器

控制器（Controller）是可以占有（possess）Pawn 以对其进行控制的非物理 Actor。被占有的 Pawn 即该 Controller 当前控制的实体。控制器将控制逻辑与用户、游戏和 UI 层解耦，在世界中不可见，也没有物理实体。

## 占有（Possession）

Controller 通过 `Possess` 函数占有 Pawn。占有之后，Pawn 接收来自 Controller 的输入并做出相应动作；当 Pawn 死亡或被移除时，Controller 可以转而占有其他 Pawn。通过 `UnPossess` 函数可以让 Controller 放弃当前占有的 Pawn。

## PlayerController

PlayerController 是玩家与游戏交互的顶点。它代表人类玩家的意愿，将输入转换为游戏中的动作。在多人游戏中，PlayerController 同时存在于服务器与客户端上：服务器上的实例拥有最高权威，客户端上的实例则负责呈现与本地输入。与特定玩家相关、无需同步给其他玩家的游戏性逻辑（例如与 HUD 相关的信息）应当放在 PlayerController 中。

## AIController

AIController 是通过 AI 逻辑控制 Pawn 的 Controller。例如，常用于驱动 AI 行为的行为树便由 AIController 执行。为 NPC 配置 AIController 后，它即可像 PlayerController 操纵玩家 Pawn 一样操纵 AI 控制的 Pawn。
