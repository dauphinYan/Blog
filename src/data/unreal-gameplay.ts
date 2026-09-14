import { createKnowledgeSection } from './knowledge-section';

/** 「游戏性系统」专区：与 Programming with C++ 平级的 UE 官方文档板块。 */
const gameplaySection = createKnowledgeSection({
  hubPath: '/article/unreal-engine',
  articleBasePath: '/article/unreal-engine/gameplay-systems',
  sectionTitle: '虚幻引擎官方文档 · 游戏性系统',
  rootDocumentSlug: 'gameplay-systems',
  fallbackRootTitle: 'Gameplay Systems',
});

export const knowledgeHubPath = gameplaySection.config.hubPath;
export const knowledgeArticleBasePath = gameplaySection.config.articleBasePath;
export const knowledgeSectionTitle = gameplaySection.config.sectionTitle;
export const knowledgeUrl = gameplaySection.knowledgeUrl;
export const knowledgeBreadcrumb = gameplaySection.knowledgeBreadcrumb;
export const buildKnowledgeTree = gameplaySection.buildKnowledgeTree;

export { articleUrlSlug, knowledgeTreeOpenSlugs, flattenKnowledgeTree } from './knowledge-section';
export type { KnowledgeTreeNode, FlatKnowledgeNode } from './knowledge-section';
