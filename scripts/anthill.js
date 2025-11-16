function initializeAnthill() {
    const anthillDom = document.getElementById("anthill");
    anthillDom.style.left = anthill.position.x + "px";
    anthillDom.style.top = anthill.position.y + "px";

    updateFoodCount(0);
}