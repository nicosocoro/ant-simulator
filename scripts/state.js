const foodsInMap = [];
const antsInMap = [];
const anthill = {
    position: { x: 20, y: 20 },
    radius: 15
};

const anthillPheromones = [];

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
    console.log("Anthill pheromones: " + anthillPheromones.length);
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