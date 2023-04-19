const startBtn = document.querySelector("[data-start]")
const stopBtn = document.querySelector("[data-stop]")
const body = document.querySelector("body")
let timerId = null

startBtn.addEventListener("click", changeBgColor)
stopBtn.addEventListener("click", onStop)
stopBtn.setAttribute('disabled', '');

function changeBgColor() {
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', "");
    timerId = setInterval(() => {
     body.style.backgroundColor = getRandomHexColor(); 
    }, 1000)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStop() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', '');
  clearInterval(timerId)
}