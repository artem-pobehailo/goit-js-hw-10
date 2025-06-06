// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.target.elements;
  const delayValue = +delay.value;
  const stateValue = state.value;
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      if (stateValue === 'fulfilled') {
        resolve('fulfilled');
      } else {
        reject('rejected');
      }
    })
      .then(delay => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(delay => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      });
  }, delayValue);
}
