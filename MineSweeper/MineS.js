const mineTiles = document.querySelectorAll(".mineTile"), resetBtn = document.getElementById("resetButton");
const mineField = [], mineCounts = [];
let winnerCount = 0;

for (let i = 0; i < Math.sqrt(mineTiles.length); i++) {
    mineField[i] = [];
    mineCounts[i] = [];
}

console.log(mineField);
console.log(mineCounts);

fillTheField();
checkMineCounts();

mineTiles.forEach((button, index) => {
    button.addEventListener('click', () => {
        handleClick(index, button);
    });

    button.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        mineTiles[index].textContent = mineTiles[index].textContent == "M" ? "" : "M";
    });
});

resetBtn.addEventListener("click", resetGame);

function fillTheField() {
    winnerCount = mineTiles.length;
    let mineCount = Math.ceil(mineTiles.length / 2.5);
    for (let i = 0; i < Math.sqrt(mineTiles.length); i++) {
        for (let j = 0; j < Math.sqrt(mineTiles.length); j++) {
            mineField[i][j] = 0;
            if (mineCount > 0) {
                mineField[i][j] = Math.round(Math.random() / 1.4);
                if (mineField[i][j] == 1) {
                    mineCount--;
                    winnerCount--;
                }
            }
            mineCounts[i][j] = 0;
        }
    }
}

function checkMineCounts() {
    for (let i = 0; i < Math.sqrt(mineTiles.length); i++) {
        for (let j = 0; j < Math.sqrt(mineTiles.length); j++) {
            if (tileHasRight(j)) {
                if (mineField[i][j + 1] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasLeft(j)) {
                if (mineField[i][j - 1] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasUp(i)) {
                if (mineField[i - 1][j] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasDown(i)) {
                if (mineField[i + 1][j] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasRight(j) && tileHasDown(i)) {
                if (mineField[i + 1][j + 1] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasRight(j) && tileHasUp(i)) {
                if (mineField[i - 1][j + 1] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasLeft(j) && tileHasDown(i)) {
                if (mineField[i + 1][j - 1] == 1)
                    mineCounts[i][j] += 1;
            }
            if (tileHasLeft(j) && tileHasUp(i)) {
                if (mineField[i - 1][j - 1] == 1)
                    mineCounts[i][j] += 1;
            }
        }
    }
}

function tileHasRight(j) {
    return j + 1 < Math.sqrt(mineTiles.length);
}
function tileHasLeft(j) {
    return j - 1 >= 0;
}
function tileHasUp(i) {
    return i - 1 >= 0;
}
function tileHasDown(i) {
    return i + 1 < Math.sqrt(mineTiles.length);
}

function handleClick(index, button) {
    button.classList.add('clicked');
    const tileX = Math.floor(index / Math.sqrt(mineTiles.length));
    const tileY = Math.floor(index % Math.sqrt(mineTiles.length));
    mineTiles[index].textContent = (mineField[tileX][tileY] == 1) ? "X" : mineCounts[tileX][tileY];
    if (mineField[tileX][tileY] == 1)
        endGame("lose");
    else {
        winnerCount--;
        if (winnerCount <= 0)
            endGame("win");
    }
}


function endGame(situation) {
    resetBtn.disabled = false;
    mineTiles.forEach((button, index) => {
        const tileX = Math.floor(index / Math.sqrt(mineTiles.length));
        const tileY = Math.floor(index % Math.sqrt(mineTiles.length));
        button.textContent = mineField[tileX][tileY];
        button.disabled = true;
        button.classList.add(situation);
    });
}

function resetGame() {
    window.location.reload();
}