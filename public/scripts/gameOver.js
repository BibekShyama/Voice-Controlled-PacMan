// check for a game over
function checkGameOver() {
  if (
    position[pacmanCurrentPosition].classList.contains("ghost") &&
    !position[pacmanCurrentPosition].classList.contains("scared-ghost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", direction);
    recognition.removeEventListener("soundend", direction);

    clearInterval(leftId);
    clearInterval(rightId);
    clearInterval(upId);
    clearInterval(downId);
    gameOverDisplay.innerHTML = "Game Over!!!";
    if (isPlaying) {
      audio[5].play();
    }
  }
}
