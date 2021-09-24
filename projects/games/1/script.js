let gameField = document.querySelector("#game-field");

let gameFieldWidth = gameField.offsetWidth;
let gameFieldHeight = gameField.offsetHeight;

let gameFieldCellWidth = gameFieldWidth / 10;
let gameFieldCellHeight = gameFieldHeight / 20;

gameField.width = gameFieldWidth;
gameField.height = gameFieldHeight;

let gameFieldContext = gameField.getContext("2d");

let gameFieldArray;


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




const figureI = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
];

const figureL = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];

const figureJ = [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];

const figureO = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];

const figureZ = [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];

const figureS = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
];

const figureT = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
];



function resetGameFieldArray() {
    let i; let j;
    for (i = 0; i < 20; i++) {
        for (j = 0; j < 10; j++) {
            gameFieldArray[i][j] = 0;
        }
    }
}

function clearGameField() {
    gameFieldContext.fillStyle = "white";
    gameFieldContext.fillRect(0, 0, gameFieldWidth, gameFieldHeight);
}

function drawGameField() {
    clearGameField();
    let col = 0;
    for (let row = 0; row < 20; row++) {
        for (col = 0; col < 10; col++) {
            if (figure[row][col]) {
                gameFieldContext.fillStyle = figure[row][col];
                gameFieldContext.fillRect(
                    col * gameFieldCellWidth,
                    row * gameFieldCellHeight,
                    gameFieldCellWidth,
                    gameFieldCellHeight
                );
                gameFieldContext.strokeRect(
                    col * gameFieldCellWidth,
                    row * gameFieldCellHeight,
                    gameFieldCellWidth,
                    gameFieldCellHeight
                );
            }
        }
    };
}

function clearIncomingFigureField() {
    incomingFigureFieldContext.fillStyle = "white";
    incomingFigureFieldContext.fillRect(0, 0,
        incomingFigureFieldWidth, incomingFigureFieldHeight);
}

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
}

function rotateFigureClockwise(figure) {
    //transpose
    let rotetedFigure = figure.map(
        (element, index) => figure.map(
            element => element[index]
        )
    );
    alert(figure === rotetedFigure);
    //reverse by rows
    return rotetedFigure.map(element => element.reverse());
}

function rotateFigureCounterClockwise(figure) {
    //reverse by rows
    let rotetedFigure = figure.map(row => row.slice());
    rotetedFigure = rotetedFigure.map(element => element.reverse());
    //transpose
    return rotetedFigure.map(
        (element, index) => rotetedFigure.map(
            element => element[index]
        )
    );
}
