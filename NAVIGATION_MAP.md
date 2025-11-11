# プロジェクトナビゲーションマップ

## 🗺️ サイト構造

```
/ (index.html)
├── Windows 98風デスクトップ
│
├── /slee/              → VuePressブログ
│   └── 技術記事、カテゴリ、タグ
│
├── /jin/               → 雨の日の部屋
│   └── Canvas雨アニメーション + 時計
│
├── /jikken/            → Live2D実験室
│   └── 初音ミク + 音楽プレイヤー
│
├── /rob/               → Ark Mechanical UI
│   ├── index.html      → 基本版
│   └── complete.html   → 完全版（推奨）
│
├── /about.html         → アバウトページ
└── /projects.html      → プロジェクト一覧
```

## 🖱️ デスクトップアイコン配置

### 第1行（上部）
```
[My Computer] [Network] [Tech Blog] [Rain Room] [Live2D Lab] [Ark UI]
    20,20       100,20     180,20      260,20       340,20      420,20
```

### 第2行
```
[About Me] [Projects] [My Documents]
  120,20     120,100     120,180
```

### 第3行（ゲーム）
```
[Solitaire] [Minesweeper] [Calculator] [Notepad]
  220,20       220,100       220,180      220,260
```

### 第4行
```
[Clock] [Paint]
 320,20  320,100
```

### 右下
```
[Recycle Bin]
 bottom:50, right:20
```

## 🎯 各プロジェクトへのアクセス方法

### 1. デスクトップから
- **アイコンクリック**: 各プロジェクトのアイコンをクリック
- **スタートメニュー**: 左下の「Start」ボタン → プロジェクト選択

### 2. スタートメニュー項目
1. Tech Blog → `/slee/`
2. Rain Room → `/jin/`
3. Live2D Lab → `/jikken/`
4. Ark UI → `/rob/complete.html`
5. ─────────────
6. About Me → `/about.html`
7. Projects → `/projects.html`
8. ─────────────
9. Settings
10. Shut Down

### 3. 各プロジェクトから戻る
すべてのプロジェクトページに「🏠 デスクトップに戻る」ボタンを配置：
- **jin/**: 左上に固定ボタン
- **jikken/**: 左上に固定ボタン
- **rob/**: 左上に固定ボタン（z-index: 10000）
- **slee/**: ソーシャルアイコンに「ホーム」追加

## 🔗 パスリンク一覧

| プロジェクト | パス | 説明 |
|------------|------|------|
| デスクトップ | `/` | Windows 98風UI |
| Tech Blog | `/slee/` | VuePressブログ |
| Rain Room | `/jin/` | 雨アニメーション |
| Live2D Lab | `/jikken/` | Live2D実験 |
| Ark UI（基本） | `/rob/index.html` | 基本版 |
| Ark UI（完全） | `/rob/complete.html` | 完全版★推奨 |
| About | `/about.html` | アバウト |
| Projects | `/projects.html` | プロジェクト一覧 |

## 🎨 アイコンとテーマ

### Font Awesome アイコン
- 🏠 `fa-home` - ホーム/デスクトップ
- 📝 `fa-blog` - Tech Blog
- 🌧️ `fa-cloud-rain` - Rain Room
- 🧪 `fa-flask` - Live2D Lab
- 🤖 `fa-robot` - Ark UI
- 👤 `fa-user` - About Me
- 📊 `fa-project-diagram` - Projects
- 💻 `fa-desktop` - My Computer
- 🌐 `fa-network-wired` - Network
- 🗑️ `fa-trash` - Recycle Bin

## 🚀 デプロイ後のURL

### 本番環境
```
https://tech.allfrom0.top/              → デスクトップ
https://tech.allfrom0.top/slee/         → VuePressブログ
https://tech.allfrom0.top/jin/          → Rain Room
https://tech.allfrom0.top/jikken/       → Live2D Lab
https://tech.allfrom0.top/rob/complete.html → Ark UI
```

## 📝 実装済み機能

### ✅ 完了
- [x] デスクトップアイコンに4つのプロジェクトリンク追加
- [x] スタートメニューに4つのプロジェクトリンク追加
- [x] jin/に「デスクトップに戻る」ボタン追加
- [x] jikken/に「デスクトップに戻る」ボタン追加
- [x] rob/index.htmlに「デスクトップに戻る」ボタン追加
- [x] rob/complete.htmlに「デスクトップに戻る」ボタン追加
- [x] slee/のソーシャルアイコンに「ホーム」リンク追加

### 🎯 ユーザー体験
1. デスクトップでプロジェクトアイコンをクリック
2. プロジェクトページで作業
3. 「デスクトップに戻る」ボタンでホームに戻る
4. または、スタートメニューから別のプロジェクトへ移動

## 🔧 カスタマイズ方法

### アイコン位置の変更
`index.html`の各アイコンの`style`属性を編集：
```html
style="position: absolute; top: 20px; left: 180px;"
```

### スタートメニュー項目の追加
`index.html`のスタートメニュー`<ul>`内に追加：
```html
<li onclick="window.location.href='/your-path/'">
    <i class="fas fa-your-icon"></i>
    <span>Your Project</span>
</li>
```

### 戻るボタンのスタイル変更
各プロジェクトページの戻るボタンの`style`属性を編集

---

**最終更新**: 2025-11-12
**ステータス**: ✅ 実装完了
