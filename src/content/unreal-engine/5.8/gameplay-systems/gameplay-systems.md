---
title: "游戏性系统"
description: "Gameplay Systems in Unreal Engine 的中文译文。"
sourceTitle: "Gameplay Systems in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/gameplay-systems-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 1
draft: false
tags: [Unreal Engine]
---

# 游戏性系统

Gameplay Systems（游戏性系统）收录了在虚幻引擎（Unreal Engine，简称 UE）中进行高层级游戏性编程与脚本编写的内容，重点关注如何促成玩家与世界的互动。

- UE 的 Gameplay Framework（游戏性框架）包含用于处理常见游戏性元素的核心系统与框架，例如 Actor、Camera（摄像机）、Component（组件）、Controller（控制器）、游戏规则、Game Mode（游戏模式）、玩家输入、Gameplay Timer（游戏性计时器）和用户界面。
- Artificial Intelligence（人工智能）介绍 UE 中可用于构建 AI 的各类系统，例如行为树（Behavior Tree）、Mass Entity 系统、State Tree、导航系统（Navigation System）、智能对象（Smart Object）、环境查询系统（Environment Query System）、AI 感知组件（AI Perception Component）和调试（Debugging）。
- Physics（物理）包含用于计算碰撞（Collision）、射线检测（Raycast）、Chaos 破坏（Chaos Destruction）以及模拟物理 Actor、布料物理（Cloth Physics）和物理材质（包括毛发物理 Hair Physics）的各类子系统。
- Large World Coordinates（大世界坐标）为 UE 引入了对双精度数据变体类型的支持，引擎各系统为此实施了大规模改造，以提升浮点精度。
- Data-Driven Gameplay Elements（数据驱动的游戏性元素）有助于降低长生命周期游戏的工作量与复杂度。例如，某些游戏会通过在线服务模式向用户推送更新，该模式可根据用户反馈调整游戏内的某些数据参数，以平衡数值或添加内容。
- Gameplay Ability System（游戏性技能系统，简称 GAS）是一个高度灵活的框架，用于构建 RPG 或 MOBA 类游戏中常见的技能（Ability）与属性（Attribute）。你可以为游戏角色构建主动或被动技能，以及随这些动作积累或消耗各种属性的状态效果；此外还可以实现"冷却"计时器或资源消耗来限制技能的使用，按等级调整技能及其效果，并激活粒子和音效等。
- Vehicles（载具）是虚幻引擎用于执行载具物理模拟的轻量级系统。
- Networking and Multiplayer（网络与多人）——现代多人游戏体验需要在遍布全球的大量客户端之间同步海量数据。发送什么数据、如何发送，对于向用户提供引人入胜的体验极为重要，因为它会显著影响项目的性能与手感。
- 本节的 Gameplay Tutorial（游戏性教程）将提供上述功能的使用参考，以及如何用 Blueprint（蓝图）和 C++ 重现常见游戏机制与系统的演练。

## 板块主题目录

- [![人工智能](https://dev.epicgames.com/community/api/documentation/image/6934008c-4c34-42ef-bef6-2f58945d70ff?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/artificial-intelligence-in-unreal-engine)

  **[Artificial Intelligence（人工智能）](https://dev.epicgames.com/documentation/unreal-engine/artificial-intelligence-in-unreal-engine)**

  介绍虚幻引擎中可用于在项目中创建可信 AI 实体的各类系统。

- [![数据驱动的游戏性元素](https://dev.epicgames.com/community/api/documentation/image/76fd8fc5-67cf-4be4-aed4-f0f618005c48?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/data-driven-gameplay-elements-in-unreal-engine)

  **[Data Driven Gameplay Elements（数据驱动的游戏性元素）](https://dev.epicgames.com/documentation/unreal-engine/data-driven-gameplay-elements-in-unreal-engine)**

  使用外部存储的数据驱动游戏性元素。

- [![游戏性技能系统](https://dev.epicgames.com/community/api/documentation/image/163f98de-5040-40fc-8fd3-0dd7ec5fa122?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine)

  **[Gameplay Ability System（游戏性技能系统）](https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine)**

  Gameplay Ability System 的高层级概览。

- [![游戏性架构](https://dev.epicgames.com/community/api/documentation/image/1204fc7a-68bc-4922-9bbe-af2ced806b27?resizing_type=fit&width=640&height=640)](../programming-with-cplusplus/programming-with-cplusplus.md)

  **[Gameplay Architecture（游戏性架构）](../programming-with-cplusplus/programming-with-cplusplus.md)**

  创建和实现游戏性类的参考。

- [![游戏性相机系统](https://dev.epicgames.com/community/api/documentation/image/5313ed5c-b670-4420-8406-f3d26b60def2?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/gameplay-camera-system)

  **[Gameplay Camera System（游戏性相机系统）](https://dev.epicgames.com/documentation/unreal-engine/gameplay-camera-system)**

  关于虚幻引擎 Gameplay Camera System 的文档。

- [![游戏性目标选定系统](https://dev.epicgames.com/community/api/documentation/image/77fbf57b-ef92-4dfb-850b-8a86e0f76685?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/gameplay-targeting-system-in-unreal-engine)

  **[Gameplay Targeting System（游戏性目标选定系统）](https://dev.epicgames.com/documentation/unreal-engine/gameplay-targeting-system-in-unreal-engine)**

  虚幻引擎 Gameplay Targeting System 插件框架概览。

- [![输入](https://dev.epicgames.com/community/api/documentation/image/13c3fbbe-abae-4caa-98ef-aeb882a99486?resizing_type=fit&width=640&height=640)](input.md)

  **[Input（输入）](input.md)**

  在虚幻引擎中创建和设置输入的不同方法。

- [![类创建基础](https://dev.epicgames.com/community/api/documentation/image/97895434-fa4b-473b-aba8-3aea759b9790?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/class-creation-basics-in-unreal-engine)

  **[Class Creation Basics（类创建基础）](https://dev.epicgames.com/documentation/unreal-engine/class-creation-basics-in-unreal-engine)**

  展示如何仅用蓝图、仅用 C++、以及 C++ 与蓝图结合来创建类的示例。

- [![游戏性框架](https://dev.epicgames.com/community/api/documentation/image/12a84317-cdf0-4445-b258-c9f742e065b2?resizing_type=fit&width=640&height=640)](gameplay-framework/gameplay-framework.md)

  **[Gameplay Framework（游戏性框架）](gameplay-framework/gameplay-framework.md)**

  游戏模式、玩家状态、控制器、Pawn、摄像机等核心游戏系统。

- [![物理](https://dev.epicgames.com/community/api/documentation/image/b25025bc-793b-45b4-b559-20f5b08c2ee9?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/physics-in-unreal-engine)

  **[Physics（物理）](https://dev.epicgames.com/documentation/unreal-engine/physics-in-unreal-engine)**

  Chaos Physics 是虚幻引擎中可用的轻量级物理模拟解决方案。

- [![大世界坐标](https://dev.epicgames.com/community/api/documentation/image/11981d8d-bbbd-4784-af2e-17bc4eac615e?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/large-world-coordinates-in-unreal-engine-5)

  **[Large World Coordinates（大世界坐标）](https://dev.epicgames.com/documentation/unreal-engine/large-world-coordinates-in-unreal-engine-5)**

  大世界坐标概览及其在虚幻引擎 5 中的使用方式。

- [![在线子系统与服务](https://dev.epicgames.com/community/api/documentation/image/7e1ab125-9ed1-4255-a74b-cf5bc1a22f79?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/online-subsystems-and-services-in-unreal-engine)

  **[Online Subsystems and Services（在线子系统与服务）](https://dev.epicgames.com/documentation/unreal-engine/online-subsystems-and-services-in-unreal-engine)**

  学习如何在虚幻引擎中使用在线子系统与服务，包括 Epic Online Services。

- [![网络与多人](https://dev.epicgames.com/community/api/documentation/image/f16d3605-031f-4bb6-bbe3-788e43b2c84e?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/networking-and-multiplayer-in-unreal-engine)

  **[Networking and Multiplayer（网络与多人）](https://dev.epicgames.com/documentation/unreal-engine/networking-and-multiplayer-in-unreal-engine)**

  搭建网络多人游戏。

- [![Mover](https://dev.epicgames.com/community/api/documentation/image/a505c2df-1885-48c2-a50d-362c0940c7f8?resizing_type=fit&width=640&height=640)](https://dev.epicgames.com/documentation/unreal-engine/mover-in-unreal-engine)

  **[Mover](https://dev.epicgames.com/documentation/unreal-engine/mover-in-unreal-engine)**

  创建支持回滚网络（rollback networking）的移动系统。
