const board = document.querySelector('.game-board');
const moveCountEl = document.getElementById('move-count');
const pairCountEl = document.getElementById('pair-count');
const symbols = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let isLocked = false;

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function updateHUD() {
    moveCountEl.textContent = moves;
    pairCountEl.textContent = matchedCards / 2;
}

function resetGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    isLocked = false;
    updateHUD();
    shuffleCards();
    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        board.appendChild(card);
    });
}

resetGame();

board.addEventListener('click', e => {
    const clicked = e.target;
    if (isLocked) return;
    if (!clicked.classList.contains('card') || clicked.classList.contains('flipped') || clicked.classList.contains('matched')) return;
    clicked.classList.add('flipped');
    flippedCards.push(clicked);

    if (flippedCards.length === 2) {
        moves++;
        updateHUD();
        isLocked = true;
        const [c1, c2] = flippedCards;
        if (c1.dataset.symbol === c2.dataset.symbol) {
            c1.classList.add('matched');
            c2.classList.add('matched');
            matchedCards += 2;
            updateHUD();
            flippedCards = [];
            isLocked = false;
            if (matchedCards === cards.length) {
                setTimeout(() => alert('ניצחתם ב-' + moves + ' מהלכים!'), 400);
            }
        } else {
            setTimeout(() => {
                c1.classList.remove('flipped');
                c2.classList.remove('flipped');
                flippedCards = [];
                isLocked = false;
            }, 800);
        }
    }
});

document.querySelector('.reset-button').addEventListener('click', resetGame);
