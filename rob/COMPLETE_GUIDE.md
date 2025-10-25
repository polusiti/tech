# Ark Mechanical UI - 完全版ガイド

## 📄 ファイル: complete.html

このファイルは、Ark Mechanical UIの**完全版**です。index.htmlの基本機能に加えて、記事一覧とサイドバーを含む、フル機能のブログページです。

## 🎯 完全版の特徴

### index.htmlとの違い

| 機能 | index.html | complete.html |
|------|-----------|---------------|
| ローディング画面 | ✅ | ✅ |
| Ark Menu | ✅ | ✅ |
| Ark Nav | ✅ | ✅ |
| 記事スライダー | ❌ | ✅ |
| カテゴリーバー | ❌ | ✅ |
| 記事カード | ❌ | ✅ (3件) |
| サイドバー | ❌ | ✅ |
| プロフィール | ❌ | ✅ |
| お知らせ | ❌ | ✅ |
| 最新記事 | ❌ | ✅ |
| タグクラウド | ❌ | ✅ |
| サイト情報 | ❌ | ✅ |

## 📦 構成要素

### 1. ヘッダーセクション

#### Ark Cab Box（ローディング）
```html
<div id="ark-cab-box">
  <div class="ark-cab">
    <!-- 12個の装飾要素 -->
  </div>
</div>
```

**装飾要素:**
- トップトライアングル
- ボトム左右トライアングル
- トップ左右フラッシュ
- 4つのコーナーボーダー
- センター左右ボーダー
- ボトムセンターボーダー

#### Ark Menu Box
```html
<div id="ark-menu-box">
  <!-- 12項目のメニュー -->
</div>
```

**メニュー項目:**
1. ホーム
2. アーカイブ
3. カテゴリー
4. タグ
5. コミュニティ
6. リンク集
7. お問い合わせ
8. ギャラリー
9. アニメリスト
10. サポート
11. About
12. 設定

#### Ark Nav Box
```html
<div id="ark-nav-box">
  <!-- 日付、時刻、機能ボタン -->
</div>
```

**表示情報:**
- 日本語の日付（例: 2025年01月22日 水曜日）
- リアルタイム時刻（HH:MM:SS）
- サイトタイトル
- 3つの機能ボタン

### 2. メインコンテンツ

#### 記事スライダー（Ark Swiper）
```html
<div id="ark-swiper-container">
  <!-- 3つの記事スライド -->
</div>
```

**機能:**
- 自動再生（5秒間隔）
- フェードエフェクト
- ループ再生
- ページネーション

**記事内容:**
1. **Ark Mechanical UI完全版**
   - メカニカルデザインの完全実装
   - ローディング、メニュー、記事一覧を含む

2. **日本語対応完了**
   - 日付、時刻、メニューを完全日本語化
   - 中国語の自動置換機能付き

3. **レスポンシブデザイン**
   - モバイル、タブレット、デスクトップに完全対応

#### カテゴリーバー
```html
<div id="categoryBar">
  <ul class="categoryBar-list">
    <!-- 4つのカテゴリー -->
  </ul>
</div>
```

**カテゴリー:**
- 🎨 デザイン (12)
- 💻 プログラミング (25)
- 📱 モバイル (8)
- 🎮 ゲーム (15)

#### 記事カード（3件）
```html
<div class="recent-post-item ark-post-card">
  <!-- 記事情報 -->
</div>
```

**記事1: Ark Mechanical UIの完全実装ガイド**
- カテゴリー: 🎨 デザイン
- タグ: UI/UX, メカニカル, Swiper
- 更新日: 2025-01-22 14:30
- 投稿日: 2025-01-22 10:00
- 説明: Akilarの糖果屋のメカニカルデザインを完全再現。12個の装飾要素を持つArk Cab Box、Swiper統合のメニューシステム、日本語対応の日付表示など、すべての機能を網羅的に解説します。

**記事2: Swiper 8.4.2で実現する高度なメニューシステム**
- カテゴリー: 💻 プログラミング
- タグ: JavaScript, Swiper, UI実装
- 更新日: 2025-01-22 13:45
- 投稿日: 2025-01-22 11:30
- 説明: 12項目のメニューをスライド式で実装。slidesPerView: 'auto'による自動幅調整、freeModeによる自由スクロール、マウスホイール対応など、実践的なSwiper設定を詳しく解説します。

**記事3: 日本語化の実装**
- カテゴリー: 💻 プログラミング
- 更新日: 2025-01-22
- 投稿日: 2025-01-22
- 説明: MutationObserverで中国語を自動検出し、日本語に置換。

### 3. サイドバー

#### プロフィールカード
```html
<div class="card-widget card-author">
  <!-- プロフィール情報 -->
</div>
```

**内容:**
- アバター画像
- 名前: Ark Developer
- 説明: メカニカルUIデザイナー
- 統計: 記事495、タグ48、カテゴリー6
- SNS: Github, Email, Twitter

#### お知らせカード
```html
<div class="card-widget card-announcement">
  <!-- お知らせ内容 -->
</div>
```

**内容:**
"Ark Mechanical UIの完全版をリリースしました！メカニカルなデザインをお楽しみください。"

#### 最新記事カード
```html
<div class="card-widget card-recent-post">
  <!-- 最新記事3件 -->
</div>
```

**記事:**
1. Ark Mechanical UI完全版
2. 日本語対応完了
3. Swiperメニューシステム

#### タグクラウド
```html
<div class="card-widget card-tags">
  <!-- タグ一覧 -->
</div>
```

**タグ:**
- UI/UX
- メカニカル
- JavaScript
- Swiper
- デザイン
- アニメーション
- レスポンシブ
- 日本語化

#### サイト情報カード
```html
<div class="card-widget card-webinfo">
  <!-- サイト統計 -->
</div>
```

**統計:**
- 記事数: 495
- 運営日数: 2,100日
- 総文字数: 817k
- 最終更新: 2025-01-22

## 🎨 デザイン仕様

### カラースキーム
- **プライマリ**: #00d4ff（シアン）
- **セカンダリ**: #ff006e（マゼンタ）
- **アクセント**: #8338ec（パープル）
- **背景（ライト）**: #ffffff
- **背景（ダーク）**: #0d0d0d

### タイポグラフィ
- **フォント**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **見出し**: 2.5em（h1）
- **本文**: 1.1em
- **小文字**: 0.9em

### アニメーション
- **ローディング**: 1.8秒
- **メニュー開閉**: 0.3秒
- **ホバー**: 0.3秒
- **スライダー**: 5秒間隔

## 💻 JavaScript機能

### 初期化処理
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // メニューSwiper初期化
  // 記事スライダーSwiper初期化
  // 日付・時刻更新
  // MutationObserver設定
});
```

### Swiper設定

#### メニューSwiper
```javascript
new Swiper('.menu-item-container', {
  slidesPerView: 'auto',
  spaceBetween: 15,
  freeMode: true,
  mousewheel: { forceToAxis: true },
  pagination: { el: '.ark-menu-pagination', clickable: true }
});
```

#### 記事スライダーSwiper
```javascript
new Swiper('#ark-swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.ark-swiper-pagination', clickable: true },
  effect: 'fade',
  fadeEffect: { crossFade: true }
});
```

### 日付・時刻更新
```javascript
// 日付更新（1分ごと）
function updateDate() {
  const weekdays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  // 日本語フォーマット
}

// 時刻更新（1秒ごと）
function updateTime() {
  // HH:MM:SS フォーマット
}
```

### MutationObserver
```javascript
const observer = new MutationObserver(function(mutations) {
  if (text.includes('星期')) {
    updateDate(); // 中国語を日本語に置換
  }
});
```

## 📱 レスポンシブ対応

### ブレークポイント

#### モバイル（320px以下）
- メニュー: 1項目表示
- 記事カード: 1カラム
- サイドバー: 下部に移動

#### タブレット（768px以下）
- メニュー: 2項目表示
- 記事カード: 1カラム
- サイドバー: 下部に移動

#### デスクトップ（1024px以上）
- メニュー: 3項目表示
- 記事カード: 1カラム
- サイドバー: 右側に固定

## 🚀 使用方法

### 基本的な使い方
1. `complete.html` をブラウザで開く
2. ローディング画面が表示される（1.8秒）
3. メニューボタンをクリックしてArk Menuを開く
4. 記事スライダーが自動再生される
5. サイドバーで追加情報を確認

### カスタマイズ

#### 記事の追加
```html
<div class="recent-post-item ark-post-card">
  <div class="recent-post-item-headline">
    <!-- 更新日 -->
  </div>
  <div class="recent-post-content left">
    <!-- 記事内容 -->
  </div>
  <div class="recent-post-item-bottomline">
    <!-- カテゴリー、タグ、投稿日 -->
  </div>
</div>
```

#### サイドバーウィジェットの追加
```html
<div class="card-widget card-custom">
  <div class="item-headline">
    <i class="fas fa-icon"></i><span>タイトル</span>
  </div>
  <div class="custom-content">
    <!-- カスタムコンテンツ -->
  </div>
</div>
```

## 🔧 トラブルシューティング

### 問題: サイドバーが表示されない
**解決策:**
- `css/index.css` が正しく読み込まれているか確認
- ブラウザの幅を広げる（768px以上）

### 問題: 記事スライダーが動作しない
**解決策:**
- Swiperライブラリが読み込まれているか確認
- ブラウザのコンソールでエラーを確認

### 問題: 画像が表示されない
**解決策:**
- インターネット接続を確認
- CDNのURLが正しいか確認

## 📊 パフォーマンス

### 読み込み時間
- **初回**: 約3-4秒
- **2回目以降**: 約1-2秒（キャッシュ利用）

### ファイルサイズ
- **HTML**: 約25KB
- **CSS**: 約500KB（CDN）
- **JavaScript**: 約200KB（CDN）
- **画像**: 遅延読み込み

## 🎯 推奨環境

### ブラウザ
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

### 画面解像度
- 最小: 320px
- 推奨: 1920px以上

### インターネット速度
- 最小: 1Mbps
- 推奨: 10Mbps以上

## 📝 ライセンス

元のデザイン: Akilarの糖果屋 (https://akilar.top/)
- Hexo Butterfly テーマベース
- Ark UI デザインシステム

## 🔗 関連ファイル

- `index.html` - 基本版（ヘッダーとメニューのみ）
- `complete.html` - 完全版（記事とサイドバー含む）
- `README.md` - プロジェクト概要
- `SETUP.md` - セットアップガイド
- `FEATURES.md` - 機能一覧
- `CHANGELOG.md` - 変更履歴
