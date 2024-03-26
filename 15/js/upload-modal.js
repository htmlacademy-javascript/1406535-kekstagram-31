import {openModal, closeModal} from './operate-modal-box.js';
import {sendData} from './data.js';
import {pristine} from './validate-form.js';
import {zoom} from './zoom.js';
import {resetFilter} from './filters.js';

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('#upload-submit');
const zoomControl = form.querySelector('.img-upload__scale');

const onZoomControlClick = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    zoom.out();
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    zoom.in();
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляю...';

    sendData(new FormData(evt.target), closeUploadModal)
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      });
  }
});

const openUploadModal = () => {
  openModal('.img-upload__overlay', '.img-upload__cancel', closeUploadModal);
  zoomControl.addEventListener('click', onZoomControlClick);
};

function closeUploadModal () {
  document.querySelector('.img-upload__overlay').scrollTo(0, 0);
  closeModal('.img-upload__overlay');
  zoom.reset();
  resetFilter();
  pristine.reset();
  form.reset();
  zoomControl.removeEventListener('click', onZoomControlClick);
}

export {openUploadModal};
