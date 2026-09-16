---
title: "数据资产"
description: "Data Assets in Unreal Engine 的中文译文。"
sourceTitle: "Data Assets in Unreal Engine"
sourceUrl: "https://dev.epicgames.com/documentation/unreal-engine/data-assets-in-unreal-engine"
engineVersion: "5.8"
reviewedAt: 2026-09-15
order: 6
draft: false
tags: [Unreal Engine, C++]
---

# 数据资产

关于虚幻引擎中数据资产的信息。

![数据资产](https://dev.epicgames.com/community/api/documentation/image/b1324805-7a2b-44d7-b218-f1f8dc5bd2c2?resizing_type=fill&width=1920&height=335)

**数据资产（Data Asset）** 是一种在其类实例中存储与特定系统相关数据的资产。

- 可以使用继承自 [UDataAsset](https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/Engine/UDataAsset?application_version=5.5) 的原生类在[内容浏览器](https://dev.epicgames.com/documentation/unreal-engine/content-browser-in-unreal-engine?application_version=5.5)中创建**资产**。如果您需要数据继承或更复杂的层次结构，我们建议创建仅数据蓝图类。

- 继承自[主数据资产](https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/Engine/UPrimaryDataAsset?application_version=5.5)会实现**主资产 ID** 并支持资产包，这允许从[资产管理器](https://dev.epicgames.com/documentation/unreal-engine/asset-management-in-unreal-engine?application_version=5.5)手动加载和卸载它。

- 原生子类的实例可以直接在虚幻编辑器中创建为数据资产，并将使用原生类的名称作为**主资产类型**。

  ![创建数据资产](https://dev.epicgames.com/community/api/documentation/image/7e903289-c475-4a9e-aa3f-d9d8db215072?resizing_type=fit)

  在上图中，在编辑器中创建新数据资产时，系统会提示您从原生子类列表中选择。

- 可以创建[蓝图](https://dev.epicgames.com/documentation/unreal-engine/blueprints-visual-scripting-in-unreal-engine)子类以添加变量，然后由设置这些变量的仅数据蓝图再次子类化。对于蓝图子类，我们建议使用仅数据蓝图而不是数据资产实例来处理数据继承并更新父类。

## 创建数据资产

要继承或创建您自己的**数据资产**，请按照以下步骤操作：

1. 导航到**工具** > **新建 C++ 类**，然后基于 **DataAsset** 创建新类。

   ![新建 C++ 类](https://dev.epicgames.com/community/api/documentation/image/465aac96-b6b5-47ca-935b-adafea5c06a8?resizing_type=fit)

2. 添加您的类数据成员。

   ```cpp
   USTRUCT()
   struct FMyAssetInfo {
       GENERATED_BODY()

       UPROPERTY(EditAnywhere)
       FString AssetName;

       UPROPERTY(EditAnywhere)
       UTexture2D* AssetThumbnail;
   };
   ```

3. 构建您的项目。

4. 在虚幻编辑器中，右键单击**内容浏览器**，然后选择**杂项** > **数据资产**。

   ![创建数据资产](https://dev.epicgames.com/community/api/documentation/image/89d1a0c3-02b5-4da2-9711-052dbf182dfe?resizing_type=fit)

5. 当提示选择数据资产实例的类时，您的资产应该填充在列表中。

   ![选择类](https://dev.epicgames.com/community/api/documentation/image/a35ee545-4b23-49f9-8179-5ab906d469d7?resizing_type=fit)

6. 打开您的**数据资产蓝图**以观察成员变量。

   ![数据资产蓝图](https://dev.epicgames.com/community/api/documentation/image/d6f221dc-a125-43f5-b78a-ca2ab5170605?resizing_type=fit)

使用[属性说明符](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-uproperties)时，您可以在资产中观察所有成员变量，以便设计师可以直接从编辑器修改数据。

## 主数据资产

**主数据资产**是实现 `GetPrimaryAssetId` 函数并支持资产包的数据资产，这允许从资产管理器手动加载/卸载它。

**主资产类型**等于沿层次结构向上的第一个原生类的名称或最高级别的蓝图类。例如，如果您有 `UPrimaryDataAsset` -> `UParentNativeClass` -> `UChildNativeClass` -> `DataOnlyBlueprintClass`，则类型将是 `ChildNativeClass`。

或者，如果您有 `UPrimaryDataAsset` -> `ParentBlueprintClass` -> `DataOnlyBlueprintClass`，则类型将是 `ParentBlueprintClass`。

要更改此行为，您可以在原生类中重写 `GetPrimaryAssetId` 函数，或将这些函数复制到不同的原生基类中。

### 创建主数据资产

要继承或创建您自己的主数据资产，请按照以下步骤操作：

1. 导航到**工具** > **新建 C++ 类**，然后基于 PrimaryDataAsset 创建新类。

2. 添加您的类成员并重写 **GetPrimaryAssetID** 函数。

   ```cpp
   UCLASS()
   class PROJECTExample_API UExampleDataAsset : public UPrimaryDataAsset {
       GENERATED_BODY()

       UPROPERTY(EditAnywhere)
       FString AssetName;

       UPROPERTY(EditAnywhere)
       UTexture2D* AssetThumbnail;

   public:
       virtual FPrimaryAssetId GetPrimaryAssetId() const override {
           return FPrimaryAssetId(FName(TEXT("ExampleDataAsset")), GetFName());
       }
   };
   ```

## 加载和卸载资产

**虚幻引擎**自动处理[资产](https://dev.epicgames.com/documentation/unreal-engine/assets-and-content-packs-in-unreal-engine)的加载和卸载，为开发者提供一种在需要每个资产时与引擎通信的方法。但是，您可能希望精确控制资产的发现、加载和审计时间。对于这些情况，我们建议使用[资产管理器](https://dev.epicgames.com/documentation/unreal-engine/asset-management-in-unreal-engine?application_version=5.5)。

### 异步资产加载

虚幻引擎简化了异步加载资产数据的过程。这些方法在开发中以及对设备上的烘焙数据的作用相同，因此无需维护两条按需加载数据的代码路径。

请参阅[异步资产加载](https://dev.epicgames.com/documentation/unreal-engine/asynchronous-asset-loading-in-unreal-engine)文档。
