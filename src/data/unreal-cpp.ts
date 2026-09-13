import type { CollectionEntry } from 'astro:content';

export type KnowledgeEntry = CollectionEntry<'unrealCpp'>;

/** 专区首页与文章详情使用不同路由，避免导航链接误指向文章路由根目录。 */
export const knowledgeHubPath = '/unreal-engine/cpp';
export const knowledgeArticleBasePath = '/article/unreal-engine/cpp';
export const knowledgeSectionTitle = '虚幻引擎官方文档 · 中文专区';
/** 专区根文档：既是目录根节点的内容页，也是其元数据来源。 */
const rootDocumentSlug = 'programming-with-cplusplus';

export function knowledgeUrl(slug: string): string {
  return slug ? `${knowledgeArticleBasePath}/${slug}/` : `${knowledgeHubPath}/`;
}

/**
 * 文章页面包屑：专区入口 → 知识库根文档 → 当前文章。
 * 文件夹只是目录树的组织方式，避免将其误呈现为文档层级。
 */
export function knowledgeBreadcrumb(tree: KnowledgeTreeNode[], articleSlug: string) {
  const rootDocument = tree[0];
  const current = flattenKnowledgeTree(tree).find(node => node.slug === articleSlug);
  const items: Array<{ title: string; href?: string }> = [{ title: knowledgeSectionTitle, href: `${knowledgeHubPath}/` }];

  if (rootDocument && rootDocument.slug !== articleSlug && rootDocument.published) {
    items.push({ title: rootDocument.title, href: knowledgeUrl(rootDocument.slug) });
  }
  if (current) items.push({ title: current.title });

  return items;
}

export function articleUrlSlug(id: string): string {
  return id.replace(/\.md$/, '');
}

export interface KnowledgeTreeNode {
  /** 文章 slug；没有对应文章的纯目录节点以 "dir:" 开头。 */
  slug: string;
  title: string;
  description: string;
  order: number;
  published: boolean;
  children: KnowledgeTreeNode[];
}

export interface FlatKnowledgeNode {
  slug: string;
  title: string;
  description: string;
  depth: number;
  published: boolean;
}

function prettifySegment(segment: string): string {
  return segment
    .split('-')
    .map(part => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ');
}

function sortNodes(nodes: KnowledgeTreeNode[]): KnowledgeTreeNode[] {
  return nodes.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'zh-CN'));
}

/**
 * 根据内容集合的文件路径自动生成目录树：
 * 若目录含有与目录同名的 Markdown（例如 containers/containers.md），
 * 该文档会自动成为目录节点的标题与链接；仅右侧分支按钮负责展开子项。
 */
export function buildKnowledgeTree(entries: KnowledgeEntry[]): KnowledgeTreeNode[] {
  const bySlug = new Map(entries.map(entry => [articleUrlSlug(entry.id), entry]));
  const rootEntry = bySlug.get(rootDocumentSlug);
  const root: KnowledgeTreeNode = {
    slug: rootDocumentSlug,
    title: rootEntry?.data.title ?? 'Programming with C++',
    description: rootEntry?.data.description ?? '',
    order: rootEntry?.data.order ?? 0,
    published: rootEntry ? !rootEntry.data.draft : false,
    children: [],
  };

  const directories = new Map<string, KnowledgeTreeNode>();
  const ensureDirectory = (path: string): KnowledgeTreeNode[] => {
    if (!path) return root.children;
    let node = directories.get(path);
    if (!node) {
      const segments = path.split('/');
      node = {
        slug: `dir:${path}`,
        title: prettifySegment(segments.at(-1)!),
        description: '',
        order: Number.POSITIVE_INFINITY,
        published: false,
        children: [],
      };
      directories.set(path, node);
      ensureDirectory(segments.slice(0, -1).join('/')).push(node);
    }
    return node.children;
  };

  for (const entry of entries) {
    const slug = articleUrlSlug(entry.id);
    if (slug === rootDocumentSlug) continue;
    const segments = slug.split('/');
    ensureDirectory(segments.slice(0, -1).join('/')).push({
      slug,
      title: entry.data.title,
      description: entry.data.description,
      order: entry.data.order,
      published: !entry.data.draft,
      children: [],
    });
  }

  // 将「目录名/目录名.md」提升为目录本身，避免出现一个不可点击的英文目录
  // 和一个重复的中文文档叶子节点。新增目录时遵循该命名约定即可自动生效。
  for (const [path, directory] of directories) {
    const name = path.split('/').at(-1)!;
    const indexSlug = `${path}/${name}`;
    const indexDocument = directory.children.find(node => node.slug === indexSlug);
    if (!indexDocument) continue;

    directory.slug = indexDocument.slug;
    directory.title = indexDocument.title;
    directory.description = indexDocument.description;
    directory.order = indexDocument.order;
    directory.published = indexDocument.published;
    directory.children = directory.children.filter(node => node !== indexDocument);
  }

  const settle = (nodes: KnowledgeTreeNode[]): number => {
    let minOrder = Number.POSITIVE_INFINITY;
    for (const node of nodes) {
      const childMin = node.children.length > 0 ? settle(node.children) : node.order;
      node.order = node.children.length > 0 ? childMin : node.order;
      minOrder = Math.min(minOrder, node.order);
    }
    sortNodes(nodes);
    return minOrder;
  };
  settle(root.children);

  return [root];
}

/** 返回目标文章所在路径上的全部节点 slug，用于默认展开目录树中的当前位置。 */
export function knowledgeTreeOpenSlugs(tree: KnowledgeTreeNode[], targetSlug: string): Set<string> {
  const open = new Set<string>();
  const walk = (nodes: KnowledgeTreeNode[]): boolean => {
    let found = false;
    for (const node of nodes) {
      if (walk(node.children) || node.slug === targetSlug) {
        open.add(node.slug);
        found = true;
      }
    }
    return found;
  };
  walk(tree);
  return open;
}

export function flattenKnowledgeTree(tree: KnowledgeTreeNode[]): FlatKnowledgeNode[] {
  const nodes: FlatKnowledgeNode[] = [];
  const walk = (branch: KnowledgeTreeNode[], depth: number) => {
    for (const node of branch) {
      nodes.push({ slug: node.slug, title: node.title, description: node.description, depth, published: node.published });
      walk(node.children, depth + 1);
    }
  };
  walk(tree, 0);
  return nodes;
}
