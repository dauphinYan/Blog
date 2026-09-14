import { createKnowledgeSection } from './knowledge-section';

const cppSection = createKnowledgeSection({
  hubPath: '/article/unreal-engine',
  articleBasePath: '/article/unreal-engine/cpp',
  sectionTitle: '虚幻引擎官方文档 · 中文专区',
  rootDocumentSlug: 'programming-with-cplusplus',
  fallbackRootTitle: 'Programming with C++',
});

/** 专区首页与文章详情使用不同路由，避免导航链接误指向文章路由根目录。 */
export const knowledgeHubPath = cppSection.config.hubPath;
export const knowledgeArticleBasePath = cppSection.config.articleBasePath;
export const knowledgeSectionTitle = cppSection.config.sectionTitle;
export const knowledgeUrl = cppSection.knowledgeUrl;
export const knowledgeBreadcrumb = cppSection.knowledgeBreadcrumb;
export const buildKnowledgeTree = cppSection.buildKnowledgeTree;

export { articleUrlSlug, knowledgeTreeOpenSlugs, flattenKnowledgeTree } from './knowledge-section';
export type { KnowledgeTreeNode, FlatKnowledgeNode } from './knowledge-section';
