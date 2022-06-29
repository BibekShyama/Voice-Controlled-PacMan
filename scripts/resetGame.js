// reloading the page
function resetGame() {
  console.log("reset");
  window.location.reload();
}
resetButton.addEventListener("click", resetGame);

// function resetGame() {
//   console.log("resetting game");
//   //   reset pacman position
//   removePacman();
//   pacmanCurrentPosition = 490;
//   position[pacmanCurrentPosition].classList.add("pacman", "pacman-right");
//   //   reset Map
//   tileMap();
//   //   reset score
//   score = 0;
//   scoreDisplay.innerHTML = score;
//   if (checkGameOver) {
//     console.log("gameover");
//     ghosts.forEach((ghost) => moveGhost(ghost));
//   }
//   document.addEventListener("keyup", direction);
//   recognition.addEventListener("soundend", direction);
//   // deleting the ghost
//   // ghosts.forEach((ghost) => {
//   //   position[ghost.currentPosition].classList.remove(
//   //     ghost.className,
//   //     "ghost",
//   //     "scared-ghost"
//   //   );
//   // });
//   ghosts = [];

//   // reseting the ghost
//   // ghosts = [
//   //   new Ghost("blinky", 348, 250),
//   //   new Ghost("pinky", 376, 400),
//   //   new Ghost("inky", 351, 300),
//   //   new Ghost("clyde", 379, 500),
//   // ];
//   // plotting ghost in the map
//   // ghosts.forEach((ghost) => {
//   //   position[ghost.currentPosition].classList.add(ghost.className);
//   //   position[ghost.currentPosition].classList.add("ghost");
//   // });
//   // move ghost
//   // ghosts.forEach((ghost) => moveGhost(ghost));
// }
