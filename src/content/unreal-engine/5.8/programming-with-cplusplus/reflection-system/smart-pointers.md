---
title: "虚幻智能指针库"
description: "Unreal Smart Pointer Library 的中文译文。"
sourceTitle: "Unreal Smart Pointer Library"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/smart-pointers-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 6
draft: false
tags: [Unreal Engine, C++]
---

# 虚幻智能指针库

**虚幻智能指针库**是 C++11 智能指针的自定义实现，旨在减轻内存分配和追踪的负担。该实现包括行业标准**共享指针**、**弱指针**和**唯一指针**。它还添加了**共享引用**，其行为类似于不可为空的共享指针。这些类不能与 `UObject` 系统一起使用，因为虚幻对象使用单独的内存跟踪系统，更适合游戏代码。

## 智能指针类型

智能指针可以影响其包含或引用的对象的生命周期。不同的智能指针对对象有不同的限制和影响。下表可用于帮助确定何时适合使用每种类型的智能指针：

| 智能指针类型 | 用例 |
|------------|------|
| **[共享指针](https://dev.epicgames.com/documentation/unreal-engine/shared-pointers-in-unreal-engine)**（`TSharedPtr`） | 共享指针拥有它引用的对象，无限期地防止该对象被删除，并在没有共享指针或共享引用（见下文）引用它时最终处理其删除。共享指针可以为空，意味着它不引用任何对象。任何非空共享指针都可以生成对其引用对象的共享引用。 |
| **[共享引用](https://dev.epicgames.com/documentation/unreal-engine/shared-references-in-unreal-engine)**（`TSharedRef`） | 共享引用的行为类似于共享指针，因为它拥有它引用的对象。它们在空对象方面有所不同；共享引用必须始终引用非空对象。由于共享指针没有这种限制，共享引用总是可以转换为共享指针，并且该共享指针保证引用有效对象。当你想要保证引用的对象非空，或者想要表示共享对象所有权时，请使用共享引用。 |
| **[弱指针](https://dev.epicgames.com/documentation/unreal-engine/weak-pointers-in-unreal-engine)**（`TWeakPtr`） | 弱指针类似于共享指针，但不拥有它引用的对象，因此不影响其生命周期。这个属性非常有用，因为它打破了引用循环，但这也意味着弱指针可以在任何时候无警告地变为空。因此，弱指针可以生成对其引用对象的共享指针，确保程序员能够临时安全地访问该对象。 |
| **唯一指针**（`TUniquePtr`） | 唯一指针完全且明确地拥有它引用的对象。由于给定资源只能有一个唯一指针，唯一指针可以转移所有权，但不能共享。任何复制唯一指针的尝试都将导致编译错误。当唯一指针超出范围时，它将自动删除它引用的对象。 |

为唯一指针引用的对象创建共享指针或共享引用是危险的。这不会暂停唯一指针在自身销毁时删除对象的行为，即使其他智能指针仍然引用它。同样，你不应为共享指针或共享引用引用的对象创建唯一指针。

## 智能指针的优势

| 优势 | 描述 |
|------|------|
| **防止内存泄漏** | 智能指针（弱指针除外）在没有更多共享引用时自动删除对象。 |
| **弱引用** | 弱指针打破引用循环并防止悬空指针。 |
| **可选的线程安全** | 虚幻智能指针库包含跨多个线程管理引用计数的线程安全代码。如果不需要，可以用线程安全换取更好的性能。 |
| **运行时安全** | 共享引用永远不会为空，并且总是可以解引用。 |
| **传达意图** | 你可以轻松区分对象所有者和观察者。 |
| **内存** | 智能指针在 64 位下仅是 C++ 指针大小的两倍（加上共享的 16 字节引用控制器）。唯一的例外是唯一指针，其大小与 C++ 指针相同。 |

## 辅助类和函数

虚幻智能指针库提供了几个辅助类和函数，使使用智能指针更容易、更直观。

| 辅助 | 描述 |
|------|------|
| **类** |  |
| `TSharedFromThis` | 从 `TSharedFromThis` 派生你的类会添加 `AsShared` 或 `SharedThis` 函数。这些函数使你能够获取对象的 `TSharedRef`。 |
| **函数** |  |
| `MakeShared` 和 `MakeShareable` | 从常规 C++ 指针创建共享指针。`MakeShared` 在单个内存块中分配新的对象实例和引用控制器，但要求对象提供公共构造函数。`MakeShareable` 效率较低，但即使对象的构造函数是私有的也能工作，使你能够获取未创建的对象的所有权，并支持删除对象时的自定义行为。 |
| `StaticCastSharedRef` 和 `StaticCastSharedPtr` | 静态转换实用函数，通常用于向下转换为派生类型。 |
| `ConstCastSharedRef` 和 `ConstCastSharedPtr` | 分别将 `const` 智能引用或智能指针转换为 `mutable` 智能引用或智能指针。 |

## 智能指针实现细节

虚幻智能指针库中的智能指针在功能和效率方面都有一些共同特征。

### 速度

在考虑使用智能指针时，始终要考虑性能。智能指针非常适合某些高级系统、资源管理或工具编程。然而，某些智能指针类型比原始 C++ 指针慢，这种开销使它们在低级引擎代码（如渲染）中不太有用。

智能指针的一些一般性能优势包括：

- 所有操作都是常量时间。
- 解引用大多数智能指针与原始 C++ 指针一样快（在发布版本中）。
- 复制智能指针从不分配内存。
- 线程安全智能指针是无锁的。

智能指针的性能缺点包括：

- 创建和复制智能指针比创建和复制原始 C++ 指针涉及更多开销。
- 维护引用计数会增加基本操作的周期。
- 某些智能指针比原始 C++ 指针使用更多内存。
- 引用控制器有两个堆分配。使用 `MakeShared` 而不是 `MakeShareable` 可以避免第二次分配，并可以提高性能。

### 侵入式访问器

共享指针是非侵入式的，这意味着对象不知道智能指针是否拥有它。这通常是可以接受的，但可能存在你想要将对象作为共享引用或共享指针访问的情况。为此，使用对象的类作为模板参数，从 `TSharedFromThis` 派生对象的类。`TSharedFromThis` 提供两个函数 `AsShared` 和 `SharedThis`，可以将对象转换为共享引用（并从中转换为共享指针）。这对于总是返回共享引用的类工厂很有用，或者当你需要将对象传递给需要共享引用或共享指针的系统时。`AsShared` 将你的类作为最初作为模板参数传递给 `TSharedFromThis` 的类型返回，这可能是调用对象的父类型，而 `SharedThis` 将直接从 this 派生类型并返回引用该类型对象的智能指针。以下示例代码演示了这两个函数：

```cpp
class FRegistryObject;
class FMyBaseClass: public TSharedFromThis<FMyBaseClass>
{
    virtual void RegisterAsBaseClass(FRegistryObject* RegistryObject)
    {
        // 访问 'this' 的共享引用。
        // 我们直接从 <TSharedFromThis> 继承，因此 AsShared() 和 SharedThis(this) 返回相同的类型。
        TSharedRef<FMyBaseClass> ThisAsSharedRef = AsShared();
        // RegistryObject 期望 TSharedRef<FMyBaseClass> 或 TSharedPtr<FMyBaseClass>。TSharedRef 可以隐式转换为 TSharedPtr。
        RegistryObject->Register(ThisAsSharedRef);
    }
};

class FMyDerivedClass : public FMyBaseClass
{
    virtual void Register(FRegistryObject* RegistryObject) override
    {
        // 我们没有直接从 TSharedFromThis<> 继承，因此 AsShared() 和 SharedThis(this) 返回不同的类型。
        // AsShared() 将返回最初在 TSharedFromThis<> 中指定的类型 - 在此示例中为 TSharedRef<FMyBaseClass>。
        // SharedThis(this) 将返回带有 'this' 类型的 TSharedRef - 在此示例中为 TSharedRef<FMyDerivedClass>。
        // SharedThis() 函数仅在与 'this' 指针相同的范围内可用。
        TSharedRef<FMyDerivedClass> AsSharedRef = SharedThis(this);
        // RegistryObject 将接受 TSharedRef<FMyDerivedClass>，因为 FMyDerivedClass 是 FMyBaseClass 的一种类型。
        RegistryObject->Register(ThisAsSharedRef);
    }
};

class FRegistryObject
{
    // 此函数将接受 FMyBaseClass 或其任何子类的 TSharedRef 或 TSharedPtr。
    void Register(TSharedRef<FMyBaseClass>);
};
```

不要从构造函数中调用 `AsShared` 或 `SharedThis`，因为此时共享引用未初始化，将导致崩溃或断言。

### 转换

你可以通过虚幻智能指针库中包含的几个支持函数转换共享指针（和共享引用）。向上转换是隐式的，与 C++ 指针相同。你可以使用 `ConstCastSharedPtr` 函数进行 const 转换，使用 `StaticCastSharedPtr` 进行静态转换（通常用于向下转换为派生类指针）。不支持动态转换，因为没有运行时类型信息（RTTI）；应使用静态转换，如下面的代码所示：

```cpp
// 这假设我们通过其他方式验证了 FDragDropOperation 实际上是 FAssetDragDropOp。
TSharedPtr<FDragDropOperation> Operation = DragDropEvent.GetOperation();
// 我们现在可以使用 StaticCastSharedPtr 进行转换。
TSharedPtr<FAssetDragDropOp> DragDropOp = StaticCastSharedPtr<FAssetDragDropOp>(Operation);
```

### 线程安全

默认情况下，智能指针仅在线程上访问是安全的。如果你需要多个线程访问，请使用智能指针类的线程安全版本：

- `TSharedPtr<T, ESPMode::ThreadSafe>`
- `TSharedRef<T, ESPMode::ThreadSafe>`
- `TWeakPtr<T, ESPMode::ThreadSafe>`
- `TSharedFromThis<T, ESPMode::ThreadSafe>`

由于原子引用计数，这些线程安全版本比默认版本稍慢，但它们的行为与常规 C++ 指针一致：

- 读取和复制始终是线程安全的。
- 写入和重置必须同步才能安全。

如果你知道你的指针永远不会被多个线程访问，你可以通过避免使用线程安全版本来获得更好的性能。

## 提示和限制

- 尽可能避免将数据作为 `TSharedRef` 或 `TSharedPtr` 参数传递给函数，因为这些会通过解引用和引用计数产生开销。相反，传递引用的对象，最好作为 `const &`。
- 你可以向前声明共享指针到不完整的类型。
- 共享指针与虚幻对象（`UObject` 及其派生类）不兼容。引擎有单独的内存管理系统（参见[对象处理](https://dev.epicgames.com/documentation/unreal-engine/unreal-object-handling-in-unreal-engine)文档）用于 `UObject` 管理，两个系统没有重叠。
