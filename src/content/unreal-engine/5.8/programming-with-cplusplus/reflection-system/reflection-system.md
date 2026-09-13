---
title: "虚幻引擎反射系统"
description: "Unreal Engine Reflection System 的中文译文。"
sourceTitle: "Unreal Engine Reflection System"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/reflection-system-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 1
draft: false
tags: [Unreal Engine, C++]
---

# 虚幻引擎反射系统

**虚幻引擎反射系统**使用宏来封装你的类，提供引擎和编辑器功能。在使用**虚幻引擎（UE）**编程时，可以使用标准的 C++ 类、函数和变量。

- 虚幻中对象的基类是 [UObject](objects.md)。每个类都新定义了一个用于 [Actor](https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine) 或对象（Object）的模板。

- 你可以使用 `UCLASS` 宏来标记从 `UObject` 派生的类，以便 [UObject 处理系统](https://dev.epicgames.com/documentation/unreal-engine/unreal-object-handling-in-unreal-engine) 可以注意到这些类。

- [TSubclassOf](tsubclassof.md) 是模板类，提供 `UClass` 类型安全性。它在分配从特定类型派生出来的类时很有用。例如，你可以把这个变量公开给蓝图，设计者可以为玩家角色指定生成的武器类别。

- 类可以包含[结构体](https://dev.epicgames.com/documentation/404)。结构体是帮助组织和操控其相关属性的数据结构。结构体可以使用 `USTRUCT()` 宏来单独定义。

- [虚幻智能指针库](smart-pointers.md) 为 C++11 智能指针的自定义实现，旨在减轻内存分配和追踪的负担。该实现包括行业标准[共享指针](https://dev.epicgames.com/documentation/unreal-engine/shared-pointers-in-unreal-engine)、[弱指针](https://dev.epicgames.com/documentation/unreal-engine/weak-pointers-in-unreal-engine)、**唯一指针（Unique Pointers）**和[共享引用](https://dev.epicgames.com/documentation/unreal-engine/shared-references-in-unreal-engine)，此类引用的行为与不可为空的共享指针相同。

- [接口](https://dev.epicgames.com/documentation/404) 提供可以在多个或不同的类中实现的函数和额外的游戏行为。你的玩家角色可以与世界中的各种 Actor 互动。每个这些互动都能引起对一个事件的不同反应。

- [元数据说明符](metadata-specifiers.md) 控制类、接口、结构体、枚举、函数或属性与引擎和编辑器各方面的交互方式。每一种类型的数据结构或成员都有自己的元数据说明符列表。

- [UFUNCTION](ufunctions.md) 和 [UPROPERTY](properties.md) 宏使 UE 注意到新的类、函数和变量。这些宏由引擎进行垃圾回收。在说明宏时，你可以在虚幻编辑器中编辑和显示它们。

## 章节目录

- [对象](objects.md) - 介绍引擎中的基本游戏性元素、Actor 和对象。
- [属性](properties.md) - 关于为游戏性类创建和实现属性的参考。
- [TSubclassOf](tsubclassof.md) - 使用 TSubclassOf 模板类提供类型安全性。
- [元数据说明符](metadata-specifiers.md) - 声明 UClasses、UFunctions、UProperties、UEnums 和 UInterfaces 时使用的元数据关键词，说明其与虚幻引擎和关卡编辑器诸多方面的互动方式。
- [UFunction](ufunctions.md) - 创建和实现游戏性类函数的概述。
- [虚幻智能指针库](smart-pointers.md) - 共享指针的自定义实现，包括弱指针和不可为空的共享引用。
