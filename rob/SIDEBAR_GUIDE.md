# サイドバー実装ガイド

## 📌 概要

complete.htmlに実装されているサイドバーの詳細ガイドです。

## 🎨 サイドバーの構造

```
aside#aside-content
├── card-author (プロフィール)
├── card-announcement (お知らせ)
├── card-recent-post (最新記事)
├── card-tags (タグクラウド)
└── card-webinfo (サイト情報)
```

## 📦 各ウィジェットの詳細

### 1. プロフィールカード (card-author)

#### HTML構造
```html
<div class="card-widget card-author">
  <div class="author-avatar">
    <img class="avatar-img" src="..." alt="プロフィール画像">
  </div>
  <div class="author-info">
    <div class="author-info__name">Ark Developer</div>
    <div class="author-info__description">メカニカルUIデザイナー</div>
  </div>
  <div class="card-info-data">
    <div class="card-info-data-item">
      <a href="#"><div class="headline">記事</div><div class="length-num">495</div></a>
    </div>
    <div class="card-info-data-item">
      <a href="#"><div class="headline">タグ</div><div class="length-num">48</div></a>
    </div>
    <div class="card-info-data-item">
      <a href="#"><div class="headline">カテゴリー</div><div class="length-num">6</div></a>
    </div>
  </div>
  <div class="card-info-social-icons">
    <a class="social-icon" href="..." target="_blank" title="Github">
      <i class="fab fa-github"></i>
    </a>
    <a class="social-icon" href="..." target="_blank" title="Email">
      <i class="fas fa-envelope"></i>
    </a>
    <a class="social-icon" href="..." target="_blank" title="Twitter">
      <i class="fab fa-twitter"></i>
    </a>
  </div>
</div>
```

#### カスタマイズ方法

**アバター画像の変更:**
```html
<img class="avatar-img" src="あなたの画像URL" alt="プロフィール画像">
```

**名前と説明の変更:**
```html
<div class="author-info__name">あなたの名前</div>
<div class="author-info__description">あなたの説明</div>
```

**統計情報の変更:**
```html
<div class="length-num">あなたの記事数</div>
```

**SNSリンクの追加:**
```html
<a class="social-icon" href="あなたのURL" target="_blank" title="サービス名">
  <i class="fab fa-アイコン名"></i>
</a>
```

**利用可能なFont Awesomeアイコン:**
- `fa-github` - Github
- `fa-twitter` - Twitter
- `fa-facebook` - Facebook
- `fa-instagram` - Instagram
- `fa-linkedin` - LinkedIn
- `fa-youtube` - YouTube
- `fa-envelope` - Email
- `fa-rss` - RSS

### 2. お知らせカード (card-announcement)

#### HTML構造
```html
<div class="card-widget card-announcement">
  <div class="item-headline">
    <i class="fas fa-bullhorn"></i><span>お知らせ</span>
  </div>
  <div class="announcement-content">
    お知らせの内容をここに記載
  </div>
</div>
```

#### カスタマイズ方法

**お知らせ内容の変更:**
```html
<div class="announcement-content">
  あなたのお知らせ内容
</div>
```

**アイコンの変更:**
```html
<i class="fas fa-新しいアイコン"></i>
```

**推奨アイコン:**
- `fa-bullhorn` - メガホン（デフォルト）
- `fa-bell` - ベル
- `fa-info-circle` - 情報
- `fa-exclamation-circle` - 注意

### 3. 最新記事カード (card-recent-post)

#### HTML構造
```html
<div class="card-widget card-recent-post">
  <div class="item-headline">
    <i class="fas fa-history"></i><span>最新記事</span>
  </div>
  <div class="aside-list">
    <div class="aside-list-item">
      <a class="thumbnail" href="#" title="記事タイトル">
        <img src="..." alt="記事タイトル">
      </a>
      <div class="content">
        <a class="title" href="#" title="記事タイトル">記事タイトル</a>
        <time datetime="2025-01-22">2025-01-22</time>
      </div>
    </div>
  </div>
</div>
```

#### カスタマイズ方法

**記事の追加:**
```html
<div class="aside-list-item">
  <a class="thumbnail" href="記事URL" title="記事タイトル">
    <img src="サムネイルURL" alt="記事タイトル">
  </a>
  <div class="content">
    <a class="title" href="記事URL" title="記事タイトル">記事タイトル</a>
    <time datetime="YYYY-MM-DD">YYYY-MM-DD</time>
  </div>
</div>
```

**表示件数の変更:**
- デフォルト: 3件
- 推奨: 3-5件
- 最大: 10件

### 4. タグクラウド (card-tags)

#### HTML構造
```html
<div class="card-widget card-tags">
  <div class="item-headline">
    <i class="fas fa-tags"></i><span>タグ</span>
  </div>
  <div class="card-tag-cloud">
    <a href="#">タグ名</a>
    <a href="#">タグ名</a>
    <!-- ... -->
  </div>
</div>
```

#### カスタマイズ方法

**タグの追加:**
```html
<a href="タグページURL">タグ名</a>
```

**タグの削除:**
不要な`<a>`タグを削除

**推奨タグ数:**
- 最小: 5個
- 推奨: 8-12個
- 最大: 20個

**タグの並び順:**
- 人気順（推奨）
- アルファベット順
- 最新順

### 5. サイト情報カード (card-webinfo)

#### HTML構造
```html
<div class="card-widget card-webinfo">
  <div class="item-headline">
    <i class="fas fa-chart-line"></i><span>サイト情報</span>
  </div>
  <div class="webinfo">
    <div class="webinfo-item">
      <div class="item-name">記事数:</div>
      <div class="item-count">495</div>
    </div>
    <div class="webinfo-item">
      <div class="item-name">運営日数:</div>
      <div class="item-count">2,100日</div>
    </div>
    <div class="webinfo-item">
      <div class="item-name">総文字数:</div>
      <div class="item-count">817k</div>
    </div>
    <div class="webinfo-item">
      <div class="item-name">最終更新:</div>
      <div class="item-count">2025-01-22</div>
    </div>
  </div>
</div>
```

#### カスタマイズ方法

**統計情報の変更:**
```html
<div class="webinfo-item">
  <div class="item-name">項目名:</div>
  <div class="item-count">値</div>
</div>
```

**新しい統計の追加:**
```html
<div class="webinfo-item">
  <div class="item-name">訪問者数:</div>
  <div class="item-count">10,000</div>
</div>
```

**推奨統計項目:**
- 記事数
- 運営日数
- 総文字数
- 最終更新
- 訪問者数
- コメント数
- タグ数
- カテゴリー数

## 🎨 スタイリング

### カードの基本スタイル
```css
.card-widget {
  border-radius: 8px;
  background: var(--card-bg);
  box-shadow: var(--card-box-shadow);
  margin-bottom: 20px;
  padding: 20px;
}
```

### ホバーエフェクト
```css
.card-widget:hover {
  box-shadow: var(--card-hover-box-shadow);
  transform: translateY(-2px);
}
```

### レスポンシブ対応
```css
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    margin-top: 20px;
  }
}
```

## 📱 レスポンシブ動作

### デスクトップ（1024px以上）
- サイドバー: 右側に固定
- 幅: 300px
- 位置: sticky

### タブレット（768px-1023px）
- サイドバー: 下部に移動
- 幅: 100%
- 位置: static

### モバイル（767px以下）
- サイドバー: 下部に移動
- 幅: 100%
- 位置: static
- カード間隔: 狭く

## 🔧 カスタムウィジェットの追加

### 基本テンプレート
```html
<div class="card-widget card-custom">
  <div class="item-headline">
    <i class="fas fa-アイコン"></i><span>タイトル</span>
  </div>
  <div class="custom-content">
    <!-- カスタムコンテンツ -->
  </div>
</div>
```

### 例: カレンダーウィジェット
```html
<div class="card-widget card-calendar">
  <div class="item-headline">
    <i class="fas fa-calendar"></i><span>カレンダー</span>
  </div>
  <div class="calendar-content">
    <!-- カレンダーHTML -->
  </div>
</div>
```

### 例: 検索ウィジェット
```html
<div class="card-widget card-search">
  <div class="item-headline">
    <i class="fas fa-search"></i><span>検索</span>
  </div>
  <div class="search-content">
    <input type="text" placeholder="検索...">
    <button type="submit">検索</button>
  </div>
</div>
```

## 💡 ベストプラクティス

### ウィジェットの順序
1. **プロフィール** - 最も重要
2. **お知らせ** - 緊急情報
3. **最新記事** - コンテンツ発見
4. **タグクラウド** - ナビゲーション
5. **サイト情報** - 統計情報

### パフォーマンス
- 画像を最適化（WebP形式推奨）
- 遅延読み込みを使用
- 不要なウィジェットは削除

### アクセシビリティ
- 適切なalt属性を設定
- セマンティックなHTML使用
- キーボードナビゲーション対応

### SEO
- 適切なリンク構造
- 内部リンクの活用
- 構造化データの追加

## 🐛 トラブルシューティング

### 問題: サイドバーが表示されない
**原因:**
- CSSが読み込まれていない
- HTMLの閉じタグが不足

**解決策:**
```html
<!-- 正しい構造を確認 -->
<aside class="sidebar" id="aside-content">
  <!-- ウィジェット -->
</aside>
```

### 問題: 画像が表示されない
**原因:**
- URLが間違っている
- 画像が存在しない

**解決策:**
```html
<!-- 正しいURLを使用 -->
<img src="https://正しいURL" alt="説明">
```

### 問題: レイアウトが崩れる
**原因:**
- HTMLタグの閉じ忘れ
- CSSの競合

**解決策:**
- ブラウザの開発者ツールで確認
- HTMLバリデーターを使用

## 📚 参考資料

- [Font Awesome アイコン一覧](https://fontawesome.com/icons)
- [Butterfly テーマドキュメント](https://butterfly.js.org/)
- [Hexo 公式ドキュメント](https://hexo.io/)
