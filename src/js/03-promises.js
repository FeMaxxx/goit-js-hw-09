import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const formEl = document.querySelector(".form");
const buttonEl = formEl.lastElementChild;
const { delay, step, amount } = formEl.elements;
let promiseNumber = 0;

function startCreatePromises(e) {
  e.preventDefault();
  promiseNumber = 0;
  buttonEl.setAttribute("disabled", "");

  let delayNumberValue = Number.parseInt(delay.value);
  const stepNumberValue = Number.parseInt(step.value);

  setTimeout(() => {
    promiseInterval(delay.value);

    const intervalId = setInterval(() => {
      if (promiseNumber >= amount.value) {
        clearInterval(intervalId);
        buttonEl.removeAttribute("disabled");
        return;
      }

      delayNumberValue += stepNumberValue;

      promiseInterval(delayNumberValue);
    }, stepNumberValue);
  }, delayNumberValue);
}

function promiseInterval(delay) {
  promiseNumber += 1;

  createPromise(promiseNumber, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

buttonEl.addEventListener("click", startCreatePromises);
