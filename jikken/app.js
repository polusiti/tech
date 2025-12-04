// クリックパーティクルエフェクト
document.addEventListener('DOMContentLoaded', function() {
    // このスクリプトが既に実行済みかチェック
    if (window.hasClickEffect) return;
    window.hasClickEffect = true;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';

    let particles = [];
    const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 5 + 2;
            this.life = 1;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.gravity = 0.1;
        }

        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.015;
            if (this.size > 0.1) this.size -= 0.05;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    document.addEventListener('click', function(e) {
        for (let i = 0; i < 30; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(e.clientX, e.clientY, color));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
});

// Live2D 初音ミク管理
class MikuManager {
    constructor() {
        this.mikuVisible = true;
        this.currentScale = 1;
        this.init();
    }

    init() {
        // ローディング表示
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
        }, 3000);

        // Live2D 初音ミクの初期化
        if (typeof L2Dwidget !== 'undefined') {
            L2Dwidget.init({
                "model": {
                    "jsonPath": "https://cdn.jsdelivr.net/npm/live2d-widget-model-miku@1.0.5/assets/miku.model.json",
                    "scale": 1
                },
                "display": {
                    "position": "right",
                    "width": 150,
                    "height": 300,
                    "hOffset": 0,
                    "vOffset": 0
                },
                "mobile": {
                    "show": true,
                    "scale": 0.8
                },
                "react": {
                    "opacityDefault": 1,
                    "opacityOnHover": 1
                }
            });

            // ロード完了イベント
            setTimeout(() => {
                console.log('Live2D 初音ミクのロードが完了しました');
                this.setupInteractions();
            }, 2000);
        }
    }

    setupInteractions() {
        const widget = document.querySelector('#live2d-widget');
        if (widget) {
            widget.addEventListener('click', function() {
                console.log('初音ミクがクリックされました！');
            });
        }
    }

    toggleMiku() {
        const widget = document.querySelector('#live2d-widget');
        if (widget) {
            this.mikuVisible = !this.mikuVisible;
            widget.style.display = this.mikuVisible ? 'block' : 'none';
        }
    }

    changeScale(factor) {
        this.currentScale *= factor;
        this.currentScale = Math.max(0.5, Math.min(this.currentScale, 2.0));

        const widget = document.querySelector('#live2d-widget');
        if (widget) {
            widget.style.transform = `scale(${this.currentScale})`;
        }
    }

    resetPosition() {
        this.currentScale = 1;
        const widget = document.querySelector('#live2d-widget');
        if (widget) {
            widget.style.transform = 'scale(1)';
            widget.style.bottom = '20px';
            widget.style.right = '20px';
        }
    }
}

// APlayer 音楽プレイヤー管理
class MusicPlayer {
    constructor() {
        this.init();
    }

    init() {
        if (typeof APlayer !== 'undefined') {
            const ap = new APlayer({
                container: document.getElementById('player1'),
                fixed: true,
                autoplay: false,
                theme: '#e5418b',
                loop: 'all',
                order: 'random',
                preload: 'auto',
                volume: 0.7,
                mutex: true,
                listFolded: true,
                listMaxHeight: 280,
                audio: this.getAudioList()
            });

            console.log('APlayer initialized with', ap.list.audios.length, 'tracks');
        }
    }

    getAudioList() {
        return [
            {
                name: '1',
                artist: 'AI',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/206780.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '2',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/Glenn_Gould_-_Bach_French_Suite_4_In_E_Flat_BWV_815_-_1._Allemande_mp3.pm_.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '3',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/Shannons-Lullaby.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '4',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/flowing-light-ai-193402.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/proof-of-courage-ai-205299.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '6',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/sparkling-world-of-magic-ai-205280.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '7',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/subtlety-of-koto-sounds-ai-213697.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '8',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/electronic-echo-ai-205279.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 9',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/peaceful-piano-background-music-218762.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 10',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/dark-music-249503.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 11',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/6-cinematic__bpm70-200199.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 12',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/himalayan-village-flute-251427.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 13',
                artist: 'AI',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/shadows-of-the-night-rap-beat-prod-by-sus-beats-203125.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 14',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/indian-style-280602.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 15',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/206780.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 1',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/55.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 2',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/56.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 3',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/57.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 4',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/58.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 3.5',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/Furina-Demo-All-the-Worlds-a-Stage-Piano-Performance-Genshin-Impact-OST.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: '5 of 5',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/59.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: 'f',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/Chopin-fantasie-impromptu.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: 'mo',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/Classicals.de-Beethoven-Moonlight-Sonata-I.-Movement-Piano-Sonata-Nr.-14-Op.-27-Nr.-2-Version-2.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            },
            {
                name: 'end',
                artist: 'welcome',
                url: 'https://allfrom0.tech/wp-content/uploads/2025/06/Classicals.de-Beethoven-Moonlight-Sonata-III.-Movement-Piano-Sonata-Nr.-14-Op.-27-Nr.-2.mp3',
                cover: 'https://allfrom0.tech/wp-content/uploads/2025/06/anime-style-clouds_23-2151071669.avif'
            }
        ];
    }
}

// キーボードショートカット管理
class KeyboardControls {
    constructor(mikuManager) {
        this.mikuManager = mikuManager;
        this.init();
    }

    init() {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'h':
                case 'H':
                    this.mikuManager.toggleMiku();
                    break;
                case '+':
                case '=':
                    this.mikuManager.changeScale(1.1);
                    break;
                case '-':
                case '_':
                    this.mikuManager.changeScale(0.9);
                    break;
                case 'r':
                case 'R':
                    this.mikuManager.resetPosition();
                    break;
            }
        }.bind(this));
    }
}

// グローバル関数（HTMLから呼び出す用）
window.toggleMiku = function() {
    if (window.mikuManager) {
        window.mikuManager.toggleMiku();
    }
};

window.changeScale = function(factor) {
    if (window.mikuManager) {
        window.mikuManager.changeScale(factor);
    }
};

window.resetPosition = function() {
    if (window.mikuManager) {
        window.mikuManager.resetPosition();
    }
};

// メイン初期化
document.addEventListener('DOMContentLoaded', function() {
    window.mikuManager = new MikuManager();
    window.musicPlayer = new MusicPlayer();
    window.keyboardControls = new KeyboardControls(window.mikuManager);
});
