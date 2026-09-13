---
title: "UFunction"
description: "UFunctions in Unreal Engine 的中文译文。"
sourceTitle: "UFunctions in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/ufunctions-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 5
draft: false
tags: [Unreal Engine, C++]
---

# UFunction

## UFunction 声明

**UFunction** 是被虚幻引擎反射系统识别的 C++ 函数。任何 `UObject` 或蓝图函数库都可以通过在头文件中函数声明上方放置 `UFUNCTION` 宏来将成员函数声明为 UFunction。该宏支持**函数说明符**来改变虚幻引擎如何解释和使用函数。

`UFUNCTION([specifier1=setting1, specifier2, ...], [meta(key1="value1", key2, ...)]) ReturnType FunctionName([Parameter1, Parameter2, ..., ParameterN1=DefaultValueN1, ParameterN2=DefaultValueN2]) [const];`

通过函数说明符，你可以将 UFunction 公开给[蓝图可视化脚本](https://dev.epicgames.com/documentation/unreal-engine/blueprints-visual-scripting-in-unreal-engine)图表，这为开发者提供了一种从蓝图资产中调用或扩展 UFunction 的方式，而无需修改 C++ 代码。

UFunction 能够绑定到类的默认属性中的[委托](../delegates/delegates.md)，使它们能够执行将操作与用户输入关联等任务。它们还可以充当网络回调，这意味着你可以使用它们在某个变量受到网络更新影响时接收通知并运行自定义代码。

你甚至可以创建自己的_控制台命令_（通常称为_调试_、_配置_或_作弊码_命令），可以在开发版本中从游戏控制台调用，或者在关卡编辑器中为游戏对象添加具有自定义功能的按钮。

### 函数说明符

声明函数时，可以将**函数说明符**添加到声明中，以控制函数与引擎和编辑器各方面的行为。

| 函数说明符 | 效果 |
|-----------|------|
| `BlueprintAuthorityOnly` | 此函数仅在具有网络权限的机器上（服务器、专用服务器或单人游戏）运行蓝图代码时执行。 |
| `BlueprintCallable` | 该函数可以在蓝图或关卡蓝图图表中执行。 |
| `BlueprintCosmetic` | 此函数是装饰性的，不会在专用服务器上运行。 |
| `BlueprintImplementableEvent` | 该函数可以在蓝图或关卡蓝图图表中实现。 |
| `BlueprintNativeEvent` | 此函数设计为由蓝图覆盖，但也有默认的本机实现。声明一个与主函数同名的额外函数，但在末尾添加了 `_Implementation`，代码应写入其中。如果没有找到蓝图覆盖，自动生成的代码将调用 `_Implementation` 方法。 |
| `BlueprintPure` | 该函数不会以任何方式影响拥有对象，可以在蓝图或关卡蓝图图表中执行。默认情况下，标记为 `const` 的函数将作为纯函数公开。要使 const 函数不是纯函数，你可以声明：`BlueprintPure=false`。纯函数不会缓存其结果，因此在执行任何非平凡工作量时应谨慎使用蓝图函数。避免在蓝图纯函数中输出数组属性是一个好习惯。 |
| `CallInEditor` | 此函数可以通过详细信息面板中的按钮在编辑器中的选定实例上调用。 |
| `Category = "TopCategory\|SubCategory\|Etc"` | 指定在蓝图编辑工具中显示时函数的类别。使用 \| 运算符定义嵌套类别。 |
| `Client` | 该函数仅在拥有调用函数的对象的客户端上执行。声明一个与主函数同名的额外函数，但在末尾添加了 `_Implementation`。自动生成的代码将在必要时调用 `_Implementation` 方法。 |
| `CustomThunk` | `UnrealHeaderTool` 代码生成器不会为此函数生成 thunk；用户需要使用 `DECLARE



