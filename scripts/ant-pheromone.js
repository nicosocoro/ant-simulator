const anthillPheromonesCycles = 100;
const foodPheromonesCycles = 100;

function createAnthillPheromone(antProducer, cycle) {
    const pheromone = {
        id: 'pheromone-anthill-' + antProducer.id + '-' + cycle,
        position: { x: antProducer.position.x, y: antProducer.position.y },
        remainingCycles: anthillPheromonesCycles
    };
    anthillPheromones.push(pheromone);

    const pheromoneInDom = document.createElement("div");
    pheromoneInDom.id = pheromone.id;
    pheromoneInDom.className = "pheromone-anthill";
    pheromoneInDom.style.left = pheromone.position.x + "px";
    pheromoneInDom.style.top = pheromone.position.y + "px";
    document.getElementById("map").appendChild(pheromoneInDom);
}

function createFoodPheromone(antProducer, cycle) {
    const pheromone = {
        id: 'pheromone-food-' + antProducer.id + '-' + cycle,
        position: { x: antProducer.position.x, y: antProducer.position.y },
        remainingCycles: foodPheromonesCycles
    };
    foodPheromones.push(pheromone);

    const pheromoneInDom = document.createElement("div");
    pheromoneInDom.id = pheromone.id;
    pheromoneInDom.className = "pheromone-food";
    pheromoneInDom.style.left = pheromone.position.x + "px";
    pheromoneInDom.style.top = pheromone.position.y + "px";
    document.getElementById("map").appendChild(pheromoneInDom);
}

function pheromone__onCycleCompleted() {
    processPheromones(anthillPheromones);
    processPheromones(foodPheromones);
}

function processPheromones(pheromones) {
    for (let i = pheromones.length - 1; i >= 0; i--) {
        const pheromone = pheromones[i];
        pheromone.remainingCycles--;

        if (pheromone.remainingCycles <= 0) {
            const pheromoneInDom = document.getElementById(pheromone.id);
            if (pheromoneInDom) {
                pheromoneInDom.remove();
            }
            pheromones.splice(i, 1);
        }
    }
}