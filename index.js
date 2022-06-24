window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = false;
recognition.start();

//   starting position of pac-man
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pac-man");

let d;
let key;
// recognition of speech and storing the result in key
recognition.addEventListener("result", (e) => {
  const spokenWord = Array.from(e.results).map(
    (results) => results[0].transcript
  );
  console.log("spokenWord: ", spokenWord);
  key = spokenWord[0];
  console.log("key:", key);
});
// when speech sound ends calls movePacman function

recognition.addEventListener("soundend", direction);
// for keyboard control
document.addEventListener("keydown", direction);
function direction(e) {
  if (key === "left" || e.keyCode === 37) {
    d = "left";
  } else if (key === "up" || e.keyCode === 38) {
    d = "up";
  } else if (key === "right" || e.keyCode === 39) {
    d = "right";
  } else if (key === "down" || e.keyCode === 40) {
    d = "down";
  }
  movePacman(d);
}

function movePacman(direction) {
  squares[pacmanCurrentIndex].classList.remove("pac-man");
  console.log("pacman currnet index:", pacmanCurrentIndex);
  switch (direction) {
    case "left":
      if (
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex -= 1;
      console.log("direction:", direction);
      key = d = "";
      break;
    case "up":
      if (
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex -= width;
      console.log("direction:", direction);
      key = d = "";
      break;
    case "right":
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += 1;
      console.log("direction:", direction);
      key = d = "";
      break;
    case "down":
      if (
        pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
      )
        pacmanCurrentIndex += width;
      console.log("direction:", direction);
      key = d = "";
      break;
  }
  squares[pacmanCurrentIndex].classList.add("pac-man");

  pacDotEaten();
}

recognition.addEventListener("end", recognition.start);
