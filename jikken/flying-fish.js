// 高度な魚アニメーションシステム
// Original concept adapted for standalone implementation

class FlyingFishRenderer {
    constructor() {
        this.POINT_INTERVAL = 5;
        this.FISH_COUNT = 1;
        this.MAX_INTERVAL_COUNT = 50;
        this.INIT_HEIGHT_RATE = 0.5;
        this.THRESHOLD = 50;

        this.points = [];
        this.fishes = [];
        this.watchIds = [];
        this.reverse = false;
        this.axis = null;
        this.intervalCount = this.MAX_INTERVAL_COUNT;

        this.init();
    }

    init() {
        this.setParameters();
        this.reconstructMethods();
        this.setup();
        this.bindEvent();
        this.render();
    }

    setParameters() {
        this.$container = document.getElementById('jsi-flying-fish-container');
        if (!this.$container) {
            console.error('Flying fish container not found');
            return;
        }

        this.$canvas = document.createElement('canvas');
        this.$container.appendChild(this.$canvas);
        this.context = this.$canvas.getContext('2d');

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fishCount = this.FISH_COUNT * this.width / 500 * this.height / 500;

        this.$canvas.width = this.width;
        this.$canvas.height = this.height;
    }

    createSurfacePoints() {
        const count = Math.round(this.width / this.POINT_INTERVAL);
        this.pointInterval = this.width / (count - 1);
        this.points.push(new SurfacePoint(this, 0));

        for (let i = 1; i < count; i++) {
            const point = new SurfacePoint(this, i * this.pointInterval);
            const previous = this.points[i - 1];

            point.setPreviousPoint(previous);
            previous.setNextPoint(point);
            this.points.push(point);
        }
    }

    reconstructMethods() {
        this.watchWindowSize = this.watchWindowSize.bind(this);
        this.judgeToStopResize = this.judgeToStopResize.bind(this);
        this.startEpicenter = this.startEpicenter.bind(this);
        this.moveEpicenter = this.moveEpicenter.bind(this);
        this.reverseVertical = this.reverseVertical.bind(this);
        this.render = this.render.bind(this);
    }

    setup() {
        this.points.length = 0;
        this.fishes.length = 0;
        this.watchIds.length = 0;
        this.intervalCount = this.MAX_INTERVAL_COUNT;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fishCount = this.FISH_COUNT * this.width / 500 * this.height / 500;

        this.$canvas.width = this.width;
        this.$canvas.height = this.height;
        this.reverse = false;

        this.fishes.push(new Fish(this));
        this.createSurfacePoints();
    }

    watchWindowSize() {
        this.clearTimer();
        this.tmpWidth = window.innerWidth;
        this.tmpHeight = window.innerHeight;
        this.watchIds.push(setTimeout(this.judgeToStopResize, 200));
    }

    clearTimer() {
        while (this.watchIds.length > 0) {
            clearTimeout(this.watchIds.pop());
        }
    }

    judgeToStopResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const stopped = (width === this.tmpWidth && height === this.tmpHeight);

        this.tmpWidth = width;
        this.tmpHeight = height;

        if (stopped) {
            this.setup();
        }
    }

    bindEvent() {
        window.addEventListener('resize', this.watchWindowSize);
        this.$container.addEventListener('mouseenter', this.startEpicenter);
        this.$container.addEventListener('mousemove', this.moveEpicenter);
        this.$container.addEventListener('click', this.reverseVertical);
    }

    getAxis(event) {
        return {
            x: event.clientX,
            y: event.clientY
        };
    }

    startEpicenter(event) {
        this.axis = this.getAxis(event);
    }

    moveEpicenter(event) {
        const axis = this.getAxis(event);

        if (!this.axis) {
            this.axis = axis;
        }
        this.generateEpicenter(axis.x, axis.y, axis.y - this.axis.y);
        this.axis = axis;
    }

    generateEpicenter(x, y, velocity) {
        if (y < this.height / 2 - this.THRESHOLD || y > this.height / 2 + this.THRESHOLD) {
            return;
        }
        const index = Math.round(x / this.pointInterval);

        if (index < 0 || index >= this.points.length) {
            return;
        }
        this.points[index].interfere(y, velocity);
    }

    reverseVertical() {
        this.reverse = !this.reverse;

        for (let i = 0, count = this.fishes.length; i < count; i++) {
            this.fishes[i].reverseVertical();
        }
    }

    controlStatus() {
        for (let i = 0, count = this.points.length; i < count; i++) {
            this.points[i].updateSelf();
        }
        for (let i = 0, count = this.points.length; i < count; i++) {
            this.points[i].updateNeighbors();
        }
        if (this.fishes.length < this.fishCount) {
            if (--this.intervalCount === 0) {
                this.intervalCount = this.MAX_INTERVAL_COUNT;
                this.fishes.push(new Fish(this));
            }
        }
    }

    getThemeColor() {
        const body = document.body;
        if (body.classList.contains('dark-mode')) {
            return 'hsl(220, 20%, 30%)'; // Dark blue for dark mode
        } else if (body.classList.contains('sepia-mode')) {
            return 'hsl(30, 30%, 70%)'; // Sepia for sepia mode
        } else {
            return 'hsl(0, 0%, 95%)'; // Light gray for light mode
        }
    }

    render() {
        requestAnimationFrame(this.render);
        this.controlStatus();
        this.context.clearRect(0, 0, this.width, this.height);

        // Theme-aware fish color
        const fishColor = this.getThemeColor();
        this.context.fillStyle = fishColor;

        for (let i = 0, count = this.fishes.length; i < count; i++) {
            this.fishes[i].render(this.context);
        }

        this.context.save();
        this.context.globalCompositeOperation = 'xor';
        this.context.beginPath();
        this.context.moveTo(0, this.reverse ? 0 : this.height);

        for (let i = 0, count = this.points.length; i < count; i++) {
            this.points[i].render(this.context);
        }
        this.context.lineTo(this.width, this.reverse ? 0 : this.height);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }
}

class SurfacePoint {
    constructor(renderer, x) {
        this.renderer = renderer;
        this.x = x;
        this.SPRING_CONSTANT = 0.03;
        this.SPRING_FRICTION = 0.9;
        this.WAVE_SPREAD = 0.3;
        this.ACCELARATION_RATE = 0.01;

        this.init();
    }

    init() {
        this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
        this.height = this.initHeight;
        this.fy = 0;
        this.force = { previous: 0, next: 0 };
    }

    setPreviousPoint(previous) {
        this.previous = previous;
    }

    setNextPoint(next) {
        this.next = next;
    }

    interfere(y, velocity) {
        this.fy = this.renderer.height * this.ACCELARATION_RATE *
                 ((this.renderer.height - this.height - y) >= 0 ? -1 : 1) *
                 Math.abs(velocity);
    }

    updateSelf() {
        this.fy += this.SPRING_CONSTANT * (this.initHeight - this.height);
        this.fy *= this.SPRING_FRICTION;
        this.height += this.fy;
    }

    updateNeighbors() {
        if (this.previous) {
            this.force.previous = this.WAVE_SPREAD * (this.height - this.previous.height);
        }
        if (this.next) {
            this.force.next = this.WAVE_SPREAD * (this.height - this.next.height);
        }
    }

    render(context) {
        if (this.previous) {
            this.previous.height += this.force.previous;
            this.previous.fy += this.force.previous;
        }
        if (this.next) {
            this.next.height += this.force.next;
            this.next.fy += this.force.next;
        }
        context.lineTo(this.x, this.renderer.height - this.height);
    }
}

class Fish {
    constructor(renderer) {
        this.renderer = renderer;
        this.GRAVITY = 0.4;
        this.init();
    }

    init() {
        this.direction = Math.random() < 0.5;
        this.x = this.direction ?
                (this.renderer.width + this.renderer.THRESHOLD) :
                -this.renderer.THRESHOLD;
        this.previousY = this.y;
        this.vx = this.getRandomValue(4, 10) * (this.direction ? -1 : 1);

        if (this.renderer.reverse) {
            this.y = this.getRandomValue(this.renderer.height * 1 / 10, this.renderer.height * 4 / 10);
            this.vy = this.getRandomValue(2, 5);
            this.ay = this.getRandomValue(0.05, 0.2);
        } else {
            this.y = this.getRandomValue(this.renderer.height * 6 / 10, this.renderer.height * 9 / 10);
            this.vy = this.getRandomValue(-5, -2);
            this.ay = this.getRandomValue(-0.2, -0.05);
        }
        this.isOut = false;
        this.theta = 0;
        this.phi = 0;
    }

    getRandomValue(min, max) {
        return min + (max - min) * Math.random();
    }

    reverseVertical() {
        this.isOut = !this.isOut;
        this.ay *= -1;
    }

    controlStatus(context) {
        this.previousY = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.ay;

        if (this.renderer.reverse) {
            if (this.y > this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
                this.vy -= this.GRAVITY;
                this.isOut = true;
            } else {
                if (this.isOut) {
                    this.ay = this.getRandomValue(0.05, 0.2);
                }
                this.isOut = false;
            }
        } else {
            if (this.y < this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
                this.vy += this.GRAVITY;
                this.isOut = true;
            } else {
                if (this.isOut) {
                    this.ay = this.getRandomValue(-0.2, -0.05);
                }
                this.isOut = false;
            }
        }
        if (!this.isOut) {
            this.theta += Math.PI / 20;
            this.theta %= Math.PI * 2;
            this.phi += Math.PI / 30;
            this.phi %= Math.PI * 2;
        }
        this.renderer.generateEpicenter(
            this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD,
            this.y,
            this.y - this.previousY
        );

        if (this.vx > 0 && this.x > this.renderer.width + this.renderer.THRESHOLD ||
            this.vx < 0 && this.x < -this.renderer.THRESHOLD) {
            this.init();
        }
    }

    render(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(Math.PI + Math.atan2(this.vy, this.vx));
        context.scale(1, this.direction ? 1 : -1);
        context.beginPath();
        context.moveTo(-30, 0);
        context.bezierCurveTo(-20, 15, 15, 10, 40, 0);
        context.bezierCurveTo(15, -10, -20, -15, -30, 0);
        context.fill();

        context.save();
        context.translate(40, 0);
        context.scale(0.9 + 0.2 * Math.sin(this.theta), 1);
        context.beginPath();
        context.moveTo(0, 0);
        context.quadraticCurveTo(5, 10, 20, 8);
        context.quadraticCurveTo(12, 5, 10, 0);
        context.quadraticCurveTo(12, -5, 20, -8);
        context.quadraticCurveTo(5, -10, 0, 0);
        context.fill();
        context.restore();

        context.save();
        context.translate(-3, 0);
        context.rotate((Math.PI / 3 + Math.PI / 10 * Math.sin(this.phi)) *
                      (this.renderer.reverse ? -1 : 1));

        context.beginPath();

        if (this.renderer.reverse) {
            context.moveTo(5, 0);
            context.bezierCurveTo(10, 10, 10, 30, 0, 40);
            context.bezierCurveTo(-12, 25, -8, 10, 0, 0);
        } else {
            context.moveTo(-5, 0);
            context.bezierCurveTo(-10, -10, -10, -30, 0, -40);
            context.bezierCurveTo(12, -25, 8, -10, 0, 0);
        }
        context.closePath();
        context.fill();
        context.restore();
        context.restore();
        this.controlStatus(context);
    }
}

// 高度な魚アニメーションを管理するクラス
class AdvancedFishAnimation {
    constructor() {
        this.renderer = null;
        this.isEnabled = false;
        this.init();
    }

    init() {
        // DOM読み込み後に初期化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createContainer();
        this.setupThemeListener();
    }

    createContainer() {
        // コンテナがなければ作成
        let container = document.getElementById('jsi-flying-fish-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'jsi-flying-fish-container';
            document.body.appendChild(container);
        }
    }

    setupThemeListener() {
        // テーマ変更時に魚の色を更新
        const observer = new MutationObserver(() => {
            if (this.renderer) {
                // 色の更新は次のフレームで自動的に行われる
            }
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    start() {
        if (this.isEnabled) return;

        this.isEnabled = true;
        const container = document.getElementById('jsi-flying-fish-container');

        if (container) {
            container.style.display = 'block';
            this.renderer = new FlyingFishRenderer();
        }
    }

    stop() {
        if (!this.isEnabled) return;

        this.isEnabled = false;
        const container = document.getElementById('jsi-flying-fish-container');

        if (container) {
            container.style.display = 'none';
        }

        this.renderer = null;
    }

    toggle() {
        if (this.isEnabled) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// グローバルインスタンスを作成
window.advancedFishAnimation = new AdvancedFishAnimation();

// テーマ変更時に連動する関数
window.toggleAdvancedFish = function() {
    if (window.advancedFishAnimation) {
        window.advancedFishAnimation.toggle();
    }
};