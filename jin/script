function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

// カレンダーの描画（手書き風デザイン）
function drawCalendar() {
    const canvas = document.getElementById('calendar-canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    ctx.save();

    // 平行四辺形の変形（斜めに配置）
    const skewAmount = 0.2;
    ctx.transform(1, 0, skewAmount, 1, 0, 0);

    // 背景なし（透明）

    // 月と日付
    ctx.font = 'bold 18px "Comic Sans MS", "Segoe Print", cursive';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(monthNames[month], 65, 70);

    ctx.font = 'bold 20px "Comic Sans MS", "Segoe Print", cursive';
    ctx.fillStyle = '#ff6b6b';
    ctx.textAlign = 'right';
    ctx.fillText(today + '日', 315, 70);

    // 曜日ヘッダー
    const cellWidth = 37;
    const cellHeight = 35;
    const startX = 60;
    const startY = 75;

    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i < 7; i++) {
        ctx.fillStyle = (i === 0 || i === 6) ? '#e74c3c' : '#7f8c8d';
        ctx.fillText(weekDays[i], startX + i * cellWidth + cellWidth / 2, startY + 15);
    }

    // 曜日の下の横線（鮮明に）
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(62, startY + 20);
    ctx.lineTo(320, startY + 20);
    ctx.stroke();

    // セルの区切り線を先に描画（鮮明に）
    const rows = 6;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 7; col++) {
            const x = startX + col * cellWidth;
            const y = startY + 28 + row * cellHeight;

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellWidth, cellHeight);
        }
    }

    // カレンダーグリッド（日付を描画）
    let dayCounter = 1;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 7; col++) {
            const x = startX + col * cellWidth;
            const y = startY + 28 + row * cellHeight;

            // 最初の行で、firstDayより前はスキップ
            if (row === 0 && col < firstDay) {
                continue;
            }

            // 月の日数を超えたら終了
            if (dayCounter > daysInMonth) {
                break;
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // 今日の日付をハイライト
            if (dayCounter === today) {
                // 手書き風の赤い円
                ctx.fillStyle = '#ff6b6b';
                ctx.beginPath();
                ctx.arc(x + cellWidth / 2, y + cellHeight / 2, 15, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.font = 'bold 16px "Comic Sans MS", "Segoe Print", cursive';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(dayCounter.toString(), x + cellWidth / 2, y + cellHeight / 2 + 1);
            } else {
                ctx.font = '15px "Comic Sans MS", "Segoe Print", cursive';
                ctx.fillStyle = (col === 0 || col === 6) ? '#e74c3c' : '#2c3e50';
                ctx.fillText(dayCounter.toString(), x + cellWidth / 2, y + cellHeight / 2 + 1);
            }

            dayCounter++;
        }

        if (dayCounter > daysInMonth) break;
    }

    ctx.restore();
}

// 初期化と定期更新
updateClock();
drawCalendar();

setInterval(updateClock, 1000);
setInterval(drawCalendar, 3600000);
