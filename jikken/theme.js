// 動的背景テーマシステム
document.addEventListener('DOMContentLoaded', function() {
    // --- 【初期化処理１】泳ぐ魚のアニメーションを開始させる ---
    try {
        fish({
            id: 'fish-canvas',
            width: window.innerWidth,
            height: window.innerHeight,
            water: false // 背景の波紋は表示しない
        });
    } catch(e) {
        console.error("Fish animation failed to initialize:", e);
    }

    // --- 【初期化処理２】テーマ・サイクラーを開始させる ---
    const toggleButton = document.getElementById('themeCyclerBtn');
    const body = document.body;
    const themes = ['light', 'dark', 'sepia']; // 利用可能なテーマ

    // 背景アニメーションを制御する関数
    const updateBackground = (theme) => {
        const starCanvas = document.getElementById('starry-sky-canvas');
        const fishCanvas = document.getElementById('fish-canvas');
        const advancedFishContainer = document.getElementById('jsi-flying-fish-container');

        // すべての背景を一度非表示
        starCanvas.style.display = 'none';
        fishCanvas.style.display = 'none';
        if (advancedFishContainer) {
            advancedFishContainer.style.display = 'none';
        }

        // テーマに応じて背景を表示
        if (theme === 'sepia') {
            fishCanvas.style.display = 'block';
        } else if (theme === 'dark') {
            // 高度な魚アニメーションをダークモードで表示
            if (window.advancedFishAnimation) {
                advancedFishContainer.style.display = 'block';
                if (!window.advancedFishAnimation.isEnabled) {
                    window.advancedFishAnimation.start();
                }
            }
        } else {
            starCanvas.style.display = 'block';
        }
    };

    // ボタンの見た目を更新する関数
    const updateButton = (theme) => {
        if (theme === 'dark') {
            toggleButton.innerHTML = '📖';
        }
        else if (theme === 'sepia') {
            toggleButton.innerHTML = '☀️';
        }
        else {
            toggleButton.innerHTML = '🌙';
        }
    };

    // ページ読み込み時に設定を復元
    let currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.remove('dark-mode', 'sepia-mode'); // 一旦リセット
    if (currentTheme !== 'light') {
        body.classList.add(currentTheme + '-mode');
    }
    updateButton(currentTheme);
    updateBackground(currentTheme); // 背景も更新

    // ボタンクリック時の処理
    toggleButton.addEventListener('click', () => {
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const newTheme = themes[nextIndex];

        body.classList.remove('dark-mode', 'sepia-mode');
        if (newTheme !== 'light') {
            body.classList.add(newTheme + '-mode');
        }

        localStorage.setItem('theme', newTheme);
        currentTheme = newTheme;

        // ボタンと背景の両方を更新
        updateButton(currentTheme);
        updateBackground(currentTheme);
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        const fishCanvas = document.getElementById('fish-canvas');
        if (fishCanvas && fishCanvas.style.display !== 'none') {
            // 魚のアニメーションを再初期化
            try {
                fishCanvas.innerHTML = '';
                fish({
                    id: 'fish-canvas',
                    width: window.innerWidth,
                    height: window.innerHeight,
                    water: false
                });
            } catch(e) {
                console.error("Fish animation resize failed:", e);
            }
        }
    });
});