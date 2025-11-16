function isNear(position1, position2, threshold) {
    const dx = position1.x - position2.x;
    const dy = position1.y - position2.y;
    return Math.sqrt(dx * dx + dy * dy) <= threshold;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
    let random = getRandomIntInclusive(-1, 1);
    return random >= 0 ? 1 : -1;
}