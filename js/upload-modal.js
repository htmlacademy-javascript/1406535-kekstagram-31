import {operateModalBox} from './operate-modal-box.js';
import {resetValidator} from './validate-form.js';
import {zoom} from './zoom.js';
import {resetFilter} from './filters.js';

const form = document.querySelector('#upload-select-image');
const control = form.querySelector('.img-upload__scale');

const clearForm = () => {
  zoom.reset();
  resetFilter();
  resetValidator();
  form.reset();
};

const onControlClick = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    zoom.out();
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    zoom.in();
  }
};

const openUploadModal = () => {
  operateModalBox('open', '.img-upload__overlay', '.img-upload__cancel', closeUploadModal);
  clearForm();
  control.addEventListener('click', onControlClick);
};

function closeUploadModal () {
  operateModalBox('close', '.img-upload__overlay');
  clearForm();
  control.removeEventListener('click', onControlClick);
}

export {openUploadModal};
