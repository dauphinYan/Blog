export const slides = [
  { id: 'welcome', label: '欢迎', navLabel: '欢迎' },
  { id: 'intro', label: '自述', navLabel: '介绍' },
  { id: 'experience', label: '经历' },
  { id: 'current', label: '正在做' },
  { id: 'anime', label: '动漫' },
  { id: 'dream', label: '梦想' },
  { id: 'works', label: '作品', navLabel: '作品' },
  { id: 'contact', label: '联系', navLabel: '联系' },
] as const;

export const navSlides = slides.filter(
  (slide): slide is (typeof slides)[number] & { navLabel: string } => 'navLabel' in slide,
);
