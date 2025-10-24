const path = require('path')

module.exports = {
  base: '/',
  title: 'wuxin0011 blog',
  description: '個人技術ブログへようこそ',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css' }]
  ],

  theme: 'vdoing',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'フロントエンド', link: '/web/' },
      { text: 'バックエンド', link: '/admin/' },
      { text: 'ツール', link: '/tools/' },
    ],

    sidebar: 'auto',

    sidebarDepth: 2,

    lastUpdated: '最終更新',

    editLinks: true,
    editLinkText: '編集',

    repo: 'polusiti/tech',

    // 博主信息
    blogger: {
      avatar: 'https://avatars.githubusercontent.com/u/65836396?v=4',
      name: 'wuxin0011',
      slogan: '懂得越多，懂得越少',
    },

    // 社交图标
    social: {
      icons: [
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/wuxin0011',
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2020,
      copyrightInfo: 'wuxin0011 | MIT License',
    },
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],

  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, '.'))
  }
}