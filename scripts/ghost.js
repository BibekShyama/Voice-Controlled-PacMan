class Ghost {
  constructor(className, startIndex, speed, imageSrc) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.timerId = NaN;
    this.isScared = false;
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.width = 100;
    this.image.height = 100;
    console.log(this.image);
  }
}
ghosts = [
  new Ghost("blinky", 348, 250, "../images/blinky.png"),
  new Ghost("pinky", 376, 400, "../images/pinky.png"),
  new Ghost("inky", 351, 300, "./images/inky.png"),
  new Ghost("clyde", 379, 500, "./images/clyde.png"),
];
// plotting ghost in the map
ghosts.forEach((ghost) => {
  position[ghost.currentIndex].classList.add(ghost.className);
  position[ghost.currentIndex].classList.add("ghost");
  position[ghost.currentIndex].classList.add(ghost.imageSrc);
});
// move all ghost randomly
ghosts.forEach((ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  const directions = [-1, +1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    // if next box of ghost movement does not contain wall and other ghost you can go there
    if (
      !position[ghost.currentIndex + direction].classList.contains("wall") &&
      !position[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      position[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        ghost.imageSrc,
        "scared-ghost"
      );
      //change the current index to the new safe box
      ghost.currentIndex += direction;
      // redrwa the ghost in the new safe box
      position[ghost.currentIndex].classList.add(
        ghost.className,
        "ghost",
        ghost.imageSrc
      );
    } //else find a new direction to ry
    else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    //if the ghost is currently scared
    if (ghost.isScared) {
      position[ghost.currentIndex].classList.add("scared-ghost");
    }
    //if ghost is scared and pacman run over it
    if (
      ghost.isScared &&
      position[ghost.currentIndex].classList.contains("pacman")
    ) {
      position[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        ghost.imageSrc,
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startIndex;
      position[ghost.currentIndex].classList.add(
        ghost.className,
        "ghost",
        ghost.imageSrc
      );
    }
    checkGameOver();
  }, ghost.speed);
}
// stop the ghost begin scared
function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}
