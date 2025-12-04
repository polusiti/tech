class RealisticRain {
    constructor() {
        this.canvas = document.getElementById('rain-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.raindrops = [];
        this.splashes = [];
        this.RAINDROP_COUNT = 150;
        
        // 窓の領域を定義（左右10%、下10%を除外）
        this.windowAreas = [
            { x: 0.1, y: 0, width: 0.8, height: 0.9 }  // 中央の窓領域
        ];
        // 雨を当てない領域（人物周辺・机まわり）
        this.noRainZones = [
            { x: 0.42, y: 0.45, width: 0.33, height: 0.5 } // 右下の人物・デスク付近
        ];
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createRaindrops();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    isInNoRainZone(x, y) {
        for (let zone of this.noRainZones) {
            const zx = this.canvas.width * zone.x;
            const zy = this.canvas.height * zone.y;
            const zw = this.canvas.width * zone.width;
            const zh = this.canvas.height * zone.height;
            if (x >= zx && x <= zx + zw && y >= zy && y <= zy + zh) {
                return true;
            }
        }
        return false;
    }

    isInWindow(x, y) {
        // 座標が窓の領域内かチェック（雨禁止領域は除外）
        for (let area of this.windowAreas) {
            const areaX = this.canvas.width * area.x;
            const areaY = this.canvas.height * area.y;
            const areaWidth = this.canvas.width * area.width;
            const areaHeight = this.canvas.height * area.height;
            
            if (x >= areaX && x <= areaX + areaWidth &&
                y >= areaY && y <= areaY + areaHeight &&
                !this.isInNoRainZone(x, y)) {
                return true;
            }
        }
        return false;
    }

    createRaindrops() {
        for (let i = 0; i < this.RAINDROP_COUNT; i++) {
            this.raindrops.push(new Raindrop(this.canvas.width, this.canvas.height, this.windowAreas, this.noRainZones));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 雨粒を描画・更新（窓の領域のみ）
        for (let i = this.raindrops.length - 1; i >= 0; i--) {
            const drop = this.raindrops[i];
            drop.update();
            
            // 窓の領域内のみ描画
            if (this.isInWindow(drop.x, drop.y)) {
                drop.draw(this.ctx);
            }
            
            // 地面に到達したら水しぶきを作成
            if (drop.y > this.canvas.height * 0.9) {
                if (this.isInWindow(drop.x, drop.y)) {
                    this.splashes.push(new Splash(drop.x, this.canvas.height * 0.9));
                }
                this.raindrops[i] = new Raindrop(this.canvas.width, this.canvas.height, this.windowAreas, this.noRainZones);
            }
        }
        
        // 水しぶきを描画・更新
        for (let i = this.splashes.length - 1; i >= 0; i--) {
            const splash = this.splashes[i];
            splash.update();
            splash.draw(this.ctx);
            
            if (splash.isDead()) {
                this.splashes.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

class Raindrop {
    constructor(canvasWidth, canvasHeight, windowAreas, noRainZones) {
        this.windowAreas = windowAreas;
        this.noRainZones = noRainZones;
        this.reset(canvasWidth, canvasHeight);
    }

    reset(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        // 窓の領域内にランダムに配置（雨を避けるゾーンは除外）
        let xCandidate = 0;
        let yCandidate = 0;
        if (this.windowAreas.length === 0) {
            xCandidate = Math.random() * canvasWidth;
        } else {
            let found = false;
            let guard = 0;
            while (!found && guard < 50) {
                const area = this.windowAreas[Math.floor(Math.random() * this.windowAreas.length)];
                xCandidate = canvasWidth * area.x + Math.random() * canvasWidth * area.width;
                // yは上部から負の値で開始
                yCandidate = Math.random() * -canvasHeight;
                // noRainゾーンに入っていないか確認（yが画面内に来る範囲で判定）
                found = !this.isInNoRainZone(xCandidate, canvasHeight * 0.7);
                guard++;
            }
        }
        this.x = xCandidate;
        this.y = yCandidate;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 3 + 15;
        this.opacity = Math.random() * 0.3 + 0.3;
        this.thickness = Math.random() * 1 + 0.5;
        // 風の影響
        this.wind = Math.random() * 2 - 1;
    }

    isInNoRainZone(x, y) {
        if (!this.noRainZones || !this.canvasWidth || !this.canvasHeight) return false;
        // yが画面外（負）なら判定不要
        if (y < 0) return false;
        for (let zone of this.noRainZones) {
            const zx = this.canvasWidth * zone.x;
            const zy = this.canvasHeight * zone.y;
            const zw = this.canvasWidth * zone.width;
            const zh = this.canvasHeight * zone.height;
            if (x >= zx && x <= zx + zw && y >= zy && y <= zy + zh) {
                return true;
            }
        }
        return false;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind * 2, this.y + this.length);
        ctx.stroke();
        
        ctx.restore();
    }
}

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.life = 20;
        this.maxLife = 20;
        
        // 水しぶきの粒子を作成
        const particleCount = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: 0,
                y: 0,
                vx: (Math.random() - 0.5) * 4,
                vy: -(Math.random() * 3 + 2),
                size: Math.random() * 2 + 1
            });
        }
    }

    update() {
        this.life--;
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.3; // 重力
        }
    }

    draw(ctx) {
        const opacity = this.life / this.maxLife * 0.5;
        ctx.save();
        ctx.fillStyle = `rgba(174, 194, 224, ${opacity})`;
        
        for (let particle of this.particles) {
            ctx.beginPath();
            ctx.arc(
                this.x + particle.x,
                this.y + particle.y,
                particle.size,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
        
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// 雨のエフェクトを開始
new RealisticRain();
