let turn = true;
let btnClicked = 0;
let cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turnText");

cells.forEach(c => c.addEventListener("click", cellClick));

function cellClick() {
    if (this.textContent !== "") return;

    this.textContent = turn ? "X" : "O";
    this.classList.add(turn ? "x-mark" : "o-mark");
    btnClicked++;

    const result = checkWin();
    if (result.win) {
        result.pos.forEach(i => cells[i].classList.add("win"));
        setTimeout(() => {
            alert(this.textContent + " ניצח!");
            reset();
        }, 200);
    } else if (result.isTie) {
        setTimeout(() => {
            alert("תיקו!");
            reset();
        }, 200);
    }

    turn = !turn;
    turnText.textContent = "תור: " + (turn ? "X" : "O");
}

function reset() {
    turn = true;
    btnClicked = 0;
    cells.forEach(c => {
        c.textContent = "";
        c.className = "cell";
    });
    turnText.textContent = "תור: X";
}

function checkWin() {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of lines) {
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            return { win: true, isTie: false, pos: [a,b,c] };
        }
    }
    if (btnClicked === 9) return { win: false, isTie: true, pos: [] };
    return { win: false, isTie: false, pos: [] };
}

document.getElementById("restartButton").addEventListener("click", reset);
