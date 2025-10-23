---
home: true
heroImage: /picgo/icon.png
heroText: wuxin0011 blog
tagline: 個人技術ブログへようこそ
indexPage: false
---

<IndexBigImg />

<Card :cardData="[
  {
    cardName: 'フロントエンド',
    cardContent: 'HTML, CSS, JavaScript, Vue, React, TypeScriptなど最新のフロントエンド技術',
    cardSrc: '/web/',
    cardImgSrc: 'https://cdn.jsdelivr.net/gh/wuxin0011/wuxin@main/blog-resource/img/vue.jpg'
  },
  {
    cardName: 'バックエンド',
    cardContent: 'Java, Spring Boot, MyBatis, MySQLなどバックエンド開発技術',
    cardSrc: '/admin/',
    cardImgSrc: 'https://cdn.jsdelivr.net/gh/wuxin0011/wuxin@main/blog-resource/img/spring.jpg'
  },
  {
    cardName: '開発ツール',
    cardContent: 'Git, Docker, VS Code, 実用スクリプトなど開発効率化ツール',
    cardSrc: '/tools/',
    cardImgSrc: 'https://cdn.jsdelivr.net/gh/wuxin0011/wuxin@main/blog-resource/img/tools.jpg'
  }
]" :cardListSize="3" :carTitleColor="'#11A8CD'" />

<Fantasy />

<GlobalTip />