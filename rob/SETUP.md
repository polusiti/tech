# セットアップガイド

## 必要なファイル

### 必須ファイル（ローカル）
1. **index.html** - メインHTMLファイル
2. **css/index.css** - ローカルCSSファイル

### 自動読み込みファイル（CDN）
以下は自動的にインターネット経由で読み込まれます：

#### CSS
```
https://npm.elemecdn.com/@fortawesome/fontawesome-free@6.2.1/css/all.min.css
https://npm.elemecdn.com/akiblog@1.0.2/css/custom.css
https://npm.elemecdn.com/akiblog@1.0.2/css/animate.min.css
https://npm.elemecdn.com/swiper@8.4.2/swiper-bundle.min.css
```

#### JavaScript
```
https://npm.elemecdn.com/pace-js@latest/pace.min.js
https://at.alicdn.com/t/c/font_3344355_6og082zqzfd.js
https://npm.elemecdn.com/swiper@8.4.2/swiper-bundle.min.js
```

#### 画像
```
https://npm.elemecdn.com/akiblog@1.0.2/img/default_bg.webp
https://npm.elemecdn.com/akiblog@1.0.2/img/dark_bg.webp
https://npm.elemecdn.com/akiblog@1.0.2/img/mobile_bg.webp
https://npm.elemecdn.com/akiblog@1.0.2/img/mobile_dark_bg.webp
```

## インストール手順

### 方法1: そのまま使用（推奨）
1. `saisyougenda` フォルダをそのまま使用
2. `index.html` をブラウザで開く
3. 完了！

### 方法2: Webサーバーで公開
```bash
# Python 3の場合
cd saisyougenda
python -m http.server 8000

# Node.jsの場合
npx http-server saisyougenda -p 8000
```

ブラウザで `http://localhost:8000` にアクセス

### 方法3: 完全オフライン化（上級者向け）

#### 1. 必要なファイルをダウンロード
```bash
mkdir -p saisyougenda/vendor/css
mkdir -p saisyougenda/vendor/js
mkdir -p saisyougenda/vendor/img

# CSS
curl -o saisyougenda/vendor/css/fontawesome.min.css https://npm.elemecdn.com/@fortawesome/fontawesome-free@6.2.1/css/all.min.css
curl -o saisyougenda/vendor/css/custom.css https://npm.elemecdn.com/akiblog@1.0.2/css/custom.css
curl -o saisyougenda/vendor/css/animate.min.css https://npm.elemecdn.com/akiblog@1.0.2/css/animate.min.css
curl -o saisyougenda/vendor/css/swiper-bundle.min.css https://npm.elemecdn.com/swiper@8.4.2/swiper-bundle.min.css

# JavaScript
curl -o saisyougenda/vendor/js/pace.min.js https://npm.elemecdn.com/pace-js@latest/pace.min.js
curl -o saisyougenda/vendor/js/swiper-bundle.min.js https://npm.elemecdn.com/swiper@8.4.2/swiper-bundle.min.js

# 画像
curl -o saisyougenda/vendor/img/default_bg.webp https://npm.elemecdn.com/akiblog@1.0.2/img/default_bg.webp
curl -o saisyougenda/vendor/img/dark_bg.webp https://npm.elemecdn.com/akiblog@1.0.2/img/dark_bg.webp
curl -o saisyougenda/vendor/img/mobile_bg.webp https://npm.elemecdn.com/akiblog@1.0.2/img/mobile_bg.webp
curl -o saisyougenda/vendor/img/mobile_dark_bg.webp https://npm.elemecdn.com/akiblog@1.0.2/img/mobile_dark_bg.webp
```

#### 2. index.htmlのパスを変更
CDNのURLをローカルパスに置き換える

## トラブルシューティング

### 問題: ローディング画面が表示されない
**解決策**: 
- ブラウザのキャッシュをクリア
- `css/index.css` が正しく配置されているか確認

### 問題: メニューが表示されない
**解決策**:
- インターネット接続を確認
- ブラウザのコンソールでエラーを確認（F12キー）

### 問題: 日付が中国語（星期三）で表示される
**解決策**:
- ページを再読み込み（Ctrl+F5）
- JavaScriptが有効になっているか確認

### 問題: メニュー項目が重なる
**解決策**:
- ブラウザの幅を広げる
- ページを再読み込み

### 問題: アイコンが表示されない
**解決策**:
- Alicdn SVGスプライトの読み込みを確認
- Font Awesomeの読み込みを確認

## ブラウザ互換性

### 推奨ブラウザ
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### 非推奨ブラウザ
- ❌ Internet Explorer（全バージョン）
- ⚠️ 古いモバイルブラウザ

## パフォーマンス最適化

### 読み込み速度の改善
1. CDNファイルをローカルにキャッシュ
2. 画像を最適化（WebP形式）
3. CSSとJSを圧縮

### メモリ使用量の削減
1. 不要なアニメーションを無効化
2. Swiperのスライド数を減らす

## セキュリティ

### CSP（Content Security Policy）設定例
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://npm.elemecdn.com https://at.alicdn.com; 
               style-src 'self' 'unsafe-inline' https://npm.elemecdn.com; 
               img-src 'self' https://npm.elemecdn.com data:;">
```

## サポート

問題が解決しない場合は、以下を確認してください：
1. ブラウザのコンソールログ（F12キー）
2. ネットワークタブでファイルの読み込み状況
3. `css/index.css` の存在確認

## 参考リンク

- [Swiper公式ドキュメント](https://swiperjs.com/)
- [Font Awesome](https://fontawesome.com/)
- [Hexo Butterfly](https://butterfly.js.org/)
- [Akilarの糖果屋](https://akilar.top/)
