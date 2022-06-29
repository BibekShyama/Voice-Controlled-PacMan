function startGame() {
  ghosts.forEach((ghost) => moveGhost(ghost));
  document.addEventListener("keyup", direction);
  recognition.addEventListener("soundend", direction);
  if (isPlaying) {
    audio[0].play();
  }
}
startButton.addEventListener("click", startGame);
