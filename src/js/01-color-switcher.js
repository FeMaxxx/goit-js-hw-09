function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnEl = document.querySelector("button[data-start]");
const stopBtnEl = document.querySelector("button[data-stop]");

stopBtnEl.setAttribute("disabled", "");

let tomeoutId = null;
const DELAY = 1000;

const changeBgColor = {
  start() {
    startBtnEl.setAttribute("disabled", "");
    stopBtnEl.removeAttribute("disabled");

    tomeoutId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, DELAY);
  },

  stop() {
    stopBtnEl.setAttribute("disabled", "");
    clearInterval(tomeoutId);
    startBtnEl.removeAttribute("disabled");
  },
};

startBtnEl.addEventListener("click", changeBgColor.start);
stopBtnEl.addEventListener("click", changeBgColor.stop);
