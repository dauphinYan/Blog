---
title: "异步关卡加载"
description: "Asynchronous Level Loading in Unreal Engine 的中文译文。"
sourceTitle: "Asynchronous Level Loading in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/asynchronous-level-loading-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-15
order: 3
draft: false
tags: [Unreal Engine, C++]
---

# 异步关卡加载

启用异步加载以改善打开关卡时的加载时间。

> **注意**：异步（async）加载是实验性功能。使用此功能时可能会遇到竞态条件和其他问题。

为了改善在编辑器中打开关卡时的加载时间，虚幻引擎支持异步（async）加载。

在虚幻引擎中，默认情况下加载在称为游戏线程的单个线程上同步进行。加载涉及反序列化资产、创建 UObject 以及应用变换，直到世界加载完成并准备好显示。

使用异步关卡加载时，加载过程的部分内容会委托给与工作线程异步运行的工作线程。异步加载过程还会跨多个 CPU 核心分配，以便具有更多核心的计算机可以更快地加载世界。

有关异步加载在虚幻引擎中如何工作的更多详细信息，以及此功能的实现方式，请参阅 [Mastering Async Loading in Unreal Engine](https://dev.epicgames.com/community/learning/knowledge-base/7Oxm/mastering-async-loading-in-unreal-engine)。

## 设置异步加载

为了检测异步加载工具的竞态条件，我们建议您的系统在编辑器运行且地图加载后具有 24 到 32GB 的可用内存。

异步加载工具包括插桩编译器和运行时竞态检测。请按照以下步骤设置该工具：

1. 要激活编译器，请在您正在使用的分支中的 `BuildConfiguration.xml` 文件中将 `bEnableInstrumentation` 设置为 `true`，然后编译您的项目：

   ```xml
   <?xml version="1.0" encoding="utf-8" ?>
   <Configuration xmlns="https://www.unrealengine.com/BuildConfiguration">
     <BuildConfiguration>
       <bEnableInstrumentation>true</bEnableInstrumentation>
     </BuildConfiguration>
   </Configuration>
   ```

2. 在启用插桩功能编译项目后，运行以下命令行以激活竞态检测：

   ```
   -asyncloadingthread -dpcvars=s.DetectRaceDuringLoading=1
   ```

   编译器基于 Clang，因此如果您之前仅使用 MSVC 编译，可能需要修复一些编译错误。

此命令仅在异步加载处于活动状态时运行竞态检测，以提高编辑器性能。在竞态检测处于活动状态时运行插桩构建通常比正常构建慢 10 到 20 倍。当竞态检测未处于活动状态时，插桩构建仅慢 1.5 到 3 倍。

运行竞态检测不是强制性的，但如果您的项目中有大量修改的引擎或 C++ 代码，则被认为是最佳实践，因为它可以检测可能难以复现的线程错误。

## 默认启用异步加载

在使用控制台测试异步加载后，您可以通过编辑 `DefaultEngine.ini` 并添加以下内容来将项目设置为默认使用异步加载：

```ini
[/Script/Engine.EditorStreamingSettings]
s.AsyncLoadingThreadEnabled=True
s.AllowMultithreadedLoading=True
```

## 异步加载最佳实践

使用异步加载时，请遵循以下最佳实践：

- 尽可能避免刷新加载管道。每次刷新都需要工作线程与游戏线程同步，这会暂时阻止它们与游戏线程并行运行。

- 在加载期间将委托注册延迟到 Postload 或更晚。

- 在加载期间将全局系统交互延迟到 Postload 或更晚。

- 避免从加载器调用的函数中进行 UI 交互。

- 避免从加载器调用的函数中进行事务系统交互。

- 自定义序列化代码应仅接触正在序列化的对象。

- 在加载期间将同步加载延迟到 Postload 或更晚。

- 避免从加载器调用的函数中基于全局变量做出决策。
