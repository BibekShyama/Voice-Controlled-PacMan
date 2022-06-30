// using web audio api for speech recognition
let key;
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = false;
recognition.start();

recognition.addEventListener("result", (e) => {
  const spokenWord = Array.from(e.results).map(
    (results) => results[0].transcript
  );
  // console.log(e.results);
  // console.log("spokenWord: ", spokenWord);
  key = spokenWord[0];
  spokenwordContainer.innerHTML = key;
  console.log("spokenWord :", key);

  if (key === "start") {
    startGame();
  }
  if (key === "reset") {
    resetGame();
  }
});
recognition.addEventListener("end", recognition.start);
