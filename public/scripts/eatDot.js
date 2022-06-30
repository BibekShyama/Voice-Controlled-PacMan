function eatDot() {
  if (position[pacmanCurrentPosition].classList.contains("pac-dot")) {
    score++;
    scoreDisplay.innerHTML = score;
    position[pacmanCurrentPosition].classList.remove("pac-dot");
    if (isPlaying) {
      audio[1].play();
    }
  }
}
