// 魚アニメーションシステム
document.addEventListener('DOMContentLoaded', function() {
    // 泳ぐ魚のアニメーションを開始
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

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        const fishCanvas = document.getElementById('fish-canvas');
        if (fishCanvas) {
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
