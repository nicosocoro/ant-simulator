const antMovementDistance = 8;
const antDetectionDistance = 5;

function ant__spawn(index, initialPosition) {
    const ant = { id: "ant-" + index, position: initialPosition, hasFood: false };
    antsInMap.push(ant);

    const antInDom = document.createElement("div");
    antInDom.id = ant.id;
    antInDom.className = "ant";
    antInDom.style.left = ant.position.x + "px";
    antInDom.style.top = ant.position.y + "px";
    document.getElementById("map").appendChild(antInDom);
    return ant;
}

function ant__onCycleStart(ant) {
    const newX = ant.position.x + (antMovementDistance * getRandomDirection());
    const newY = ant.position.y + (antMovementDistance * getRandomDirection());
    if (newX < 0 || newX > mapSize - 10 || newY < 0 || newY > mapSize - 10) {
        return;
    }

    ant.position.x = newX;
    ant.position.y = newY;

    const antInDom = document.getElementById(ant.id);
    antInDom.style.left = ant.position.x + "px";
    antInDom.style.top = ant.position.y + "px";

    tryPickFood(ant);
    tryToDeliverFood(ant);
    tryToLeavePheromone(ant);
}

function tryPickFood(ant) {
    if (canPickFood(ant)) {
        pickFood(ant);
    }
}

function tryToDeliverFood(ant) {
    if (!ant.hasFood) return;

    const isInHill = isInRange(ant.position, anthill.position, anthill.radius);
    if (isInHill) {
        const antInDom = document.getElementById(ant.id);
        if (antInDom) antInDom.className = "ant";

        ant.hasFood = false;

        onFoodDelivered();
    }
}

function canPickFood(ant) {
    if (ant.hasFood) {
        return false;
    }
    for (const food of foodsInMap) {
        if (isInRange(ant.position, food, 10)) {
            return true;
        }
    }
    return false;
}

function pickFood(ant) {
    for (const food of foodsInMap) {
        if (isInRange(ant.position, food, 10)) {
            removeFood(food);

            const antInDom = document.getElementById(ant.id);
            antInDom.className = "ant-with-food";

            ant.hasFood = true;

            return;
        }
    }
}

function tryToLeavePheromone(ant) {
    if (!ant.hasFood) {
        createAnthillPheromone(ant);
        return;
    }
}