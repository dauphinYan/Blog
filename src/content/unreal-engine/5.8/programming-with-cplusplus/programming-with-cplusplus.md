---
title: "使用 C++ 编程"
description: "Programming with C++ in Unreal Engine 的中文译文。"
sourceTitle: "Programming with C++ in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/programming-with-cplusplus-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 1
draft: false
tags: [Unreal Engine, C++]
---

# 使用 C++ 编程

虚幻引擎为 C++ 程序员提供了一个强大的框架，帮助他们将愿景变为现实。

本节假设你具备一定的 C++ 经验。

本节介绍了几个强大的功能，你可以用它们来加速开发工作流程。你可以了解以下内容：

- 在 C++ 中创建新的[游戏性类](gameplay-architecture/gameplay-classes.md)，在使用 [Visual Studio](https://dev.epicgames.com/documentation/404) 或 XCode 编译后，所有更改都将反映在[虚幻编辑器](https://dev.epicgames.com/documentation/unreal-engine/unreal-editor-interface)中。在虚幻引擎中创建类与创建标准 C++ 类、函数和变量相似。这些都是使用[标准 C++ 语法](coding-standard/coding-standard.md)定义的。

- 使用[虚幻反射系统](reflection-system/reflection-system.md)来封装你的类，使用[元数据属性说明符](reflection-system/metadata-specifiers.md)宏提供编辑器功能。每个类都定义了一个新的 Object 或 Actor 的模板。

- [虚幻引擎中的容器](containers/containers.md)提供了关于类和数据结构集合的信息。

- 使用[游戏性架构](gameplay-architecture/gameplay-architecture.md)在虚幻引擎中构建你的项目。游戏性框架提供了一个由 Object 和 Actor 构成的层级结构。这些类包含模板变量和函数，你可以在创建和设计互动体验时使用。

- 创建[委托](delegates/delegates.md)能够以通用、类型安全的方式调用 C++ 对象上的成员函数。你可以动态地将一个委托绑定到任意对象的成员函数，并在未来的某个时间调用该对象的函数，即使调用者不知道该对象的类型。

## 章节目录

- [虚幻引擎反射系统](reflection-system/reflection-system.md) - 为开发用于虚幻引擎的 Object 的程序员提供的信息。
- [代码规范](coding-standard/coding-standard.md) - 通过遵守既定标准和最佳实践，编写可维护的代码。
- [虚幻引擎中的容器](containers/containers.md) - 关于虚幻引擎中类和数据结构集合的信息。
- [游戏性架构](gameplay-architecture/gameplay-architecture.md) - 创建和实现游戏性类的参考。
- [委托](delegates/delegates.md) - 在 C++ 对象上引用和执行成员函数的数据类型。
