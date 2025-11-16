const mapSize = 600;
const antAmount = 35;
const foodAmount = 5;
const timeBetweenMovesMs = 100;

function spawnAnts() {
    let antSpawned = 0;
    while (antSpawned < antAmount) {
        const ant = { id: "ant-" + antSpawned, x: 10, y: 10, hasFood: false };
        antsInMap.push(ant);

        const antInDom = document.createElement("div");
        antInDom.id = ant.id;
        antInDom.className = "ant";
        antInDom.style.left = ant.x + "px";
        antInDom.style.top = ant.y + "px";
        document.getElementById("map").appendChild(antInDom);
        antSpawned++;
    }
}

function spawnFood() {
    let foodSpawned = 0;
    while (foodSpawned < foodAmount) {

        const x = getRandomIntInclusive(mapSize - 50, mapSize - 10);
        const y = getRandomIntInclusive(mapSize - 50, mapSize - 10);

        if (foodsInMap.some(pos => isNear(pos, { x: x, y: y }, 5))) {
            continue;
        }

        const food = { id: 'food-' + foodSpawned, x: x, y: y };
        const foodInDom = document.createElement("div");
        foodInDom.id = food.id;
        foodInDom.className = "food";
        foodInDom.style.left = food.x + "px";
        foodInDom.style.top = food.y + "px";
        document.getElementById("map").appendChild(foodInDom);
        foodsInMap.push(food);
        foodSpawned++;
    }
}

function removeFood(foodToRemove) {
    const foodInDom = document.getElementById(foodToRemove.id);
    if (foodInDom) {
        foodsInMap.splice(foodsInMap.indexOf(foodToRemove), 1);
        foodInDom.remove();
    }
}

function drawMap() {
    const map = document.getElementById("map");
    map.style.width = mapSize + "px";
    map.style.height = mapSize + "px";
    map.style.border = "1px solid black";
    map.style.position = "relative";
}