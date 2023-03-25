const       startPage = document.querySelector(".start_page");
const startBtnWrapper = document.querySelector(".start_btn_wrapper");
const        startBtn = document.querySelector("#start_btn");
const         gameDiv = document.querySelector("#game");
const     gameWrapper = document.querySelector(".game_wrapper");
const           cells = document.querySelector(".cells");
const           field = document.querySelector(".field");


const changeOne = `
    height    : 0px;
    width     : 0px;
    transition: 1s;
    `;
const changeTwo = `
        display: none;
    `;
const changeThree = `
        margin-top: 0px;
        transition: 0.5s;
    `;

startBtn.addEventListener("click", () => {
    startBtnWrapper.style.cssText = changeOne;
    setTimeout(() => {
        startPage.removeChild(startBtnWrapper);

        startPage.style.cssText = changeOne;
        setTimeout(() => {
            document.body.removeChild(startPage);
            gameWrapper.style.cssText = changeThree;
        }, 900)

    }, 900)
})


let board = [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
]


const fieldChange = `
        height    : ${cells.clientHeight}px;
        width     : ${cells.clientHeight}px;

        display  : flex;
        flex-wrap: wrap;
    `;

field.style.cssText = fieldChange;

const cellCss = `
        background: rgb(231, 217, 190);

        height: ${field.clientHeight / 11}px;
        width : ${field.clientHeight / 11}px;

        border: 1px solid black;

        display        : flex;
        justify-content: center;
        align-items    : center;

        font-size: 110%;
    `;

function checkBombs(y, x) {
    let counter = 0;
    if (x > 0) {
        if (board[y][x-1] == "*") {
            counter++;
        }
    }
    if (x > 0 && y > 0) {
        if (board[y-1][x-1] == "*") {
            counter++;
        }
    }
    if (x > 0 && y < 10) {
        if (board[y+1][x-1] == "*") {
            counter++;
        }
    }
    if (x < 10) {
        if (board[y][x+1] == "*") {
            counter++;
        }
    }
    if (x < 10 && y > 0) {
        if (board[y-1][x+1] == "*") {
            counter++;
        }
    }
    if (x < 10 && y < 10) {
        if (board[y+1][x+1] == "*") {
            counter++;
        }
    }
    if (y < 10) {
        if (board[y+1][x] == "*") {
            counter++;
        }
    }
    if (y > 0) {
        if (board[y-1][x] == "*") {
            counter++;
        }
    }
    return counter
}

function checkNeighbours(y, x) {
    if (x > 0) {
        if (checkBombs(y, x-1) == 0) {
            if (board[y][x-1] == ".") {
                allCells[y*11+x-1].innerHTML = 0;
                board[y][x-1] = "x";
                checkNeighbours(y, x-1);
            }
        }
    }
    if (x > 0 && y > 0) {
        if (checkBombs(y-1, x-1) == 0) {
            if (board[y-1][x-1] == ".") {
                allCells[(y-1)*11+x-1].innerHTML = 0;
                board[y-1][x-1] = "x";
                checkNeighbours(y-1, x-1);
            }
        }
    }
    if (x > 0 && y < 10) {
        if (checkBombs(y+1, x-1) == 0) {
            if (board[y+1][x-1] == ".") {
                allCells[(y+1)*11+x-1].innerHTML = 0;
                board[y+1][x-1] = "x";
                checkNeighbours(y+1, x-1);
            }
        }
    }
    if (x < 10) {
        if (checkBombs(y, x+1) == 0) {
            if (board[y][x+1] == ".") {
                allCells[y*11+x+1].innerHTML = 0;
                board[y][x+1] = "x";
                checkNeighbours(y, x+1);
            }
        }
    }
    if (x < 10 && y > 0) {
        if (checkBombs(y-1, x+1) == 0) {
            if (board[y-1][x+1] == ".") {
                allCells[(y-1)*11+x+1].innerHTML = 0;
                board[y-1][x+1] = "x";
                checkNeighbours(y-1, x+1);
            }
        }
    }
    if (x < 10 && y < 10) {
        if (checkBombs(y+1, x+1) == 0) {
            if (board[y+1][x+1] == ".") {
                allCells[(y+1)*11+x+1].innerHTML = 0;
                board[y+1][x+1] = "x";
                checkNeighbours(y+1, x+1);
            }
        }
    }
    if (y < 10) {
        if (checkBombs(y+1, x) == 0) {
            if (board[y+1][x] == ".") {
                allCells[(y+1)*11+x].innerHTML = 0;
                board[y+1][x] = "x";
                checkNeighbours(y+1, x);
            }
        }
    }
    if (y > 0) {
        if (checkBombs(y-1, x) == 0) {
            if (board[y-1][x] == ".") {
                allCells[(y-1)*11+x].innerHTML = 0;
                board[y-1][x] = "x";
                checkNeighbours(y-1, x);
            }
        }
    }
}

for (let i = 0; i < 121; i++) {
    let cell = document.createElement("div")

    cell.addEventListener("mouseover", () => {
        cell.style.cssText += `
                background: rgb(201, 186, 156);
            `
    })
    cell.addEventListener("mouseout", () => {
        cell.style.cssText += `
                background: rgb(231, 217, 190);
            `
    })
    
    cell.style.cssText = cellCss;
    cell.className = "cell";
    field.append(cell);
    
    cell.addEventListener("click", () => {
        y = Math.floor(i/11);
        x = i%11;
        if (board[y][x] == "*") {
            document.body.removeChild(gameWrapper);

            let endScreen = document.createElement("div");
            endScreen.className = "end_screen";
            endScreen.innerHTML = "<h1>You died.</h1>"
            document.body.append(endScreen);
        } else if (cell.innerHTML == "") {

            board[y][x] = "x";
            let bombs = checkBombs(y, x);
            checkNeighbours(y, x);
            cell.innerHTML = bombs;
        }
        let xCount = 0;
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                if (board[i][j] === "x") {
                    xCount++;
                }
            }
        }

        if (xCount === 91) {
            document.body.removeChild(gameWrapper);

            let endScreen = document.createElement("div");
            endScreen.className = "win_screen";
            endScreen.innerHTML = "<h1>You Win.</h1>"
            document.body.append(endScreen);
        }
    })

}

const allCells = document.querySelectorAll(".cell");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

let i = 0;
while (i < 30) {
    let n1 = getRandomInt(11);
    let n2 = getRandomInt(11);

    if (board[n1][n2] != "*") {
        board[n1][n2] = "*";
        i++;
    }
}
