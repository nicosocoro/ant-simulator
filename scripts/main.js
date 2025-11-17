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
            ant__onCycleStart(ant, foodsInMap);
        }

        pheromone__onCycleCompleted();
        await sleep(timeBetweenMovesMs);
    }
}