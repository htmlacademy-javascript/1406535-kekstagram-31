import {openPopup, closePopup} from './operate-modal-box.js';

const TIMEOUT = 5000;

const getData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Возникла ошибка ${response.status} : ${response.statusText}`);
  })
  .catch(() => {
    const errorMessage = document.querySelector('#data-error').content.children[0];
    document.body.append(errorMessage);

    setTimeout(() => errorMessage.remove(), TIMEOUT);
  });

const sendData = (body, cb) => fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
  method: 'POST',
  body: body,
})
  .then((response) => {
    if (response.ok) {
      openPopup('#success', '.success__button', () => {
        closePopup('.success');
        cb();
      });
    } else {
      throw new Error(`Возникла ошибка ${response.status} : ${response.statusText}`);
    }
  })
  .catch(() => {
    openPopup('#error', '.error__button', () => closePopup('.error'));
  });

export {getData, sendData};
