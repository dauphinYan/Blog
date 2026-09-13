---
title: "游戏性架构"
description: "Gameplay Architecture in Unreal Engine 的中文译文。"
sourceTitle: "Gameplay Architecture in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/programming-with-cpp-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 1
draft: false
tags: [Unreal Engine, C++]
---

# 游戏性架构

使用 C++ 代码进行游戏性元素编程时，每个模块会包含许多 C++ 类。

每个类定义新 Actor 或对象的模板。类头文件中声明了类、类[函数](../reflection-system/ufunctions.md)和类[属性](../reflection-system/properties.md)。类还包括[结构体](https://dev.epicgames.com/documentation/404)这种有助于进行相关属性组织和操作的数据结构。结构也可被自行定义。通过[接口](https://dev.epicgames.com/documentation/404)可以使不同的类应用额外的游戏性行为。

在虚幻引擎中进行编程时，可使用标准 C++ 类、函数和变量。可使用标准 C++ 语法对它们进行定义。然而，`UCLASS()`、`UFUNCTION()` 和 `UPROPERTY()` 宏可使虚幻引擎识别新的类、函数和变量。例如，以 `UPROPERTY()` 宏作为声明序言的变量可被引擎执行垃圾回收，也可在虚幻编辑器中显示和编辑。此外还有 `UINTERFACE()` 和 `USTRUCT()` 宏，以及用于指定[类](gameplay-classes.md#类说明符)、[函数](../reflection-system/ufunctions.md#函数说明符)、[属性](../reflection-system/properties.md#属性说明符)、接口或结构体在虚幻引擎和虚幻编辑器中行为的每个宏关键词。

除以上的宏外还有一个 UPARAM() 宏，主要用于将 C++ 代码公开到蓝图。在[向蓝图公开游戏逻辑内容](https://dev.epicgames.com/documentation/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine)文档中可查看 UPARAM() 的使用范例。

## Gameplay 编程参考目录

- [游戏性类](gameplay-classes.md) - 创建和实现游戏性类的参考。
