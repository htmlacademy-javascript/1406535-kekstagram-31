import {operateModalBox} from './operate-modal-box.js';
import {resetValidator} from './validate-form.js';
import {zoom} from './zoom.js';
import {resetFilter} from './filters.js';

const form = document.querySelector('#upload-select-image');
const zoomControl = form.querySelector('.img-upload__scale');

const onZoomControlClick = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    zoom.out();
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    zoom.in();
  }
};

const openUploadModal = () => {
  operateModalBox('open', '.img-upload__overlay', '.img-upload__cancel', closeUploadModal);
  document.querySelector('.img-upload__overlay').scrollTo(0, 0);
  zoom.reset();
  resetFilter();
  resetValidator();
  form.reset();
  zoomControl.addEventListener('click', onZoomControlClick);
};

function closeUploadModal () {
  operateModalBox('close', '.img-upload__overlay');
  zoomControl.removeEventListener('click', onZoomControlClick);
}

export {openUploadModal};
