// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const showSnackbarButton = document.querySelector('#snackbar-form');
  showSnackbarButton.addEventListener('submit', createPromise);
});

function createPromise(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const { delay, state } = form.elements;  
  const delayValue = Number(delay.value);
  const stateValue = state.value;
  new Promise((resolve, reject) => {
    setTimeout(() => {      
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  })
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`        
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`
      });
    });
    form.reset();
}
