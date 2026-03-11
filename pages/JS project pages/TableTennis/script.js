const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

const paddleW = 10, paddleH = 100, paddleSpeed = 6;
let leftPaddle  = { x: 20, y: canvas.height / 2 - paddleH / 2, w: paddleW, h: paddleH, color: '#60a5fa' };
let rightPaddle = { x: canvas.width - 30, y: canvas.height / 2 - paddleH / 2, w: paddleW, h: paddleH, color: '#f87171' };
let ball = { x: canvas.width / 2, y: canvas.height / 2, r: 8, sx: 5, sy: 5, color: '#e8b86d' };

let leftScore = 0, rightScore = 0;
let gameStarted = false;
let keys = {};

document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// Touch controls: track active touches for each side
let touchTargets = { left: null, right: null };

canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });
canvas.addEventListener('touchend', e => {
    e.preventDefault();
    for (const touch of e.changedTouches) {
        if (touchTargets.left === touch.identifier) touchTargets.left = null;
        if (touchTargets.right === touch.identifier) touchTargets.right = null;
    }
}, { passive: false });

function handleTouch(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const scaleY = canvas.height / rect.height;

    for (const touch of e.touches) {
        const relX = touch.clientX - rect.left;
        const relY = (touch.clientY - rect.top) * scaleY;

        if (relX < rect.width / 2) {
            touchTargets.left = touch.identifier;
            leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleH, relY - paddleH / 2));
        } else {
            touchTargets.right = touch.identifier;
            rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleH, relY - paddleH / 2));
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function drawPaddle(p) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 5);
    ctx.fill();
}

function drawCenterLine() {
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateBall() {
    ball.x += ball.sx;
    ball.y += ball.sy;

    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) ball.sy = -ball.sy;

    if (ball.x - ball.r < leftPaddle.x + leftPaddle.w &&
        ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.h) {
        ball.sx = Math.abs(ball.sx);
    }

    if (ball.x + ball.r > rightPaddle.x &&
        ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.h) {
        ball.sx = -Math.abs(ball.sx);
    }

    if (ball.x + ball.r > canvas.width) { leftScore++; resetBall(); }
    else if (ball.x - ball.r < 0) { rightScore++; resetBall(); }

    document.getElementById('leftScore').textContent = leftScore;
    document.getElementById('rightScore').textContent = rightScore;
    checkWinner();
}

function updatePaddles() {
    if (keys['w'] && leftPaddle.y > 0) leftPaddle.y -= paddleSpeed;
    if (keys['s'] && leftPaddle.y + leftPaddle.h < canvas.height) leftPaddle.y += paddleSpeed;
    if (keys['arrowup'] && rightPaddle.y > 0) rightPaddle.y -= paddleSpeed;
    if (keys['arrowdown'] && rightPaddle.y + rightPaddle.h < canvas.height) rightPaddle.y += paddleSpeed;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.sx = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.sy = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function checkWinner() {
    if (leftScore >= 5) { alert('שחקן שמאל ניצח!'); resetGame(); }
    else if (rightScore >= 5) { alert('שחקן ימין ניצח!'); resetGame(); }
}

function resetGame() {
    leftScore = 0; rightScore = 0;
    document.getElementById('leftScore').textContent = 0;
    document.getElementById('rightScore').textContent = 0;
    resetBall();
}

function gameLoop() {
    if (!gameStarted) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCenterLine();
    drawBall();
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    updateBall();
    updatePaddles();
    requestAnimationFrame(gameLoop);
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (!gameStarted) { gameStarted = true; resetBall(); gameLoop(); }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    gameStarted = false;
});
