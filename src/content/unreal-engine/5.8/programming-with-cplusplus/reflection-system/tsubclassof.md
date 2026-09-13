---
title: "TSubclassOf"
description: "TSubclassOf in Unreal Engine 的中文译文。"
sourceTitle: "TSubclassOf in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/typed-object-pointer-properties-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 3
draft: false
tags: [Unreal Engine, C++]
---

# TSubclassOf

**TSubclassOf** 是提供 UClass 类型安全性的模板类。例如，假设你正在创建一个投射物类，允许设计者指定伤害类型。你可以只创建一个 UClass 类型的 UPROPERTY，希望设计者总是分配一个从 UDamageType 派生的类，或者你可以使用 TSubclassOf 模板来强制选择。下面的示例代码展示了区别：

```cpp
/** type of damage */
UPROPERTY(EditDefaultsOnly, Category=Damage)
UClass* DamageType;
```

对比：

```cpp
/** type of damage */
UPROPERTY(EditDefaultsOnly, Category=Damage)
TSubclassOf<UDamageType> DamageType;
```

在第二个声明中，模板类告诉编辑器的属性窗口只列出从 UDamageType 派生的类作为属性的选择。在第一个声明中，可以选择任何 UClass。下图对此进行了说明。

![策略游戏投射物蓝图示例](image alt text)

除了 UPROPERTY 安全性之外，你还能在 C++ 级别获得类型安全。如果你尝试将不兼容的 TSubclassOf 类型相互赋值，你会得到编译错误。如果你尝试赋值一个通用的 UClass，它会执行运行时检查以验证是否可以执行赋值。如果运行时检查失败，结果值为 nullptr。

```cpp
UClass* ClassA = UDamageType::StaticClass();

TSubclassOf<UDamageType> ClassB;

ClassB = ClassA; // 执行运行时检查

TSubclassOf<UDamageType_Lava> ClassC;

ClassB = ClassC; // 执行编译时检查
```
