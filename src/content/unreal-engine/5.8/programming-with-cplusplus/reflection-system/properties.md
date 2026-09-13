---
title: "属性"
description: "Properties in Unreal Engine 的中文译文。"
sourceTitle: "Properties in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-uproperties"
engineVersion: "5.8"
reviewedAt: 2026-09-13
order: 2
draft: false
tags: [Unreal Engine, C++]
---

# 属性

## 属性声明

属性使用标准 C++ 变量语法声明，前面加上 UPROPERTY 宏来定义属性元数据和变量说明符。

`UPROPERTY([specifier, specifier, ...], [meta(key=value, key=value, ...)]) 	Type VariableName;`

## 核心数据类型

### 整数

整数数据类型的约定是"int"或"uint"后跟位数大小。

| 变量类型 | 描述 |
|---------|------|
| **uint8** | 8 位无符号 |
| **uint16** | 16 位无符号 |
| **uint32** | 32 位无符号 |
| **uint64** | 64 位无符号 |
| **int8** | 8 位有符号 |
| **int16** | 16 位有符号 |
| **int32** | 32 位有符号 |
| **int64** | 64 位有符号 |

#### 作为位掩码

整数属性现在可以作为位掩码公开给编辑器。要将整数属性标记为位掩码，只需在 meta 部分添加"bitmask"，如下所示：

```cpp
/*~ BasicBits 在编辑器中显示为通用标志列表，而不是整数字段。 */
UPROPERTY(EditAnywhere, Meta = (Bitmask))
int32 BasicBits;
```

添加此元标记将使整数可编辑为通用命名标志的下拉列表（"Flag 1"、"Flag 2"、"Flag 3"等），可以单独打开或关闭。

![位掩码属性示例](https://dev.epicgames.com/community/api/documentation/image/2b1e1468-04f9-41fa-88ac-89282c9fa233?resizing_type=fit)

你还可以使蓝图可调用函数的整数参数表现为位掩码，通过在参数的 `UPARAM` 说明符中添加 `Bitmask` 元标记（不需要值）。

```cpp
/*~ 你可以使用通用标志列表设置 MyFunction，而不是输入整数值。 */
UFUNCTION(BlueprintCallable)
void MyFunction(UPARAM(meta=(Bitmask)) int32 BasicBitsParam)
```

要自定义位标志的名称，我们必须首先创建一个带有"bitflags"元标记的 UENUM：

```cpp
UENUM(Meta = (Bitflags))
enum class EColorBits
{
    ECB_Red,
    ECB_Green,
    ECB_Blue
};
```

位掩码枚举类型的支持值范围是 0 到 31（含）。这对应于 32 位整数变量的位（从第 0 位开始）。在上面的示例中，第 0 位是 `ECB_Red`，第 1 位是 `ECB_Green`，第 2 位是 `ECB_Blue`。

作为替代声明样式，你可以使用 `ENUM_CLASS_FLAGS` 在定义后将枚举类型转换为位掩码。要在编辑器中使用标志选择器，我们还必须添加元字段 `UseEnumValuesAsMaskValuesInEditor` 并将其设置为 `true`。关键区别在于此方法直接使用掩码值，而不是位号。使用此方法创建的等效枚举类型如下所示：

```cpp
UENUM(Meta = (Bitflags, UseEnumValuesAsMaskValuesInEditor = "true"))
enum class EColorBits
{
    ECB_Red = 0x01,
    ECB_Green = 0x02,
    ECB_Blue = 0x04
};

ENUM_CLASS_FLAGS(EColorBits);
```

创建此 UENUM 后，我们可以使用"BitmaskEnum"元标记引用它，如下所示：

```cpp
/*~ 此属性列出与 EColorBits 中的值名称匹配的标志。 */
UPROPERTY(EditAnywhere, Meta = (Bitmask, BitmaskEnum = "EColorBits"))
int32 ColorFlags;
```

进行此更改后，下拉框中列出的位标志将采用枚举类条目的名称和值。在上面的示例中，ECB_Red 是值 0，这意味着选中时它将激活第 0 位（向 ColorFlags 添加 1）。ECB_Green 对应于第 1 位（向 ColorFlags 添加 2），ECB_Blue 对应于第 2 位（向 ColorFlags 添加 4）。

![位掩码枚举示例](https://dev.epicgames.com/community/api/documentation/image/e30b24de-da30-4d1d-8188-67b193b03c3d?resizing_type=fit)

同样，你可以将 `BitmaskEnum` 和适当的枚举类型名称添加到 `UPARAM` 标记的 meta 部分以自定义它。

```cpp
/*~ MyOtherFunction 显示以 EColorBits 中的值命名的标志。 */
UFUNCTION(BlueprintCallable)
void MyOtherFunction(UPARAM(meta=(Bitmask, BitmaskEnum = "EColorBits")) int32 ColorFlagsParam)
```

虽然枚举类型可以包含超过 32 个条目，但只有前 32 个值将在属性编辑器 UI 的位掩码关联中可见。同样，虽然接受显式值条目，但显式值不在 0 到 31 之间的条目将不包含在下拉列表中。

### 浮点类型

虚幻使用标准 C++ 浮点类型 float 和 double。

### 布尔类型

布尔类型可以用 C++ bool 关键字或位域表示。

```cpp
uint32 bIsHungry : 1;
bool bIsThirsty;
```

### 字符串

虚幻引擎支持三种核心字符串类型。

- FString 是经典的"动态字符数组"字符串类型。
- FName 是对全局字符串表中不可变的不区分大小写字符串的引用。它比 FString 更小、更高效，但更难操作。
- FText 是更强大的字符串表示，设计用于处理本地化。

对于大多数用途，虚幻依赖 TCHAR 类型作为字符。TEXT() 宏可用于表示 TCHAR 字面量。

```cpp
MyDogPtr->DogName = FName(TEXT("Samson Aloysius"));
```

有关三种字符串类型的更多信息，何时使用每种类型以及如何使用它们，请参阅[字符串处理文档](https://dev.epicgames.com/documentation/unreal-engine/string-handling-in-unreal-engine)。

## 属性说明符

声明属性时，可以将**属性说明符**添加到声明中，以控制属性与引擎和编辑器各方面的行为。

| 属性标记 | 效果 |
|---------|------|
| `AdvancedDisplay` | 属性将被放置在任何显示它的面板的高级（下拉）部分。 |
| `AssetRegistrySearchable` | `AssetRegistrySearchable` 说明符表示此属性及其值将自动添加到包含此成员变量的任何资产类实例的资产注册表。使用结构体属性或参数是不合法的。 |
| `BlueprintAssignable` | 仅可用于多播委托。公开属性以便在蓝图中分配。 |
| `BlueprintAuthorityOnly` | 此属性必须是多播委托。在蓝图中，它只接受标记为 `BlueprintAuthorityOnly` 的事件。 |
| `BlueprintCallable` | 仅多播委托。属性应公开以便在蓝图代码中调用。 |
| `BlueprintGetter=GetterFunctionName` | 此属性指定自定义访问器函数。如果此属性未同时标记为 `BlueprintSetter` 或 `BlueprintReadWrite`，则它隐式为 `BlueprintReadOnly`。 |
| `BlueprintReadOnly` | 此属性可以被蓝图读取，但不能修改。此说明符与 `BlueprintReadWrite` 说明符不兼容。 |
| `BlueprintReadWrite` | 此属性可以从蓝图读取或写入。此说明符与 `BlueprintReadOnly` 说明符不兼容。 |
| `BlueprintSetter=SetterFunctionName` | 此属性具有自定义修改器函数，并隐式标记为 `BlueprintReadWrite`。请注意，修改器函数必须命名并属于同一个类。 |
| `Category="TopCategory\|SubCategory\|..."` | 指定在蓝图编辑工具中显示时属性的类别。使用 | 运算符定义嵌套类别。 |
| `Config` | 此属性将被设置为可配置。当前值可以保存到与类关联的 `.ini` 文件中，并在创建时加载。不能在默认属性中赋值。隐含 `BlueprintReadOnly`。 |
| `DuplicateTransient` | 表示在任何类型的复制（复制/粘贴、二进制复制等）期间，属性的值应重置为类默认值。 |
| `EditAnywhere` | 表示此属性可以在属性窗口中编辑，在原型和实例上均可。此说明符与任何"Visible"说明符不兼容。 |
| `EditDefaultsOnly` | 表示此属性可以在属性窗口中编辑，但只能在原型上。此说明符与任何"Visible"说明符不兼容。 |
| `EditFixedSize` | 仅对动态数组有用。这将阻止用户通过虚幻编辑器属性窗口更改数组的长度。 |
| `EditInstanceOnly` | 表示此属性可以在属性窗口中编辑，但只能在实例上，不能在原型上。此说明符与任何"Visible"说明符不兼容。 |
| `Export` | 仅对对象属性（或对象数组）有用。表示分配给此属性的对象在复制对象时（例如对于复制/粘贴操作）应作为子对象块完整导出，而不是仅输出对象引用本身。 |
| `GlobalConfig` | 工作方式与 `Config` 相同，但你不能在子类中覆盖它。不能在默认属性中赋值。隐含 `BlueprintReadOnly`。 |
| `Instanced` | 仅对象（`UCLASS`）属性。当创建此类的实例时，它将被赋予在默认值中分配给此属性的对象的唯一副本。用于实例化在类默认属性中定义的子对象。隐含 `EditInline` 和 `Export`。 |
| `Interp` | 表示该值可以由 Sequencer 中的轨道随时间驱动。 |
| `Localized` | 此属性的值将具有定义的本地化值。主要用于字符串。隐含 `ReadOnly`。 |
| `Native` | 属性是本地的：C++ 代码负责序列化它并将其公开给[垃圾回收](https://dev.epicgames.com/documentation/unreal-engine/unreal-object-handling-in-unreal-engine)。 |
| `NoClear` | 阻止将此对象引用从编辑器设置为无。隐藏编辑器中的清除（和浏览）按钮。 |
| `NoExport` | 仅对本地类有用。此属性不应包含在自动生成的类声明中。 |
| `NonPIEDuplicateTransient` | 属性将在复制期间重置为默认值，除非它是为在编辑器中播放（PIE）会话复制。 |
| `NonTransactional` | 表示对此属性值的更改不会包含在编辑器的撤消/重做历史记录中。 |
| `NotReplicated` | 跳过复制。这仅适用于结构体成员和服务请求函数中的参数。 |
| `Replicated` | 属性应通过网络复制。 |
| `ReplicatedUsing=FunctionName` | `ReplicatedUsing` 说明符指定一个回调函数，当属性通过网络更新时执行。 |
| `RepRetry` | 仅对结构体属性有用。如果此属性无法完全发送（例如，对象引用尚未可通过网络序列化），则重试复制。对于简单引用，这是默认值，但对于结构体，由于带宽成本，这通常是不希望的，因此除非指定此标志，否则禁用。 |
| `SaveGame` | 此说明符是在属性级别显式包含检查点/保存系统字段的简单方法。应在打算成为保存游戏一部分的所有字段上设置标志，然后可以使用代理归档器来读取/写入它。 |
| `SerializeText` | 本地属性应序列化为文本（`ImportText`、`ExportText`）。 |
| `SkipSerialization` | 此属性不会被序列化，但仍可以导出为文本格式（例如用于复制/粘贴操作）。 |
| `SimpleDisplay` | 可见或可编辑属性出现在**详细信息**面板中，无需打开"高级"部分即可见。 |
| `TextExportTransient` | 此属性不会导出为文本格式（因此不能用于复制/粘贴操作等）。 |
| `Transient` | 属性是瞬态的，意味着它不会被保存或加载。以此方式标记的属性将在加载时填零。 |
| `VisibleAnywhere` | 表示此属性在所有属性窗口中可见，但不能编辑。此说明符与"Edit"说明符不兼容。 |
| `VisibleDefaultsOnly` | 表示此属性仅在原型的属性窗口中可见，不能编辑。此说明符与任何"Edit"说明符不兼容。 |
| `VisibleInstanceOnly` | 表示此属性仅在实例的属性窗口中可见，不在原型中，不能编辑。此说明符与任何"Edit"说明符不兼容。 |

## 元数据说明符

声明类、接口、结构体、枚举、枚举值、函数或属性时，可以添加**元数据说明符**来控制它们与引擎和编辑器各方面的交互方式。每种类型的数据结构或成员都有自己的元数据说明符列表。

元数据仅存在于编辑器中；不要编写访问元数据的游戏逻辑。

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
