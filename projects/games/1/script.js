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

let currentFigure;
let currentFigureColor;
let currentFigureX;
let currentFigureY;
let incomingFigure;
let incomingFigureColor;

let scoreCounter = document.querySelector("#score-counter");

let gameSpeed;
let speedUpCounter = 1;
let speedUpScoreLevel = 10000;

let score;
let mainTimerId;
let secondaryTimerId;
let secondaryTimerSpeed = 200;


let gameOverMassage = document.querySelector("#game-over-massage");
let gameOverFlag = false;

let keyRight = document.querySelector("#key-right");
let keyLeft = document.querySelector("#key-left");
let keyDown = document.querySelector("#key-down");
let downKeyPressedFlag = false;
let keyRotateClockwise = document.querySelector("#key-clockwise");
let keyRotateCounterClockwise = document.querySelector("#key-counter-clockwise");

let startButton = document.querySelector("#start-button");
let pauseButton = document.querySelector("#pause-button");



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

colors = [
    "#7fffd4", "#8a2be2", "#7FFF00", "#5F9EA0",
    "#FF7F50", "#B8860B", "#FF8C00", "#228B22",
    "#ADFF2F", "#7CFC00", "#FF00FF", "#BA55D3",
    "#00FA9A", "#FF4500", "#FF6347", "#B22222"
];


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

function changeCurrentFigure() {
    if ((typeof incomingFigure) == "undefined") {
        [currentFigure, currentFigureColor] = getRandomFigure();
    } else {
        currentFigure = incomingFigure;
        currentFigureColor = incomingFigureColor;
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

function changeGameSpeed(weight) {
    gameSpeed = Math.floor(gameSpeed * weight);
}

function increaseScore(income) {
    if (downKeyPressedFlag) {
        score += (income * 10 / gameSpeed);
    } else {
        score += (income * 1000 / gameSpeed);
    };
    scoreCounter.innerHTML = Math.floor(score);
}

function increaseScoreByKilledRows(killedRowsCount) {
    switch (killedRowsCount) {
        case 1:
            increaseScore(100);
            break;
        case 2:
            increaseScore(300);
            break;
        case 3:
            increaseScore(700);
            break;
        case 4:
            increaseScore(1500);
            break;
    }
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
    for (clearedArrayRowIndex = 0;
         clearedArrayRowIndex < 4 +  rowsIndexesArray.length;
         clearedArrayRowIndex++) {
        clearedGameFieldArray[clearedArrayRowIndex] = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
    };
    for (clearedArrayRowIndex = 24;
         clearedArrayRowIndex < 27;
         clearedArrayRowIndex++) {
        clearedGameFieldArray[clearedArrayRowIndex] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    };
    for ([oldArrayRowIndex, clearedArrayRowIndex] = [23, 23];
         oldArrayRowIndex > 3;
         oldArrayRowIndex--) {
        if (rowsIndexesArray.indexOf(oldArrayRowIndex) != -1) {
            continue;
        };
        clearedGameFieldArray[clearedArrayRowIndex] = gameFieldArray[oldArrayRowIndex];
        clearedArrayRowIndex--;
    }
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
        increaseScoreByKilledRows(killedRowsCount);
    }
}

function gameOver() {
    clearTimeout(mainTimerId);
    clearIncomingFigureField();
    gameOverMassage.classList.toggle("active");
    gameOverFlag = true;
}

function currentFigureFallIteration() {
    let targetX = currentFigureX + 1;
    if (checkCollisions(currentFigure, targetX, currentFigureY)) {
        if (currentFigureX < 2) {
            gameOver();
            return;
        }
        saveCurrentFigureToGameFieldArray();
        increaseScore(5);
        if (downKeyPressedFlag) {
            processKeyDownUnpress();
        };
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

function clearSecondaryTimer() {
    if (secondaryTimerId) {
        clearTimeout(secondaryTimerId);
        secondaryTimerId = undefined;
    }
}


function processKeyRightPress() {
    clearSecondaryTimer();
    secondaryTimerId = setTimeout(function iteration() {
        moveCurrentFigureRight();
        secondaryTimerId = setTimeout(iteration, secondaryTimerSpeed);
    }, 0);
};

function processKeyRightUnpress() {
    clearSecondaryTimer();
};

function processKeyLeftPress() {
    clearSecondaryTimer();
    secondaryTimerId = setTimeout(function iteration() {
        moveCurrentFigureLeft();
        secondaryTimerId = setTimeout(iteration, secondaryTimerSpeed);
    }, 0);
};

function processKeyLeftUnpress() {
    clearSecondaryTimer();
};

function processKeyDownPress() {
    if (downKeyPressedFlag) {
        return;
    }
    downKeyPressedFlag = true;
    changeGameSpeed(0.01);
};

function processKeyDownUnpress() {
    if (downKeyPressedFlag) {
        downKeyPressedFlag = false;
        changeGameSpeed(100);
    };
};

function processKeyRotateClockwisePress() {
    clearSecondaryTimer();
    secondaryTimerId = setTimeout(function iteration() {
        rotateCurrentFigureClockwise();
        secondaryTimerId = setTimeout(iteration, secondaryTimerSpeed);
    }, 0);
};

function processKeyRotateClockwiseUnpress() {
    clearSecondaryTimer();
};

function processKeyRotateCounterClockwisePress() {
    clearSecondaryTimer();
    secondaryTimerId = setTimeout(function iteration() {
        rotateCurrentFigureCounterClockwise();
        secondaryTimerId = setTimeout(iteration, secondaryTimerSpeed);
    }, 0);
};

function processKeyRotateCounterClockwiseUnpress() {
    clearSecondaryTimer();
};

function scaleGameSpeedByScore() {
    if (score > speedUpCounter * speedUpScoreLevel) {
        changeGameSpeed(0.9);
        speedUpCounter++;
    }
}

function startGame() {
    score = 0;
    scoreCounter.innerHTML = score;
    if (gameOverMassage.classList.contains("active")) {
        gameOverMassage.classList.toggle("active");
    }
    if (pauseButton.classList.contains("active")) {
        pauseButton.classList.toggle("active");
    }
    if (mainTimerId) {
        clearTimeout(mainTimerId);
    }
    mainTimerId = undefined;
    gameSpeed = 1000;
    resetGameFieldArray();
    drawGameField();
    changeCurrentFigure();
    drawIncomingFigure(incomingFigure, incomingFigureColor);
    mainTimerId = setTimeout(function gameIteration() {
        currentFigureFallIteration();
        if (gameOverFlag) {
            return;
        };
        scaleGameSpeedByScore();
        mainTimerId = setTimeout(gameIteration, gameSpeed);
    }, gameSpeed);
    if (gameOverFlag) {
        gameOverFlag = false;
        startGame();
    };
}


function pauseGame() {
    pauseButton.classList.toggle("active");
    if (gameSpeed) {
        if (pauseButton.classList.contains("active")) {
            clearTimeout(mainTimerId);
        } else {
            mainTimerId = setTimeout(function gameIteration() {
                currentFigureFallIteration();
                mainTimerId = setTimeout(gameIteration, gameSpeed);
            }, gameSpeed);
        }
    }
}

function processKeyboardKeyDown(event) {
    if (event.repeat) {return;}
    switch (event.code) {
        case "ArrowLeft":
            processKeyLeftPress();
            break;
        case "ArrowRight":
            processKeyRightPress();
            break;
        case "ArrowDown":
            processKeyDownPress();
            break;
        case "KeyA":
            processKeyLeftPress();
            break;
        case "KeyD":
            processKeyRightPress();
            break;
        case "KeyS":
            processKeyDownPress();
            break;
        case "KeyQ":
            processKeyRotateCounterClockwisePress();
            break;
        case "KeyE":
            processKeyRotateClockwisePress();
            break;
        case "Space":
            pauseGame();
            break;
        case "Enter":
            startGame();
            break;
    }
};

function processKeyboardKeyUp(event) {
    if (event.repeat) {return;}
    switch (event.code) {
        case "ArrowLeft":
            processKeyLeftUnpress();
            break;
        case "ArrowRight":
            processKeyRightUnpress();
            break;
        case "ArrowDown":
            processKeyDownUnpress();
            break;
        case "KeyA":
            processKeyLeftUnpress();
            break;
        case "KeyD":
            processKeyRightUnpress();
            break;
        case "KeyS":
            processKeyDownUnpress();
            break;
        case "KeyQ":
            processKeyRotateCounterClockwiseUnpress();
            break;
        case "KeyE":
            processKeyRotateClockwiseUnpress();
            break;
    }
};

keyRight.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    processKeyRightPress();
});
keyRight.addEventListener("pointerup", (event) => {
    event.preventDefault();
    processKeyRightUnpress();
});

keyLeft.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    processKeyLeftPress();
});
keyLeft.addEventListener("pointerup", (event) => {
    event.preventDefault();
    processKeyLeftUnpress();
});

keyDown.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    processKeyDownPress();
});
keyDown.addEventListener("pointerup", (event) => {
    event.preventDefault();
    processKeyDownUnpress();
});

keyRotateClockwise.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    processKeyRotateClockwisePress();
});
keyRotateClockwise.addEventListener("pointerup", (event) => {
    event.preventDefault();
    processKeyRotateClockwiseUnpress();
});

keyRotateCounterClockwise.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    processKeyRotateCounterClockwisePress();
});
keyRotateCounterClockwise.addEventListener("pointerup", (event) => {
    event.preventDefault();
    processKeyRotateCounterClockwiseUnpress();
});

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);

startButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
});
pauseButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
});

document.addEventListener("keydown", processKeyboardKeyDown);
document.addEventListener("keyup", processKeyboardKeyUp);