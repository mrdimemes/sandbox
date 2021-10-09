document.addEventListener("DOMContentLoaded", () => {
    const gameField = document.querySelector(".game-field");

    let tilesArray = [];

    // creating tiles
    function createGameTiles() {
        let tile;
        for (let i = 0; i < 16; i++) {
            tile = document.createElement("div");
            tile.className = "game-field-tile"
            tile.innerHTML = "0";
            gameField.appendChild(tile);
            tilesArray.push(tile);
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
            if (tilesArray[randomIndex].innerHTML == 0) {
                tilesArray[randomIndex].innerHTML = randomValue;
                break;
            }
        }
    }
    spawnNewNumber();

    // swiping functional
    function getRow(rowIndex) {
        return [
            parseInt(tilesArray[4 * rowIndex].innerHTML),
            parseInt(tilesArray[4 * rowIndex + 1].innerHTML),
            parseInt(tilesArray[4 * rowIndex + 2].innerHTML),
            parseInt(tilesArray[4 * rowIndex + 3].innerHTML)
        ];
    }

    function setRow(rowIndex, newRow) {
        tilesArray[4 * rowIndex].innerHTML = newRow[0];
        tilesArray[4 * rowIndex + 1].innerHTML = newRow[1];
        tilesArray[4 * rowIndex + 2].innerHTML = newRow[2];
        tilesArray[4 * rowIndex + 3].innerHTML = newRow[3];
    }

    function getColumn(columnIndex) {
        return [
            parseInt(tilesArray[columnIndex].innerHTML),
            parseInt(tilesArray[columnIndex + 4].innerHTML),
            parseInt(tilesArray[columnIndex + 8].innerHTML),
            parseInt(tilesArray[columnIndex + 12].innerHTML)
        ];
    }

    function setColumn(columnIndex, newColumn) {
        tilesArray[columnIndex].innerHTML = newColumn[0];
        tilesArray[columnIndex + 4].innerHTML = newColumn[1];
        tilesArray[columnIndex + 8].innerHTML = newColumn[2];
        tilesArray[columnIndex + 12].innerHTML = newColumn[3];
    }

    function directConcatenation(firstArray, secondArray) {
        return firstArray.concat(secondArray);
    }

    function reverseConcatenation(firstArray, secondArray) {
        return secondArray.concat(firstArray);
    }

    function combineNumbers(nonZeroFieldItem) {
        let combinedArray = [];
        let numberMemoryCell = nonZeroFieldItem[0];
        for (let i = 1; i < nonZeroFieldItem.length; i++) {
            if (nonZeroFieldItem[i] == numberMemoryCell) {
                numberMemoryCell += nonZeroFieldItem[i];
            } else {
                combinedArray.push(numberMemoryCell);
                numberMemoryCell = nonZeroFieldItem[i];
            }
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
})