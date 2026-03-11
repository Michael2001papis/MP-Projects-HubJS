const questionEl = document.getElementById('question');
const answerBtns = [
    document.getElementById('answer-1'),
    document.getElementById('answer-2'),
    document.getElementById('answer-3'),
    document.getElementById('answer-4')
];
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const resetBtn = document.getElementById('reset');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const questionArea = document.getElementById('question-area');
const scoreArea = document.getElementById('score-area');

const questions = [
    { question: "מהו שם מדינת האי של האי קריביים?", answers: ["הונדורס", "ג'מייקה", "אורוגוואי", "קולומביה"], correctAnswer: 1 },
    { question: "מהי השפה המדוברת ביותר בעולם?", answers: ["אנגלית", "סינית", "ספרדית", "ערבית"], correctAnswer: 1 },
    { question: "איזה גוף נחשב לגורם שמבצע את תהליך הנשימה?", answers: ["העור", "הריאות", "הכבד", "הלב"], correctAnswer: 1 },
    { question: "מהו הים הרחב ביותר?", answers: ["הים התיכון", "הים האדום", "הים הצפוני", "הים השחור"], correctAnswer: 0 },
    { question: "מהו המזון שנחשב לטעים ביותר בעולם?", answers: ["פיצה", "סושי", "פסטה", "המבורגר"], correctAnswer: 0 },
    { question: "מהי העיר אשר נמצאת על שני היבשות, אסיה ואירופה?", answers: ["איסטנבול", "ברצלונה", "רומא", "פריז"], correctAnswer: 0 },
    { question: "מהו צבע הבזיליקום?", answers: ["ירוק", "אדום", "צהוב", "כחול"], correctAnswer: 0 },
    { question: "מי כתב את ספרי 'ההרפתקאות של הילד הארי פוטר'?", answers: ["ג'ורג' אורוול", "ג'יי קיי רולינג", "לואיס קרול", "הנס כריסטיאן אנדרסן"], correctAnswer: 1 },
    { question: "מהי הגבעה שמרבית המבקרים פוגשים כאתר בולט בהודו?", answers: ["ההימלאיה", "הר האוורסט", "ההר ראג'מא", "ההר חימלאיה"], correctAnswer: 0 },
    { question: "מהי בירת ישראל?", answers: ["תל אביב", "חיפה", "ירושלים", "באר שבע"], correctAnswer: 2 },
    { question: "מהו צבע השמיים ביום בהיר?", answers: ["אדום", "כחול", "ירוק", "צהוב"], correctAnswer: 1 },
    { question: "כמה ימים יש בשנה מעוברת?", answers: ["365", "366", "367", "368"], correctAnswer: 1 },
    { question: "מהו החודש האחרון בשנה?", answers: ["נובמבר", "דצמבר", "יולי", "אוגוסט"], correctAnswer: 1 },
    { question: "איזו עיר היא בירת צרפת?", answers: ["ברצלונה", "פריז", "רומא", "לונדון"], correctAnswer: 1 }
];

let score = 0;
let currentQ = 0;

function updateProgress() {
    const pct = ((currentQ + 1) / questions.length) * 100;
    progressBar.style.width = pct + '%';
    progressText.textContent = (currentQ + 1) + ' / ' + questions.length;
}

function displayQuestion() {
    const q = questions[currentQ];
    questionEl.textContent = q.question;
    answerBtns.forEach((btn, i) => {
        btn.textContent = q.answers[i];
        btn.className = 'answer-btn';
        btn.disabled = false;
        btn.onclick = () => checkAnswer(i);
    });
    updateProgress();
}

function checkAnswer(selected) {
    const q = questions[currentQ];
    answerBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correctAnswer) btn.classList.add('correct');
        else if (i === selected) btn.classList.add('incorrect');
    });

    if (selected === q.correctAnswer) score++;

    setTimeout(() => {
        currentQ++;
        if (currentQ < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function endGame() {
    questionArea.style.display = 'none';
    scoreArea.style.display = 'block';
    resultEl.textContent = 'סיימת את הטריוויה!';
    scoreEl.textContent = score + ' / ' + questions.length;
}

resetBtn.addEventListener('click', () => {
    score = 0;
    currentQ = 0;
    scoreArea.style.display = 'none';
    questionArea.style.display = 'block';
    displayQuestion();
});

displayQuestion();
