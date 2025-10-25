# 変更履歴

## [1.0.0] - 2025-01-22

### 追加
- ✨ Ark Cab Box（ローディングアニメーション）実装
- ✨ Ark Menu Box（メカニカルメニュー）実装
- ✨ Ark Nav Box（ナビゲーションバー）実装
- ✨ 12項目のメニューシステム
- ✨ 日本語の日付・時刻表示
- ✨ リアルタイム時刻更新（1秒ごと）
- ✨ 4種類の背景画像システム
- ✨ レスポンシブデザイン対応
- ✨ Swiper 8.4.2統合
- ✨ Font Awesome 6.2.1統合
- ✨ MutationObserverによる日付監視

### 修正
- 🐛 メニュー項目の重なり問題を解決
- 🐛 中国語日付（星期三）の表示を日本語化
- 🐛 Swiperの初期化タイミングを最適化
- 🐛 外部JSファイルによる日付上書き問題を解決

### 変更
- 🔧 Swiper設定を`slidesPerView: 'auto'`に変更
- 🔧 スライド幅を180pxに固定
- 🔧 ark-nav.jsの読み込みを削除（独自実装に置き換え）
- 🔧 日付更新間隔を60秒に設定

### 最適化
- ⚡ CSS読み込みを遅延ロードに変更
- ⚡ JavaScript読み込みを最適化
- ⚡ アニメーション処理を軽量化

## 技術的な変更点

### HTML構造
```
body
├── ark-cab-box (ローディング)
├── loading-box (プログレスバー)
├── web-bg (背景画像)
└── body-wrap
    └── page-header
        ├── ark-menu-box (メニュー)
        ├── ark-nav-box (ナビ)
        └── site-info (タイトル)
```

### CSS変更
- `.menu-item-first.swiper-slide` に `min-width: 180px` 追加
- `.menu-item-wrapper` に `display: flex` 追加
- `.site-page` に `white-space: nowrap` 追加

### JavaScript変更
- `updateDate()` 関数を日本語対応に書き換え
- `updateTime()` 関数を追加（1秒ごと更新）
- MutationObserver追加（日付監視）
- Swiper初期化コードを独自実装

## 既知の問題

### 軽微な問題
- ⚠️ 初回読み込み時にアイコンが一瞬表示されない場合がある
- ⚠️ 非常に古いブラウザでアニメーションが動作しない

### 対応予定
- 🔜 オフラインモード対応
- 🔜 PWA対応
- 🔜 ダークモード切り替えボタン

## 互換性

### ブラウザ
- ✅ Chrome 90+ (完全対応)
- ✅ Firefox 88+ (完全対応)
- ✅ Edge 90+ (完全対応)
- ✅ Safari 14+ (完全対応)
- ❌ Internet Explorer (非対応)

### デバイス
- ✅ デスクトップ (完全対応)
- ✅ タブレット (完全対応)
- ✅ スマートフォン (完全対応)

## 依存関係

### 必須
- css/index.css (ローカル)

### CDN経由
- Font Awesome 6.2.1
- Swiper 8.4.2
- Pace.js
- Akiblog Custom CSS
- Animate.css

## 貢献者
- 初版作成: 2025-01-22

## ライセンス
元のデザイン: Akilarの糖果屋 (https://akilar.top/)

## 参考資料
- [Hexo Butterfly](https://butterfly.js.org/)
- [Swiper](https://swiperjs.com/)
- [Font Awesome](https://fontawesome.com/)
