import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.selectedDate = null;
    this.intervalId = null;
  }

  setDate(date) {
    this.selectedDate = date;
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.selectedDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.onTick(convertMs(0));
        return;
      }

      const time = convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
  }
}

const timer = new Timer({
  onTick: update,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      return;
    }

    timer.setDate(selectedDate);
    startBtn.disabled = false;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

0;
function pad(value) {
  return String(value).padStart(2, '0');
}

function update({ days, hours, minutes, seconds }) {
  dataDays.textContent = pad(days);
  dataHours.textContent = pad(hours);
  dataMinutes.textContent = pad(minutes);
  dataSeconds.textContent = pad(seconds);
}

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true;
  datetimePicker.disabled = true;
});
