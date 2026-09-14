---
title: "虚幻架构"
description: "Unreal Architecture in Unreal Engine 的中文译文。"
sourceTitle: "Unreal Architecture in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/programming-in-the-unreal-engine-architecture"
engineVersion: "5.8"
reviewedAt: 2026-09-14
order: 1
draft: false
tags: [Unreal Engine, C++]
---

# 虚幻架构

本节介绍虚幻引擎的核心架构概念和系统。

虚幻引擎提供了一套完整的架构系统，用于管理资产加载、数据验证、模块组织、配置系统等核心功能。理解这些系统对于高效开发虚幻引擎项目至关重要。

## 章节目录

- [资产异步加载](asynchronous-asset-loading.md) - 介绍在运行时加载和卸载资产的方法。
- [Core Redirects](core-redirects.md) - 在加载时重新映射类、枚举、函数、包和属性。
- [数据验证](data-validation.md) - 使用自定义脚本规则集验证资产。
- [虚幻引擎模块](unreal-engine-modules.md) - 模块是虚幻引擎软件架构的构建块。
- [引用资产](referencing-assets.md) - 控制资产如何引用并加载到内容中。
- [资产注册表](asset-registry.md) - 编辑器如何发现资产及了解资产类型信息。
- [编程子系统](programming-subsystems.md) - 虚幻引擎编程子系统概览。
- [控制台变量和命令](console-variables-and-commands.md) - 控制台管理器总览与创建控制台变量。
- [字符串处理](string-handling.md) - FName、FText 和 FString 参考指南。
- [任务系统](tasks-system.md) - 关于任务系统的概述。
- [配置文件](configuration-files.md) - 配置启动时的 Gameplay 或引擎行为。
- [命令行参数](command-line-arguments.md) - 传递到引擎可执行文件以自定义启动行为。
- [资产和包的版本控制](versioning-of-assets-and-packages.md) - 使用自定义序列化代码和版本控制。
