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

// デモ機能は完全無効化。表示済みデモ要素があれば除去するだけ。
function removeShortcodeDemoElements() {
    document.querySelectorAll('.shortcode-demo, .demo-controls').forEach(el => el.remove());
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    window.shortcodeParser = new WordPressShortcodeParser();
    removeShortcodeDemoElements();
});
