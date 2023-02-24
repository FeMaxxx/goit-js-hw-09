import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const inputEl = document.querySelector("#datetime-picker");
const startBtnEl = document.querySelector("button[data-start]");

const timerEl = document.querySelector(".timer");
const timerDaysEl = timerEl.querySelector("span[data-days]");
const timetHoursEl = timerEl.querySelector("span[data-hours]");
const timetMinutesEl = timerEl.querySelector("span[data-minutes]");
const timerSecondsEl = timerEl.querySelector("span[data-seconds]");

let subtractTime = 0;
let periodTime = 0;

startBtnEl.setAttribute("disabled", "");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtnEl.setAttribute("disabled", "");
    } else {
      startBtnEl.removeAttribute("disabled");
    }

    periodTime = Date.parse(selectedDates[0]) - Date.now();
    return periodTime;
  },
};

flatpickr(inputEl, options);

const startTimer = () => {
  const intervalId = setInterval(() => {
    const time = periodTime - subtractTime;

    if (time <= 0) {
      clearInterval(intervalId);
      return;
    }

    subtractTime += 1000;

    function addLeadingZero(time) {
      return time.toString().padStart(2, 0);
    }

    const { days, hours, minutes, seconds } = convertMs(time);

    timerDaysEl.textContent = addLeadingZero(days);
    timetHoursEl.textContent = addLeadingZero(hours);
    timetMinutesEl.textContent = addLeadingZero(minutes);
    timerSecondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
};

startBtnEl.addEventListener("click", startTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
