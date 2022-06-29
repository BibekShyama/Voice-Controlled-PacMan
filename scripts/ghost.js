class Ghost {
  constructor(className, startPosition, speed) {
    this.className = className;
    this.startPosition = startPosition;
    this.currentPosition = startPosition;
    this.speed = speed;
    this.timerId = NaN;
    this.isScared = false;
  }
}
ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];
// plotting ghost in the map
ghosts.forEach((ghost) => {
  position[ghost.currentPosition].classList.add(ghost.className);
  position[ghost.currentPosition].classList.add("ghost");
});

function moveGhost(ghost) {
  const directions = [-1, +1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  ghost.timerId = setInterval(function () {
    // if next position of ghost movement does not contain wall and other ghosts, ghost can go there
    if (
      !position[ghost.currentPosition + direction].classList.contains("wall") &&
      !position[ghost.currentPosition + direction].classList.contains("ghost")
    ) {
      position[ghost.currentPosition].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      //change the current position to the new safe position
      ghost.currentPosition += direction;
      // redraw the ghost in the new safe position
      position[ghost.currentPosition].classList.add(ghost.className, "ghost");
    } //else find a new direction
    else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    //if the ghost is currently scared
    if (ghost.isScared) {
      position[ghost.currentPosition].classList.add("scared-ghost");
      if (isPlaying) {
        audio[4].play();
      }
    }
    //if ghost is scared and pacman run over it
    if (
      ghost.isScared &&
      position[ghost.currentPosition].classList.contains("pacman")
    ) {
      position[ghost.currentPosition].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );

      ghost.currentPosition = ghost.startPosition;
      position[ghost.currentPosition].classList.add(ghost.className, "ghost");
    }
    checkGameOver();
  }, ghost.speed);
}
// stop the ghost begin scared
function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}
