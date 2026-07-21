// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let selectedDate = null;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('[data-start]').disabled = true;
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (validateDate(selectedDates[0])) {
        selectedDate = selectedDates[0];
        document.querySelector('[data-start]').disabled = false;
      } else {
        document.querySelector('[data-start]').disabled = true;
      }
    },
  };

  flatpickr('#datetime-picker', options);
  document
    .querySelector('[data-start]')
    .addEventListener('click', startCountdown);
});

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

function validateDate(selectedDate) {
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });    
    return false;
  }
  return true;
}

function startCountdown() {
  document.querySelector('[data-start]').disabled = true;
  document.querySelector('#datetime-picker').disabled = true;
  const countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;
    convertMs(timeDifference);
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      document.querySelector('[data-days]').textContent = '00';
      document.querySelector('[data-hours]').textContent = '00';
      document.querySelector('[data-minutes]').textContent = '00';
      document.querySelector('[data-seconds]').textContent = '00';      
      document.querySelector('#datetime-picker').disabled = false;
      return;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      document.querySelector('[data-days]').textContent = String(days).padStart(
        2,
        '0'
      );
      document.querySelector('[data-hours]').textContent = String(
        hours
      ).padStart(2, '0');
      document.querySelector('[data-minutes]').textContent = String(
        minutes
      ).padStart(2, '0');
      document.querySelector('[data-seconds]').textContent = String(
        seconds
      ).padStart(2, '0');
    }
  }, 1000);
}
