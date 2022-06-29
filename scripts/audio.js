var isPlaying = true;
var audio = [
  new Audio("../sounds/pacman_intro.wav"),
  new Audio("../sounds/pacman_chomp.wav"),
  new Audio("../sounds/pacman_eatfruit.wav"),
  new Audio("../sounds/pacman_eatghost.wav"),
  new Audio("../sounds/pacman_scaredghost.wav"),
  new Audio("../sounds/pacman_death.wav"),
  new Audio("../sounds/pacman_win.mp3"),
];
// audio[0].play();
// console.log("playing");
function toogle() {
  if (isPlaying) {
    isPlaying = false;
    soundOnOff.innerHTML = "&#128264;";
    // console.log("hiding soundOn and displaying soundOff");
  } else {
    isPlaying = true;
    soundOnOff.innerHTML = "&#128266;";
    // console.log("hiding soundOff and displaying soundOn");
  }
  console.log("toggling :", isPlaying);
}
soundButton.addEventListener("click", toogle);
