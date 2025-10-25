# Ark Mechanical UI - 最小限構成

このフォルダには、Ark Mechanical UIを動作させるために必要な最小限のファイルが含まれています。

## ファイル構成

```
saisyougenda/
├── index.html              # 基本版（ヘッダーとメニューのみ）
├── complete.html           # 完全版（記事とサイドバー含む）★推奨
├── css/
│   └── index.css           # ローカルCSSファイル
├── README.md               # このファイル
├── SETUP.md                # セットアップガイド
├── FEATURES.md             # 機能一覧
├── CHANGELOG.md            # 変更履歴
├── COMPLETE_GUIDE.md       # 完全版ガイド
└── SIDEBAR_GUIDE.md        # サイドバー実装ガイド
```

## 📄 ファイルの違い

### index.html（基本版）
- ローディング画面
- Ark Menu（12項目）
- Ark Nav（日付・時刻表示）
- 背景画像システム

### complete.html（完全版）★推奨
- index.htmlの全機能
- 記事スライダー（3件）
- カテゴリーバー（4件）
- 記事カード（3件）
- サイドバー（5つのウィジェット）
  - プロフィール
  - お知らせ
  - 最新記事
  - タグクラウド
  - サイト情報
```

## 外部依存ファイル（CDN経由で自動読み込み）

以下のファイルはCDN経由で読み込まれるため、ローカルに配置する必要はありません：

### CSS
- Font Awesome 6.2.1
- Akiblog Custom CSS
- Animate.min.css
- Swiper Bundle CSS

### JavaScript
- Pace.js（ローディングプログレスバー）
- Swiper 8.4.2（スライダー）
- Alicdn SVGアイコン

### 画像
- 背景画像4種類（デフォルト/ダーク/モバイル/モバイルダーク）

## 使用方法

1. `index.html` をブラウザで開く
2. ローディングアニメーションが表示される（1.8秒後に自動終了）
3. 右上のメニューボタンをクリックしてArk Menuを開く
4. メニュー項目をスワイプまたはページネーションで切り替え

## 機能

### ローディング画面
- Ark Cab Box: メカニカルなローディングアニメーション
- 12個の装飾要素（三角形、フラッシュ、ボーダー）
- クリックで即座に終了可能

### メニューシステム
- 12項目のスライド式メニュー
- Swiperによるスムーズなスクロール
- ページネーション対応

### ナビゲーションバー
- 日本語の日付表示（例: 2025年01月22日 水曜日）
- リアルタイム時刻表示（HH:MM:SS）
- 3つの機能ボタン（ランダム記事、検索、メニュー）

## カスタマイズ

### メニュー項目の変更
`index.html` の以下の部分を編集：

```html
<span class="site-page-link" onclick='alert("ホーム")'>ホーム</span>
```

### 日付フォーマットの変更
`updateDate()` 関数内の以下の部分を編集：

```javascript
dateBox.textContent = `${year}年${month}月${day}日 ${weekday}`;
```

### 背景画像の変更
`index.html` の `#web-bg` セクションのURLを変更：

```html
<div id="default-bg" style="background:url(あなたの画像URL)"></div>
```

## 注意事項

- インターネット接続が必要（CDNからファイルを読み込むため）
- `css/index.css` は必須（ローカルスタイル）
- モダンブラウザ推奨（Chrome, Firefox, Edge, Safari）

## ライセンス

元のデザイン: Akilarの糖果屋 (https://akilar.top/)
- Hexo Butterfly テーマベース
- Ark UI デザインシステム

## 更新履歴

- 2025/01/22: 初版作成
  - Ark Cab Box実装
  - Ark Menu実装
  - 日本語化完了
  - メニュー12項目対応
