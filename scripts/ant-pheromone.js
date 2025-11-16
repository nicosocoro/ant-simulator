const anthillPheromonesCycles = 100;

function createAnthillPheromone(antProducer, cycle) {
    const pheromone = {
        id: 'pheromone-anthill-' + antProducer.id + '-' + cycle,
        position: { x: antProducer.x, y: antProducer.y },
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

function pheromone__onCycleCompleted() {
    processAnthillPheromones(anthillPheromones);
}

function processAnthillPheromones(pheromones) {
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