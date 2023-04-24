import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  const delayInputValue = Number(delay.value);
  const stepInputValue = Number(step.value);
  const amountInputValue = Number(amount.value);

  for (let i = 1; i <= amountInputValue; i += 1) {
    if ((delayInputValue < 0 && stepInputValue < 0) || (amountInputValue <= 0)) {
      Notify.failure('❌ Can not be negative values!');
      return;
    } 
    const newDelay = delayInputValue + (i - 1) * stepInputValue;
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
