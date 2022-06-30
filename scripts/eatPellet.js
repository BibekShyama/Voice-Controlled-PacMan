// when pac man eats power pallet
function eatPowerPellet() {
  if (position[pacmanCurrentPosition].classList.contains("power-pellet")) {
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 6000);
    position[pacmanCurrentPosition].classList.remove("power-pellet");
    if (isPlaying) {
      audio[2].play();
    }
  }
}
