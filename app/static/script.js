let currentPlayer = 'X';
let size = 3;

document.addEventListener("DOMContentLoaded", () => {
    createBoard(size);
});

function createBoard(size) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    boardDiv.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", () => makeMove(i, j, cell));
            boardDiv.appendChild(cell);
        }
    }
}

async function makeMove(row, col, cell) {
    if (cell.innerText === '') {
        cell.innerText = currentPlayer;
        const response = await fetch('/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ row, col, player: currentPlayer })
        });
        const data = await response.json();
        if (data.status === "win") {
            alert(`Player ${data.player} wins!`);
            await resetGame();
        } else if (data.status === "draw") {
            alert("It's a draw!");
            await resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

async function resetGame() {
    const select = document.getElementById("board-size");
    size = parseInt(select.value);
    createBoard(size);
    currentPlayer = 'X';
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    await fetch(`/reset/${size}`);
}
