let video = document.getElementById("video");
let letterEl = document.getElementById("letter");
let wordEl = document.getElementById("word");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

function captureAndSend() {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  let imageData = canvas.toDataURL("image/jpeg");

  fetch("/predict", {
    method: "POST",
    body: JSON.stringify({ image: imageData }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      letterEl.textContent = data.letter || "_";
      wordEl.textContent = data.word || "";
    });
}

function speak() {
  let text = wordEl.textContent;
  if (text) {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }
}

function resetWord() {
  fetch("/reset", { method: "POST" }).then(() => {
    wordEl.textContent = "";
    letterEl.textContent = "_";
  });
}

setInterval(captureAndSend, 500); // Adjust frame rate
