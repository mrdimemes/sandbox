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
            console.log(tile);
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
})