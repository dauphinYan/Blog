import type { CollectionEntry } from 'astro:content';

/** 任一虚幻文档集合（unrealCpp / gameplaySystems）中的文章条目。 */
export type UnrealDocEntry = CollectionEntry<'unrealCpp'> | CollectionEntry<'gameplaySystems'>;

export interface KnowledgeSectionConfig {
  /** 专区首页路由。 */
  hubPath: string;
  /** 文章详情路由前缀。 */
  articleBasePath: string;
  /** 专区标题（面包屑与页面标题使用）。 */
  sectionTitle: string;
  /** 根文档 slug：既是目录根节点的内容页，也是其元数据来源。 */
  rootDocumentSlug: string;
  /** 根文档缺失时的回退标题。 */
  fallbackRootTitle: string;
}

export interface KnowledgeTreeNode {
  /** 文章 slug；没有对应文章的纯目录节点以 "dir:" 开头。 */
  slug: string;
  title: string;
  description: string;
  order: number;
  published: boolean;
  /** 跨专区目录可提供完整链接；未提供时由调用方按 slug 构造链接。 */
  href?: string;
  children: KnowledgeTreeNode[];
}

export interface FlatKnowledgeNode {
  slug: string;
  title: string;
  description: string;
  depth: number;
  published: boolean;
}

export function articleUrlSlug(id: string): string {
  return id.replace(/\.md$/, '');
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
 * 按专区配置创建目录树与链接工具：
 * 目录树根据内容集合的文件路径自动生成，若目录含有与目录同名的 Markdown
 * （例如 containers/containers.md），该文档会自动成为目录节点的标题与链接；
 * 仅右侧分支按钮负责展开子项。
 */
export function createKnowledgeSection(config: KnowledgeSectionConfig) {
  function knowledgeUrl(slug: string): string {
    return slug ? `${config.articleBasePath}/${slug}/` : `${config.hubPath}/`;
  }

  /**
   * 文章页面包屑：专区入口 → 知识库根文档 → 当前文章。
   * 文件夹只是目录树的组织方式，避免将其误呈现为文档层级。
   */
  function knowledgeBreadcrumb(tree: KnowledgeTreeNode[], articleSlug: string) {
    const rootDocument = tree[0];
    const current = flattenKnowledgeTree(tree).find(node => node.slug === articleSlug);
    const items: Array<{ title: string; href?: string }> = [{ title: config.sectionTitle, href: `${config.hubPath}/` }];

    if (rootDocument && rootDocument.slug !== articleSlug && rootDocument.published) {
      items.push({ title: rootDocument.title, href: knowledgeUrl(rootDocument.slug) });
    }
    if (current) items.push({ title: current.title });

    return items;
  }

  function buildKnowledgeTree(entries: UnrealDocEntry[]): KnowledgeTreeNode[] {
    const bySlug = new Map(entries.map(entry => [articleUrlSlug(entry.id), entry]));
    const rootEntry = bySlug.get(config.rootDocumentSlug);
    const root: KnowledgeTreeNode = {
      slug: config.rootDocumentSlug,
      title: rootEntry?.data.title ?? config.fallbackRootTitle,
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
      if (slug === config.rootDocumentSlug) continue;
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

  return { config, knowledgeUrl, knowledgeBreadcrumb, buildKnowledgeTree };
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
