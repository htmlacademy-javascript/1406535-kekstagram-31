import {openPopup, closePopup} from './operate-modal-box.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const TIMEOUT = 5000;

const getData = (cb) => fetch(`${BASE_URL}/data`)
  .then((response) => response.json())
  .then((data) => cb(data))
  .catch(() => {
    const errorMessage = document.querySelector('#data-error').content.children[0];
    document.body.append(errorMessage);

    setTimeout(() => errorMessage.remove(), TIMEOUT);
  });

const sendData = (body, cb) => fetch(BASE_URL, { method: 'POST', body, })
  .then((response) => {
    if (response.ok) {
      cb();
      openPopup('#success', '.success__button', () => closePopup('.success'));
    } else {
      throw new Error(`Возникла ошибка ${response.status} : ${response.statusText}`);
    }
  })
  .catch(() => {
    openPopup('#error', '.error__button', () => closePopup('.error'));
  });

export {getData, sendData};
