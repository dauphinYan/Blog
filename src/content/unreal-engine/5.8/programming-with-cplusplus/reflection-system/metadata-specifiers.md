---
title: "元数据说明符"
description: "Metadata Specifiers in Unreal Engine 的中文译文。"
sourceTitle: "Metadata Specifiers in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/metadata-specifiers-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 4
draft: false
tags: [Unreal Engine, C++]
---

# 元数据说明符

声明类、接口、结构体、枚举、枚举值、函数或属性时，可以添加**元数据说明符**来控制它们与引擎和编辑器各方面的交互方式。每种类型的数据结构或成员都有自己的元数据说明符列表。

元数据仅存在于编辑器中；不要编写访问元数据的游戏逻辑。

要添加元数据说明符，请使用单词 `meta`，后跟说明符列表，如果适当，还有它们的值，添加到你的 `UCLASS`、`UENUM`、`UINTERFACE`、`USTRUCT`、`UFUNCTION` 或 `UPROPERTY` 宏，如下所示：

```cpp
{UCLASS/UENUM/UINTERFACE/USTRUCT/UFUNCTION/UPROPERTY}(SpecifierX, meta=(MetaTag1="Value1", MetaTag2, ..), SpecifierY)
```

要将元数据说明符添加到枚举类型中的特定值，请将 `UMETA` 标记添加到值本身，在分隔逗号之前（如果存在）。它应该如下所示：

```cpp
UENUM()
enum class EMyEnum : uint8
{
    // DefaultValue Tooltip
    DefaultValue = 0 UMETA(MetaTag1="Value1", MetaTag2, ..),

    // ValueWithoutMetaSpecifiers Tooltip
    ValueWithoutMetaSpecifiers,

    // ValueWithMetaSpecifiers Tooltip
    ValueWithMetaSpecifiers UMETA((MetaTag1="Value1", MetaTag2, ..),

    // FinalValue Tooltip
    FinalValue (MetaTag1="Value1", MetaTag2, ..)
};
```

## 类元数据说明符

类可以使用以下元标记说明符：

| 类元标记 | 效果 |
|---------|------|
| `BlueprintSpawnableComponent` | 如果存在，组件类可以由蓝图生成。 |
| `BlueprintThreadSafe` | 仅在蓝图函数库上有效。此说明符将此类中的函数标记为可在动画蓝图中的非游戏线程上调用。 |
| `ChildCannotTick` | 用于 Actor 和组件类。如果本地类无法 tick，则基于此 Actor 或组件的蓝图生成类永远无法 tick，即使 `bCanBlueprintsTickByDefault` 为 true。 |
| `ChildCanTick` | 用于 Actor 和组件类。如果本地类无法 tick，则可以覆盖基于此 Actor 或组件的蓝图生成类的 `bCanEverTick` 标志，即使 `bCanBlueprintsTickByDefault` 为 false。 |
| `DeprecatedNode` | 用于行为树节点，表示类已弃用，编译时将显示警告。 |
| `DeprecationMessage="Message Text"` | 具有此元数据的已弃用类将包含此文本与蓝图脚本在编译期间生成的标准弃用警告。 |
| `DisplayName="Blueprint Node Name"` | 蓝图脚本中此节点的名称将替换为此处提供的值，而不是代码生成的名称。 |
| `DontUseGenericSpawnObject` | 不要在蓝图脚本中使用通用创建对象节点生成此类的对象；此说明符仅适用于既不是 Actor 也不是 Actor 组件的蓝图类型类。 |
| `ExposedAsyncProxy` | 在异步任务节点中公开此类的代理对象。 |
| `IgnoreCategoryKeywordsInSubclasses` | 用于使类的第一个子类忽略所有继承的 `ShowCategories` 和 `HideCategories` 说明符。 |
| `IsBlueprintBase="true/false"` | 声明此类是否（或不是）创建蓝图的可接受基类，类似于 `Blueprintable` 或 `NotBlueprintable` 说明符。 |
| `KismetHideOverrides="Event1, Event2, .."` | 不允许被覆盖的蓝图事件列表。 |
| `ProhibitedInterfaces="Interface1, Interface2, .."` | 列出与类不兼容的接口。 |
| `RestrictedToClasses="Class1, Class2, .."` | 蓝图函数库类可以使用此功能来限制对列表中命名的类的使用。 |
| `ShortToolTip="Short tooltip"` | 在某些上下文中使用的简短工具提示，其中完整工具提示可能过于冗长，例如父类选择器对话框。 |
| `ShowWorldContextPin` | 表示放置在此类拥有的图表中的蓝图节点必须显示其世界上下文引脚，即使它们通常被隐藏，因为此类的对象不能用作世界上下文。 |
| `UsesHierarchy` | 表示类使用层级数据。用于实例化详细信息面板中的层级编辑功能。 |
| `ToolTip="Hand-written tooltip"` | 覆盖从代码注释自动生成的工具提示。 |
| `ScriptName="DisplayName"` | 将此类、属性或函数导出到脚本语言时使用的名称。你可以包含已弃用的名称作为额外的分号分隔条目。 |

## 枚举元数据说明符

枚举类型可以使用以下元数据说明符：

| 枚举类型元标记 | 效果 |
|--------------|------|
| `Bitflags` | 表示此枚举类型可以被使用 `Bitmask` 元数据说明符设置的整数 `UPROPERTY` 变量用作标志。 |
| `Experimental` | 将此类型标记为实验性和不受支持。 |
| `ToolTip="Hand-written tooltip"` | 覆盖从代码注释自动生成的工具提示。 |

枚举类型中的各个值有自己的元数据说明符。这些与其他元数据说明符略有不同，因为它们使用顶层关键字 `UMETA`，并在它们修改的值之后指定，而不是之前。

| 枚举值元标记 | 效果 |
|-------------|------|
| `DisplayName="Enumerated Value Name"` | 此值的名称将是此处提供的文本，而不是代码生成的名称。 |
| `Hidden` | 此值不会出现在编辑器中。 |
| `ToolTip="Hand-written tooltip."` | 覆盖从代码注释自动生成的工具提示。 |

## 接口元数据说明符

接口可以使用以下元标记说明符：

确保蓝图事件仅允许在可实现接口中出现。仅允许内部函数。确保如果此接口包含蓝图可调用函数但不是蓝图定义的，则必须在本机代码中实现。

| 接口元标记 | 效果 |
|-----------|------|
| `CannotImplementInterfaceInBlueprint` | 此接口可能不包含 [`BlueprintImplementableEvent` 或 `BlueprintNativeEvent`](ufunctions.md#函数说明符) 函数，除了仅限内部的函数。如果它包含蓝图可调用函数但不是蓝图定义的，则必须在本机代码中实现这些函数。 |

## 结构体元数据说明符

结构体可以使用以下元标记说明符：

| 结构体元标记 | 效果 |
|-------------|------|
| `HasNativeBreak="Module.Class.Function"` | 表示此结构体具有自定义的分解结构体节点。必须提供模块、类和函数名称。 |
| `HasNativeMake="Module.Class.Function"` | 表示此结构体具有自定义的创建结构体节点。必须提供模块、类和函数名称。 |
| `HiddenByDefault` | 创建结构体和分解结构体节点中的引脚默认隐藏。 |
| `ShortToolTip="Short tooltip"` | 在某些上下文中使用的简短工具提示，其中完整工具提示可能过于冗长，例如父类选择器对话框。 |
| `ToolTip="Hand-written tooltip"` | 覆盖从代码注释自动生成的工具提示。 |

## 函数元数据说明符

| 函数元标记 | 效果 |
|-----------|------|
| `AdvancedDisplay="Parameter1, Parameter2, .."` | 逗号分隔的参数列表将显示为高级引脚（需要 UI 扩展）。 |
| `AdvancedDisplay=N` | 用数字替换 `N`，第 N 个之后的所有参数将显示为高级引脚（需要 UI 扩展）。例如，'AdvancedDisplay=2' 将标记除前两个参数之外的所有参数为高级。 |
| `ArrayParm="Parameter1, Parameter2, .."` | 表示 `BlueprintCallable` 函数应使用调用数组函数节点，并且列出的参数应被视为通配符数组属性。 |
| `ArrayTypeDependentParams="Parameter"` | 使用 `ArrayParm` 时，此说明符指示一个参数，该参数将确定 `ArrayParm` 列表中所有参数的类型。 |
| `AutoCreateRefTerm="Parameter1, Parameter2, .."` | 列出的参数虽然通过引用传递，但如果其引脚保持断开连接，将具有自动创建的默认值。这是蓝图的便利功能，常用于数组引脚。 |
| `BlueprintAutocast` | 仅由蓝图函数库中的静态 `BlueprintPure` 函数使用。将为返回类型和函数的第一个参数的类型自动添加转换节点。 |
| `BlueprintInternalUseOnly` | 此函数是内部实现细节，用于实现另一个函数或节点。它永远不会直接在蓝图图表中公开。 |
| `BlueprintProtected` | 此函数只能在蓝图中的拥有对象上调用。它不能在另一个实例上调用。 |
| `CallableWithoutWorldContext` | 用于具有 `WorldContext` 引脚的 `BlueprintCallable` 函数，表示即使其类未实现 `GetWorld` 函数，也可以调用该函数。 |
| `CommutativeAssociativeBinaryOperator` | 表示 `BlueprintCallable` 函数应使用交换结合二元节点。此节点缺少引脚名称，但具有**添加引脚**按钮，可创建额外的输入引脚。 |
| `CompactNodeTitle="Name"` | 表示 `BlueprintCallable` 函数应在紧凑显示模式下显示，并提供在该模式下显示的名称。 |
| `CustomStructureParam="Parameter1, Parameter2, .."` | 列出的参数都被视为通配符。此说明符需要 `UFUNCTION` 级别的说明符 `CustomThunk`，这将要求用户提供自定义的 `exec` 函数。在此函数中，可以检查参数类型并基于这些参数类型进行适当的函数调用。永远不应调用基础 `UFUNCTION`，如果出现错误，应断言或记录错误。要声明自定义 `exec` 函数，使用语法 `DECLARE_FUNCTION(execMyFunctionName)`，其中 `MyFunctionName` 是原始函数的名称。 |
| `DefaultToSelf` | 对于 `BlueprintCallable` 函数，表示对象属性的命名默认值应为节点的自身上下文。 |
| `DeprecatedFunction` | 对此函数的任何蓝图引用都将导致编译警告，告知用户该函数已弃用。你可以使用 `DeprecationMessage` 元数据说明符添加到弃用警告消息（例如，提供有关替换已弃用函数的说明）。 |
| `DeprecationMessage="Message Text"` | 如果函数已弃用，则在尝试编译使用此函数的蓝图时，此消息将添加到标准弃用警告中。 |
| `DeterminesOutputType="Parameter"` | 函数的返回类型将动态更改以匹配连接到命名参数引脚的输入。参数应该是模板类型，如 `TSubClassOf<X>` 或 `TSoftObjectPtr<X>`，其中函数的原始返回类型是 `X*` 或以 `X*` 作为值类型的容器，如 `TArray<X*>`。 |
| `DevelopmentOnly` | 标记为 `DevelopmentOnly` 的函数仅在开发模式下运行。这对于调试输出等功能很有用，这些功能预计不会存在于发布的产品中。 |
| `DisplayName="Blueprint Node Name"` | 蓝图中此节点的名称将替换为此处提供的值，而不是代码生成的名称。 |
| `ExpandEnumAsExecs="Parameter"` | 对于 `BlueprintCallable` 函数，表示应为参数使用的 `enum` 中的每个条目创建一个输入执行引脚。参数必须是具有 `UENUM` 标记的枚举类型。 |
| `ForceAsFunction` | 将没有返回值的 `BlueprintImplementableEvent` 从事件更改为函数。 |
| `HidePin="Parameter"` | 对于 `BlueprintCallable` 函数，表示参数引脚应从用户的视图中隐藏。每个函数只能以此方式隐藏一个引脚。 |
| `HideSelfPin` | 隐藏"自身"引脚，表示正在调用函数的对象。"自身"引脚在与调用蓝图的类兼容的 `BlueprintPure` 函数上自动隐藏。使用 `HideSelfPin` 元标记的函数也经常使用 `DefaultToSelf` 说明符。 |
| `InternalUseParam="Parameter"` | 类似于 `HidePin`，这从用户的视图中隐藏命名参数的引脚，并且只能用于每个函数的一个参数。 |
| `KeyWords="Set Of Keywords"` | 指定在搜索此函数时可以使用的一组关键字，例如在蓝图图表中放置节点以调用函数时。 |
| `Latent` | 表示延迟操作。延迟操作具有一个 `FLatentActionInfo` 类型的参数，此参数由 `LatentInfo` 说明符命名。 |
| `LatentInfo="Parameter"` | 对于延迟的 `BlueprintCallable` 函数，表示哪个参数是 LatentInfo 参数。 |
| `MaterialParameterCollectionFunction` | 对于 `BlueprintCallable` 函数，表示应使用材质覆盖节点。 |
| `NativeBreakFunc` | 对于 `BlueprintCallable` 函数，表示函数应以与标准分解结构体节点相同的方式显示。 |
| `NotBlueprintThreadSafe` | 仅在蓝图函数库中有效。此函数将被视为拥有类的一般 `BlueprintThreadSafe` 元数据的例外。 |
| `ShortToolTip="Short tooltip"` | 在某些上下文中使用的简短工具提示，其中完整工具提示可能过于冗长，例如父类选择器对话框。 |
| `ToolTip="Hand-written tooltip"` | 覆盖从代码注释自动生成的工具提示。 |
| `UnsafeDuringActorConstruction` | 在 Actor 构造期间调用此函数是不安全的。 |
| `WorldContext="Parameter"` | 由 `BlueprintCallable` 函数使用，表示哪个参数决定操作发生的世界。 |
| `ScriptName="DisplayName"` | 将此类、属性或函数导出到脚本语言时使用的名称。你可以包含已弃用的名称作为额外的分号分隔条目。 |

## 属性元数据说明符

| 属性元标记 | 效果 |
|-----------|------|
| `AllowAbstract="true/false"` | 用于 `Subclass` 和 `SoftClass` 属性。表示是否应在类选择器中显示抽象类类型。 |
| `AllowedClasses="Class1, Class2, .."` | 用于 `FSoftObjectPath` 属性。逗号分隔的列表，表示要在资产选择器中显示的资产的类类型。 |
| `AllowPreserveRatio` | 用于 `FVector` 属性。在详细信息面板中显示此属性时，它会添加比例锁定。 |
| `ArrayClamp="ArrayProperty"` | 用于整数属性。将可在 UI 中输入的有效值限制在 0 和命名数组属性的长度之间。 |
| `AssetBundles` | 用于 `SoftObjectPtr` 或 `SoftObjectPath` 属性。在主数据资产中使用的包名称列表，指定此引用属于哪些包。 |
| `BlueprintBaseOnly` | 用于 `Subclass` 和 `SoftClass` 属性。表示是否应仅在选择器中显示蓝图类。 |
| `BlueprintCompilerGeneratedDefaults` | 属性默认值由蓝图编译器生成，在编译后调用 `CopyPropertiesForUnrelatedObjects` 函数时不会被复制。 |
| `ClampMin="N"` | 用于浮点和整数属性。指定可为属性输入的最小值 `N`。 |
| `ClampMax="N"` | 用于浮点和整数属性。指定可为属性输入的最大值 `N`。 |
| `ConfigHierarchyEditable` | 此属性序列化到配置（`.ini`）文件，并且可以在配置层次结构的任何位置设置。 |
| `ContentDir` | 由 `FDirectoryPath` 属性使用。表示将使用 Content 文件夹内的 Slate 样式目录选择器选取路径。 |
| `DisplayAfter="PropertyName"` | 此属性将显示在蓝图编辑器中名为 `PropertyName` 的属性之后，无论其在源代码中的顺序如何，只要两个属性在同一类别中。如果多个属性具有相同的 `DisplayAfter` 值和相同的 `DisplayPriority` 值，它们将在命名属性之后按它们在头文件中声明的顺序显示。 |
| `DisplayName="Property Name"` | 显示此属性的名称，而不是代码生成的名称。 |
| `DisplayPriority="N"` | 如果两个属性具有相同的 `DisplayAfter` 值，或者在同一类别中且没有 `DisplayAfter` 元标记，此属性将确定它们的排序顺序。最高优先级值为 1，意味着 `DisplayPriority` 值为 1 的属性将显示在 `DisplayPriority` 值为 2 的属性之上。如果多个属性具有相同的 `DisplayAfter` 值，它们将按在头文件中声明的顺序显示。 |
| `DisplayThumbnail="true"` | 表示属性是资产类型，应显示所选资产的缩略图。 |
| `EditCondition="BooleanPropertyName"` | 命名一个布尔属性，用于指示是否禁用此属性的编辑。在属性名称前放置"!"会反转测试。EditCondition 元标记不再局限于单个布尔属性。现在它使用功能完备的表达式解析器进行求值，这意味着你可以包含完整的 C++ 表达式。 |
| `EditFixedOrder` | 防止数组元素通过拖动重新排序。 |
| `ExactClass="true"` | 与 `AllowedClasses` 一起用于 `FSoftObjectPath` 属性。表示是否只能使用 `AllowedClasses` 中指定的确切类，或者子类是否也有效。 |
| `ExposeFunctionCategories="Category1, Category2, .."` | 指定在蓝图编辑器中构建函数列表时应公开其函数的类别列表。 |
| `ExposeOnSpawn="true"` | 指定是否应在此类类型的生成 Actor 节点上公开此属性。 |
| `FilePathFilter="FileType"` | 由 `FFilePath` 属性使用。表示在文件选择器中显示的路径过滤器。常见值包括"uasset"和"umap"，但这些不是唯一可能的值。 |
| `GetByRef` | 使此属性的"Get"蓝图节点返回对属性的常量引用，而不是其值的副本。仅可用于稀疏类数据，且仅在不存在 `NoGetter` 时可用。 |
| `HideAlphaChannel` | 用于 `FColor` 和 `FLinearColor` 属性。表示在详细信息中显示属性控件时应隐藏 `Alpha` 属性。 |
| `HideViewOptions` | 用于 `Subclass` 和 `SoftClass` 属性。隐藏在类选择器中更改视图选项的功能。 |
| `InlineEditConditionToggle` | 表示布尔属性仅作为其他属性中的编辑条件切换内联显示，不应显示在自己的行上。 |
| `LongPackageName` | 由 `FDirectoryPath` 属性使用。将路径转换为长包名。 |
| `MakeEditWidget` | 用于 Transform 或 Rotator 属性，或 Transform 或 Rotator 的数组。表示属性应在视口中公开为可移动的控件。 |
| `NoGetter` | 阻止蓝图生成器为此属性生成"get"节点。仅可用于稀疏类数据。 |
| `ScriptName="DisplayName"` | 将此类、属性或函数导出到脚本语言时使用的名称。你可以包含已弃用的名称作为额外的分号分隔条目。 |
