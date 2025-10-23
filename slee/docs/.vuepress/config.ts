import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'

const DOMAIN_NAME = 'polusiti.github.io'
const WEB_SITE = `https://${DOMAIN_NAME}`

export default defineConfig4CustomTheme<VdoingThemeConfig>({
    theme: 'vdoing',
    base: '/',
    locales: {
        '/': {
            lang: 'ja-JP',
            title: "wuxin0011 blog",
            description: '個人技術ブログへようこそ',
        }
    },

    themeConfig: {
        nav: [
            { text: 'ホーム', link: '/' },
            { text: 'フロントエンド', link: '/web/' },
            { text: 'バックエンド', link: '/admin/' },
            { text: 'ツール', link: '/tools/' },
            { text: 'もっと', link: '/more/' },
            { text: 'について', link: '/about/' },
        ],

        sidebarDepth: 2,
        logo: '/picgo/icon.png',
        repo: 'polusiti/tech',
        searchMaxSuggestions: 10,
        lastUpdated: '最終更新',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: false,

        // Vdoingテーマ設定
        contentBgStyle: 1, // 背景スタイル（方格）

        // デフォルト外観モード
        defaultMode: 'auto',

        // 侧边栏設定
        sidebar: 'structuring',

        // 作者情報
        author: {
            name: 'wuxin0011',
            link: 'https://github.com/wuxin0011',
        },

        // 博主情報
        blogger: {
            avatar: 'https://avatars.githubusercontent.com/u/65836396?v=4',
            name: 'wuxin0011',
            slogan: '懂得越多，懂得越少',
        },

        // トップ画像設定
        indexImg: {
            navColor: 2, // 白色ナビゲーション
            switchNavColor: true, // ナビゲーション色変換
            bgTimeColor: false, // 時間背景色はオフ
            descFade: true, // 説明文フェード効果
            desc: [
                "冰冻三尺，非一日之寒，水滴石穿，非一日之功",
            ],
            descFontSize: "1.4rem",
            descFadeInTime: 200,
            descFadeOutTime: 100,
            descNextTime: 800,
            bubble: false,
        },

        // 社交アイコン
        social: {
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: '発メール',
                    link: 'mailto:2191377759@qq.com',
                },
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/wuxin0011',
                },
                {
                    iconClass: 'icon-bilibili',
                    title: 'bilibili',
                    link: 'https://space.bilibili.com/259072250',
                },
                {
                    iconClass: 'icon-juejin',
                    title: '掘金',
                    link: 'https://juejin.cn/user/2019183212631912',
                },
            ],
        },

        // フッター情報
        footer: {
            createYear: 2020,
            copyrightInfo:
                'wuxin0011 | <a href="https://github.com/wuxin0011/wuxin0011.github.io" target="_blank">MIT License</a>',
        },

        // 拡張frontmatter
        extendFrontmatter: {
            author: {
                name: 'wuxin0011',
                link: 'https://github.com/wuxin0011'
            }
        }
    },

    // headタグに追加
    head: [
        ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }],
        ['link', { rel: 'icon', href: '/icon/logo.ico' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/aplayer/1.10.1/APlayer.min.css' }],
        ['script', {
            src: 'https://cdn.bootcdn.net/ajax/libs/aplayer/1.10.1/APlayer.min.js',
            crossorigin: 'anonymous'
        }],
        ['script', {
            src: 'https://cdn.bootcdn.net/ajax/libs/meting/2.0.1/Meting.min.js',
            crossorigin: 'anonymous'
        }],
    ],
})