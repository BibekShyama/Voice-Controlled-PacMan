// check for a win
function checkForWin() {
  if (score === 325) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", direction);
    recognition.removeEventListener("soundend", direction);
    clearInterval(leftId);
    clearInterval(rightId);
    clearInterval(upId);
    clearInterval(downId);
    scoreDisplay.innerHTML = "YOU WON";
  }
}
