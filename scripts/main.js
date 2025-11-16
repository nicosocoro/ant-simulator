function initialize() {
    drawMap();
    initializeAnthill();
    spawnAnts();
    spawnFood();

    run();
}

async function run() {
    while (runnning) {
        for (const ant of antsInMap) {
            move(ant);
        }

        pheromone__onCycleCompleted();
        await sleep(timeBetweenMovesMs);
    }
}