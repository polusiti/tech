import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
// @ts-ignore
import dayjs from 'dayjs'
import baiduCode from './config/baiduCode'
import htmlModules from './config/htmlModules'
import components from './config/import-components'
import nav from './nav-config'

const DOMAIN_NAME = 'tech.allfrom0.top'
const WEB_SITE = `https://${DOMAIN_NAME}`
const IS_DEV = process.env.NODE_ENV == 'development'

export default defineConfig4CustomTheme<VdoingThemeConfig>({
    theme: 'vdoing',
    base: '/slee/',  // VuePressは/slee/配下でのみ動作
    locales: {
        '/': {
            lang: 'ja-JP',
            title: "Tech Blog",
            description: '技術ブログ',
        }
    },

    themeConfig: {
        nav: nav,
        sidebarDepth: 2,
        logo: '/picgo/icon.png',
        repo: 'polusiti/tech',
        searchMaxSuggestions: 10,
        lastUpdated: '最終更新',
        docsDir: 'slee/docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '編集',

        // Vdoing主題配置
        contentBgStyle: 1,
        defaultMode: 'auto',
        sidebar: 'structuring',

        author: {
            name: 'Tech Blog',
            link: 'https://github.com/polusiti/tech'
        },

        blogger: {
            avatar: 'https://avatars.githubusercontent.com/u/65836396?v=4',
            name: 'Tech Blog',
            slogan: '技術を深く、広く',
        },

        indexImg: {
            navColor: 2,
            switchNavColor: true,
            bgTimeColor: true,
            bgTimeColorArray: [
                "transparent",
                "transparent",
                "transparent",
                "transparent",
            ],
            descFade: true,
            desc: [
                "冰冻三尺，非一日之寒，水滴石穿，非一日之功",
            ],
            descFontSize: "1.4rem",
            descFadeInTime: 200,
            descFadeOutTime: 100,
            descNextTime: 800,
            bubble: false,
        },

        social: {
            icons: [
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/polusiti/tech',
                },
            ],
        },

        footer: {
            createYear: 2020,
            copyrightInfo:
                'Tech Blog | <a href="https://github.com/polusiti/tech" target="_blank">MIT License</a>',
        },

        extendFrontmatter: {
            author: {
                name: 'Tech Blog',
                link: 'https://github.com/polusiti/tech'
            }
        },

        // 自定义hmtl(广告)模块
        'htmlModules': htmlModules
    },

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
        ['script', {
            src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
            async: true
        }],
        ['script', {
            src: 'https://cdn.staticfile.org/twikoo/1.6.39/twikoo.all.min.js'
        }],
    ],
})
