function move(ant) {
    const newX = ant.x + (10 * getRandomDirection());
    const newY = ant.y + (10 * getRandomDirection());
    if (newX < 0 || newX > mapWidth - 10 || newY < 0 || newY > mapHeight - 10) {
        return;
    }

    ant.x = newX;
    ant.y = newY;

    const antInDom = document.getElementById(ant.id);
    antInDom.style.left = ant.x + "px";
    antInDom.style.top = ant.y + "px";

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

    const isInHill = isNear({ x: ant.x, y: ant.y }, anthill.position, anthill.radius);
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
        if (isNear({ x: ant.x, y: ant.y }, food, 10)) {
            return true;
        }
    }
    return false;
}

function pickFood(ant) {
    for (const food of foodsInMap) {
        if (isNear({ x: ant.x, y: ant.y }, food, 10)) {
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