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
    base: '/',
    locales: {
        '/': {
            lang: 'ja-JP',
            title: "wuxin0011`blog",
            description: '個人技術ブログへようこそ',
        }
    },

    themeConfig: {
        nav: nav,
        sidebarDepth: 2,
        logo: '/picgo/icon.png',
        repo: 'polusiti/tech',
        searchMaxSuggestions: 10,
        lastUpdated: '上次更新',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '编辑',

        // Vdoing主题配置
        contentBgStyle: 1,
        defaultMode: 'auto',
        sidebar: 'structuring',

        author: {
            name: 'wuxin0011',
            link: 'https://github.com/wuxin0011'
        },

        blogger: {
            avatar: 'https://avatars.githubusercontent.com/u/65836396?v=4',
            name: 'wuxin0011',
            slogan: '懂得越多，懂得越少',
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
                    iconClass: 'icon-youjian',
                    title: '发邮件',
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
                    iconClass: 'icon-bokeyuan',
                    title: '博客园',
                    link: 'https://www.cnblogs.com/wuxin001/',
                },
                {
                    iconClass: 'icon-juejin',
                    title: '掘金',
                    link: 'https://juejin.cn/user/2019183212631912',
                },
            ],
        },

        footer: {
            createYear: 2020,
            copyrightInfo:
                'wuxin0011 | <a href="https://github.com/polusiti/tech" target="_blank">MIT License</a>',
        },

        extendFrontmatter: {
            author: {
                name: 'wuxin0011',
                link: 'https://github.com/wuxin0011'
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