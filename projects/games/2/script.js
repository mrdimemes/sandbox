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

    function swipeRight() {
        let row;
        let nonZeroRow;
        let zeroRow;
        for (let i = 0; i < 4; i++) {
            row = getRow(i);
            nonZeroRow = row.filter(num => num);
            zeroRow = Array(4 - nonZeroRow.length).fill(0);
            row = zeroRow.concat(nonZeroRow);
            setRow(i, row);
        }
    }

    function swipeLeft() {
        let row;
        let nonZeroRow;
        let zeroRow;
        for (let i = 0; i < 4; i++) {
            row = getRow(i);
            nonZeroRow = row.filter(num => num);
            zeroRow = Array(4 - nonZeroRow.length).fill(0);
            row = nonZeroRow.concat(zeroRow);
            setRow(i, row);
        }
    }

    function swipeUp() {
        let column;
        let nonZeroColumn;
        let zeroColumn;
        for (let i = 0; i < 4; i++) {
            column = getColumn(i);
            nonZeroColumn = column.filter(num => num);
            zeroColumn = Array(4 - nonZeroColumn.length).fill(0);
            column = nonZeroColumn.concat(zeroColumn);
            setColumn(i, column);
        }
    }

    function swipeDown() {
        let column;
        let nonZeroColumn;
        let zeroColumn;
        for (let i = 0; i < 4; i++) {
            column = getColumn(i);
            nonZeroColumn = column.filter(num => num);
            zeroColumn = Array(4 - nonZeroColumn.length).fill(0);
            column = zeroColumn.concat(nonZeroColumn);
            setColumn(i, column);
        }
    }
})