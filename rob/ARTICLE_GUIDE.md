# 記事実装ガイド

## 📝 記事システムの構造

complete.htmlには3種類の記事表示方法が実装されています。

## 1. 記事スライダー（Ark Swiper）

### 概要
トップに表示される大型の記事スライダー。自動再生とフェードエフェクト付き。

### HTML構造
```html
<div class="recent-post-item" id="swiperBar">
  <div id="ark-swiper-container">
    <div class="swiper-wrapper ark-swiper-wrapper">
      <div class="swiper-slide ark-swiper-item">
        <div class="ark-swiper-item-cover">
          <img class="article-cover" src="..." data-lazy-src="...">
        </div>
        <div class="ark-swiper-item-time">
          <span>updated:</span><span>2025-01-22</span>
        </div>
        <div class="ark-swiper-item-info">
          <a class="ark-swiper-item-title">
            <div class="ark-swiper-item-title-link">記事タイトル</div>
          </a>
          <a class="ark-swiper-item-description">
            <div class="ark-swiper-item-description-text">記事の説明</div>
          </a>
        </div>
        <svg class="icon ark-swiper-item-decoration" aria-hidden="true">
          <use xlink:href="#icon-camera-GOTO_PRESET"></use>
        </svg>
      </div>
    </div>
    <div class="swiper-pagination ark-swiper-pagination"></div>
  </div>
</div>
```

### 実装されている記事

#### 記事1: Ark Mechanical UI完全版
- **タイトル**: Ark Mechanical UI完全版
- **更新日**: 2025-01-22
- **説明**: メカニカルデザインの完全実装。ローディング、メニュー、記事一覧を含む。
- **アイコン**: #icon-camera-GOTO_PRESET
- **画像**: https://img.zcool.cn/community/01593e61dd8ce411013e8cd0aa8bab.jpg

#### 記事2: 日本語対応完了
- **タイトル**: 日本語対応完了
- **更新日**: 2025-01-22
- **説明**: 日付、時刻、メニューを完全日本語化。中国語の自動置換機能付き。
- **アイコン**: #icon-config
- **画像**: https://img.zcool.cn/community/0192b161e57b6011013f01cda2eb5e.jpg

#### 記事3: レスポンシブデザイン
- **タイトル**: レスポンシブデザイン
- **更新日**: 2025-01-22
- **説明**: モバイル、タブレット、デスクトップに完全対応。
- **アイコン**: #icon-copy
- **画像**: https://img.zcool.cn/community/01b71361dd8ce311013f01cdc36e2a.jpg

### Swiper設定
```javascript
new Swiper('#ark-swiper-container', {
  slidesPerView: 1,           // 1枚ずつ表示
  spaceBetween: 20,           // スライド間隔
  loop: true,                 // ループ再生
  autoplay: {
    delay: 5000,              // 5秒間隔
    disableOnInteraction: false
  },
  pagination: {
    el: '.ark-swiper-pagination',
    clickable: true
  },
  effect: 'fade',             // フェードエフェクト
  fadeEffect: {
    crossFade: true
  }
});
```

### カスタマイズ方法

#### 記事の追加
```html
<div class="swiper-slide ark-swiper-item">
  <div class="ark-swiper-item-cover">
    <img class="article-cover" 
         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
         data-lazy-src="あなたの画像URL">
  </div>
  <div class="ark-swiper-item-time">
    <span>updated:</span><span>YYYY-MM-DD</span>
  </div>
  <div class="ark-swiper-item-info">
    <a class="ark-swiper-item-title">
      <div class="ark-swiper-item-title-link">あなたのタイトル</div>
    </a>
    <a class="ark-swiper-item-description">
      <div class="ark-swiper-item-description-text">あなたの説明</div>
    </a>
  </div>
  <svg class="icon ark-swiper-item-decoration" aria-hidden="true">
    <use xlink:href="#icon-アイコン名"></use>
  </svg>
</div>
```

#### 利用可能なアイコン
- `#icon-camera-GOTO_PRESET` - カメラ
- `#icon-config` - 設定
- `#icon-copy` - コピー
- `#icon-fan` - ファン
- `#icon-fukong` - 制御
- `#icon-menu-zizhanbaowei` - メニュー
- `#icon-YunTai-unfold` - 展開

## 2. カテゴリーバー

### 概要
記事のカテゴリーを一覧表示。記事数も表示。

### HTML構造
```html
<div class="recent-post-item" style="height:auto;width:100%;padding:0">
  <div class="recent-post-item-headline">
    <i class="fa-sharp fa-solid fa-sim-card"></i><span>カテゴリー</span>
  </div>
  <div id="categoryBar">
    <ul class="categoryBar-list">
      <li class="categoryBar-list-item">
        <a class="categoryBar-list-link" href="#">カテゴリー名</a>
        <span class="categoryBar-list-count">記事数</span>
      </li>
    </ul>
  </div>
</div>
```

### 実装されているカテゴリー

1. **🎨 デザイン** - 12記事
2. **💻 プログラミング** - 25記事
3. **📱 モバイル** - 8記事
4. **🎮 ゲーム** - 15記事

### カスタマイズ方法

#### カテゴリーの追加
```html
<li class="categoryBar-list-item">
  <a class="categoryBar-list-link" href="カテゴリーURL">絵文字 カテゴリー名</a>
  <span class="categoryBar-list-count">記事数</span>
</li>
```

#### 推奨絵文字
- 🎨 デザイン
- 💻 プログラミング
- 📱 モバイル
- 🎮 ゲーム
- 📚 学習
- 🔧 ツール
- 🌐 Web
- 🤖 AI

## 3. 記事カード（Recent Posts）

### 概要
最新記事を左右交互のレイアウトで表示。

### HTML構造
```html
<div class="recent-post-item ark-post-card">
  <div class="recent-post-item-headline">
    <div class="recent-post-time">
      <i class="fas fa-history"></i>
      <span class="article-meta-label">更新日</span>
      <time class="post-meta-date-updated">2025-01-22 14:30</time>
    </div>
  </div>
  <div class="recent-post-content left">  <!-- leftまたはright -->
    <div class="recent-post-cover">
      <img class="article-cover" src="..." data-lazy-src="...">
    </div>
    <div class="recent-post-info">
      <a class="article-title" href="#">
        <div class="article-title-link">記事タイトル</div>
      </a>
    </div>
    <svg class="icon ark-decoration" aria-hidden="true">
      <use xlink:href="#icon-fan"></use>
    </svg>
    <a class="recent-post-description" href="#">
      <div class="article-content-text">記事の説明</div>
    </a>
  </div>
  <div class="recent-post-item-bottomline">
    <div class="article-meta-categories">
      <a class="article-meta__categories" href="#">カテゴリー</a>
    </div>
    <div class="article-meta-tags">
      <a class="article-meta__tags" href="#">タグ1</a>
      <span class="article-meta-link">•</span>
      <a class="article-meta__tags" href="#">タグ2</a>
    </div>
    <div class="recent-post-time">
      <i class="far fa-calendar-alt"></i>
      <span class="article-meta-label">投稿日</span>
      <time class="post-meta-date-created">2025-01-22 10:00</time>
    </div>
  </div>
</div>
```

### 実装されている記事

#### 記事1: Ark Mechanical UIの完全実装ガイド
- **レイアウト**: left（左側に画像）
- **カテゴリー**: 🎨 デザイン
- **タグ**: UI/UX, メカニカル, Swiper
- **更新日**: 2025-01-22 14:30
- **投稿日**: 2025-01-22 10:00
- **説明**: Akilarの糖果屋のメカニカルデザインを完全再現。12個の装飾要素を持つArk Cab Box、Swiper統合のメニューシステム、日本語対応の日付表示など、すべての機能を網羅的に解説します。
- **アイコン**: #icon-fan

#### 記事2: Swiper 8.4.2で実現する高度なメニューシステム
- **レイアウト**: right（右側に画像）
- **カテゴリー**: 💻 プログラミング
- **タグ**: JavaScript, Swiper, UI実装
- **更新日**: 2025-01-22 13:45
- **投稿日**: 2025-01-22 11:30
- **説明**: 12項目のメニューをスライド式で実装。slidesPerView: 'auto'による自動幅調整、freeModeによる自由スクロール、マウスホイール対応など、実践的なSwiper設定を詳しく解説します。
- **アイコン**: #icon-YunTai-unfold

#### 記事3: 日本語化の実装
- **レイアウト**: left（左側に画像）
- **カテゴリー**: 💻 プログラミング
- **更新日**: 2025-01-22
- **投稿日**: 2025-01-22
- **説明**: MutationObserverで中国語を自動検出し、日本語に置換。
- **アイコン**: #icon-copy

### レイアウトパターン

#### leftパターン
```
┌─────────────────────────────┐
│ [画像]  タイトル            │
│ [画像]  説明文              │
│ [画像]  カテゴリー・タグ    │
└─────────────────────────────┘
```

#### rightパターン
```
┌─────────────────────────────┐
│ タイトル            [画像]  │
│ 説明文              [画像]  │
│ カテゴリー・タグ    [画像]  │
└─────────────────────────────┘
```

### カスタマイズ方法

#### 記事の追加
1. 既存の記事カードをコピー
2. レイアウトを`left`と`right`で交互に
3. 内容を変更

#### 記事の削除
不要な`<div class="recent-post-item ark-post-card">`ブロックを削除

#### 記事数の推奨
- 最小: 3件
- 推奨: 5-10件
- 最大: 20件（パフォーマンス考慮）

## 📊 記事メタデータ

### 必須項目
- タイトル
- 説明文
- 投稿日
- 更新日

### オプション項目
- カテゴリー
- タグ
- カバー画像
- 装飾アイコン

### メタデータの形式

#### 日付
```html
<time datetime="2025-01-22T14:30:00">2025-01-22 14:30</time>
```

#### カテゴリー
```html
<div class="article-meta-categories">
  <a class="article-meta__categories" href="#">🎨 デザイン</a>
</div>
```

#### タグ
```html
<div class="article-meta-tags">
  <a class="article-meta__tags" href="#">タグ1</a>
  <span class="article-meta-link">•</span>
  <a class="article-meta__tags" href="#">タグ2</a>
  <span class="article-meta-link">•</span>
  <a class="article-meta__tags" href="#">タグ3</a>
</div>
```

## 🖼️ 画像の扱い

### 遅延読み込み
```html
<img class="article-cover" 
     src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
     data-lazy-src="実際の画像URL">
```

### 推奨画像サイズ
- **幅**: 1280px
- **高さ**: 720px
- **アスペクト比**: 16:9
- **フォーマット**: WebP（推奨）、JPEG、PNG

### 画像最適化
```
?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/format,webp/quality,q_100
```

### エラー時の代替画像
```html
onerror='this.onerror=null,this.src="https://npm.elemecdn.com/akiblog@1.0.2/img/loading.gif"'
```

## 🎯 記事の追加手順

### ステップ1: 記事スライダーに追加
```html
<!-- ark-swiper-wrapperの中に追加 -->
<div class="swiper-slide ark-swiper-item">
  <!-- 記事内容 -->
</div>
```

### ステップ2: 記事カードに追加
```html
<!-- recent-postsの中に追加 -->
<div class="recent-post-item ark-post-card">
  <!-- 記事内容 -->
</div>
```

### ステップ3: サイドバーの最新記事に追加
```html
<!-- aside-listの中に追加 -->
<div class="aside-list-item">
  <!-- 記事内容 -->
</div>
```

## 💡 ベストプラクティス

### 記事タイトル
- **長さ**: 10-30文字
- **形式**: 簡潔で分かりやすく
- **キーワード**: 重要な単語を含める

### 記事説明
- **長さ**: 50-150文字
- **形式**: 記事の要約
- **魅力**: 読者の興味を引く

### カテゴリー
- **数**: 4-8個
- **命名**: 明確で分かりやすく
- **絵文字**: 視覚的に区別しやすく

### タグ
- **数/記事**: 2-5個
- **命名**: 具体的で検索しやすく
- **重複**: 避ける

## 🔧 高度なカスタマイズ

### 記事カードのレイアウト変更
```css
.recent-post-content.left {
  flex-direction: row;
}

.recent-post-content.right {
  flex-direction: row-reverse;
}
```

### 記事スライダーのエフェクト変更
```javascript
effect: 'slide',  // または 'fade', 'cube', 'coverflow', 'flip'
```

### 自動再生の停止
```javascript
autoplay: false,  // 自動再生を無効化
```

## 📈 SEO最適化

### メタデータの追加
```html
<meta property="og:title" content="記事タイトル">
<meta property="og:description" content="記事の説明">
<meta property="og:image" content="記事の画像URL">
<meta property="og:url" content="記事のURL">
```

### 構造化データ
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "記事タイトル",
  "datePublished": "2025-01-22",
  "dateModified": "2025-01-22",
  "author": {
    "@type": "Person",
    "name": "Ark Developer"
  }
}
</script>
```

## 🐛 よくある問題

### 問題: 記事スライダーが動かない
**解決策:**
- Swiperライブラリが読み込まれているか確認
- `#ark-swiper-container`のIDが正しいか確認

### 問題: 画像が表示されない
**解決策:**
- `data-lazy-src`属性が正しいか確認
- 画像URLが有効か確認

### 問題: レイアウトが崩れる
**解決策:**
- `left`と`right`を交互に使用
- HTMLタグの閉じ忘れを確認

## 📚 参考資料

- [Swiper API](https://swiperjs.com/swiper-api)
- [Font Awesome アイコン](https://fontawesome.com/icons)
- [WebP 画像フォーマット](https://developers.google.com/speed/webp)
