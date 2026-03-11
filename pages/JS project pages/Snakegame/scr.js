const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

const GRID = 20;
canvas.width = 400;
canvas.height = 400;
const COLS = canvas.width / GRID;
const ROWS = canvas.height / GRID;

const OPPOSITE = { LEFT: "RIGHT", RIGHT: "LEFT", UP: "DOWN", DOWN: "UP" };
let snake, direction, fruit, gameOver, gameInterval, score;

function initializeGame() {
    snake = [{ x: Math.floor(COLS / 2) * GRID, y: Math.floor(ROWS / 2) * GRID }];
    direction = "RIGHT";
    score = 0;
    scoreDisplay.textContent = score;
    fruit = generateFruit();
    gameOver = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

document.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", initializeGame);

function changeDirection(event) {
    const map = { ArrowLeft: "LEFT", ArrowUp: "UP", ArrowRight: "RIGHT", ArrowDown: "DOWN" };
    const newDir = map[event.key];
    if (!newDir) return;
    if (newDir !== OPPOSITE[direction]) direction = newDir;
}

function generateFruit() {
    return {
        x: Math.floor(Math.random() * COLS) * GRID,
        y: Math.floor(Math.random() * ROWS) * GRID
    };
}

function drawRoundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
}

function gameLoop() {
    if (gameOver) {
        clearInterval(gameInterval);
        ctx.fillStyle = "rgba(15,20,25,0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#e8b86d";
        ctx.font = "bold 28px Heebo";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillStyle = "#8b9cad";
        ctx.font = "18px Heebo";
        ctx.fillText("ניקוד: " + score, canvas.width / 2, canvas.height / 2 + 25);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const head = { ...snake[0] };
    if (direction === "LEFT") head.x -= GRID;
    else if (direction === "UP") head.y -= GRID;
    else if (direction === "RIGHT") head.x += GRID;
    else if (direction === "DOWN") head.y += GRID;

    snake.unshift(head);

    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        scoreDisplay.textContent = score;
        fruit = generateFruit();
    } else {
        snake.pop();
    }

    snake.forEach((seg, i) => {
        const alpha = 1 - (i / snake.length) * 0.5;
        ctx.fillStyle = i === 0 ? "#34d399" : `rgba(52,211,153,${alpha})`;
        drawRoundRect(seg.x + 1, seg.y + 1, GRID - 2, GRID - 2, 4);
    });

    ctx.fillStyle = "#f87171";
    ctx.beginPath();
    ctx.arc(fruit.x + GRID / 2, fruit.y + GRID / 2, GRID / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)) {
        gameOver = true;
    }
}

// Touch swipe controls
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });
canvas.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    let newDir;
    if (Math.abs(dx) > Math.abs(dy)) newDir = dx > 0 ? "RIGHT" : "LEFT";
    else newDir = dy > 0 ? "DOWN" : "UP";
    if (newDir !== OPPOSITE[direction]) direction = newDir;
}, { passive: true });

// D-pad buttons
document.getElementById('dpad').addEventListener('click', e => {
    const btn = e.target.closest('[data-dir]');
    if (!btn) return;
    const newDir = btn.dataset.dir;
    if (newDir !== OPPOSITE[direction]) direction = newDir;
});

initializeGame();
