# wuxin0011 技術ブログ

VuePress + Ark Mechanical UI による個人技術ブログプラットフォーム

[![Deploy Status](https://img.shields.io/badge/deploy-Cloudflare_Pages-orange)](https://tech.allfrom0.top)
[![VuePress](https://img.shields.io/badge/VuePress-1.9.5-green)](https://vuepress.vuejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🚀 特徴

- **VuePress 1.9.5**: 強力な静的サイトジェネレータ
- **vdoing Theme**: 美しいブログテーマ
- **Ark Mechanical UI**: 洗練されたUIコンポーネント
- **Cloudflare Pages**: 高速CDN配信
- **全文検索**: プラグインによる高速検索
- **レスポンシブ**: モバイル完全対応

---

## 📁 プロジェクト構成

```
tech/
├── index.html          # メインページ (VuePress出力)
├── about.html          # アバウトページ
├── projects.html       # プロジェクトページ
├── script.js           # メインJavaScript (80KB)
├── style.css           # メインスタイル (12KB)
├── _redirects          # Cloudflare Pages リダイレクト設定
│
├── slee/               # VuePressプロジェクト (483MB)
│   ├── docs/           # VuePressソースファイル
│   ├── package.json    # プロジェクト設定
│   └── wrangler.toml   # Cloudflare Workers設定
│
├── rob/                # Ark Mechanical UI (656KB)
│   ├── index.html      # 基本版UI
│   ├── complete.html   # 完全版UI ★推奨
│   └── *.md            # 詳細なドキュメント
│
├── docs/               # プロジェクトドキュメント
│   ├── PROJECT_EVALUATION.md  # 評価レポート
│   └── ACTION_PLAN.md         # 改善アクションプラン
│
├── fantasy/            # ファンタジー要素 (460KB)
├── jikken/             # 実験コンテンツ (124KB)
├── jin/                # コンテンツ (28KB)
├── css/                # スタイルシート (32KB)
└── img/                # 画像リソース (32KB)
```

---

## 🛠️ セットアップ

### 前提条件
- Node.js 14.x 以上
- npm 6.x 以上

### インストール
```bash
# リポジトリクローン
git clone https://github.com/polusiti/tech.git
cd tech

# 依存関係インストール
cd slee
npm install
```

### 開発サーバー起動
```bash
npm run dev
# http://localhost:8080 でアクセス
```

### ビルド
```bash
npm run build
# dist/ ディレクトリに出力
```

---

## 🌐 デプロイ

### Cloudflare Pages

1. Cloudflare Dashboardにログイン
2. Pages → Create a project
3. GitHubリポジトリ接続: `polusiti/tech`
4. ビルド設定:
   - Build command: `cd slee && npm run build`
   - Build output directory: `slee/docs/.vuepress/dist`
   - Root directory: (空白)

### カスタムドメイン
- `tech.allfrom0.top`

---

## 📖 ドキュメント

| ドキュメント | 内容 |
|------------|------|
| [PROJECT_EVALUATION.md](docs/PROJECT_EVALUATION.md) | 📊 プロジェクト評価レポート |
| [ACTION_PLAN.md](docs/ACTION_PLAN.md) | 🎯 改善アクションプラン |
| [rob/README.md](rob/README.md) | 🎨 Ark Mechanical UI ガイド |

---

## 🔧 開発

### 使用技術

#### フロントエンド
- VuePress 1.9.5
- Vue 2.7.16
- vdoing Theme 1.12.8

#### プラグイン
- vuepress-plugin-fulltext-search
- vuepress-plugin-comment
- vuepress-plugin-reading-progress
- vuepress-plugin-sitemap

#### CDN
- Font Awesome 6.2.1
- APlayer 1.10.1
- Swiper 8.4.2

### コマンド
```bash
# 開発モード
npm run dev

# ビルド
npm run build

# サーバー起動（ビルド後）
npm run serve
```

---

## 🚨 既知の問題

1. **パス参照の混在** (優先度: 高)
   - `/tech/slee/` と `/slee/` が混在
   - 対策: [ACTION_PLAN.md](docs/ACTION_PLAN.md) 参照

2. **旧ドメインリンク** (優先度: 高)
   - `wuxin0011.github.io` への参照が残存
   - 対策: 一括置換スクリプト実行予定

3. **ドキュメント不足** (優先度: 中)
   - 現在整備中

詳細は [PROJECT_EVALUATION.md](docs/PROJECT_EVALUATION.md) を参照

---

## 🎯 ロードマップ

### Phase 1: 基盤整備 (1-2週間)
- [x] プロジェクト評価完了
- [x] アクションプラン作成
- [ ] パス統一化
- [ ] ドメイン更新

### Phase 2: コンテンツ充実 (1ヶ月)
- [ ] 旧記事の移行
- [ ] 新記事の追加（月4本目標）
- [ ] SEO最適化

### Phase 3: 機能拡張 (2-3ヶ月)
- [ ] ダークモード完全対応
- [ ] PWA化
- [ ] 多言語対応

---

## 📊 プロジェクト評価

| 項目 | 評価 | 備考 |
|-----|------|------|
| VuePressシステム | ⭐⭐⭐⭐⭐ | 完全に機能している |
| Ark Mechanical UI | ⭐⭐⭐⭐⭐ | 詳細なドキュメントあり |
| パス設定 | ⭐⭐ | 統一化が必要 |
| デプロイ | ⭐⭐⭐ | 検証が必要 |
| ドキュメント | ⭐⭐⭐ | 改善中 |
| **総合評価** | **⭐⭐⭐⭐ (4/5)** | 基盤は十分、改善により5/5へ |

---

## 📝 ライセンス

MIT License

---

## 👤 作者

**wuxin0011**

- GitHub: [@wuxin0011](https://github.com/wuxin0011)
- Email: 2191377759@qq.com
- Bilibili: [wuxin0011](https://space.bilibili.com/259072250)
- Juejin: [wuxin0011](https://juejin.cn/user/2019183212631912)

---

## 🔗 関連リンク

- **本番サイト**: https://tech.allfrom0.top
- **GitHub**: https://github.com/polusiti/tech
- **VuePress公式**: https://vuepress.vuejs.org/
- **vdoing Theme**: https://github.com/xugaoyi/vuepress-theme-vdoing

---

**最終更新**: 2025-11-05
**バージョン**: v2.0 (評価・改善計画追加版)
