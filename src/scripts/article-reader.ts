/** Shared reader enhancements for long-form articles outside the legacy blog route. */
export function initArticleReader() {
  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop instanceof HTMLButtonElement) {
    const update = () => { backToTop.hidden = window.scrollY < window.innerHeight; };
    update();
    window.addEventListener('scroll', update, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }

  document.querySelectorAll<HTMLElement>('.article-body pre.astro-code').forEach((block, index) => {
    if (block.querySelector('.code-block-toggle')) return;
    block.id ||= `code-block-${index + 1}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-block-toggle';
    button.setAttribute('aria-controls', block.id);
    button.setAttribute('aria-expanded', 'true');
    button.textContent = '收起';
    button.addEventListener('click', () => {
      const collapsed = block.classList.toggle('is-collapsed');
      button.setAttribute('aria-expanded', String(!collapsed));
      button.textContent = collapsed ? '展开' : '收起';
    });
    block.append(button);
  });

  const toc = document.querySelector<HTMLElement>('[data-article-sidebar="outline"]');
  const tocList = toc?.querySelector<HTMLElement>('[data-article-toc-list]');
  const headings = [...document.querySelectorAll<HTMLElement>('.article-body h2, .article-body h3, .article-body h4')];
  if (!toc || !tocList || headings.length === 0) return;

  type TocNode = { level: number; heading: HTMLElement; children: TocNode[] };
  const usedIds = new Set<string>();
  const root: { level: number; children: TocNode[] } = { level: 1, children: [] };
  const stack: Array<{ level: number; children: TocNode[] }> = [root];
  headings.forEach((heading, index) => {
    if (!heading.id) {
      const base = heading.textContent?.trim().toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-') || `section-${index + 1}`;
      let id = base;
      let suffix = 2;
      while (usedIds.has(id) || document.getElementById(id)) id = `${base}-${suffix++}`;
      heading.id = id;
    }
    usedIds.add(heading.id);
    const level = Number(heading.tagName.slice(1));
    while (stack.at(-1)!.level >= level) stack.pop();
    const node: TocNode = { level, heading, children: [] };
    stack.at(-1)!.children.push(node);
    stack.push(node);
  });

  const setBranchExpanded = (item: HTMLLIElement, expanded: boolean) => {
    const button = item.querySelector<HTMLButtonElement>(':scope > .article-toc-branch');
    if (!button) return;
    item.classList.toggle('is-collapsed', !expanded);
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? '−' : '+';
  };
  const renderNodes = (nodes: TocNode[]) => {
    const list = document.createElement('ul');
    nodes.forEach(node => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${node.heading.id}`;
      link.textContent = node.heading.textContent;
      link.dataset.tocTarget = node.heading.id;
      item.append(link);
      if (node.children.length > 0) {
        const branch = document.createElement('button');
        branch.type = 'button';
        branch.className = 'article-toc-branch';
        branch.setAttribute('aria-label', `展开或收起${node.heading.textContent}`);
        branch.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          const expanded = item.classList.contains('is-collapsed');
          branch.dataset.manualState = expanded ? 'expanded' : 'collapsed';
          setBranchExpanded(item, expanded);
        });
        item.prepend(branch);
        item.append(renderNodes(node.children));
        setBranchExpanded(item, false);
      }
      list.append(item);
    });
    return list;
  };
  tocList.append(renderNodes(root.children));
  toc.hidden = false;

  const links = [...toc.querySelectorAll<HTMLAnchorElement>('[data-toc-target]')];
  const branchItems = [...toc.querySelectorAll<HTMLLIElement>('li:has(> .article-toc-branch)')];
  const revealActivePath = (heading: Element) => {
    const activeLink = links.find(link => link.dataset.tocTarget === heading.id);
    const activePath = new Set<HTMLLIElement>();
    let item = activeLink?.closest('li');
    while (item instanceof HTMLLIElement) {
      if (item.querySelector(':scope > .article-toc-branch')) activePath.add(item);
      item = item.parentElement?.closest('li');
    }
    branchItems.forEach(branch => {
      const button = branch.querySelector<HTMLButtonElement>(':scope > .article-toc-branch');
      if (!button) return;
      if (activePath.has(branch)) setBranchExpanded(branch, true);
      else if (button.dataset.manualState !== 'expanded') setBranchExpanded(branch, false);
    });
  };
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!active) return;
    links.forEach(link => link.classList.toggle('is-active', link.dataset.tocTarget === active.target.id));
    revealActivePath(active.target);
  }, { rootMargin: '-15% 0px -70%' });
  headings.forEach(heading => observer.observe(heading));
}
