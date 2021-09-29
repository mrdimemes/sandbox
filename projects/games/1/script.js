let gameField = document.querySelector("#game-field");

let gameFieldWidth = gameField.offsetWidth;
let gameFieldHeight = gameField.offsetHeight;

let gameFieldCellWidth = gameFieldWidth / 10;
let gameFieldCellHeight = gameFieldHeight / 20;

gameField.width = gameFieldWidth;
gameField.height = gameFieldHeight;

let gameFieldContext = gameField.getContext("2d");

let gameFieldArray = [];


let incomingFigureField = document.querySelector("#incoming-figure-field");

let incomingFigureFieldWidth = incomingFigureField.offsetWidth;
let incomingFigureFieldHeight = incomingFigureField.offsetHeight;

let incomingFigureFieldCellWidth = incomingFigureFieldWidth / 4;
let incomingFigureFieldCellHeight = incomingFigureFieldHeight / 4;

incomingFigureField.width = incomingFigureFieldWidth;
incomingFigureField.height = incomingFigureFieldHeight;

let incomingFigureFieldContext = incomingFigureField.getContext("2d");
incomingFigureFieldContext.strokeStyle = "black";
incomingFigureFieldContext.lineWidth = 2;

const figures = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
    ]
];

colors = ["pink", "blue", "red", "yellow"];



function resetGameFieldArray() {
    let i; let j;
    for (i = 0; i < 27; i++) {
        gameFieldArray[i] = [];
        for (j = 0; j < 16; j++) {
            if ((i < 24) && ((j > 2) && (j < 13))) {
                gameFieldArray[i][j] = 0;
            } else {
                gameFieldArray[i][j] = 1;
            }
        }
    }
};

function clearGameField() {
    gameFieldContext.fillStyle = "white";
    gameFieldContext.fillRect(0, 0, gameFieldWidth, gameFieldHeight);
};

function drawGameField() {
    clearGameField();
    let col = 0;
    for (let row = 4; row < 24; row++) {
        for (col = 3; col < 13; col++) {
            if (gameFieldArray[row][col]) {
                gameFieldContext.fillStyle = gameFieldArray[row][col];
                gameFieldContext.fillRect(
                    (col - 3) * gameFieldCellWidth,
                    (row - 4) * gameFieldCellHeight,
                    gameFieldCellWidth,
                    gameFieldCellHeight
                );
                gameFieldContext.strokeRect(
                    (col - 3) * gameFieldCellWidth,
                    (row - 4) * gameFieldCellHeight,
                    gameFieldCellWidth,
                    gameFieldCellHeight
                );
            }
        }
    }
};

function clearIncomingFigureField() {
    incomingFigureFieldContext.fillStyle = "white";
    incomingFigureFieldContext.fillRect(0, 0,
        incomingFigureFieldWidth, incomingFigureFieldHeight);
};

function drawIncomingFigure(figure, color) {
    clearIncomingFigureField();
    incomingFigureFieldContext.fillStyle = color;
    let col = 0;
    for (let row = 0; row < 4; row++) {
        for (col = 0; col < 4; col++) {
            if (figure[row][col]) {
                incomingFigureFieldContext.fillRect(
                    col * incomingFigureFieldCellWidth,
                    row * incomingFigureFieldCellHeight,
                    incomingFigureFieldCellWidth,
                    incomingFigureFieldCellHeight
                );
                incomingFigureFieldContext.strokeRect(
                    col * incomingFigureFieldCellWidth,
                    row * incomingFigureFieldCellHeight,
                    incomingFigureFieldCellWidth,
                    incomingFigureFieldCellHeight
                )
            }
        }
    }
};

function rotateFigureClockwise(figure) {
    //transpose
    let rotetedFigure = figure.map(
        (element, index) => figure.map(
            element => element[index]
        )
    );
    //reverse by rows
    return rotetedFigure.map(element => element.reverse());
};

function rotateFigureCounterClockwise(figure) {
    //deep copy
    let rotetedFigure = figure.map(row => row.slice());
    //reverse by rows
    rotetedFigure = rotetedFigure.map(element => element.reverse());
    //transpose
    return rotetedFigure.map(
        (element, index) => rotetedFigure.map(
            element => element[index]
        )
    )
};

function getRandomFigure() {
    //deep copy of random figure
    let newFigure = figures[Math.floor(Math.random() * figures.length)].map(
        row => row.slice()
    );
    //random rotation
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        newFigure = rotateFigureClockwise(newFigure);
    };
    //random color
    let figureColor = colors[Math.floor(Math.random() * colors.length)]
    return [newFigure, figureColor];
};



let currentFigure;
let currentFigureColor;
let currentFigureX;
let currentFigureY;
let incomingFigure;
let incomingFigureColor;

function changeCurrentFigure() {
    if ((typeof nextFigure) == "undefined") {
        [currentFigure, currentFigureColor] = getRandomFigure();
    } else {
        currentFigure = nextFigure;
        currentFigureColor = nextFigureColor;
    };
    [incomingFigure, incomingFigureColor] = getRandomFigure();
    currentFigureX = 0;
    currentFigureY = 6;
};

function drawCurrentFigure() {
    gameFieldContext.fillStyle = currentFigureColor;
    let col = currentFigureY;
    for (let row = currentFigureX; row < currentFigureX + 4; row++) {
        if (row < 4) {continue;};
        for (col = currentFigureY; col < currentFigureY + 4; col++) {
            if (currentFigure[row - currentFigureX][col - currentFigureY]) {
                gameFieldContext.fillRect(
                    (col - 3) * gameFieldCellWidth,
                    (row - 4) * gameFieldCellHeight,
                    gameFieldCellWidth,
                    gameFieldCellHeight
                );
                gameFieldContext.strokeRect(
                    (col - 3) * gameFieldCellWidth,
                    (row - 4) * gameFieldCellHeight,
                    gameFieldCellWidth,
                    gameFieldCellHeight
                );
            }
        }
    }
}

function checkCollisions(figure, figureX, figureY) {
    let col;
    for (let row = figureX; row < figureX + 4; row++) {
        for (col = figureY; col < figureY + 4; col++) {
            if (gameFieldArray[row][col]) {
                if (figure[row - figureX][col - figureY]) {
                    return true;
                }
            }
        }
    };
    return false;
}

function saveCurrentFigureToGameFieldArray() {
    let col;
    for (let row = currentFigureX; row < currentFigureX + 4; row++) {
        for (col = currentFigureY; col < currentFigureY + 4; col++) {
            if (currentFigure[row - currentFigureX][col - currentFigureY]) {
                gameFieldArray[row][col] = currentFigureColor;
            }
        }
    }
}

let scoreCounter = document.querySelector("#score-counter");


function increaseScore(killedRowsCount) {
    switch (killedRowsCount) {
        case 1:
            score += 100;
            break;
        case 2:
            score += 300;
            break;
        case 3:
            score += 700;
            break;
        case 4:
            score += 1500;
            break;
    }
    scoreCounter.innerHTML = score;
}

function checkCompliteRow(row) {
    for (let i = 3; i < 13; i++) {
        if (!row[i]) {
            return false;
        }
    }
    return true;
}

function overlapRows(rowsIndexesArray) {
    let clearedGameFieldArray = [];
    let oldArrayRowIndex;
    let clearedArrayRowIndex;
    console.log(rowsIndexesArray);
    for (clearedArrayRowIndex = 0;
         clearedArrayRowIndex < 4 +  rowsIndexesArray.length;
         clearedArrayRowIndex++) {
        clearedGameFieldArray[clearedArrayRowIndex] = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
    };
    console.log(clearedGameFieldArray);
    for (clearedArrayRowIndex = 24;
         clearedArrayRowIndex < 27;
         clearedArrayRowIndex++) {
        clearedGameFieldArray[clearedArrayRowIndex] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    };
    console.log(clearedGameFieldArray);
    for ([oldArrayRowIndex, clearedArrayRowIndex] = [23, 23];
         oldArrayRowIndex > 3;
         oldArrayRowIndex--) {
        if (rowsIndexesArray.indexOf(oldArrayRowIndex) != -1) {
            continue;
        };
        clearedGameFieldArray[clearedArrayRowIndex] = gameFieldArray[oldArrayRowIndex];
        clearedArrayRowIndex--;
    }
    console.log(clearedGameFieldArray);
    gameFieldArray = clearedGameFieldArray;
}

function killCompleteRows() {
    let killedRowsIndexes = [];
    for (let row = 4; row < 24; row++) {
        if (checkCompliteRow(gameFieldArray[row])) {
            killedRowsIndexes.push(row);
        }
    }
    let killedRowsCount = killedRowsIndexes.length;
    if (killedRowsCount) {
        overlapRows(killedRowsIndexes);
        increaseScore(killedRowsCount);
    }
}



let gameSpeed;
let score;
let timerId;
let gameOverMassage = document.querySelector("#game-over-massage");

function gameOver() {
    clearTimeout(timerId);
    clearIncomingFigureField();
    gameOverMassage.classList.toggle("active");
}

function currentFigureFallIteration() {
    let targetX = currentFigureX + 1;
    if (checkCollisions(currentFigure, targetX, currentFigureY)) {
        if (currentFigureX < 2) {
            gameOver();
            return;
        }
        saveCurrentFigureToGameFieldArray();
        killCompleteRows();
        changeCurrentFigure();
        drawIncomingFigure(incomingFigure, incomingFigureColor);
    } else {
        currentFigureX = targetX;
    }
    drawGameField();
    drawCurrentFigure();
};

function moveCurrentFigureRight() {
    let targetY = currentFigureY + 1;
    if (!checkCollisions(currentFigure, currentFigureX, targetY)) {
        currentFigureY = targetY;
        drawGameField();
        drawCurrentFigure();
    }
}

function moveCurrentFigureLeft() {
    let targetY = currentFigureY - 1;
    if (!checkCollisions(currentFigure, currentFigureX, targetY)) {
        currentFigureY = targetY;
        drawGameField();
        drawCurrentFigure();
    }
}

function rotateCurrentFigureClockwise() {
    let rotatedFigure = rotateFigureClockwise(currentFigure);
    if (!checkCollisions(rotatedFigure, currentFigureX, currentFigureY)) {
        currentFigure = rotatedFigure;
        drawGameField();
        drawCurrentFigure();
    }
}

function rotateCurrentFigureCounterClockwise() {
    let rotatedFigure = rotateFigureCounterClockwise(currentFigure);
    if (!checkCollisions(rotatedFigure, currentFigureX, currentFigureY)) {
        currentFigure = rotatedFigure;
        drawGameField();
        drawCurrentFigure();
    }
}

let keyRight = document.querySelector("#key-right");
let keyLeft = document.querySelector("#key-left");
let keyDown = document.querySelector("#key-down");
let keyRotateClockwise = document.querySelector("#key-clockwise");
let keyRotateCounterClockwise = document.querySelector("#key-counter-clockwise");

let startButton = document.querySelector("#start-button");
let pauseButton = document.querySelector("#pause-button");


keyRight.addEventListener("click", moveCurrentFigureRight);
keyLeft.addEventListener("click", moveCurrentFigureLeft);
keyRotateClockwise.addEventListener("click", rotateCurrentFigureClockwise);
keyRotateCounterClockwise.addEventListener("click", rotateCurrentFigureCounterClockwise);


function startGame() {
    score = 0;
    scoreCounter.innerHTML = score;
    if (gameOverMassage.classList.contains("active")) {
        gameOverMassage.classList.toggle("active");
    }
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = undefined;
    gameSpeed = 1000;
    resetGameFieldArray();
    drawGameField();
    changeCurrentFigure();
    drawIncomingFigure(incomingFigure, incomingFigureColor);
    console.log(timerId);
    timerId = setTimeout(function gameIteration() {
        currentFigureFallIteration();
        timerId = setTimeout(gameIteration, gameSpeed);
    }, gameSpeed);
}


function pauseGame() {
    pauseButton.classList.toggle("active");
    console.log(gameSpeed);
    console.log(timerId);
    if (gameSpeed) {
        if (pauseButton.classList.contains("active")) {
            clearTimeout(timerId);
        } else {
            timerId = setTimeout(function gameIteration() {
                currentFigureFallIteration();
                timerId = setTimeout(gameIteration, gameSpeed);
            }, gameSpeed);
        }
    }
}

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);

