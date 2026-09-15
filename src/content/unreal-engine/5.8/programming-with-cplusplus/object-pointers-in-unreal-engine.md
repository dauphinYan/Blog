---
title: "对象指针"
description: "Object Pointers 11的中文译文。"
sourceTitle: "Object Pointers"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/object-pointers-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-15
order: 7
draft: false
tags: [Unreal Engine, C++]
---

# 对象指针

Unreal Engine 为各种使用场景提供了多种模板化的智能指针。所有 Unreal Engine 对象指针类型必须使用 `UObject` 类型来构造，即派生自 `UObject` 的类。

下表概述了 Unreal Engine 中可用的对象指针类型及其部分属性。表格各列含义如下：

- **指针类型**：指针的类型。
- **使用情况**：该指针类型是常用、谨慎使用、已标记弃用还是已移除。
- **是否支持 UPROPERTY？**：该指针类型是否可以标记为 `UPROPERTY`。
- **是否影响 GC？**：指向目标对象的该类型指针的存在是否会使被引用对象保持存活。
- **是否支持按需加载？**：该指针类型是否跟踪目标对象在磁盘上的路径以便后续加载。
- **是否序列化？**：该指针类型是否支持序列化目标对象以进行存储。
- **是否支持网络？**：具有网络序列化器，并在副本属性或远程过程调用中使用或受支持。

在本文档页面中，假设模板类型为 `T`。

| 指针类型              | 使用情况   | 是否支持 UPROPERTY？ | 是否影响 GC？ | 是否支持按需加载？ | 是否序列化？ | 是否支持网络？ |
| --------------------- | ---------- | -------------------- | ------------- | ------------------ | ------------ | -------------- |
| `T*`（原始指针）      | 常用       | ❌*                   | ❌*            | ❌                  | ❌*           | ❌*             |
| `TObjectPtr<T>`       | 常用       | ✔️                    | ✔️ †           | ❌                  | ✔️            | ✔️              |
| `TLazyObjectPtr<T>`   | 已弃用 ‡   | ✔️                    | ❌             | ❌                  | ✔️            | ❌              |
| `TSoftObjectPtr<T>`   | 常用       | ✔️                    | ❌             | ✔️                  | ✔️            | ✔️              |
| `TWeakObjectPtr<T>`   | 常用       | ✔️                    | ❌             | ❌                  | ✔️            | ✔️              |
| `TStrongObjectPtr<T>` | 谨慎使用 § | ❌                    | ✔️ ❡           | ❌                  | ❌            | ❌              |

**表格脚注：**

\* Unreal Header Tool (UHT) 可以配置为启用标记为 `UPROPERTY` 的原始指针，在这种情况下原始指针会影响 GC、支持序列化并支持网络。现有的标记为 `UPROPERTY` 的原始指针应尽可能迁移为使用标记为 `UPROPERTY` 的 `TObjectPtr`。

† `TObjectPtr` 只有在标记为 `UPROPERTY` 时才是垃圾回收安全的。

‡ `TLazyObjectPtr` 已弃用，并标记为在未来的引擎版本中移除，请改用 `TSoftObjectPtr`。

§ 有关更多信息，请参见下方的 `TStrongObjectPtr` 章节。

❡ 由于 `TStrongObjectPtr` 不能标记为 `UPROPERTY`，因此它在所有地方（在栈上、在 lambda 中捕获等）都会影响垃圾回收。

## 对象指针快速指南

以下是确定在最常见使用场景中应使用哪种指针的快速指南。由于 `TLazyObjectPtr` 已弃用，因此下表中省略了它。

| 使用场景...                                                                       | 使用的指针类型...     |
| --------------------------------------------------------------------------------- | --------------------- |
| 非 `UPROPERTY` 标记字段的局部变量、参数或短生命周期引用。                         | `T*`（原始指针）      |
| `UCLASS` 或 `USTRUCT` 上需要垃圾回收跟踪、序列化或副本同步的持久 `UObject` 引用。 | `TObjectPtr<T>`       |
| 对资产的引用，在请求之前不应强制加载，也不应创建硬依赖。                          | `TSoftObjectPtr<T>`   |
| 对可能在任何时候被销毁的 `UObject` 的非持有引用或缓存。                           | `TWeakObjectPtr<T>`   |
| 从非 `UObject` 类或结构体对 `UObject` 的强引用。                                  | `TStrongObjectPtr<T>` |

## 指针类型详解

本节将详细介绍每种指针类型，并提供示例使用场景以帮助你确定何时使用每种类型。

### TObjectPtr

`TObjectPtr` 旨在作为原始指针的直接替代品。`TObjectPtr` 只能用于派生自 `UObject` 的类型。它的序列化方式与指向 `UObject` 的原始指针相同。当 `TObjectPtr` 被标记为 `UPROPERTY` 时，它是对对象的强引用，会影响垃圾回收并阻止垃圾回收销毁目标对象。

应尽可能使用 `TObjectPtr` 代替原始指针，因为它支持高级的烹饪时依赖跟踪，并为垃圾回收启用屏障，从而解锁增量垃圾回收标记。`TObjectPtr` 还支持副本同步。

你不应该从工作线程直接通过 `TObjectPtr` 访问 `UObject`，除非你确定它们包含的对象已经正确生根并且在访问期间不会被垃圾回收。对于从工作线程操作 `UObject`，请使用 `TWeakObjectPtr` 配合 `TWeakObjectPtr::Pin` 方法来获取指向目标 `UObject` 的 `TStrongObjectPtr`（前提是目标对象仍然有效）。

`TObjectPtr` 的示例使用场景包括：

- `UPROPERTY` 标记的指向另一个 `UObject` 内部 `UObject` 的指针。

```cpp
class UMyObject : UObject
{
    // ...

    UPROPERTY()
    TObjectPtr<UMyOtherObject> MyOtherObject;
}
```

- 对 Actor 组件的硬引用。

```cpp
class AMyActor : AActor
{
    // ...

    UPROPERTY()
    TObjectPtr<UStaticMeshComponent> Mesh;
}
```

### TLazyObjectPtr

`TLazyObjectPtr` 已标记为在未来的引擎版本中弃用。新功能应改用 `TSoftObjectPtr`。

`TLazyObjectPtr` 是一个基于 GUID 的惰性弱指针。如果目标对象尚未加载，`TLazyObjectPtr` 不会加载它，并且随着对象在内存中的加载和卸载，它可以在有效和挂起状态之间切换。`TLazyObjectPtr` 不会阻止目标对象被垃圾回收。

### TSoftObjectPtr

`TSoftObjectPtr` 是对对象的弱引用，它跟踪目标对象在磁盘上的路径，且不会影响所指对象是否被垃圾回收。由于 `TSoftObjectPtr` 跟踪对象在磁盘上的路径，随着被引用对象在内存中的加载和卸载，它可能在有效和挂起状态之间来回切换。这对于你想要按需异步加载的资产或防止硬依赖非常有用。如果目标对象尚未有效，你必须显式地同步或异步加载它。

`TSoftObjectPtr` 的示例使用场景包括：

- 通过路径同步或异步加载对象。

```cpp
public AMyActor : AActor
{
    // ...

    UPROPERTY(EditAnywhere)
    TSoftObjectPtr<UNiagaraSystem> NiagaraVFX;

    // 在 OnLoadComplete 中使用 NiagaraVFX.Get()
    void OnLoadComplete();
}
```

### TWeakObjectPtr

`TWeakObjectPtr` 是指向对象的弱指针。`TWeakObjectPtr` 不需要标记为 `UPROPERTY`，但也支持 `UPROPERTY`。`TWeakObjectPtr` 支持序列化，也支持网络。最常见的用法是，当你明确不想阻止对象被垃圾回收时使用 `TWeakObjectPtr`。如果目标对象被垃圾回收或销毁，弱指针会自动变为空。在使用之前，始终通过 `TWeakObjectPtr::IsValid` 检查 `TWeakObjectPtr` 是否有效，或使用 `TWeakObject::Get` 并测试是否为空。

`TWeakObjectPtr` 不支持作为 `TMap` 的键，也不支持作为 `TSet` 的元素。如果你希望使用 `UObject` 作为键，请改用 `TObjectKey`。

`TWeakObjectPtr` 的示例使用场景包括：

- 缓存对象。

```cpp
// 对象缓存
TMap<TSubclassOf<UObject>, TWeakObjectPtr<UObject>> CachedObjects;

// 按类获取缓存的对象（如果仍然有效）
UObject* GetCachedObject(TSubclassOf<UObject> CachedObjectClass)
{
    if (TWeakObjectPtr<UObject> FoundObject = *CachedObjects.Find(CachedObjectClass))
    {
        // 如果在游戏线程上运行，这种模式是允许的：
        if (FoundObject.IsValid())
        {
            // ...
        }
    }
}
```

- 在 lambda 中捕获弱对象指针。

```cpp
FSimpleDelegate MyDelegate;
TObjectPtr<UMyObject> MyObject;

MyDelegate.BindLambda(
    [MyWeakObject = MakeWeakObjectPtr(MyObject)]()
    {
        if (TStrongObjectPtr<UMyObject> MyStrongObject = MyWeakObject.Pin())
        {
            // 对象可以安全访问
        }
    }
);
```

### TStrongObjectPtr

`TStrongObjectPtr` 是指向对象的强指针。`TStrongObjectPtr` 计算对目标对象的引用计数，并在其作用域内通过强制保持目标对象存活来阻止垃圾回收。`TStrongObjectPtr` 不支持 `UPROPERTY`，因此不适合用于 `UObject` 派生类中的字段。在 `UObject` 内部将 `TStrongObjectPtr` 标记为 `UPROPERTY` 容易产生不可回收的循环引用。例如，如果一个 `UObject` 派生类有一个 `TStrongObjectPtr` 成员字段被设置为指向自身，这就创建了一个不可回收的循环引用——即该对象永远不会被删除，即使没有对该对象的其他引用（而 `TObjectPtr` 的自引用则不会出现这种情况）。由于 `TStrongObjectPtr` 不支持 `UPROPERTY`，它对调试工具的可见性也较低，这使得更难确定目标对象为什么仍然存活。

创建和销毁 `TStrongObjectPtr` 都是开销较大的操作，应尽可能避免。对于不经常变化的长生命周期引用，请使用 `TStrongObjectPtr`。因此，在 Mass 等系统中应避免使用 `TStrongObjectPtr`，因为这些系统中的对象在帧更新之间不太可能被删除。每个 `TStrongObjectPtr` 都会为垃圾回收添加一个跟踪引用。`TStrongObjectPtr` 始终是保持目标对象存活的强引用，即使该对象不可达且可以被垃圾回收。因此，使用 `TStrongObjectPtr` 可能会降低性能。

`TStrongObjectPtr` 用于在非 `UObject` 持有类（如不派生自 `UObject` 的类或结构体）中存储对 `UObject` 的强引用，因为在 `UObject` 之外 `UPROPERTY` 不可用。

对于以下使用场景，请使用建议的指针类型代替 `TStrongObjectPtr`：

- 对于 `UObject` 类内部的持有引用，使用标记为 `UPROPERTY` 的 `TObjectPtr`。
- 对于非持有引用，使用 `TWeakObjectPtr`。对于资产引用，使用 `TWeakObjectPtr`。

`TStrongObjectPtr` 的示例使用场景包括：

- 在非 `UObject` 持有者中对 `UObject` 的强引用。

```cpp
class FMyClass
{
    // ...

    // 在非 UObject 类中对 UObject 的强引用
    TStrongObjectPtr<UMyObject> MyObject;
}
```
