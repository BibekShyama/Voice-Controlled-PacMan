let commands = ["letf", "right", "up", "down"];

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = false;

let spokenWord;
let spokenWordArray = [];
recognition.addEventListener("result", (e) => {
  // console.log(e);
  spokenWordArray = Array.from(e.results).map(
    (results) => results[0].transcript
  );
  console.log(spokenWordArray);
  spokenWord = spokenWordArray[0];
  //   console.log(spokenWord);
});

recognition.addEventListener("end", recognition.start);
recognition.start();

function loop() {
  if (
    commands.includes(
      spokenWordArray.forEach((item, index) => {
        // console.log(item);
      })
    )
  ) {
    console.log("match found");
  } else {
    console.log("match not found");
  }
  requestAnimationFrame(loop);
}
loop();
