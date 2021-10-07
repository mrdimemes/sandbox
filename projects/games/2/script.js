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

    function swipeRight() {
        let row;
        let nonZeroRow;
        let zeroRow;
        for (let i = 0; i < 4; i++) {
            row = [
                parseInt(tilesArray[4 * i].innerHTML),
                parseInt(tilesArray[4 * i + 1].innerHTML),
                parseInt(tilesArray[4 * i + 2].innerHTML),
                parseInt(tilesArray[4 * i + 3].innerHTML)
            ];
            nonZeroRow = row.filter(num => num);
            zeroRow = Array(4 - nonZeroRow.length).fill(0);
            row = zeroRow.concat(nonZeroRow);
            tilesArray[4 * i].innerHTML = row[0];
            tilesArray[4 * i + 1].innerHTML = row[1];
            tilesArray[4 * i + 2].innerHTML = row[2];
            tilesArray[4 * i + 3].innerHTML = row[3];
        }
    }

    function swipeLeft() {
        let row;
        let nonZeroRow;
        let zeroRow;
        for (let i = 0; i < 4; i++) {
            row = [
                parseInt(tilesArray[4 * i].innerHTML),
                parseInt(tilesArray[4 * i + 1].innerHTML),
                parseInt(tilesArray[4 * i + 2].innerHTML),
                parseInt(tilesArray[4 * i + 3].innerHTML)
            ];
            nonZeroRow = row.filter(num => num);
            zeroRow = Array(4 - nonZeroRow.length).fill(0);
            row = nonZeroRow.concat(zeroRow);
            tilesArray[4 * i].innerHTML = row[0];
            tilesArray[4 * i + 1].innerHTML = row[1];
            tilesArray[4 * i + 2].innerHTML = row[2];
            tilesArray[4 * i + 3].innerHTML = row[3];
        }
    }

    function swipeUp() {
        let row;
        let nonZeroRow;
        let zeroRow;
        for (let i = 0; i < 4; i++) {
            row = [
                parseInt(tilesArray[i].innerHTML),
                parseInt(tilesArray[i + 4].innerHTML),
                parseInt(tilesArray[i + 8].innerHTML),
                parseInt(tilesArray[i + 12].innerHTML)
            ];
            nonZeroRow = row.filter(num => num);
            zeroRow = Array(4 - nonZeroRow.length).fill(0);
            row = nonZeroRow.concat(zeroRow);
            tilesArray[i].innerHTML = row[0];
            tilesArray[i + 4].innerHTML = row[1];
            tilesArray[i + 8].innerHTML = row[2];
            tilesArray[i + 12].innerHTML = row[3];
        }
    }

    function swipeDown() {
        let row;
        let nonZeroRow;
        let zeroRow;
        for (let i = 0; i < 4; i++) {
            row = [
                parseInt(tilesArray[i].innerHTML),
                parseInt(tilesArray[i + 4].innerHTML),
                parseInt(tilesArray[i + 8].innerHTML),
                parseInt(tilesArray[i + 12].innerHTML)
            ];
            nonZeroRow = row.filter(num => num);
            zeroRow = Array(4 - nonZeroRow.length).fill(0);
            row = zeroRow.concat(nonZeroRow);
            tilesArray[i].innerHTML = row[0];
            tilesArray[i + 4].innerHTML = row[1];
            tilesArray[i + 8].innerHTML = row[2];
            tilesArray[i + 12].innerHTML = row[3];
        }
    }
})