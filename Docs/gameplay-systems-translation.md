# Gameplay Systems（游戏性系统）翻译进度

> 官方入口：<https://dev.epicgames.com/documentation/unreal-engine/gameplay-systems-in-unreal-engine>（Unreal Engine 5.8）
>
> 与 Programming with C++ 专区（见 `Docs/` 下的项目文档）平级的板块，翻译内容位于 `src/content/unreal-engine/5.8/gameplay-systems/`，站点路由 `/unreal-engine/gameplay-systems`。
>
> **维护约定**：每完成一篇 → 在「已完成」表中添加一行（日期 / 文件 / 官方原文），并从「待翻译」清单中删除该条目。翻译时若发现某板块还有未收录的深层子页，随手补录；官方失效链接（解析到 /documentation/404）在条目后标注「（官方链接失效）」。
>
> 翻译模板：参见 `src/content/unreal-engine/5.8/programming-with-cplusplus/gameplay-architecture/gameplay-architecture.md` 的 frontmatter 与正文约定（1:1 对应原文结构，图片热链 Epic 官方图片 API，已译页面之间用相对 `.md` 链接，未译目标直接给官方绝对 URL）。

## 待翻译

### Gameplay Framework（游戏性框架）

- [ ] Spawning and Destroying an Actor — `/documentation/unreal-engine/spawning-and-destroying-unreal-engine-actors`
- [ ] Actor Ticking — `/documentation/unreal-engine/actor-ticking-in-unreal-engine`
- [ ] Actor Lifecycle — 官方链接失效（原指向 /documentation/404）
- [ ] Using Cameras in Unreal Engine — `/documentation/unreal-engine/using-cameras-in-unreal-engine`
- [ ] Camera Animation — `/documentation/unreal-engine/camera-animation-in-unreal-engine`
- [ ] Pawn in Unreal Engine — `/documentation/unreal-engine/pawn-in-unreal-engine`
- [ ] Characters in Unreal Engine — `/documentation/unreal-engine/characters-in-unreal-engine`
- [ ] Player Controllers in Unreal Engine — `/documentation/unreal-engine/player-controllers-in-unreal-engine`
- [ ] AI Controllers in Unreal Engine — `/documentation/unreal-engine/ai-controllers-in-unreal-engine`
- [ ] Game Mode and Game State in Unreal Engine — `/documentation/unreal-engine/game-mode-and-game-state-in-unreal-engine`
- [ ] Setting Up a Game Mode — `/documentation/unreal-engine/setting-up-a-game-mode-in-unreal-engine`
- [ ] Gameplay Timers in Unreal Engine — `/documentation/unreal-engine/gameplay-timers-in-unreal-engine`
- [ ] Input in Unreal Engine — `/documentation/unreal-engine/input-in-unreal-engine`
- [ ] Input Overview in Unreal Engine — `/documentation/unreal-engine/input-overview-in-unreal-engine`
- [ ] Enhanced Input in Unreal Engine — `/documentation/unreal-engine/enhanced-input-in-unreal-engine`
- [ ] User Interfaces and HUDs in Unreal Engine — `/documentation/unreal-engine/user-interfaces-and-huds-in-unreal-engine`
- [ ] Creating User Interfaces With UMG and Slate — `/documentation/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine`
- [ ] Slate User Interface Programming Framework — `/documentation/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine`
- [ ] Game Features and Modular Gameplay — `/documentation/unreal-engine/game-features-and-modular-gameplay-in-unreal-engine`

### Gameplay Ability System（GAS）

- [ ] Gameplay Ability System — `/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine`
- [ ] Gameplay Ability System Component and Gameplay Attributes — `/documentation/unreal-engine/gameplay-ability-system-component-and-gameplay-attributes-in-unreal-engine`
- [ ] Gameplay Attributes and Attribute Sets for GAS — `/documentation/unreal-engine/gameplay-attributes-and-attribute-sets-for-the-gameplay-ability-system-in-unreal-engine`
- [ ] Gameplay Ability Tasks — `/documentation/unreal-engine/gameplay-ability-tasks-in-unreal-engine`
- [ ] Gameplay Effects for GAS — `/documentation/unreal-engine/gameplay-effects-for-the-gameplay-ability-system-in-unreal-engine`

### Artificial Intelligence（人工智能）

- [ ] Artificial Intelligence — `/documentation/unreal-engine/artificial-intelligence-in-unreal-engine`（板块根页，General Topics + Machine Learning 两节）
- [ ] Behavior Trees — `/documentation/unreal-engine/behavior-trees-in-unreal-engine`
- [ ] Behavior Tree Quick Start Guide — `/documentation/unreal-engine/behavior-tree-in-unreal-engine---quick-start-guide`
- [ ] Behavior Tree Overview — `/documentation/unreal-engine/behavior-tree-in-unreal-engine---overview`
- [ ] Behavior Tree User Guide — `/documentation/unreal-engine/behavior-tree-in-unreal-engine---user-guide`
- [ ] Behavior Tree Node Reference — `/documentation/unreal-engine/behavior-tree-node-reference-in-unreal-engine`（其下还有 Tasks/Decorators/Services/Composites 等节点参考子页，翻译时补录）
- [ ] Navigation System — `/documentation/unreal-engine/navigation-system-in-unreal-engine`
- [ ] How to Modify the Navigation Mesh — `/documentation/unreal-engine/modifying-the-navigation-mesh-in-unreal-engine`
- [ ] Custom Navigation Areas and Query Filters — `/documentation/unreal-engine/custom-navigation-areas-and-query-filters-in-unreal-engine`
- [ ] Using Avoidance With the Navigation System — `/documentation/unreal-engine/using-avoidance-with-the-navigation-system-in-unreal-engine`
- [ ] Using Navigation Invokers — `/documentation/unreal-engine/using-navigation-invokers-in-unreal-engine`
- [ ] Optimizing Navigation Mesh Generation Speed — `/documentation/unreal-engine/optimizing-navigation-mesh-generation-speed-in-unreal-engine`
- [ ] Navigation Mesh Resolutions User Guide — `/documentation/unreal-engine/navigation-mesh-resolutions-user-guide`
- [ ] World Partitioned Navigation Mesh — `/documentation/unreal-engine/world-partitioned-navigation-mesh`
- [ ] Automatic Navigation Link Generation — `/documentation/unreal-engine/automatic-navigation-link-generation`
- [ ] Navigation Components — `/documentation/unreal-engine/navigation-components-in-unreal-engine`
- [ ] Smart Objects — `/documentation/unreal-engine/smart-objects-in-unreal-engine`
- [ ] Smart Objects Overview — `/documentation/unreal-engine/smart-objects-in-unreal-engine---overview`
- [ ] Smart Objects Quick Start — `/documentation/unreal-engine/smart-objects-in-unreal-engine---quick-start`
- [ ] StateTree — `/documentation/unreal-engine/state-tree-in-unreal-engine`
- [ ] StateTree Overview — `/documentation/unreal-engine/overview-of-state-tree-in-unreal-engine`
- [ ] External StateTree Quickstart Guide — `/documentation/unreal-engine/external-statetree-quickstart-guide`
- [ ] StateTree Debugger Quick Start Guide — `/documentation/unreal-engine/statetree-debugger-quick-start-guide`
- [ ] State Tree Selectors Overview — `/documentation/unreal-engine/state-tree-selectors-overview`
- [ ] MassEntity — `/documentation/unreal-engine/mass-entity-in-unreal-engine`
- [ ] Overview of MassEntity — `/documentation/unreal-engine/overview-of-mass-entity-in-unreal-engine`
- [ ] Simplified Mass Processor — `/documentation/unreal-engine/simplified-mass-processor`
- [ ] Mass Avoidance — `/documentation/unreal-engine/mass-avoidance-in-unreal-engine`
- [ ] Mass Debugger Overview — `/documentation/unreal-engine/mass-debugger-overview`
- [ ] Overview of Mass Gameplay — `/documentation/unreal-engine/overview-of-mass-gameplay-in-unreal-engine`
- [ ] Environment Query System — `/documentation/unreal-engine/environment-query-system-in-unreal-engine`
- [ ] EQS Overview — `/documentation/unreal-engine/environment-query-system-overview-in-unreal-engine`
- [ ] EQS Quick Start — `/documentation/unreal-engine/environment-query-system-quick-start-in-unreal-engine`
- [ ] EQS User Guide — `/documentation/unreal-engine/environment-query-system-user-guide-in-unreal-engine`
- [ ] EQS Node Reference — `/documentation/unreal-engine/environment-query-system-node-reference-in-unreal-engine`
- [ ] EQS Node Reference: Generators — `/documentation/unreal-engine/eqs-node-reference-generators-in-unreal-engine`
- [ ] EQS Node Reference: Contexts — `/documentation/unreal-engine/eqs-node-reference-contexts-in-unreal-engine`
- [ ] EQS Testing Pawn — `/documentation/unreal-engine/environment-query-testing-pawn-in-unreal-engine`
- [ ] AI Perception — `/documentation/unreal-engine/ai-perception-in-unreal-engine`
- [ ] AI Debugging — `/documentation/unreal-engine/ai-debugging-in-unreal-engine`
- [ ] AI Components — `/documentation/unreal-engine/ai-components-in-unreal-engine`
- [ ] Neural Network Engine — `/documentation/unreal-engine/neural-network-engine-in-unreal-engine`
- [ ] NNE Overview — `/documentation/unreal-engine/neural-network-engine-overview-in-unreal-engine`
- [ ] NNE Quick Start — `/documentation/unreal-engine/neural-network-engine-quick-start-with-unreal-engine`
- [ ] Machine Learning Cloth Simulation Overview — `/documentation/unreal-engine/machine-learning-cloth-simulation-overview`
- [ ] How To Use The Machine Learning Deformer — `/documentation/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine`
- [ ] Neural Post Processing — `/documentation/unreal-engine/neural-post-processing-in-unreal-engine`
- [ ] NNE Denoiser — `/documentation/unreal-engine/nne-denoiser-in-unreal-engine`
- [ ] NFor Denoiser — `/documentation/unreal-engine/nfor-denoiser-in-unreal-engine`

### Physics（物理）

- [ ] Physics — `/documentation/unreal-engine/physics-in-unreal-engine`（板块根页）
- [ ] Collision — `/documentation/unreal-engine/collision-in-unreal-engine`
- [ ] Collision Overview — `/documentation/unreal-engine/collision-in-unreal-engine---overview`
- [ ] Collision Response Reference — `/documentation/unreal-engine/collision-response-reference-in-unreal-engine`
- [ ] Simple versus Complex Collision — `/documentation/unreal-engine/simple-versus-complex-collision-in-unreal-engine`
- [ ] Collision Tutorials — `/documentation/unreal-engine/collision-tutorials-in-unreal-engine`（聚合页）
- [ ] Add Simple Collision to a Static Mesh — `/documentation/unreal-engine/add-simple-collision-to-a-static-mesh-in-unreal-engine`
- [ ] Add a K-DOP Collision Hull to a Static Mesh — `/documentation/unreal-engine/add-a-k-dop-collision-hull-to-a-static-mesh-in-unreal-engine`
- [ ] Add a Collision Hull Using the Auto Convex Collision Tool — `/documentation/unreal-engine/add-a-collision-hull-to-a-static-mesh-using-the-auto-convex-collision-tool-in-unreal-engine`
- [ ] Add a Custom Object Type to Your Project — `/documentation/unreal-engine/add-a-custom-object-type-to-your-project-in-unreal-engine`
- [ ] Add a Custom Trace Type to Your Project — `/documentation/unreal-engine/add-a-custom-trace-type-to-your-project-in-unreal-engine`
- [ ] Review Collision in Your Game — `/documentation/unreal-engine/review-collision-in-your-unreal-engine-game`
- [ ] Traces with Raycasts — `/documentation/unreal-engine/traces-with-raycasts-in-unreal-engine`
- [ ] Traces Overview — `/documentation/unreal-engine/traces-in-unreal-engine---overview`
- [ ] Traces Tutorials — `/documentation/unreal-engine/traces-tutorials-in-unreal-engine`（聚合页）
- [ ] Using a Single Line Trace (Raycast) by Channel — `/documentation/unreal-engine/using-a-single-line-trace-raycast-by-channel-in-unreal-engine`
- [ ] Using a Single Line Trace (Raycast) by Object — `/documentation/unreal-engine/using-a-single-line-trace-raycast-by-object-in-unreal-engine`
- [ ] Using a Multi Line Trace (Raycast) by Channel — `/documentation/unreal-engine/using-a-multi-line-trace-raycast-by-channel-in-unreal-engine`
- [ ] Using a Multi Line Trace (Raycast) by Object — `/documentation/unreal-engine/using-a-multi-line-trace-raycast-by-object-in-unreal-engine`
- [ ] Chaos Destruction — `/documentation/unreal-engine/chaos-destruction-in-unreal-engine`
- [ ] Destruction Overview — `/documentation/unreal-engine/destruction-overview`
- [ ] Destruction Quick Start — `/documentation/unreal-engine/destruction-quick-start`
- [ ] Dataflow for Destruction Quickstart — `/documentation/unreal-engine/dataflow-for-destruction-quickstart`
- [ ] Geometry Collections User Guide — `/documentation/unreal-engine/geometry-collections-user-guide`
- [ ] Fracture Mode Selection Tools User Guide — `/documentation/unreal-engine/fracture-mode-selection-tools-user-guide`
- [ ] Fracturing Geometry Collections User Guide — `/documentation/unreal-engine/fracturing-geometry-collections-user-guide`
- [ ] Edit Tools User Guide — `/documentation/unreal-engine/edit-tools-user-guide-in-unreal-engine`
- [ ] Cluster Geometry Collections User Guide — `/documentation/unreal-engine/cluster-geometry-collections-user-guide-in-unreal-engine`
- [ ] Chaos Fields User Guide — `/documentation/unreal-engine/chaos-fields-user-guide-in-unreal-engine`
- [ ] Physics Bodies — `/documentation/unreal-engine/physics-bodies-in-unreal-engine`
- [ ] Physics Bodies Reference — `/documentation/unreal-engine/physics-bodies-reference-for-unreal-engine`
- [ ] Cloth Simulation — `/documentation/unreal-engine/cloth-simulation-in-unreal-engine`
- [ ] Clothing Tool — `/documentation/unreal-engine/clothing-tool-in-unreal-engine`
- [ ] Clothing Tool Properties Reference — `/documentation/unreal-engine/clothing-tool-in-unreal-engine---properties-reference`
- [ ] Panel Cloth Editor Overview — `/documentation/unreal-engine/panel-cloth-editor-overview`
- [ ] Creating Parametric Clothing for Fab — `/documentation/unreal-engine/creating-parametric-clothing-for-fab`
- [ ] Physical Materials — `/documentation/unreal-engine/physical-materials-in-unreal-engine`
- [ ] Physical Materials User Guide — `/documentation/unreal-engine/physical-materials-user-guide-for-unreal-engine`
- [ ] Physical Materials Reference — `/documentation/unreal-engine/physical-materials-reference-for-unreal-engine`
- [ ] Physical Material Tutorials — `/documentation/unreal-engine/tutorials-about-physical-materials-in-unreal-engine`（聚合页）
- [ ] Create a Physical Material — `/documentation/unreal-engine/create-a-physical-material-in-unreal-engine`
- [ ] Edit a Physical Material — `/documentation/unreal-engine/edit-a-physical-material-in-unreal-engine`
- [ ] Add a Surface Type — `/documentation/unreal-engine/add-a-surface-type-in-unreal-engine`
- [ ] Assign a Physical Material to a Material — `/documentation/unreal-engine/assign-a-physical-material-to-a-material-in-unreal-engine`
- [ ] Assign a Physical Material to a Material Instance — `/documentation/unreal-engine/assign-a-physical-material-to-a-material-instance-in-unreal-engine`
- [ ] Assign a Physical Material to a Physics Asset — `/documentation/unreal-engine/assign-a-physical-material-to-a-physics-asset-in-unreal-engine`
- [ ] Assign a Physical Material to a Physics Asset Body — `/documentation/unreal-engine/assign-a-physical-material-to-a-physics-asset-body-in-unreal-engine`
- [ ] Assign a Physical Material in the Static Mesh Editor — `/documentation/unreal-engine/assign-a-physical-material-in-the-static-mesh-editor-in-unreal-engine`
- [ ] Hair Physics — `/documentation/unreal-engine/hair-physics-in-unreal-engine`
- [ ] Hair Physics Overview — `/documentation/unreal-engine/hair-physics-in-unreal-engine---overview`
- [ ] Physics Constraints — `/documentation/unreal-engine/physics-constraints-in-unreal-engine`
- [ ] Physics Components — `/documentation/unreal-engine/physics-components-in-unreal-engine`
- [ ] Physics Asset Editor — `/documentation/unreal-engine/physics-asset-editor-in-unreal-engine`
- [ ] Physics Fields — `/documentation/unreal-engine/physics-fields-in-unreal-engine`
- [ ] Physics Sub-Stepping — `/documentation/unreal-engine/physics-sub-stepping-in-unreal-engine`
- [ ] Walkable Slope — `/documentation/unreal-engine/walkable-slope-in-unreal-engine`
- [ ] Chaos Visual Debugger — `/documentation/unreal-engine/chaos-visual-debugger-in-unreal-engine`
- [ ] Networked Physics — `/documentation/unreal-engine/networked-physics`
- [ ] Fluid Simulation — `/documentation/unreal-engine/fluid-simulation-in-unreal-engine`
- [ ] Dataflow Graph — `/documentation/unreal-engine/dataflow-graph`
- [ ] Chaos Flesh — `/documentation/unreal-engine/chaos-flesh`

### Large World Coordinates（大世界坐标）

- [ ] Large World Coordinates in UE5 — `/documentation/unreal-engine/large-world-coordinates-in-unreal-engine-5`
- [ ] LWC Rendering Overview — `/documentation/unreal-engine/large-world-coordinates-rendering-in-unreal-engine-5`
- [ ] LWC Project Conversion Guidelines — `/documentation/unreal-engine/large-world-coordinates-project-conversion-guidelines-in-unreal-engine-5`

### Data-Driven Gameplay Elements（数据驱动游戏性元素）

- [ ] Data-Driven Gameplay Elements — `/documentation/unreal-engine/data-driven-gameplay-elements-in-unreal-engine`
- [ ] Data Registries — `/documentation/unreal-engine/data-registries-in-unreal-engine`

### Vehicles（载具）

- [ ] Vehicles — `/documentation/unreal-engine/vehicles-in-unreal-engine`（板块根页）
- [ ] Chaos Vehicles — `/documentation/unreal-engine/chaos-vehicles`
- [ ] How to Set up Vehicles — `/documentation/unreal-engine/how-to-set-up-vehicles-in-unreal-engine`
- [ ] Vehicle Center of Mass — `/documentation/unreal-engine/vehicle-center-of-mass-in-unreal-engine`
- [ ] How to Convert PhysX Vehicles to Chaos — `/documentation/unreal-engine/how-to-convert-physx-vehicles-to-chaos-in-unreal-engine`
- [ ] Vehicle Debug Commands — `/documentation/unreal-engine/vehicle-debug-commands-in-unreal-engine`
- [ ] How to Build a Double Wishbone Suspension Vehicle — `/documentation/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine`
- [ ] Vehicle Art Setup — `/documentation/unreal-engine/vehicle-art-setup-in-unreal-engine`
- [ ] Chaos Modular Vehicles — `/documentation/unreal-engine/chaos-modular-vehicles`
- [ ] Chaos Modular Vehicles Overview — `/documentation/unreal-engine/chaos-modular-vehicles-overview`
- [ ] Chaos Modular Vehicles Quickstart — `/documentation/unreal-engine/chaos-modular-vehicles-quickstart`

### Networking and Multiplayer（网络与多人）

- [ ] Networking and Multiplayer — `/documentation/unreal-engine/networking-and-multiplayer-in-unreal-engine`（板块根页）
- [ ] Networking Overview — `/documentation/unreal-engine/networking-overview-for-unreal-engine`
- [ ] Multiplayer Programming Quick Start — `/documentation/unreal-engine/multiplayer-programming-quick-start-for-unreal-engine`
- [ ] Travelling in Multiplayer — `/documentation/unreal-engine/travelling-in-multiplayer-in-unreal-engine`
- [ ] Actor Network Dormancy — `/documentation/unreal-engine/actor-network-dormancy-in-unreal-engine`
- [ ] Replicate Actor Properties — `/documentation/unreal-engine/replicate-actor-properties-in-unreal-engine`
- [ ] Actor Component Replication — `/documentation/unreal-engine/replicating-actor-components-in-unreal-engine`
- [ ] Object Replication — `/documentation/unreal-engine/replicating-uobjects-in-unreal-engine`
- [ ] Online Beacons — `/documentation/unreal-engine/using-online-beacons-in-unreal-engine`
- [ ] Introduction to Iris — `/documentation/unreal-engine/introduction-to-iris-in-unreal-engine`
- [ ] Migrate to Iris — `/documentation/unreal-engine/migrate-to-iris-in-unreal-engine`
- [ ] Components of Iris — `/documentation/unreal-engine/components-of-iris-in-unreal-engine`
- [ ] Iris Filtering — `/documentation/unreal-engine/iris-filtering-in-unreal-engine`
- [ ] Iris Prioritization — `/documentation/unreal-engine/iris-prioritization-in-unreal-engine`
- [ ] Glossary of Iris Terms — `/documentation/unreal-engine/glossary-of-iris-terms-in-unreal-engine`
- [ ] Replication Graph — `/documentation/unreal-engine/replication-graph-in-unreal-engine`
- [ ] Replay System — `/documentation/unreal-engine/using-the-replay-system-in-unreal-engine`
- [ ] Using Steam Sockets — `/documentation/unreal-engine/using-steam-sockets-in-unreal-engine`
- [ ] Logging — `/documentation/unreal-engine/logging-for-networked-games-in-unreal-engine`
- [ ] Console Commands — `/documentation/unreal-engine/console-commands-for-network-debugging-in-unreal-engine`
- [ ] Testing Multiplayer — `/documentation/unreal-engine/testing-multiplayer-in-unreal-engine`
- [ ] Debugging Guide — `/documentation/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine`
- [ ] Networking Insights — `/documentation/unreal-engine/networking-insights-in-unreal-engine`
- [ ] Network Profiler — `/documentation/unreal-engine/using-the-network-profiler-in-unreal-engine`
- [ ] Performance and Bandwidth Tips — `/documentation/unreal-engine/performance-and-bandwidth-tips-for-unreal-engine`
- [ ] Oodle Network — `/documentation/unreal-engine/oodle-network`
- [ ] Setting Up Dedicated Servers — `/documentation/unreal-engine/setting-up-dedicated-servers-in-unreal-engine`

### Online Subsystems and Services（在线子系统与服务）

- [ ] Online Subsystems and Services — `/documentation/unreal-engine/online-subsystems-and-services-in-unreal-engine`（板块根页）
- [ ] Online Subsystem — `/documentation/unreal-engine/online-subsystem-in-unreal-engine`
- [ ] Online Subsystem EOS Plugin — `/documentation/unreal-engine/online-subsystem-eos-plugin-in-unreal-engine`
- [ ] Online Subsystem Steam — `/documentation/unreal-engine/online-subsystem-steam-interface-in-unreal-engine`
- [ ] Achievements Interface — `/documentation/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine`
- [ ] External UI Interface — `/documentation/unreal-engine/online-subsystem-external-ui-interface-in-unreal-engine`
- [ ] Leaderboard Interface — `/documentation/unreal-engine/online-subsystem-leaderboard-interface-in-unreal-engine`
- [ ] Presence Interface — `/documentation/unreal-engine/online-subsystem-presence-interface-in-unreal-engine`
- [ ] Purchase Interface — `/documentation/unreal-engine/online-subsystem-purchase-interface-in-unreal-engine`
- [ ] Session Interface — `/documentation/unreal-engine/online-subsystem-session-interface-in-unreal-engine`
- [ ] User Identity Interface — `/documentation/unreal-engine/online-subsystem-user-interface-in-unreal-engine`
- [ ] Online Services Overview — `/documentation/unreal-engine/overview-of-online-services-in-unreal-engine`
- [ ] Use the Online Services Plugins — `/documentation/unreal-engine/use-the-online-services-plugins-in-unreal-engine`
- [ ] Setup and Configure the Online Services Plugins — `/documentation/unreal-engine/setup-and-configure-the-online-services-plugins-in-unreal-engine`
- [ ] Structure and Implement the Online Services Plugins — `/documentation/unreal-engine/structure-and-implement-the-online-services-plugins-in-unreal-engine`
- [ ] Online Services EOS — `/documentation/unreal-engine/online-services-eos-plugins-in-unreal-engine`
- [ ] Enable and Configure Online Services EOS — `/documentation/unreal-engine/enable-and-configure-online-services-eos-in-unreal-engine`
- [ ] Online Services Interfaces — `/documentation/unreal-engine/online-services-interfaces-in-unreal-engine`
- [ ] Debugging Online Services Plugin — `/documentation/unreal-engine/debugging-online-services-plugin-in-unreal-engine`
- [ ] Online Services Console Commands — `/documentation/unreal-engine/online-services-console-commands-in-unreal-engine`
- [ ] Epic Online Services in Unreal Engine — `/documentation/unreal-engine/epic-online-services-in-unreal-engine`
- [ ] Upgrading the EOS SDK — `/documentation/unreal-engine/upgrading-the-eos-sdk-in-unreal-engine`
- [ ] Voice Chat Interface — `/documentation/unreal-engine/voice-chat-interface-in-unreal-engine`

### Gameplay Camera System（游戏性相机系统插件）

- [ ] Gameplay Camera System — `/documentation/unreal-engine/gameplay-camera-system`
- [ ] Gameplay Camera System Overview — `/documentation/unreal-engine/gameplay-camera-system-overview`
- [ ] Gameplay Camera System Quick Start — `/documentation/unreal-engine/gameplay-camera-system-quick-start`

### Gameplay Targeting System（游戏性目标选定系统插件）

- [ ] Gameplay Targeting System — `/documentation/unreal-engine/gameplay-targeting-system-in-unreal-engine`
- [ ] Gameplay Targeting Debugging — `/documentation/unreal-engine/gameplay-targeting-system-debugging-in-unreal-engine`
- [ ] Gameplay Targeting Plugin Reference — `/documentation/unreal-engine/gameplay-targeting-system-reference-in-unreal-engine`

### Mover（Mover 插件）

- [ ] Mover — `/documentation/unreal-engine/mover-in-unreal-engine`
- [ ] Mover Features and Concepts — `/documentation/unreal-engine/mover-features-and-concepts-in-unreal-engine`
- [ ] Comparing Mover and Character Movement Component — `/documentation/unreal-engine/comparing-mover-and-character-movement-component-in-unreal-engine`
- [ ] Mover Examples — `/documentation/unreal-engine/mover-examples-in-unreal-engine`
- [ ] Mover Debugging Reference — `/documentation/unreal-engine/mover-debugging-reference-for-unreal-engine`

### Class Creation Basics（类创建基础）

- [ ] Class Creation Basics — `/documentation/unreal-engine/class-creation-basics-in-unreal-engine`
- [ ] Blueprints Only — `/documentation/unreal-engine/blueprints-only-example`
- [ ] C++ Only — `/documentation/unreal-engine/cpp-only-example`
- [ ] C++ and Blueprints — `/documentation/unreal-engine/cpp-and-blueprints-example`

### Gameplay Tutorials（游戏性教程）

- [ ] Gameplay Tutorials — `/documentation/unreal-engine/gameplay-tutorials-for-unreal-engine`
- [ ] Adding Components to an Actor — `/documentation/unreal-engine/adding-components-to-an-actor-in-unreal-engine`
- [ ] Setting Up Character Movement — `/documentation/unreal-engine/setting-up-character-movement`
- [ ] Finding Actors — `/documentation/unreal-engine/finding-actors-in-unreal-engine`
- [ ] Respawning a Player Character — `/documentation/unreal-engine/respawning-a-player-character`
- [ ] Saving and Loading Your Game — `/documentation/unreal-engine/saving-and-loading-your-game-in-unreal-engine`
- [ ] Possessing Pawns — `/documentation/unreal-engine/possessing-pawns-in-unreal-engine`
- [ ] Setting Up a Game Mode — `/documentation/unreal-engine/setting-up-a-game-mode-in-unreal-engine`
- [ ] Using the OnHit Event — `/documentation/unreal-engine/using-the-onhit-event`

## 已完成

| 日期 | 文件 | 官方原文 |
| --- | --- | --- |
| 2026-09-14 | `gameplay-systems.md`（板块根页） | [Gameplay Systems in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/gameplay-systems-in-unreal-engine) |
| 2026-09-14 | `gameplay-framework/gameplay-framework.md` | [Gameplay Framework in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/gameplay-framework-in-unreal-engine) |
| 2026-09-14 | `gameplay-framework/actors.md` | [Actors in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine) |
| 2026-09-14 | `gameplay-framework/cameras.md` | [Cameras in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/cameras-in-unreal-engine) |
| 2026-09-14 | `gameplay-framework/components.md` | [Components in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/components-in-unreal-engine) |
| 2026-09-14 | `gameplay-framework/controllers.md` | [Controllers in Unreal Engine](https://dev.epicgames.com/documentation/unreal-engine/controllers-in-unreal-engine) |
