document.addEventListener("DOMContentLoaded", () => {
  // let commands = ["left", "right", "up", "down"];
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.start();

  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 28; //28 x 28 = 784 squares
  let score = 0;

  // layout of grid and what is in the squares
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  //   console.log(layout.length); 784 items
  //   legends :
  // 0 - pac-dot
  //   1 - wall
  // 2 -ghost-lair
  // 3 -power-pellet
  // 4 -empty

  const squares = [];
  //draw the grid and render it
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      //   add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }

  createBoard();

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
  recognition.addEventListener("soundend", movePacman);
  // for keyboard control
  document.addEventListener("keydown", movePacman);

  function movePacman(e) {
    // console.log(e);
    // const spokenWord = Array.from(e.results).map(
    //   (results) => results[0].transcript
    // );
    // console.log("spokenWord: ", spokenWord);
    // key = spokenWord[0];
    // console.log("key:", key);
    if (key == "left" || e.keyCode === 37) {
      d = "left";
      console.log("d:", d);
    } else if (key == "up" || e.keyCode === 38) {
      d = "up";
      console.log("d:", d);
    } else if (key == "right" || e.keyCode === 39) {
      d = "right";
      console.log("d:", d);
    } else if (key == "down" || e.keyCode === 40) {
      d = "down";
      console.log("d:", d);
    }

    squares[pacmanCurrentIndex].classList.remove("pac-man");

    // function leftDirection() {
    //   squares[pacmanCurrentIndex].classList.remove("pac-man");
    //   if (
    //     pacmanCurrentIndex % width !== 0 &&
    //     !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
    //     !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
    //   )
    //     pacmanCurrentIndex -= 1;
    //   //   console.log("direction:", d);
    //   // check if pacman is in the left exit
    //   if (pacmanCurrentIndex - 1 === 363) {
    //     pacmanCurrentIndex = 391;
    //   }
    // }
    // function rightDirection() {
    //   squares[pacmanCurrentIndex].classList.remove("pac-man");
    //   if (
    //     pacmanCurrentIndex % width < width - 1 &&
    //     !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
    //     !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
    //   )
    //     pacmanCurrentIndex += 1;
    //   console.log("direction:", d);
    //   //   check if pacman is in the right exit
    //   if (pacmanCurrentIndex + 1 === 392) {
    //     pacmanCurrentIndex = 364;
    //   }
    // }
    // function upDirection(){
    //   squares[pacmanCurrentIndex].classList.remove("pac-man");
    //   if (
    //     pacmanCurrentIndex - width >= 0 &&
    //     !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
    //     !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
    //   )
    //     pacmanCurrentIndex -= width;
    //   console.log("direction:", d);
    // }

    // function downDirection(){
    //   squares[pacmanCurrentIndex].classList.remove("pac-man");
    //   if (
    //     pacmanCurrentIndex + width < width * width &&
    //     !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
    //     !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
    //   )
    //     pacmanCurrentIndex += width;
    //   console.log("direction:", d);

    // }

    switch (d) {
      case "left":
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex -= 1;
        console.log("direction:", d);
        // console.log("key:", key);
        // check if pacman is in the left exit
        if (pacmanCurrentIndex - 1 === 363) {
          pacmanCurrentIndex = 391;
        }

        break;
      case "up":
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex -= width;
        console.log("direction:", d);
        // console.log("key:", key);
        break;
      case "right":
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex += 1;
        console.log("direction:", d);
        // console.log("key:", key);
        //   check if pacman is in the right exit
        if (pacmanCurrentIndex + 1 === 392) {
          pacmanCurrentIndex = 364;
        }
        break;
      case "down":
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
        )
          pacmanCurrentIndex += width;
        console.log("direction:", d);
        // console.log("key:", key);
        break;
    }
    squares[pacmanCurrentIndex].classList.add("pac-man");

    pacDotEaten();
  }

  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
      score++;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
  }

  recognition.addEventListener("end", recognition.start);
});
