---
title: "代码规范"
description: "Coding Standard in Unreal Engine 的中文译文。"
sourceTitle: "Coding Standard in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 1
draft: false
tags: [Unreal Engine, C++]
---

# 代码规范

在 Epic Games，我们有一些简单的代码标准和约定。本文档反映了 Epic Games 当前代码规范的状态。必须遵循代码规范。

代码约定对程序员很重要，原因有几个：

- 软件生命周期成本的 80% 用于维护。
- 几乎没有任何软件在其整个生命周期内由原作者维护。
- 代码约定提高了软件的可读性，使工程师能够快速彻底地理解新代码。
- 如果我们决定向模组社区开发者公开源代码，我们希望它易于理解。
- 许多这些约定是跨编译器兼容性所必需的。

以下代码规范以 C++ 为中心；但是，无论使用哪种语言，都应遵循该标准。如果某个部分提供了适用于特定语言的等效规则或例外。

## 类组织

**类**应该以读者为中心进行组织，而不是以编写者为中心。由于大多数读者将使用类的公共接口，因此应首先声明公共实现，然后是类的私有实现。

```cpp
UCLASS()

class EXAMPLEPROJECT_API AExampleActor : public AActor
{
    GENERATED_BODY()
    
public:	
    // 设置此 actor 属性的默认值
    AExampleActor();

protected:
    
    // 游戏开始或生成时调用
    virtual void BeginPlay() override;
};
```

## 版权声明

Epic Games 提供的任何用于公共分发的源文件（`.h`、`.cpp`、`.xaml`）必须在文件的第一行包含版权声明。通知的格式必须与下面显示的完全匹配：

```cpp
// Copyright Epic Games, Inc. All Rights Reserved.
```

如果此行缺失或格式不正确，CIS 将生成错误并失败。

## 命名约定

使用命名约定时，所有代码和注释都应使用美式英语拼写和语法。

- 名称（如类型名或变量名）中每个单词的首字母大写。单词之间通常没有下划线。例如，`Health` 和 `UPrimitiveComponent` 是正确的，但 `lastMouseCoordinates` 或 `delta_coordinates` 不是。
    
    这是 PascalCase 格式，适用于可能熟悉其他面向对象编程语言的用户。
    
- 类型名以前缀的额外大写字母为前缀，以将它们与变量名区分开。例如，`FSkin` 是类型名，而 `Skin` 是 `FSkin` 类型的实例。
    
- 模板类以 T 为前缀。
    
    ```cpp
    template <typename ObjectType>
    class TAttribute
    ```
    
- 从 [UObject](objects.md) 继承的类以 U 为前缀。
    
    ```cpp
    class UActorComponent
    ```
    
- 从 [AActor](https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine) 继承的类以 A 为前缀。
    
    ```cpp
    class AActor
    ```
    
- 从 [SWidget](https://dev.epicgames.com/documentation/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine) 继承的类以 S 为前缀。
    
    ```cpp
    class SCompoundWidget
    ```
    
- 抽象接口的类以 I 为前缀。
    
    ```cpp
    class IAnalyticsProvider
    ```
    
- Epic 的概念类似结构体类型以 C 为前缀。
    
    ```cpp
    struct CStaticClassProvider
    {
        template <typename T>
        auto Requires(UClass*& ClassRef) -> decltype(
            ClassRef = T::StaticClass()
        );
    };
    ```
    
- 枚举以 E 为前缀。
    
    ```cpp
    enum class EColorBits
    {
        ECB_Red,
        ECB_Green,
        ECB_Blue
    };
    ```
    
- 布尔变量必须以 b 为前缀。
    
    ```cpp
    bPendingDestruction
    bHasFadedIn
    ```
    
- 大多数其他类以 F 为前缀，尽管某些子系统使用其他字母。
    
- Typedef 应以适合该类型的任何内容为前缀，例如：
    
    - F 用于结构体的 typedef
    - U 用于 `UObject` 的 typedef
        
- 特定模板实例化的 typedef 不再是模板，应相应地加前缀。
    
    ```cpp
    typedef TArray<FMytype> FArrayOfMyTypes;
    ```
    
- 在 C# 中省略前缀。
    
- Unreal Header Tool 在大多数情况下需要正确的前缀，因此提供它们很重要。
    
- 类型模板参数和基于这些模板参数的嵌套类型别名不受上述前缀规则的约束，因为类型类别未知。
    
- 在描述性术语后首选 Type 后缀。
    
- 通过使用 In 前缀区分模板参数和别名：
    
    ```cpp
    template <typename InElementType>
    class TContainer
    {
    public:
        using ElementType = InElementType;
    };
    ```
    
- 类型和变量名是名词。
    
- 方法名是动词，描述方法的效果，或没有效果的方法的返回值。
    
- 宏名应全部大写，单词用下划线分隔，并以 `UE_` 为前缀。
    
    ```cpp
    #define UE_AUDIT_SPRITER_IMPORT
    ```
    

变量、方法和类名应该是：

- 清晰
- 无歧义
- 描述性
    

名称的范围越大，良好的描述性名称就越重要。避免过度缩写。

所有变量都应在自己的行上声明，以便你可以提供有关每个变量含义的注释。

JavaDocs 风格需要它。

你可以在变量前使用多行或单行注释。空白行用于分组变量是可选的。

所有返回 bool 的函数都应提出真/假问题，如 `IsVisible()` 或 `ShouldClearBuffer()`。

过程（没有返回值的函数）应使用强动词后跟对象。例外情况是，如果方法的对象是它所在的对象。在这种情况下，从上下文中理解对象。应避免以"Handle"和"Process"开头的名称，因为这些动词有歧义。

我们鼓励你在以下情况下用"Out"作为函数参数名称的前缀：

- 函数参数通过引用传递。
- 函数预期会写入该值。
    

这使得传递给此参数的值被函数替换变得明显。

如果 In 或 Out 参数也是布尔值，将"b"放在 In/Out 前缀之前，如 `bOutResult`。

返回值的函数应描述返回值。名称应明确函数返回什么值。这对于布尔函数尤为重要。考虑以下两个示例方法：

```cpp
// true 表示什么？
bool CheckTea(FTea Tea);

// 名称明确表示 true 表示茶是新鲜的
bool IsTeaFresh(FTea Tea);

float TeaWeight;
int32 TeaCount;
bool bDoesTeaStink;
FName TeaName;
FString TeaFriendlyName;
UClass* TeaClass;
USoundCue* TeaSound;
UTexture* TeaTexture;
```

## 包容性选词

当你在虚幻引擎代码库中工作时，我们鼓励你努力使用尊重、包容和专业的语言。

选词适用于以下情况：

- 命名类。
- 函数。
- 数据结构。
- 类型。
- 变量。
- 文件和文件夹。
- 插件。
    

当你为 UI、错误消息和通知编写面向用户的文本片段时适用。当你编写关于代码的内容时也适用，例如在注释和变更列表描述中。

以下部分提供了指导和建议，帮助你选择尊重且适合所有情况和受众的词语和名称，并成为更有效的沟通者。

### 种族、民族和宗教包容性

- 不要使用强化刻板印象的隐喻或明喻。例如，黑白对比或 _blacklist_ 和 _whitelist_。
    
- 不要使用提及历史创伤或歧视经历的词语。例如 _slave_、_master_ 和 _nuke_。
    

### 性别包容性

- 即使在单数形式中，也使用 _they_、_them_ 和 _their_ 来指代假设的人。
    
- 对于不是人的事物，使用 _it_ 和 _its_。例如，模块、插件、函数、客户端、服务器或任何其他软件或硬件组件。
    
- 不要为没有性别的事物分配性别。
    
- 不要使用像 _guys_ 这样假设性别的集体名词。
    
- 避免包含任意性别的口语短语，如"a poor _man_'s X"。
    

### 俚语

- 记住，你的词语正在被全球受众阅读，他们可能不共享相同的习语和态度，也可能不理解相同的文化参考。
    
- 避免俚语和口语，即使你认为它们有趣或无害。对于母语不是英语的人来说，这些可能难以理解，并且可能翻译不好。
    
- 不要使用亵渎语言。
    

### 重载词语

- 我们用于技术含义的许多术语在技术之外也有其他含义。例如 _abort_、_execute_ 或 _native_。当你使用这样的词语时，始终要精确并检查它们出现的上下文。

### 词语列表

以下列表标识了我们过去在虚幻代码库中使用过的一些术语，但我们认为应该用更好的替代方案替换：

| 词语名称 | 替代词语名称 |
|---------|-------------|
| Blacklist | `_deny list_`、`_block list_`、`_exclude list_`、`_avoid list_`、`_unapproved list_`、`_forbidden list_`、`_permission list_` |
| Whitelist | `_allow list_`、`_include list_`、`_trust list_`、`_safe list_`、`_prefer list_`、`_approved list_`、`_permission list_` |
| Master | `_primary_`、`_source_`、`_controller_`、`_template_`、`_reference_`、`_main_`、`_leader_`、`_original_`、`_base_` |
| Slave | `_secondary_`、`_replica_`、`_agent_`、`_follower_`、`_worker_`、`_cluster node_`、`_locked_`、`_linked_`、`_synchronized_` |

我们正在积极致力于使我们的代码符合上述原则。

## 可移植的 C++ 代码

`int` 和无符号 `int` 类型在不同平台上的大小不同。它们保证至少为 32 位宽，在整数宽度不重要的代码中是可接受的。在序列化或复制格式中使用显式大小的类型。

以下是常见类型的列表：

- `bool` 用于布尔值（永远不要假设 bool 的大小）。`BOOL` 不会编译。
- `TCHAR` 用于字符（永远不要假设 TCHAR 的大小）。
- `uint8` 用于无符号字节（1 字节）。
- `int8` 用于有符号字节（1 字节）。
- `uint16` 用于无符号短整型（2 字节）。
- `int16` 用于有符号短整型（2 字节）。
- `uint32` 用于无符号整型（4 字节）。
- `int32` 用于有符号整型（4 字节）。
- `uint64` 用于无符号四字（8 字节）。
- `int64` 用于有符号四字（8 字节）。
- `float` 用于单精度浮点（4 字节）。
- `double` 用于双精度浮点（8 字节）。
- `PTRINT` 用于可能包含指针的整数（永远不要假设 PTRINT 的大小）。

## 标准库的使用

历史上，UE 避免直接使用 C 和 C++ 标准库，原因如下：

- 用我们自己的实现替换缓慢的实现，提供对内存分配的额外控制。
- 在广泛可用之前添加新功能，例如：
    - 进行理想但非标准的行为更改。
    - 在代码库中具有一致的语法。
    - 避免与 UE 习惯用法不兼容的结构。
        

然而，标准库已经成熟，包含了我们不想用抽象层包装或自己重新实现的功能。

当在标准库功能和我们自己的功能之间进行选择时，你应该选择提供更好结果的选项。同样重要的是要记住一致性是有价值的。如果遗留的 UE 实现不再有用，我们可能会选择弃用它并将所有使用迁移到标准库。

避免在同一 API 中混合使用 UE 习惯用法和标准库习惯用法。下表列出了常见习惯用法以及何时使用它们的建议。

| 习惯用法 | 描述 |
|---------|------|
| `<atomic>` | 原子习惯用法应在新代码中使用，并在触及旧代码时迁移。原子预计将在所有受支持的平台上完全且高效地实现。我们自己的 `TAtomic` 只部分实现，维护和改进它不符合我们的利益。 |
| `<type_traits>` | 类型特征习惯用法应在遗留 UE 特征和标准特征重叠的地方使用。特征通常作为编译器内在函数实现以确保正确性，编译器可以了解标准特征并选择更快的编译路径，而不是将它们视为普通 C++。一个问题是，我们的特征通常具有大写的 `Value` 静态或 `Type` typedef，而标准特征预期使用 `value` 和 `type`。这是一个重要的区别，因为组合特征需要特定语法，例如 `std::conjunction`。我们添加的新特征应使用小写的 `value` 或 `type` 以支持组合。现有特征应更新以支持两种情况。 |
| `<initializer_list>` | 必须使用初始化列表习惯用法来支持大括号初始化语法。这是语言和标准库重叠的情况。如果你想支持它，没有其他选择。 |
| `<regex>` | 正则表达式习惯用法可以直接使用，但其使用应封装在仅限编辑器的代码中。我们没有计划实现自己的正则表达式解决方案。 |
| `<limits>` | `std::numeric_limits` 可以完整使用。 |
| `<cmath>` | 可以使用此头文件中的所有浮点函数。 |
| `<cstring>`：`memcpy()` 和 `memset()` | 当它们具有明显的性能优势时，可以分别使用这些习惯用法代替 `FMemory::Memcpy` 和 `FMemory::Memset`。 |

应避免使用标准容器和字符串，除非在互操作代码中。

## 注释

注释是沟通，沟通至关重要。以下部分详细介绍了有关注释的一些重要事项（来自 Kernighan 和 Pike 的《编程实践》）。

### 指南

- 编写自文档化代码。例如：
    
    ```cpp
    // 错误：
    t = s + l - b;
    
    // 正确：
    TotalLeaves = SmallLeaves + LargeLeaves - SmallAndLargeLeaves;
    ```
    
- 编写有用的注释。例如：
    
    ```cpp
    // 错误：
    // 增加 Leaves
    ++Leaves;
    
    // 正确：
    // 我们知道还有另一片茶叶
    ++Leaves;
    ```
    
- 不要过度注释糟糕的代码——而是重写它。例如：
    
    ```cpp
    // 错误：
    // 叶子总数是小叶子和大叶子的总和
    // 减去同时是两者的叶子数量
    t = s + l - b;
    
    // 正确：
    TotalLeaves = SmallLeaves + LargeLeaves - SmallAndLargeLeaves;
    ```
    
- 不要与代码矛盾。例如：
    
    ```cpp
    // 错误：
    // 永远不要增加 Leaves！
    ++Leaves;
    
    // 正确：
    // 我们知道还有另一片茶叶
    ++Leaves;
    ```
    

### Const 正确性

Const 既是文档也是编译器指令。所有代码都应努力实现 const 正确。这包括以下指南：

- 如果函数参数不打算被函数修改，则通过 const 指针或引用传递函数参数。
- 如果方法不修改对象，则将方法标记为 const。
- 如果循环不打算修改容器，则在容器上使用 const 迭代。
    

Const 示例：

```cpp
void SomeMutatingOperation(FThing& OutResult, const TArray<Int32>& InArray)
{
    // InArray 不会在此处修改，但 OutResult 可能会
}

void FThing::SomeNonMutatingOperation() const
{
    // 此代码不会修改调用它的 FThing
}

TArray<FString> StringArray;
for (const FString& : StringArray)
{
    // 此循环的主体不会修改 StringArray
}
```

对于按值传递的函数参数和本地变量，也首选 Const。这告诉读者变量不会在函数主体中修改，这使其更容易理解。如果你这样做，请确保声明和定义匹配，因为这会影响 JavaDoc 过程。

```cpp
void AddSomeThings(const int32 Count);

void AddSomeThings(const int32 Count)
{
    const int32 CountPlusOne = Count + 1;
    // Count 和 CountPlusOne 在函数主体中都不能更改
}
```

一个例外是按值传递的参数，这些参数被移动到容器中。有关更多信息，请参阅本页的"移动语义"部分。

示例：

```cpp
void FBlah::SetMemberArray(TArray<FString> InNewArray)
{
    MemberArray = MoveTemp(InNewArray);
}
```

在使指针本身为 const 时（而不是它指向的内容），将 const 关键字放在末尾。引用无论如何都不能"重新分配"，因此不能以相同的方式使其为 const。

示例：

```cpp
// 指向非 const 对象的 const 指针 - 指针不能重新分配，但 T 仍然可以修改
T* const Ptr = ...;

// 非法
T& const Ref = ...;
```

永远不要在返回类型上使用 const。这会抑制复杂类型的移动语义，并会为内置类型提供编译警告。此规则仅适用于返回类型本身，而不是指针或引用的目标类型。

示例：

```cpp
// 错误 - 返回 const 数组
const TArray<FString> GetSomeArray();

// 可以 - 返回对 const 数组的引用
const TArray<FString>& GetSomeArray();

// 可以 - 返回指向 const 数组的指针
const TArray<FString>* GetSomeArray();

// 错误 - 返回指向 const 数组的 const 指针
const TArray<FString>* const GetSomeArray();
```

### 示例格式

我们使用基于 JavaDoc 的系统从代码中提取注释并自动构建文档，因此我们推荐特定的注释格式规则。

以下示例演示了**类**、**方法**和**变量**注释的格式。记住，注释应该增强代码。代码记录实现，而注释记录意图。当你更改代码片段的意图时，确保更新注释。

请注意，支持两种不同的参数注释样式，由 `Steep` 和 `Sweeten` 方法演示。`Steep` 使用的 `@param` 样式是传统的多行样式。对于简单的函数，将参数和返回值文档集成到函数的描述性注释中可能更清晰。这在 `Sweeten` 示例中演示。特殊注释标记如 `@see` 或 `@return` 应仅用于在主描述后开始新行。

方法注释应仅包含一次：在方法公开声明的位置。方法注释应仅包含与方法调用者相关的信息，包括可能与调用者相关的方法覆盖信息。与调用者无关的方法实现及其覆盖的细节应在方法实现中注释。

类注释应包括：

- 此类解决的问题的描述。
- 创建此类的原因。
    

多行方法注释应包括：

- **函数目的**：记录此函数解决的问题。如前所述，注释记录意图，代码记录实现。
- **参数注释**：每个参数注释应包括：
    - 测量单位；
    - 预期值的范围；
    - "不可能"的值；
    - 以及状态/错误代码的含义。
- **返回注释**：记录预期返回值，就像记录输出变量一样。为避免冗余，如果函数的唯一目的是返回此值并且已在函数目的中记录，则不应使用显式的 `@return` 注释。
- **额外信息**：可选择使用 `@warning`、`@note`、`@see` 和 `@deprecated` 来记录额外的相关信息。每个都应在其余注释后的自己的行上声明。

## 现代 C++ 语言语法

虚幻引擎构建为可移植到许多 C++ 编译器，因此我们小心使用与我们可能支持的编译器兼容的功能。有时，功能非常有用，我们将它们包装在宏中并广泛使用。但是，我们通常等到所有我们支持的编译器都达到最新标准。

虚幻引擎默认使用 C++20 语言版本编译，并且需要最低 C++20 版本才能构建。我们使用许多在现代编译器中得到良好支持的现代语言功能。在某些情况下，我们将这些功能的使用包装在预处理条件中。但是，有时我们决定完全避免某些语言功能，出于可移植性或其他原因。

除非在下面指定为我们支持的现代 C++ 编译器功能，否则你不应使用特定于编译器的语言功能，除非它们包装在预处理宏或条件中并谨慎使用。

### 静态断言

`static_assert` 关键字在需要编译时断言的地方有效。

### Override 和 Final

`override` 和 `final` 关键字有效，并且强烈鼓励使用。可能有很多地方省略了这些，但它们会随着时间的推移而修复。

### Nullptr

在所有情况下，你应该使用 `nullptr` 而不是 C 风格的 `NULL` 宏。

一个例外是在 C++/CX 构建中使用 `nullptr`（例如对于 Xbox One）。在这种情况下，`nullptr` 的使用实际上是托管的空引用类型。它与原生 C++ 中的 `nullptr` 大部分兼容，除了其类型和一些模板实例化上下文，因此你应该使用 `TYPE_OF_NULLPTR` 宏而不是更常见的 `decltype(nullptr)` 以保持兼容性。

### Auto

你不应在 C++ 代码中使用 `auto`，除了下面列出的少数例外。始终明确你正在初始化的类型。这意味着类型必须对读者明显可见。此规则也适用于 C# 中 `var` 关键字的使用。

C++20 的结构化绑定功能也不应使用，因为它实际上是可变参数的 `auto`。

可接受的 `auto` 使用：

- 当你需要将 lambda 绑定到变量时，因为 lambda 类型在代码中不可表达。
- 对于迭代器变量，但仅当迭代器的类型冗长且会降低可读性时。
- 在模板代码中，其中表达式的类型不能轻易辨别。这是高级情况。
    

类型对正在阅读代码的人来说清晰可见非常重要。即使某些 IDE 能够推断类型，这样做也依赖于代码处于可编译状态。它也不会帮助合并/差异工具的用户，或者在孤立查看单个源文件时，例如在 GitHub 上。

如果你确定以可接受的方式使用 `auto`，请始终记住正确使用 `const`、`&` 或 `*`，就像使用类型名一样。使用 `auto`，这将强制推断类型成为你想要的。

### 基于范围的 For

这是首选，以保持代码更容易理解和维护。当你迁移使用旧 `TMap` 迭代器的代码时，请注意旧的 `Key()` 和 `Value()` 函数（它们是迭代器类型的方法）现在只是底层键值 `TPair` 的 `Key` 和 `Value` 字段。

示例：

```cpp
TMap<FString, int32> MyMap;
    
// 旧样式
for (auto It = MyMap.CreateIterator(); It; ++It)
{
    UE_LOG(LogCategory, Log, TEXT("Key: %s, Value: %d"), It.Key(), *It.Value());
}

// 新样式
for (TPair<FString, int32>& Kvp : MyMap)
{
    UE_LOG(LogCategory, Log, TEXT("Key: %s, Value: %d"), *Kvp.Key, Kvp.Value);
}
```

我们还有一些独立迭代器类型的范围替换。

示例：

```cpp
// 旧样式
for (TFieldIterator<UProperty> PropertyIt(InStruct, EFieldIteratorFlags::IncludeSuper); PropertyIt; ++PropertyIt)
{
    UProperty* Property = *PropertyIt;
    UE_LOG(LogCategory, Log, TEXT("Property name: %s"), *Property->GetName());
}

// 新样式
for (UProperty* Property : TFieldRange<UProperty>(InStruct, EFieldIteratorFlags::IncludeSuper))
{
    UE_LOG(LogCategory, Log, TEXT("Property name: %s"), *Property->GetName());
}
```

### Lambda 和匿名函数

Lambda 可以自由使用，但伴随着额外的安全问题。最好的 lambda 应该不超过几个语句的长度，特别是当用作较大表达式或语句的一部分时，例如作为泛型算法中的谓词。

示例：

```cpp
// 查找名称中包含单词"Hello"的第一个 Thing
Thing* HelloThing = ArrayOfThings.FindByPredicate([](const Thing& Th){ return Th.GetName().Contains(TEXT("Hello")); });
    
// 按名称的相反顺序排序数组
Algo::Sort(ArrayOfThings, [](const Thing& Lhs, const Thing& Rhs){ return Lhs.GetName() > Rhs.GetName(); });
```

请注意，有状态的 lambda 不能分配给函数指针，我们倾向于大量使用函数指针。非平凡的 lambda 应以与常规函数相同的方式进行文档化。Lambda 还可以用作[委托](delegates.md)以进行延迟执行，使用诸如 `BindWeakLambda` 之类的函数，其中捕获的变量充当有效载荷。

#### 捕获和返回类型

应使用显式捕获而不是自动捕获（`[&]` 和 `[=]`）。这对于可读性、可维护性、安全性和性能原因很重要，特别是当与大型 lambda 和延迟执行一起使用时。

显式捕获声明作者的意图；因此，在代码审查期间会发现错误。不正确的捕获可能导致严重的错误和崩溃，随着代码的维护，这些错误和崩溃更可能成为问题。以下是有关 lambda 捕获的一些其他注意事项：

- 如果 lambda 的执行被延迟，则通过引用捕获和通过值捕获指针（包括 `this` 指针）可能导致数据损坏和崩溃。对于延迟 lambda，本地和成员变量永远不应通过引用捕获。
- 如果为非延迟 lambda 进行不必要的副本，通过值捕获可能是性能问题。
- 意外捕获的 UObject 指针对垃圾回收器是不可见的。如果引用任何成员变量，自动捕获会隐式捕获 `this`，即使 `[=]` 给人的印象是 lambda 拥有所有内容的副本。
- 应使用委托包装器如 `CreateWeakLambda` 和 `CreateSPLambda` 进行延迟执行，因为如果 UObject 或共享指针被释放，它们将自动取消绑定。其他共享对象可以捕获为 TWeakObjectPtr 或 TWeakPtr，然后在 lambda 内部验证。
- 任何不遵循这些准则的延迟 lambda 使用都必须有注释解释为什么 lambda 捕获是安全的。
    

对于大型 lambda 或当你返回另一个函数调用的结果时，应使用显式返回类型。这些应以与 `auto` 关键字相同的方式考虑。

### 强类型枚举

枚举（Enum）类是旧样式命名空间枚举的替代品，适用于常规枚举和 `UENUM`。例如：

```cpp
// 旧枚举
UENUM()
namespace EThing
{
    enum Type
    {
        Thing1,
        Thing2
    };
}

// 新枚举
UENUM()
enum class EThing : uint8
{
    Thing1,
    Thing2
}
```

枚举作为 `UPROPERTY` 受支持，并替换旧的 `TEnumAsByte<>` 解决方法。枚举属性也可以是任何大小，而不仅仅是字节：

```cpp
// 旧属性
UPROPERTY()
TEnumAsByte<EThing::Type> MyProperty;

// 新属性
UPROPERTY()
EThing MyProperty;
```

公开给蓝图的枚举必须继续基于 `uint8`。

用作标志的枚举类可以利用 `ENUM_CLASS_FLAGS(EnumType)` 宏自动定义所有位运算符：

```cpp
enum class EFlags
{
    None = 0x00,
    Flag1 = 0x01,
    Flag2 = 0x02,
    Flag3 = 0x04
};

ENUM_CLASS_FLAGS(EFlags)
```

唯一的例外是在_真值_上下文中使用标志 - 这是语言的限制。相反，所有枚举标志都应有一个名为 `None` 的枚举器，其设置为 0 以进行比较：

```cpp
// 旧
if (Flags & EFlags::Flag1)	

// 新
if ((Flags & EFlags::Flag1) != EFlags::None) 
```

### 移动语义

所有主要容器类型 - `TArray`、`TMap`、`TSet`、`FString` - 都有移动构造函数和移动赋值运算符。这些通常在按值传递或返回这些类型时自动使用。它们也可以通过使用 `MoveTemp`（UE 的 `std::move` 等效项）显式调用。

按值返回容器或字符串可能对表达性有益，而无需临时副本的通常成本。关于按值传递和使用 `MoveTemp` 的规则仍在制定中，但已经可以在代码库的某些优化区域找到。

### 默认成员初始化器

默认成员初始化器可用于在类本身内部定义类的默认值：

```cpp
UCLASS()
class UTeaOptions : public UObject
{
    GENERATED_BODY()

public:
    UPROPERTY()
    int32 MaximumNumberOfCupsPerDay = 10;

    UPROPERTY()
    float CupWidth = 11.5f;

    UPROPERTY()
    FString TeaType = TEXT("Earl Grey");

    UPROPERTY()
    EDrinkingStyle DrinkingStyle = EDrinkingStyle::PinkyExtended;
};
```

像这样编写的代码具有以下优点：

- 它不需要在多个构造函数中重复初始化器。
- 不可能混合初始化顺序和声明顺序。
- 成员类型、属性标志和默认值都在一个地方。这有助于可读性和可维护性。
    

然而，也有一些缺点：

- 对默认值的任何更改都需要重建所有依赖文件。
- 头文件不能在引擎的补丁版本中更改，因此这种样式可以限制可能的修复类型。
- 某些内容不能以这种方式初始化，例如基类、`UObject` 子对象、指向向前声明类型的指针、从构造函数参数推导的值以及在多个步骤中初始化的成员。
- 将一些初始化器放在头文件中，其余放在 .cpp 文件中的构造函数中，可能会降低可读性和可维护性。
    

在决定是否使用默认成员初始化器时，请使用你的最佳判断。根据经验，默认成员初始化器在游戏代码中比引擎代码更有意义。考虑使用配置文件作为默认值。

## 第三方代码

每当你修改我们在引擎中使用的库的代码时，请确保使用 //@UE5 注释标记你的更改，并说明你进行更改的原因。这使得将更改合并到该库的新版本中更容易，并确保被许可方可以轻松找到我们进行的任何修改。

引擎中包含的任何第三方代码都应标记为格式化的注释，以便轻松搜索。例如：

```cpp
// @third party code - BEGIN PhysX
#include <physx.h>
// @third party code - END PhysX
// @third party code - BEGIN MSDN SetThreadName
// [http://msdn.microsoft.com/en-us/library/xcb2z8hs.aspx]
// 用于在调试器中设置线程名称
...
//@third party code - END MSDN SetThreadName
```

## 代码格式

### 大括号

大括号之争很糟糕。Epic Games 长期以来一直使用将大括号放在新行上的使用模式。请遵守此用法，无论函数或块的大小如何。例如：

```cpp
// 错误
int32 GetSize() const { return Size; }

// 正确
int32 GetSize() const
{
    return Size;
}
```

始终在单语句块中包含大括号。例如：

```cpp
if (bThing)
{
    return;
}
```

### If - Else

if-else 语句中的每个执行块都应使用大括号。这有助于防止编辑错误。当不使用大括号时，有人可能会不知不觉地向 if 块添加另一行。额外的行不会受 if 表达式控制，这很糟糕。当条件编译项导致 if/else 语句中断时也很糟糕。所以始终使用大括号。

```cpp
if (bHaveUnrealLicense)
{
    InsertYourGameHere();
}
else
{
    CallMarkRein();
}
```

多路 if 语句应缩进，每个 `else if` 与第一个 `if` 缩进相同；这使读者清楚结构：

```cpp
if (TannicAcid < 10)
{
    UE_LOG(LogCategory, Log, TEXT("Low Acid"));
}
else if (TannicAcid < 100)
{
    UE_LOG(LogCategory, Log, TEXT("Medium Acid"));
}
else
{
    UE_LOG(LogCategory, Log, TEXT("High Acid"));
}
```

### 制表符和缩进

以下是缩进代码的一些标准。

- 按执行块缩进代码。
- 在行的开头使用制表符作为空白，而不是空格。将制表符大小设置为 4 个字符。注意，有时空格是必要的，并且允许保持代码对齐，无论制表符中的空格数如何。例如，当你对齐跟随非制表符的代码时。
- 如果你在 C# 中编写代码，请也使用制表符，而不是空格。原因是程序员经常在 C# 和 C++ 之间切换，大多数人更喜欢使用一致的制表符设置。Visual Studio 默认对 C# 文件使用空格，因此在处理虚幻引擎代码时需要记住更改此设置。

### Switch 语句

除了空情况（多个情况具有相同的代码）外，switch case 语句应明确标记情况落入下一个情况。要么包含 break，要么在每个情况下包含"falls through"注释。其他代码控制传输命令（return、continue 等）也可以。

始终有默认情况。包含 break 以防有人在默认情况后添加新情况。

```cpp
switch (condition)
{
    case 1:
        ...
        // falls through

    case 2:
        ...
        break;

    case 3:
        ...
        return;

    case 4:
    case 5:
        ...
        break;

    default:
        break;
}
```

## 命名空间

你可以在适当的地方使用命名空间来组织你的类、函数和变量。如果你使用它们，请遵循以下规则。

- 大多数 UE 代码目前未包装在全局命名空间中。
    - 小心避免全局作用域中的冲突，特别是在使用或包含第三方代码时。
- UnrealHeaderTool 不支持命名空间。
    - 在定义 `UCLASSes`、`USTRUCTs` 等时不应使用命名空间。
- 不是 `UCLASSes`、`USTRUCTs` 等的新 API 应放在 `UE::` 命名空间中，理想情况下是嵌套命名空间，例如 `UE::Audio::`。
    - 用于保存实现细节的命名空间（不是面向公众的 API 的一部分）应放在 `Private` 命名空间中，例如 `UE::Audio::Private::`。
- `Using` 声明：
    - 不要将 `using` 声明放在全局作用域中，即使在 `.cpp` 文件中（它会导致我们的"unity"构建系统出现问题。）
- 可以将 `using` 声明放在另一个命名空间内或函数体内。
- 如果你将 `using` 声明放在命名空间内，这将延续到同一翻译单元中该命名空间的其他出现。只要你保持一致，就没问题。
- 只有遵循上述规则，你才能安全地在头文件中使用 `using` 声明。
- 向前声明的类型需要在它们各自的命名空间中声明。
    - 如果你不这样做，你将得到链接错误。
- 如果在命名空间中声明了大量类或类型，则在其他全局作用域类中使用这些类型可能很困难（例如，函数签名在类声明中出现时需要使用显式命名空间）。
- 你可以使用 `using` 声明仅将命名空间中的特定变量别名到你的作用域中。
    - 例如，使用 `Foo::FBar`。但是，我们通常不在虚幻代码中这样做。
- 宏不能存在于命名空间中。
    - 它们应以 `UE_` 为前缀，而不是生活在命名空间中，例如 `UE_LOG`。

## 物理依赖

- 文件名应尽可能不加前缀。
    - 例如，`Scene.cpp` 而不是 `UScene.cpp`。这使得使用工作区 Whiz 或 Visual Assist 的解决方案中打开文件等工具更容易，通过减少识别所需文件所需的字母数。
- 所有头文件都应使用 `#pragma once` 指令防止多次包含。
    - 请注意，我们使用的所有编译器都支持 `#pragma once`。
        
        ```cpp
        #pragma once
        //<file contents>
        ```
        
- 尽量最小化物理耦合。
    - 特别是，避免从头文件包含标准库头文件。
- 优先使用向前声明而不是包含头文件。
- 包含头文件时，尽可能细粒度。
    - 例如，不要包含 `Core.h`。相反，你应该包含 Core 中你需要定义的具体头文件。
- 尝试直接包含你需要的每个头文件，以使细粒度包含更容易。
- 不要依赖另一个你包含的头文件间接包含的头文件。
- 不要依赖通过另一个头文件包含的任何内容。包含你需要的所有内容。
- 模块有 Private 和 Public 源目录。
    - 其他模块需要的任何定义必须在 Public 目录中的头文件中。其他所有内容都应放在 Private 目录中。在较旧的虚幻模块中，这些目录可能仍被称为"Src"和"Inc"，但这些目录旨在以相同的方式分隔私有和公共代码，而不是将头文件与源文件分开。
- 不要担心为预编译头文件生成设置头文件。
    - UnrealBuildTool 可以比你做得更好。
- 将大函数拆分为逻辑子函数。
    - 编译器优化的一个领域是消除公共子表达式。你的函数越大，编译器必须做的工作就越多来识别它们。这导致构建时间大大增加。
- 不要使用大量内联函数。
    - 内联函数强制重建，即使在不使用它们的文件中。内联函数应仅用于平凡的访问器，并且当分析显示有好处时才使用。
- 谨慎使用 `FORCEINLINE`。
    - 所有代码和本地变量都将扩展到调用函数中。这将导致与大函数相同的构建时间问题。

## 封装

使用保护关键字强制封装。类成员应几乎总是声明为私有，除非它们是类的公共/保护接口的一部分。使用你的最佳判断，但始终要注意缺少访问器使得在不破坏插件和现有项目的情况下很难重构。

如果特定字段仅打算由派生类使用，则将它们设为私有并提供受保护的访问器。

如果你的类不是设计为派生的，则使用 final。

## 一般样式问题

- 最小化依赖距离。
    - 当代码依赖于变量具有特定值时，尝试在使用该变量之前立即设置该变量的值。在执行块顶部初始化变量，并且在一百行代码中不使用它，为某人意外更改值而不意识到依赖性提供了大量空间。在下一行使其清楚为什么变量以这种方式初始化以及它在哪里使用。
- 尽可能将方法拆分为子方法。
    - 对于某人来说，查看大局然后深入到感兴趣的细节比从细节开始并从中重建大局更容易。同样，理解调用几个命名良好的子方法序列的简单方法比理解仅包含所有子方法代码的等效方法更容易。
- 在函数声明或函数调用站点，不要在函数名和参数列表之前的括号之间添加空格。
- 解决编译器警告。
    - 编译器警告消息意味着某些东西出错。修复编译器警告你的内容。如果你绝对不能解决它，使用 `#pragma` 抑制警告，但这应该只作为最后手段。
- 在文件末尾留一个空行。
    - 所有 `.cpp` 和 `.h` 文件都应包含一个空行，以与 gcc 协调。
- 调试代码应该要么有用且精致，要么不签入。
    - 与其他代码混合的调试代码使其他代码更难阅读。
- 始终在字符串字面量周围使用 `TEXT()` 宏。
    - 如果没有 `TEXT()` 宏，从字面量构建 `FString` 的代码将导致不希望的字符串转换过程。
- 避免在循环中冗余地重复相同的操作。
    - 将公共子表达式移出循环以避免冗余计算。在某些情况下使用静态，以避免跨函数调用的全局冗余操作，例如从字符串字面量构建 `FName`。
- 注意热重载。
    - 最小化依赖以减少迭代时间。不要对可能在重载期间更改的函数使用内联或模板。仅对预期在重载期间保持不变的内容使用静态。
- 使用中间变量简化复杂表达式。
    - 如果你有一个复杂的表达式，如果将其拆分为子表达式，分配给中间变量，名称描述子表达式在父表达式中的含义，则可能更容易理解。例如：
        
        ```cpp
        if ((Blah->BlahP->WindowExists->Etc && Stuff) &&
            !(bPlayerExists && bGameStarted && bPlayerStillHasPawn &&
            IsTuesday())))
        {
            DoSomething();
        }
        ```
        
    
    应替换为：
    

```cpp
const bool bIsLegalWindow = Blah->BlahP->WindowExists->Etc && Stuff;
const bool bIsPlayerDead = bPlayerExists && bGameStarted && bPlayerStillHasPawn && IsTuesday();
if (bIsLegalWindow && !bIsPlayerDead)
{
    DoSomething();
}
```

- 指针和引用在指针或引用右侧应只有一个空格。
    - 这使得快速使用**在文件中查找**查找特定类型的所有指针或引用变得容易。例如：
        
        ```cpp
        // 使用这个
        FShaderType* Ptr
        
        // 不要使用这些：
        FShaderType *Ptr
        FShaderType * Ptr
        ```
        
- 不允许隐藏变量。
    - C++ 允许变量从外部作用域隐藏，但这使读者对用法感到模糊。例如，此成员函数中有三个可用的 `Count` 变量：
        
        ```cpp
        class FSomeClass
        {
        public:
            void Func(const int32 Count)
            {
                for (int32 Count = 0; Count != 10; ++Count)
                {
                    // 使用 Count
                }
            }
        
        private:
            int32 Count;
        }
        ```
        
- 避免在函数调用中使用匿名文字。
    - 首选描述其含义的命名常量。这使意图对临时读者更明显，因为它避免了需要查找函数声明来理解它。
        
        ```cpp
        // 旧样式
        Trigger(TEXT("Soldier"), 5, true);.
        
        // 新样式
        const FName ObjectName                = TEXT("Soldier");
        const float CooldownInSeconds         = 5;
        const bool bVulnerableDuringCooldown  = true;
        Trigger(ObjectName, CooldownInSeconds, bVulnerableDuringCooldown);
        ```
        
- 避免在头文件中定义非平凡的静态变量。
    - 非平凡的静态变量导致在每个包含该头文件的翻译单元中编译一个实例：
        
        ```cpp
        // SomeModule.h
        static const FString GUsefulNamedString = TEXT("String");
        
        // *用以下内容替换上述：*
        
        // SomeModule.h
        extern SOMEMODULE_API const FString GUsefulNamedString;
        
        // SomeModule.cpp
        const FString GUsefulNamedString = TEXT("String");    
        ```
        
- 避免进行不更改代码行为的广泛更改（例如：更改空白或大量重命名私有变量），因为这些会在源代码历史记录中造成不必要的噪音，并且在合并时具有破坏性。
    - 如果此类更改很重要，例如修复由自动合并工具造成的缩进损坏，则应单独提交，而不是与行为更改混合。
    - 最好只在对相同行或附近代码进行其他编辑时修复空白或其他轻微的编码标准违规。

## API 设计指南

- 应避免使用布尔函数参数。
    - 特别是，应避免将布尔参数用于传递给函数的标志。这些具有与前面提到的匿名文字相同的问题，但它们也倾向于随着 API 扩展更多行为而随时间增加。相反，首选枚举（参见[强类型枚举](#强类型枚举)部分中关于使用枚举作为标志的建议）：
        
        ```cpp
        // 旧样式
        FCup* MakeCupOfTea(FTea* Tea, bool bAddSugar = false, bool bAddMilk = false, bool bAddHoney = false, bool bAddLemon = false);
        FCup* Cup = MakeCupOfTea(Tea, false, true, true);
        
        // 新样式
        enum class ETeaFlags
        {
            None,
            Milk  = 0x01,
            Sugar = 0x02,
            Honey = 0x04,
            Lemon = 0x08
        };
        ENUM_CLASS_FLAGS(ETeaFlags)
        
        FCup* MakeCupOfTea(FTea* Tea, ETeaFlags Flags = ETeaFlags::None);
        FCup* Cup = MakeCupOfTea(Tea, ETeaFlags::Milk | ETeaFlags::Honey);
        ```
        
- 这种形式防止标志的意外转置，避免从指针和整数参数的意外转换，消除重复冗余默认值的需要，并且更高效。
- 当布尔值是传递给函数的完整状态（如 setter）时，可以接受使用 `bool` 作为参数，例如 `void FWidget::SetEnabled(bool bEnabled)`。但如果这种情况发生变化，请考虑重构。
- 避免过长的函数参数列表。
    - 如果函数接受许多参数，则考虑传递专用结构体：
        
        ```cpp
        // 旧样式
        TUniquePtr<FCup[]> MakeTeaForParty(const FTeaFlags* TeaPreferences, uint32 NumCupsToMake, FKettle* Kettle, ETeaType TeaType = ETeaType::EnglishBreakfast, float BrewingTimeInSeconds = 120.0f);
        
        // 新样式
        struct FTeaPartyParams
        {
            const FTeaFlags* TeaPreferences       = nullptr;
            uint32           NumCupsToMake        = 0;
            FKettle*         Kettle               = nullptr;
            ETeaType         TeaType              = ETeaType::EnglishBreakfast;
            float            BrewingTimeInSeconds = 120.0f;
        };
        TUniquePtr<FCup[]> MakeTeaForParty(const FTeaPartyParams& Params);
        ```
        
- 避免通过 `bool` 和 `FString` 重载函数。
    - 这可能有意外行为：
        
        ```cpp
        void Func(const FString& String);
        void Func(bool bBool);
        
        Func(TEXT("String")); // 调用 bool 重载！
        ```
        
- 接口类应始终为抽象。
    - 接口类以"I"为前缀，并且不能具有成员变量。允许接口包含非纯虚方法，并且可以包含非虚或静态方法，只要它们内联实现。
- 声明覆盖方法时使用 `virtual` 和 `override` 关键字。
    

在派生类中声明覆盖父类中虚函数的虚函数时，你必须同时使用 `virtual` 和 `override` 关键字。例如：

```cpp
class A
{
public:
    virtual void F() {}
};

class B : public A
{
public:
    virtual void F() override;
}
```

由于最近添加了 `override` 关键字，有很多现有代码不遵循这一点。应在方便时将 `override` 关键字添加到该代码。

- UObject 应通过指针传递，而不是引用。如果函数不期望空值，这应由 API 记录或适当处理。例如：
    
    ```cpp
    // 错误
    void AddActorToList(AActor& Obj);
    
    // 正确
    void AddActorToList(AActor* Obj);
    ```
    

## 平台特定代码

平台特定代码应始终抽象并在适当命名的子目录中的平台特定源文件中实现，例如：

```cpp
Engine/Platforms/[PLATFORM]/Source/Runtime/Core/Private/[PLATFORM]PlatformMemory.cpp
```

通常，你应该避免添加任何 `PLATFORM_[PLATFORM]` 的使用。例如，避免在名为 `[PLATFORM]` 的目录之外的代码中添加 `PLATFORM_XBOXONE`。相反，扩展硬件抽象层以添加静态函数，例如在 FPlatformMisc 中：

```cpp
FORCEINLINE static int32 GetMaxPathLength()
{
    return 128;
}
```

然后平台可以覆盖此函数，返回平台特定的常数值，甚至使用平台 API 来确定结果。如果你强制内联该函数，它具有与使用定义相同的性能特征。

在绝对需要定义的情况下，创建新的 `#define` 指令，描述可以应用于平台的特定属性，例如 `PLATFORM_USE_PTHREADS`。在 `Platform.h` 中设置默认值，并在平台特定的 `Platform.h` 文件中为需要它的任何平台覆盖。

例如，在 `Platform.h` 中我们有：

```cpp
#ifndef PLATFORM_USE_PTHREADS 
    #define PLATFORM_USE_PTHREADS 1
#endif
```

`WindowsPlatform.h` 有：

```cpp
#define PLATFORM_USE_PTHREADS 0
```

然后跨平台代码可以直接使用定义，而无需知道平台。

```cpp
#if PLATFORM_USE_PTHREADS 
    #include "HAL/PThreadRunnableThread.h"
#endif
```

我们集中了引擎的平台特定细节，这允许细节完全包含在平台特定源文件中。这样做使得跨多个平台维护引擎更容易，此外你能够将代码移植到新平台，而无需在代码库中搜索平台特定定义。

将平台代码保留在平台特定文件夹中也是 PlayStation、Xbox 和 Nintendo Switch 等 NDA 平台的要求。

重要的是确保代码编译并运行，无论 `[PLATFORM]` 子目录是否存在。换句话说，跨平台代码永远不应依赖于平台特定代码。
