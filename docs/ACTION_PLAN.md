# Tech プロジェクト改善アクションプラン

**作成日**: 2025-11-05
**優先度**: 緊急

---

## 🎯 即座に実施すべき修正

### 1. パス統一化

#### 問題の詳細
```
現状: 3種類のパス参照が混在
/tech/slee/                    → _redirectsと不一致
https://wuxin0011.github.io/   → 旧ドメイン
https://tech.allfrom0.top/slee → 正しい新ドメイン
```

#### 修正手順

##### Step 1: HTMLファイルのパス統一
```bash
# ルートディレクトリのHTMLファイルを修正
cd /home/higuc/tech

# /tech/slee/ → /slee/ に統一
sed -i 's|/tech/slee/|/slee/|g' index.html about.html projects.html

# 確認
grep "/slee/" index.html | head -5
```

##### Step 2: _redirects ファイルの修正
```bash
# 現在の内容
cat _redirects
# /slee /slee/index.html 200

# 推奨される内容
cat > _redirects << 'EOF'
# SPAリダイレクト - VuePress対応
/slee/* /slee/:splat 200

# ルートページ
/ /index.html 200
EOF
```

##### Step 3: 検証
```bash
# パス参照を確認
grep -n "href=" index.html | grep "/slee/"
grep -n "src=" index.html | grep "/slee/"
```

---

### 2. ドメイン更新

#### 問題の詳細
```
旧: https://wuxin0011.github.io/
新: https://tech.allfrom0.top/
```

#### 影響範囲
- 記事リンク（約100箇所）
- カテゴリリンク
- タグリンク
- プロフィールアイコン

#### 修正方法

##### Option A: 一括置換（推奨）
```bash
# バックアップ作成
cp index.html index.html.bak
cp about.html about.html.bak
cp projects.html projects.html.bak

# 一括置換
sed -i 's|https://wuxin0011.github.io|https://tech.allfrom0.top/slee|g' index.html
sed -i 's|https://wuxin0011.github.io|https://tech.allfrom0.top/slee|g' about.html
sed -i 's|https://wuxin0011.github.io|https://tech.allfrom0.top/slee|g' projects.html

# 確認
grep -c "wuxin0011.github.io" index.html  # 0になるはず
grep -c "tech.allfrom0.top" index.html    # 複数あるはず
```

##### Option B: VuePressコンフィグで修正（根本的な解決）
```bash
cd /home/higuc/tech/slee/docs/.vuepress

# config.js を確認
cat config.js | grep -E "base|host|port"

# base設定を修正
# base: '/tech/slee/'  → base: '/slee/'
```

---

### 3. README.md 作成

#### 基本的なREADME
```markdown
# wuxin0011 技術ブログ

VuePress + Ark Mechanical UI による個人技術ブログプラットフォーム

## 🚀 特徴

- **VuePress 1.9.5**: 強力な静的サイトジェネレータ
- **vdoing Theme**: 美しいブログテーマ
- **Ark Mechanical UI**: 洗練されたUIコンポーネント
- **Cloudflare Pages**: 高速CDN配信

## 📁 プロジェクト構成

```
tech/
├── index.html          # メインページ
├── slee/               # VuePressプロジェクト
├── rob/                # Ark Mechanical UI
└── docs/               # ドキュメント
```

## 🛠️ セットアップ

```bash
# 依存関係インストール
cd slee
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## 🌐 デプロイ

Cloudflare Pagesで自動デプロイ

## 📝 ライセンス

MIT License

## 👤 作者

wuxin0011
```

---

## 🔧 その他の改善

### 4. .gitignore 作成

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
.vuepress/dist/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Temporary
*.bak
*.tmp
EOF
```

### 5. wrangler.toml 修正

```toml
name = "tech-blog"
compatibility_date = "2023-12-01"

[site]
bucket = "./dist"

[env.production]
name = "tech-blog-production"
route = "tech.allfrom0.top/*"
```

---

## 📋 チェックリスト

### 緊急対応（今日中）
- [ ] HTMLファイルのパス統一 (`/tech/slee/` → `/slee/`)
- [ ] _redirects ファイル修正
- [ ] README.md 作成
- [ ] .gitignore 作成

### 短期対応（1週間以内）
- [ ] ドメイン一括置換実行
- [ ] VuePressコンフィグ確認・修正
- [ ] デプロイ検証
- [ ] エラーページ（404.html）整備

### 中期対応（1ヶ月以内）
- [ ] 全記事の移行
- [ ] SEO最適化
- [ ] パフォーマンス測定
- [ ] アクセス解析導入

---

## ⚠️ リスクと注意事項

### リスク1: 一括置換の影響
```
問題: 意図しない箇所まで置換される可能性
対策: 必ずバックアップを取る
検証: 置換後にサイトが正常動作するか確認
```

### リスク2: VuePressビルドエラー
```
問題: base設定変更後にビルドエラー
対策: ローカルで十分にテスト
ロールバック: Gitで前の状態に戻せる
```

### リスク3: リンク切れ
```
問題: 旧ドメインへのリンクが404になる
対策: 旧サイトで301リダイレクト設定
代替案: 両方のドメインで一時的に運用
```

---

## 🎯 実行順序（推奨）

### Day 1: 準備と検証
1. Gitコミット（現状を保存）
2. バックアップ作成
3. パス統一化スクリプト実行
4. ローカルで動作確認

### Day 2: ドメイン更新
1. VuePressコンフィグ修正
2. HTMLファイルのドメイン置換
3. ビルド実行
4. デプロイ検証

### Day 3: ドキュメント整備
1. README.md 作成
2. .gitignore 追加
3. コミット＆プッシュ
4. Cloudflare Pages確認

---

## 📞 サポート情報

### トラブルシューティング

#### Q: パス置換後にリンクが404になる
```bash
# _redirects を確認
cat _redirects

# パスが正しいか確認
grep -n "href=" index.html | grep "404"
```

#### Q: VuePressビルドが失敗する
```bash
# node_modules を再インストール
cd slee
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Q: Cloudflare Pagesでエラー
```bash
# ビルドログを確認
# build command: cd slee && npm run build
# publish directory: dist
```

---

## 🔗 関連ドキュメント

- [PROJECT_EVALUATION.md](./PROJECT_EVALUATION.md) - 詳細な評価レポート
- [rob/README.md](../rob/README.md) - Ark UI ドキュメント
- [slee/package.json](../slee/package.json) - VuePressプロジェクト設定

---

**最終更新**: 2025-11-05
**担当者**: システム管理者
**ステータス**: 📝 アクション待ち
