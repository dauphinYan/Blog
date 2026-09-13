/** 目录树的展开/收起交互：仅分支按钮与文档面板标题栏可以切换状态。 */
export function initKnowledgeTree() {
  const setBranchExpanded = (item: HTMLElement, expanded: boolean) => {
    item.classList.toggle('is-collapsed', !expanded);
    const branch = item.querySelector<HTMLButtonElement>(':scope > .knowledge-row > .knowledge-branch');
    if (branch) {
      branch.setAttribute('aria-expanded', String(expanded));
      branch.textContent = expanded ? '−' : '+';
    }
  };

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest<HTMLElement>('.knowledge-branch');
    if (trigger) {
      const item = trigger.closest<HTMLElement>('li.is-folder');
      if (item) setBranchExpanded(item, item.classList.contains('is-collapsed'));
      return;
    }
    const panelToggle = event.target.closest<HTMLButtonElement>('[data-knowledge-tree-toggle]');
    if (panelToggle) {
      const panel = panelToggle.closest<HTMLElement>('.knowledge-document-tree');
      if (panel) {
        const collapsed = panel.classList.toggle('is-collapsed');
        panelToggle.setAttribute('aria-expanded', String(!collapsed));
        const icon = panelToggle.querySelector('span');
        if (icon) icon.textContent = collapsed ? '+' : '−';
      }
    }
  });
}
