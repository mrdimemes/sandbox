document.addEventListener("DOMContentLoaded", () => {
    const gameField = document.querySelector(".game-field");
    const scoreField = document.querySelector(".score-field");
    const gameOverField = document.querySelector(".game-over-field");
    const winField = document.querySelector(".win-field");
    const newGameButton = document.querySelector(".new-game-button");

    let tilesArray = [];
    let numbersArray = [];
    let score = 0;

    // creating tiles
    function createGameTiles() {
        let tile;
        for (let i = 0; i < 16; i++) {
            tile = document.createElement("div");
            tile.className = "game-field-tile"
            tile.innerHTML = "0";
            gameField.appendChild(tile);
            tilesArray.push(tile);
            numbersArray.push(0);
        }
    }
    createGameTiles();

    function spawnNewNumber() {
        let randomIndex;
        let randomValue;
        if (Math.random() < 0.9) {
            randomValue = 2;
        } else {
            randomValue = 4;
        }
        while (true) {
            randomIndex = Math.floor(Math.random() * 15);
            if (numbersArray[randomIndex] == 0) {
                numbersArray[randomIndex] = randomValue;
                break;
            }
        }
    }

    function refreshGameTiles() {
        for (let i = 0; i < 16; i++) {
            tilesArray[i].innerHTML = numbersArray[i];
        }
    }

    // score counting functional
    function increaseScore(income) {
        score += income;
    }

    function refreshScore() {
        scoreField.innerHTML = score;
    }

    function scoreIteration(income) {
        increaseScore(income);
        refreshScore();
    }
    refreshScore();

    // new game functional
    function clearNumbers() {
        for (let i = 0; i < 16; i++) {
            tilesArray[i].innerHTML = 0;
            numbersArray[i] = 0;
        }
    }

    function newGame() {
        clearNumbers();
        spawnNewNumber();
        spawnNewNumber();
        score = 0;
        refreshScore();
        refreshGameTiles();
    }

    newGameButton.addEventListener("click", newGame);

    // game over functional
    function gameOver() {
        if (gameOverField.classList.contains("active")) {
            gameOverField.classList.add("active");
        }
    }

    // win functional
    function win() {
        if (winField.classList.contains("active")) {
            winField.classList.add("active");
        }
    }

    // swiping functional
    function getRow(rowIndex) {
        return [
            numbersArray[4 * rowIndex],
            numbersArray[4 * rowIndex + 1],
            numbersArray[4 * rowIndex + 2],
            numbersArray[4 * rowIndex + 3]
        ];
    }

    function setRow(rowIndex, newRow) {
        numbersArray[4 * rowIndex] = newRow[0];
        numbersArray[4 * rowIndex + 1] = newRow[1];
        numbersArray[4 * rowIndex + 2] = newRow[2];
        numbersArray[4 * rowIndex + 3] = newRow[3];
    }

    function getColumn(columnIndex) {
        return [
            numbersArray[columnIndex],
            numbersArray[columnIndex + 4],
            numbersArray[columnIndex + 8],
            numbersArray[columnIndex + 12]
        ];
    }

    function setColumn(columnIndex, newColumn) {
        numbersArray[columnIndex] = newColumn[0];
        numbersArray[columnIndex + 4] = newColumn[1];
        numbersArray[columnIndex + 8] = newColumn[2];
        numbersArray[columnIndex + 12] = newColumn[3];
    }

    function directConcatenation(firstArray, secondArray) {
        return firstArray.concat(secondArray);
    }

    function reverseConcatenation(firstArray, secondArray) {
        return secondArray.concat(firstArray);
    }

    function combineNumbers(nonZeroFieldItem) {
        let combinedArray = [];
        if (nonZeroFieldItem.length) {
            let numberMemoryCell = nonZeroFieldItem[0];
            for (let i = 1; i < nonZeroFieldItem.length; i++) {
                if (nonZeroFieldItem[i] == numberMemoryCell) {
                    numberMemoryCell += nonZeroFieldItem[i];
                    scoreIteration(numberMemoryCell);
                } else {
                    combinedArray.push(numberMemoryCell);
                    numberMemoryCell = nonZeroFieldItem[i];
                }
            }
            combinedArray.push(numberMemoryCell);
        }
        return combinedArray;
    }

    function reverseCombineNumbers(nonZeroFieldItem) {
        let reversedFieldItem = nonZeroFieldItem.slice().reverse();
        let combinedArray = combineNumbers(reversedFieldItem);
        return combinedArray.reverse();
    }

    function swipe(getFunction, combineNumbersFunction, concatFunction, setFunction) {
        let fieldItem;
        let nonZeroFieldItem;
        let zeroFieldItem;
        for (let i = 0; i < 4; i++) {
            fieldItem = getFunction(i);
            nonZeroFieldItem = fieldItem.filter(num => num);
            nonZeroFieldItem = combineNumbersFunction(nonZeroFieldItem);
            zeroFieldItem = Array(4 - nonZeroFieldItem.length).fill(0);
            fieldItem = concatFunction(nonZeroFieldItem, zeroFieldItem);
            setFunction(i, fieldItem);
        }
    }

    function swipeRight() {
        swipe(getRow, reverseCombineNumbers, reverseConcatenation, setRow);
    }

    function swipeLeft() {
        swipe(getRow, combineNumbers, directConcatenation, setRow);
    }

    function swipeUp() {
        swipe(getColumn, combineNumbers, directConcatenation, setColumn);
    }

    function swipeDown() {
        swipe(getColumn, reverseCombineNumbers, reverseConcatenation, setColumn);
    }

    function isArraysEqual(arrayA, arrayB) {
        if (arrayA.length != arrayB.length) {
            return false;
        }
        for (let i = 0; i < arrayA.length; i++) {
            if (arrayA[i] != arrayB[i]) {
                return false;
            }
        }
        return true;
    }

    function isNextSwipeAvailable() {
        let numbersArrayCurrentState = numbersArray.slice();
        let swipeFuncArray = [swipeLeft, swipeRight, swipeUp, swipeDown];
        for (const swipeFunc of swipeFuncArray) {
            swipeFunc();
            if (!isArraysEqual(numbersArrayCurrentState, numbersArray)) {
                numbersArray = numbersArrayCurrentState;
                return true;
            };
        }
        return false;
    }

    function processKeyboardInteraction(event) {
        if (event.repeat) {return;}
        switch (event.code) {
            case "ArrowLeft":
                swipeLeft();
                break;
            case "ArrowRight":
                swipeRight();
                break;
            case "ArrowDown":
                swipeDown();
                break;
            case "ArrowUp":
                swipeUp();
                break;
        }
    };

    document.addEventListener("keydown", processKeyboardInteraction);

})