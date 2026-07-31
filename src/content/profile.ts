export type Locale = 'zh-CN' | 'en';

export const translations = {
  'zh-CN': {
    page: { titlePrefix: '个人主页', languageButton: 'EN', languageButtonLabel: '切换至英文' },
    nav: {
      welcome: '欢迎', intro: '介绍', works: '作品', contact: '联系', homeLabel: '回到欢迎区域', avatarAlt: '头像',
      themeToggleLabel: '切换深色模式', menuOpenLabel: '打开导航菜单', menuLabel: '移动端导航', pagerLabel: '页面进度', pagerGoTo: '前往',
    },
    sections: { bio: '自述', experience: '经历', current: '正在做', anime: '动漫', dream: '梦想', works: '作品', contact: '联系', copyright: '保留所有权利。' },
    profile: {
      name: 'Orca丶',
      title: '你好，我是Orca丶',
      tagline: '一个特别想做出自己游戏的菜鸟程序员。',
      abstract: '一个特别想做出自己游戏的菜鸟程序员，不擅长与人打交道、讨厌太多世俗规矩。',
      links: { github: 'https://github.com/dauphinYan', bilibili: 'https://space.bilibili.com/285301431', email: '584485321@qq.com' },
      heroStatus: [
        { label: '当前方向', text: 'Unreal Engine 游戏开发' },
        { label: '长期目标', text: '做出自己心中的《刀剑神域》' },
      ],
      experiences: [
        '本科毕业后，曾误打误撞进入某粮食厂干了不到一年的服务端开发，后来发现自己确实对这块提不起兴趣。恰逢 AI 蓬勃发展，双方一拍即合，于是开始把注意力转向更想投入的方向。',
        '自学过一段时间 Unreal Engine，当前正在制作 Demo，验证一些核心玩法与技术可行性。',
        '也做过游戏辅助，为童年页游"赛尔号"开发了较为完整的对战记牌器，希望帮助新人少挨点毒打。',
      ],
      current: [
        { label: '引擎', text: 'Unreal Engine' },
        { label: '阶段', text: 'Demo 验证' },
        { label: '重点', text: '核心玩法、技术可行性、可持续制作节奏' },
      ],
      anime: [{ label: '爱好 / 动漫', title: '名侦探柯南', text: '小时候看到现在的推理作品。', tags: ['推理', '童年回忆', '连载中'] }],
      works: [
        { id: 'seer-assistant', title: '赛尔号记牌器', text: '游戏辅助，通过抓取网络数据包，解析数据，实现对战信息记录，帮助新手玩家。当前已累计下载 3000+ 次。', tags: ['逆向', '抓包', 'QT'], link: 'https://www.bilibili.com/video/BV1LgdUBKEr5/', linkText: '前往查看' },
        { id: 'arpg-demo', title: 'ARPG（Demo）', text: '制作中，主要目的是验证技术可行性。', tags: [], link: 'https://www.bilibili.com/video/BV17jLM6bEaY/', linkText: '前往查看' },
      ],
      dream: { quote: '做出自己心中的《刀剑神域》。', text: '当然肯定不是完全潜行的那种，至于为什么？因为这是我的启蒙日漫。' },
      contactTitle: '如果你刚好也在做游戏，或者只是想看看我在折腾什么。',
    },
    worksFeature: {
      kicker: '01 / 游戏项目', titleAlt: '洛克的迷宫', summary: '探索克苏鲁风格的诡异迷宫，躲避恶灵与怪物的追杀。',
      tags: ['Unreal Engine', '探索', '迷宫', '角色扮演'], tagsLabel: '项目标签', screenshotsLabel: '洛克的迷宫游戏截图',
      previousScreenshot: '上一张游戏截图', nextScreenshot: '下一张游戏截图', paginationLabel: '游戏截图分页', screenshotGoTo: ['查看第 1 张游戏截图', '查看第 2 张游戏截图', '查看第 3 张游戏截图'],
      screenshotAlts: ['洛克的迷宫提灯封面画面', '洛克的迷宫室内探索画面', '洛克的迷宫主菜单画面'],
      seerKicker: '02 / 桌面工具', seerScreenshotAlt: '赛尔号记牌器软件界面截图', previousWork: '上一个作品', nextWork: '下一个作品',
    },
    animeFeature: {
      label: '动漫', tagsLabel: '动漫标签', cardStageLabel: '名侦探柯南画面卡片', previous: '上一部动漫', next: '下一部动漫',
      cardAlts: ['名侦探柯南画面：夜色中的扑克牌', '名侦探柯南画面：柯南与灰原哀', '名侦探柯南画面：灰原哀特写'], viewCards: ['查看名侦探柯南画面：夜色中的扑克牌', '查看名侦探柯南画面：柯南与灰原哀', '查看名侦探柯南画面：灰原哀特写'],
    },
    slidePager: [
      { label: '前往欢迎', text: '1. 欢迎' }, { label: '前往自述', text: '2. 自述' }, { label: '前往经历', text: '3. 经历' }, { label: '前往正在做', text: '4. 正在做' },
      { label: '前往动漫', text: '5. 动漫' }, { label: '前往梦想', text: '6. 梦想' }, { label: '前往作品', text: '7. 作品' }, { label: '前往联系', text: '8. 联系' },
    ],
  },
  en: {
    page: { titlePrefix: 'Personal Homepage', languageButton: '中', languageButtonLabel: 'Switch to Chinese' },
    nav: {
      welcome: 'Home', intro: 'About', works: 'Works', contact: 'Contact', homeLabel: 'Back to welcome section', avatarAlt: 'Avatar',
      themeToggleLabel: 'Toggle dark mode', menuOpenLabel: 'Open navigation menu', menuLabel: 'Mobile navigation', pagerLabel: 'Page progress', pagerGoTo: 'Go to',
    },
    sections: { bio: 'About me', experience: 'Experience', current: 'In progress', anime: 'Anime', dream: 'Dream', works: 'Works', contact: 'Contact', copyright: 'All rights reserved.' },
    profile: {
      name: 'Orca丶',
      title: 'Hi, I am Orca丶',
      tagline: 'An aspiring programmer determined to make my own game.',
      abstract: 'An aspiring programmer determined to make my own game. I am not great at socializing and dislike too many worldly conventions.',
      links: { github: 'https://github.com/dauphinYan', bilibili: 'https://space.bilibili.com/285301431', email: '584485321@qq.com' },
      heroStatus: [
        { label: 'Current Focus', text: 'Unreal Engine game development' },
        { label: 'Long-term Goal', text: 'Create my own Sword Art Online' },
      ],
      experiences: [
        'After graduating, I stumbled into backend development at a grain factory for less than a year. It was not for me, so as AI began to flourish, I turned my attention to the work I genuinely want to pursue.',
        'I spent time learning Unreal Engine and am now building a demo to validate core gameplay ideas and technical feasibility.',
        'I also created game tools, including a fairly complete battle card tracker for the childhood web game Seer, hoping to help new players avoid a rough start.',
      ],
      current: [
        { label: 'Engine', text: 'Unreal Engine' },
        { label: 'Stage', text: 'Demo validation' },
        { label: 'Focus', text: 'Core gameplay, technical feasibility, and a sustainable production pace' },
      ],
      anime: [{ label: 'Hobby / Anime', title: 'Detective Conan', text: 'A mystery series I have followed since childhood.', tags: ['Mystery', 'Childhood favorite', 'Ongoing'] }],
      works: [
        { id: 'seer-assistant', title: 'Seer Card Tracker', text: 'A game tool that captures and parses network packets to record battle information and help new players. It has been downloaded more than 3,000 times.', tags: ['Reverse engineering', 'Packet capture', 'Qt'], link: 'https://www.bilibili.com/video/BV1LgdUBKEr5/', linkText: 'View project' },
        { id: 'arpg-demo', title: 'ARPG (Demo)', text: 'In development, primarily to validate technical feasibility.', tags: [], link: 'https://www.bilibili.com/video/BV17jLM6bEaY/', linkText: 'View project' },
      ],
      dream: { quote: 'Create my own Sword Art Online.', text: 'Not a fully immersive version, of course. It was the anime that introduced me to the medium.' },
      contactTitle: 'If you are making games too, or simply want to see what I am working on.',
    },
    worksFeature: {
      kicker: '01 / GAME PROJECT', titleAlt: 'Lock Knock Maze', summary: 'Explore a bizarre Cthulhu-inspired maze while evading spirits and monsters.',
      tags: ['Unreal Engine', 'Exploration', 'Maze', 'Role-playing'], tagsLabel: 'Project tags', screenshotsLabel: 'Lock Knock Maze screenshots',
      previousScreenshot: 'Previous screenshot', nextScreenshot: 'Next screenshot', paginationLabel: 'Screenshot pagination', screenshotGoTo: ['View screenshot 1', 'View screenshot 2', 'View screenshot 3'],
      screenshotAlts: ['Lock Knock Maze lantern cover', 'Lock Knock Maze interior exploration', 'Lock Knock Maze main menu'],
      seerKicker: '02 / DESKTOP TOOL', seerScreenshotAlt: 'Seer Card Tracker interface screenshot', previousWork: 'Previous work', nextWork: 'Next work',
    },
    animeFeature: {
      label: 'Anime', tagsLabel: 'Anime tags', cardStageLabel: 'Detective Conan scene cards', previous: 'Previous anime', next: 'Next anime',
      cardAlts: ['Detective Conan: playing cards at night', 'Detective Conan: Conan and Ai Haibara', 'Detective Conan: Ai Haibara close-up'], viewCards: ['View Detective Conan: playing cards at night', 'View Detective Conan: Conan and Ai Haibara', 'View Detective Conan: Ai Haibara close-up'],
    },
    slidePager: [
      { label: 'Go to Home', text: '1. Home' }, { label: 'Go to About me', text: '2. About me' }, { label: 'Go to Experience', text: '3. Experience' }, { label: 'Go to In progress', text: '4. In progress' },
      { label: 'Go to Anime', text: '5. Anime' }, { label: 'Go to Dream', text: '6. Dream' }, { label: 'Go to Works', text: '7. Works' }, { label: 'Go to Contact', text: '8. Contact' },
    ],
  },
} as const;

export const profile = translations['zh-CN'].profile;
