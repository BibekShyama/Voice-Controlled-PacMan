// when pac man eats power pallet
function eatPowerPellet() {
  if (position[pacmanCurrentPosition].classList.contains("power-pellet")) {
    score += 10;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 10000);
    position[pacmanCurrentPosition].classList.remove("power-pellet");
  }
}
