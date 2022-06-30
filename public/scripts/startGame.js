function startGame() {
  ghosts.forEach((ghost) => moveGhost(ghost));
  document.addEventListener("keyup", direction);
  recognition.addEventListener("soundend", direction);
  if (isPlaying) {
    audio[0].play();
  }
  startContainer.style.display = "none";
  resetContainer.style.display = "unset";
}
startButton.addEventListener("click", startGame);
