// WordPressショートコード機能のJavaScript実装
class WordPressShortcodeParser {
    constructor() {
        this.parsers = {
            'asb19': this.parseAsb19.bind(this),
            'ascb_heading': this.parseAscbHeading.bind(this),
            'column': this.parseColumn.bind(this),
            'columnbox': this.parseColumn.bind(this),
            'practicebox': this.parseColumn.bind(this)
        };
        this.init();
    }

    init() {
        this.processAllShortcodes();
    }

    // ショートコードをすべて処理
    processAllShortcodes() {
        const elements = document.querySelectorAll('[data-shortcode]');
        elements.forEach(element => {
            this.processShortcode(element);
        });
    }

    // 個別のショートコードを処理
    processShortcode(element) {
        const shortcodeData = element.dataset.shortcode;
        try {
            const parsed = JSON.parse(shortcodeData);
            const result = this.renderShortcode(parsed.type, parsed.attrs, parsed.content);
            element.innerHTML = result;
        } catch (error) {
            console.error('Shortcode parsing error:', error);
            element.innerHTML = '<div class="error">ショートコードの解析に失敗しました</div>';
        }
    }

    // ショートコードをレンダリング
    renderShortcode(type, attrs, content) {
        if (this.parsers[type]) {
            return this.parsers[type](attrs, content);
        }
        return `<div class="error">未知のショートコード: ${type}</div>`;
    }

    // --- [A] asb19ボックスシステム ---
    parseAsb19(attrs, content) {
        const title = attrs.title || '';
        const subtitle = attrs.subtitle || '';

        let titleHtml = '【' + this.escapeHtml(title) + '】';
        if (subtitle) {
            titleHtml += '<span class="asb19-subtitle">〈' + this.escapeHtml(subtitle) + '〉</span>';
        }

        return `
            <div class="asb19-box">
                <div class="asb19-title-wrapper">${titleHtml}</div>
                <div class="asb19-content">${content || ''}</div>
            </div>
        `;
    }

    // --- [B] ascb_heading見出しシステム ---
    parseAscbHeading(attrs, content) {
        const title = attrs.title || '';
        const style = attrs.style || 'A';
        const star = attrs.star === 'true';
        const underline = attrs.underline === 'true';

        let containerClasses = 'ascb-heading-container';
        containerClasses += ' style-' + style;
        if (star) {
            containerClasses += ' is-starred';
        }
        if (underline) {
            containerClasses += ' has-underline';
        }

        return `
            <div class="${containerClasses}">
                <div class="ascb-icon-wrapper">
                    <div class="ascb-shape shape-a"></div>
                    <div class="ascb-shape shape-b"></div>
                </div>
                <span class="ascb-text">${this.escapeHtml(title)}</span>
            </div>
        `;
    }

    // HTMLエスケープ
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // --- [C] Simple Column Box System ---
    parseColumn(attrs, content) {
        const title = attrs.title || '';
        const type = attrs.type || 'column';

        // タイプに応じてラベルを変更
        let labelChars;
        switch (type) {
            case 'note':
                labelChars = ['ノ', 'ー', 'ト'];
                break;
            case 'tip':
                labelChars = ['T', 'i', 'p'];
                break;
            case 'info':
                labelChars = ['練', '習'];
                break;
            case 'memo':
                labelChars = ['メ', 'モ'];
                break;
            default: // 'column'
                labelChars = ['コ', 'ラ', 'ム'];
        }

        // ラベル部分のHTMLを生成
        let labelHtml = '';
        for (let i = 0; i < labelChars.length; i++) {
            const className = (i % 2 === 0) ? 'black' : 'white';
            labelHtml += `<span class="practice-box-kanji ${className}">${labelChars[i]}</span>`;
        }

        // ユーザー指定タイトルのHTMLを生成
        const userTitleHtml = title ? `<span class="practice-box-user-title">${this.escapeHtml(title)}</span>` : '';

        return `
            <div class="practice-box" data-type="${type}">
                <div class="practice-box-header">
                    <div class="practice-box-title">
                        ${labelHtml}
                        ${userTitleHtml}
                    </div>
                </div>
                <div class="practice-box-content">
                    ${content || ''}
                </div>
            </div>
        `;
    }
}

// デモ機能
class ShortcodeDemo {
    constructor() {
        this.demoContainer = null;
        this.init();
    }

    init() {
        this.createDemoSection();
        this.addDemoShortcodes();
    }

    createDemoSection() {
        const container = document.querySelector('.container');
        if (!container) return;

        this.demoContainer = document.createElement('div');
        this.demoContainer.className = 'shortcode-demo';
        this.demoContainer.innerHTML = `
            <div class="demo-controls">
                <h3>WordPressショートコード デモ</h3>
                <button onclick="window.shortcodeDemo.addAsb19Demo()">asb19ボックス</button>
                <button onclick="window.shortcodeDemo.addHeadingDemo()">見出し</button>
                <button onclick="window.shortcodeDemo.addColumnDemo()">カラムボックス</button>
                <button onclick="window.shortcodeDemo.clearDemo()">クリア</button>
            </div>
            <div class="demo-content" id="demo-content"></div>
        `;

        // CSSを追加
        this.addDemoStyles();
        container.appendChild(this.demoContainer);
    }

    addDemoStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .shortcode-demo {
                position: absolute;
                top: 200px;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                max-width: 600px;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px;
                z-index: 100;
                max-height: 400px;
                overflow-y: auto;
            }

            .demo-controls {
                text-align: center;
                margin-bottom: 20px;
            }

            .demo-controls h3 {
                color: white;
                margin-bottom: 15px;
            }

            .demo-controls button {
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 8px 16px;
                margin: 5px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .demo-controls button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }

            .demo-content {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                padding: 15px;
                min-height: 100px;
            }

            .demo-content .asb19-box,
            .demo-content .ascb-heading-container,
            .demo-content .practice-box {
                margin-bottom: 15px;
            }

            @media (max-width: 768px) {
                .shortcode-demo {
                    width: 90%;
                    top: 180px;
                    max-height: 300px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addAsb19Demo() {
        const demoContent = document.getElementById('demo-content');
        const demos = [
            {
                type: 'asb19',
                attrs: { title: '基本ボックス', subtitle: 'シンプルな例' },
                content: 'これはasb19ショートコードのデモです。テーマに合わせてスタイルが変化します。'
            },
            {
                type: 'asb19',
                attrs: { title: '機能紹介', subtitle: '詳細説明' },
                content: '• テーマ対応<br>• アニメーション効果<br>• レスポンシブデザイン'
            },
            {
                type: 'asb19',
                attrs: { title: 'インタラクティブ' },
                content: 'ホバーすると浮き上がる効果があります！'
            }
        ];

        const demo = demos[Math.floor(Math.random() * demos.length)];
        const element = document.createElement('div');
        element.dataset.shortcode = JSON.stringify(demo);
        demoContent.appendChild(element);

        // ショートコードを処理
        window.shortcodeParser.processShortcode(element);
    }

    addHeadingDemo() {
        const demoContent = document.getElementById('demo-content');
        const styles = ['A', 'B', 'C'];
        const demos = [
            { title: '見出しスタイルA', style: 'A', star: true, underline: true },
            { title: '見出しスタイルB', style: 'B', star: false, underline: true },
            { title: '見出しスタイルC', style: 'C', star: true, underline: false }
        ];

        const demo = demos[Math.floor(Math.random() * demos.length)];
        const element = document.createElement('div');
        element.dataset.shortcode = JSON.stringify({
            type: 'ascb_heading',
            attrs: demo
        });
        demoContent.appendChild(element);

        // ショートコードを処理
        window.shortcodeParser.processShortcode(element);
    }

    addColumnDemo() {
        const demoContent = document.getElementById('demo-content');
        const types = ['column', 'note', 'tip', 'info', 'memo'];
        const demos = [
            { type: 'column', title: '基本カラム', content: 'これはカラムボックスのデモです。白背景でクリーンなデザインです。' },
            { type: 'note', title: '重要なノート', content: 'ノートタイプです。青色のアクセントが付いています。' },
            { type: 'tip', title: '便利なヒント', content: 'ヒントタイプです。緑色のアクセントで親しみやすい印象です。' },
            { type: 'info', title: '練習問題', content: '練習タイプです。紫色のアクセントで情報を強調します。' },
            { type: 'memo', title: 'メモ', content: 'メモタイプです。黄色のアクセントで目立ちます。' }
        ];

        const demo = demos[Math.floor(Math.random() * demos.length)];
        const element = document.createElement('div');
        element.dataset.shortcode = JSON.stringify({
            type: 'column',
            attrs: {
                type: demo.type,
                title: demo.title
            },
            content: demo.content
        });
        demoContent.appendChild(element);

        // ショートコードを処理
        window.shortcodeParser.processShortcode(element);
    }

  clearDemo() {
        const demoContent = document.getElementById('demo-content');
        if (demoContent) {
            demoContent.innerHTML = '';
        }
    }
}

// グローバル関数
window.shortcodeDemo = {
    addAsb19Demo: function() {
        if (window.shortcodeDemoInstance) {
            window.shortcodeDemoInstance.addAsb19Demo();
        }
    },
    addHeadingDemo: function() {
        if (window.shortcodeDemoInstance) {
            window.shortcodeDemoInstance.addHeadingDemo();
        }
    },
    addColumnDemo: function() {
        if (window.shortcodeDemoInstance) {
            window.shortcodeDemoInstance.addColumnDemo();
        }
    },
    clearDemo: function() {
        if (window.shortcodeDemoInstance) {
            window.shortcodeDemoInstance.clearDemo();
        }
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    window.shortcodeParser = new WordPressShortcodeParser();
    window.shortcodeDemoInstance = new ShortcodeDemo();
});