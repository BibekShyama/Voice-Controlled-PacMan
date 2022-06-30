let leftId;
let rightId;
let upId;
let downId;
let dir;

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
      clearInterval(leftId);
    } else {
      removePacman();
      pacmanCurrentPosition -= 1;
      position[pacmanCurrentPosition].classList.add("pacman", "pacman-left");
      eatDot();
      eatPowerPellet();
      checkForWin();
      checkForWin();
    }
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
    } else {
      removePacman();
      pacmanCurrentPosition += 1;
      position[pacmanCurrentPosition].classList.add("pacman", "pacman-right");
      eatDot();
      eatPowerPellet();
      checkForWin();
      checkGameOver();
    }
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
      clearInterval(upId);
    } else {
      removePacman();
      pacmanCurrentPosition -= width;
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
    } else {
      removePacman();
      pacmanCurrentPosition += width;
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
  commandContainer.innerHTML = dir;
  console.log("COMMAND: ", dir);
  movePacman(dir);
}

//   starting position of pac-man
let pacmanCurrentPosition = 490;
position[pacmanCurrentPosition].classList.add("pacman", "pacman-right");
