const foodsInMap = [];
const antsInMap = [];
const anthill = {
    position: { x: 20, y: 20 },
    radius: 15
};

let foodCollectedInHill = 0;
let runnning = true;

function printStatus() {
    console.log("Ants status:");
    for (const ant of antsInMap) {
        console.log(ant);
    }

    console.log("Ants with food pending to deliver: " + antsInMap.filter(ant => ant.hasFood).length);
    console.log("Foods in map: " + foodsInMap.length);
    console.log("Foods delivered: " + foodCollectedInHill);
}

function stop() {
    runnning = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateFoodCount(count) {
    foodCollectedInHill = count;
    const foodCountElement = document.getElementById("food-count");
    foodCountElement.innerText = count;
}

function onFoodDelivered() {
    foodCollectedInHill++;
    updateFoodCount(foodCollectedInHill);
}

async function moveAntRepeatedly() {
    while (runnning) {
        for (const ant of antsInMap) {
            const newX = ant.x + (10 * getRandomDirection());
            const newY = ant.y + (10 * getRandomDirection());
            if (newX < 0 || newX > mapWidth - 10 || newY < 0 || newY > mapHeight - 10) {
                continue;
            }

            ant.x = newX;
            ant.y = newY;

            const antInDom = document.getElementById(ant.id);
            antInDom.style.left = ant.x + "px";
            antInDom.style.top = ant.y + "px";

            tryPickFood(ant);
            tryToDeliverFood(ant);
        }

        await sleep(timeBetweenMovesMs);
    }
}