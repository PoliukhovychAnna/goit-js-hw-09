import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerStyle = document.querySelector(".timer")
const timeSections = document.querySelectorAll(".field")

  const sections = [...timeSections]
sections.forEach(section => section.classList.add("time-field"))

timerStyle.classList.add("timer-box");


const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', '');
startBtn.addEventListener("click", onClick)

let currentTime = null
let chosenDate = null;



flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentTime = Date.now();
    chosenDate = selectedDates[0].getTime();
    if (chosenDate - currentTime > 0) {
      startBtn.removeAttribute('disabled');
      input.setAttribute(' readonly', 'true');
    }
    if (chosenDate - currentTime < 0) {
    Notify.failure('Please choose a date in the future');
      return;
    }
  },

  // метод onChange більш функціональний і заздалегідь рятує від неправильно обраної дати, а не тільки після закриття
  // onChange(selectedDates) {
  //   currentTime = Date.now();
  //   chosenDate = selectedDates[0].getTime();
  //   if (chosenDate - currentTime > 0) {
  //     startBtn.removeAttribute('disabled');
  //   }
  //   if (chosenDate - currentTime < 0) {
  //     Notify.failure('Please choose a date in the future');
  //     return;
  //   }
  // },
});



function onClick() {
  startBtn.setAttribute('disabled', '');
  // input.setAttribute('disabled', 'true');
  const timerId = setInterval(() => {
    let TIME = convertMs(chosenDate - Date.now());
    if ((TIME.days < 0) || (TIME.hours < 0) || (TIME.minutes < 0) || (TIME.seconds < 0)){
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    }
    daysEl.textContent = addLeadingZero(TIME.days);
    hoursEl.textContent = addLeadingZero(TIME.hours);
    minutesEl.textContent = addLeadingZero(TIME.minutes);
    secondsEl.textContent = addLeadingZero(TIME.seconds);
  }, 1000)}

function addLeadingZero(value) {
  const timerValue = `${value}`;
  return timerValue.padStart(2, '0');
}

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
