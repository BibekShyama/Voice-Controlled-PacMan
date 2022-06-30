// check for a win
function checkForWin() {
  if (score >= 275) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", direction);
    recognition.removeEventListener("soundend", direction);
    clearInterval(leftId);
    clearInterval(rightId);
    clearInterval(upId);
    clearInterval(downId);
    youWonDisplay.innerHTML = "&#x1F3C6;YOU WON&#x1F3C6;";
    if (isPlaying) {
      audio[6].play();
    }
  }
}
