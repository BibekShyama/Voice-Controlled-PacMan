let leftId;
let rightId;
let upId;
let downId;
let dir;
let key;
const speed = 200;

function removePacman() {
  position[pacmanCurrentPosition].classList.remove("pacman");
  position[pacmanCurrentPosition].classList.remove("pacman-right");
  position[pacmanCurrentPosition].classList.remove("pacman-left");
  position[pacmanCurrentPosition].classList.remove("pacman-down");
  position[pacmanCurrentPosition].classList.remove("pacman-up");
}

function moveLeft() {
  clearInterval(upId);
  clearInterval(downId);
  clearInterval(rightId);
  leftId = setInterval(function () {
    if (
      position[pacmanCurrentPosition - 1].classList.contains("wall") ||
      position[pacmanCurrentPosition - 1].classList.contains("ghost-lair")
    ) {
      // console.log("insideIF: left");
      clearInterval(leftId);
    } else {
      removePacman();
      pacmanCurrentPosition -= 1;
      // console.log("insideElse: left");
      eatDot();
      eatPowerPellet();
      checkForWin();
      checkForWin();
    }
    // position[pacmanCurrentPosition].classList.add("pacman");
    position[pacmanCurrentPosition].classList.add("pacman", "pacman-left");
  }, speed);
}
function moveRight() {
  clearInterval(upId);
  clearInterval(downId);
  clearInterval(leftId);
  rightId = setInterval(function () {
    if (
      position[pacmanCurrentPosition + 1].classList.contains("wall") ||
      position[pacmanCurrentPosition + 1].classList.contains("ghost-lair")
    ) {
      clearInterval(rightId);
      // console.log("insideIF:Right");
    } else {
      removePacman();
      pacmanCurrentPosition += 1;
      // console.log("insideELSE:right");

      eatDot();
      eatPowerPellet();
      checkForWin();
      checkGameOver();
    }
    // position[pacmanCurrentPosition].classList.add("pacman");
    position[pacmanCurrentPosition].classList.add("pacman", "pacman-right");
  }, speed);
}
function moveUp() {
  clearInterval(downId);
  clearInterval(leftId);
  clearInterval(rightId);
  upId = setInterval(function () {
    if (
      position[pacmanCurrentPosition - width].classList.contains("wall") ||
      position[pacmanCurrentPosition - width].classList.contains("ghost-lair")
    ) {
      // console.log("insideIF:up");
      clearInterval(upId);
    } else {
      removePacman();
      pacmanCurrentPosition -= width;
      // console.log("insideElse:up");
      // position[pacmanCurrentPosition].classList.add("pacman");
      position[pacmanCurrentPosition].classList.add("pacman", "pacman-up");
      eatDot();
      eatPowerPellet();
      checkForWin();
      checkGameOver();
    }
  }, speed);
}
function moveDown() {
  clearInterval(upId);
  clearInterval(leftId);
  clearInterval(rightId);
  downId = setInterval(function () {
    if (
      position[pacmanCurrentPosition + width].classList.contains("wall") ||
      position[pacmanCurrentPosition + width].classList.contains("ghost-lair")
    ) {
      clearInterval(downId);

      // console.log("insideIf: Down");
    } else {
      removePacman();
      pacmanCurrentPosition += width;
      // console.log("INSIDEELSE: down");
      // position[pacmanCurrentPosition].classList.add("pacman");
      position[pacmanCurrentPosition].classList.add("pacman", "pacman-down");
      eatDot();
      eatPowerPellet();
      checkForWin();
      checkGameOver();
    }
  }, speed);
}

function movePacman(direction) {
  switch (direction) {
    case "left":
      moveLeft();
      dir = "";
      break;
    case "right":
      moveRight();
      dir = "";
      break;
    case "up":
      moveUp();
      dir = "";
      break;
    case "down":
      moveDown();
      dir = "";
      break;
  }
}
function direction(e) {
  if (key === "left" || e.keyCode === 37) {
    dir = "left";
  } else if (key === "up" || e.keyCode === 38) {
    dir = "up";
  } else if (key === "right" || e.keyCode === 39) {
    dir = "right";
  } else if (key === "down" || e.keyCode === 40) {
    dir = "down";
  }
  console.log("COMMAND: ", dir);
  movePacman(dir);
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = false;
recognition.start();

//   starting position of pac-man
let pacmanCurrentPosition = 490;
// position[pacmanCurrentPosition].classList.add("pacman");
position[pacmanCurrentPosition].classList.add("pacman", "pacman-right");

// recognition of speech and storing the result in key
recognition.addEventListener("result", (e) => {
  const spokenWord = Array.from(e.results).map(
    (results) => results[0].transcript
  );
  // console.log(e.results);
  // console.log("spokenWord: ", spokenWord);
  key = spokenWord[0];
  console.log("spokenWord :", key);
});
// when speech sound ends calls direction function
recognition.addEventListener("soundend", direction);
// controls via keyboard
document.addEventListener("keyup", direction);

// console.log(key);

recognition.addEventListener("end", recognition.start);
