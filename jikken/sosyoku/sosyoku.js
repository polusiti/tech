// 装飾展示ページ専用JavaScript
class SosyokuRenderer {
    constructor() {
        this.init();
    }

    init() {
        this.renderShortcodes();
        this.setupInteractions();
    }

    renderShortcodes() {
        // asb19 ボックスをレンダリング
        this.renderAsb19Boxes();

        // 見出しをレンダリング
        this.renderHeadings();

        // カラムボックスをレンダリング
        this.renderColumnBoxes();
    }

    renderAsb19Boxes() {
        const boxes = document.querySelectorAll('.shortcode-box');
        boxes.forEach(box => {
            const type = box.dataset.shortcodeType;
            const attrs = JSON.parse(box.dataset.shortcodeAttrs || '{}');
            const content = box.innerHTML;

            if (type === 'asb19') {
                const title = attrs.title || '';
                const subtitle = attrs.subtitle || '';

                let titleHtml = '【' + this.escapeHtml(title) + '】';
                if (subtitle) {
                    titleHtml += '<span class="asb19-subtitle">〈' + this.escapeHtml(subtitle) + '〉</span>';
                }

                box.innerHTML = `
                    <div class="asb19-title-wrapper">${titleHtml}</div>
                    <div class="asb19-content">${content}</div>
                `;
            }
        });
    }

    renderHeadings() {
        const headings = document.querySelectorAll('.heading-demo');
        headings.forEach(heading => {
            const type = heading.dataset.headingType;
            const attrs = JSON.parse(heading.dataset.headingAttrs || '{}');

            if (type === 'ascb_heading') {
                const title = attrs.title || '';
                const style = attrs.style || 'A';
                const star = attrs.star === 'true';
                const underline = attrs.underline === 'true';

                heading.className = `heading-demo style-${style}`;
                if (star) heading.classList.add('is-starred');
                if (underline) heading.classList.add('has-underline');

                heading.innerHTML = `<span class="ascb-text">${this.escapeHtml(title)}</span>`;
            }
        });
    }

    renderColumnBoxes() {
        const columns = document.querySelectorAll('.column-demo');
        columns.forEach(column => {
            const type = column.dataset.columnType;
            const attrs = JSON.parse(column.dataset.columnAttrs || '{}');
            const content = column.innerHTML;

            if (type === 'column') {
                const title = attrs.title || '';
                const columnType = attrs.type || 'column';

                // タイプに応じてラベルを変更
                let labelChars;
                switch (columnType) {
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
                    labelHtml += `<span class="column-demo-kanji ${className}">${labelChars[i]}</span>`;
                }

                // ユーザー指定タイトルのHTMLを生成
                const userTitleHtml = title ? `<span class="column-demo-user-title">${this.escapeHtml(title)}</span>` : '';

                column.innerHTML = `
                    <div class="column-demo-header">
                        <div class="column-demo-title">
                            ${labelHtml}
                            ${userTitleHtml}
                        </div>
                    </div>
                    <div class="column-demo-content">
                        ${content}
                    </div>
                `;
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setupInteractions() {
        // メニュートグル
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // スムーズスクロール
        this.setupSmoothScroll();
    }

    toggleMobileMenu() {
        // モバイルメニューのトグル処理（必要なら実装）
        console.log('Mobile menu toggled');
    }

    setupSmoothScroll() {
        // ページ内リンクのスムーズスクロール
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ページ読み込み後に初期化
document.addEventListener('DOMContentLoaded', function() {
    // 親ディレクトリのスクリプトが読み込まれていることを確認
    if (typeof window.WordPressShortcodeParser === 'undefined') {
        // 親スクリプトがなければ独自のレンダラーを使用
        window.sosyokuRenderer = new SosyokuRenderer();
    } else {
        // 親スクリプトがあればそのレンダラーを使用
        window.sosyokuRenderer = new SosyokuRenderer();
    }
});