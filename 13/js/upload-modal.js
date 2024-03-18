import {operateModalBox} from './operate-modal-box.js';
import './validate-form.js';
import {zoom} from './zoom.js';
import './filters.js';

const form = document.querySelector('#upload-select-image');
const control = form.querySelector('.img-upload__scale');

const openUploadModal = () => {
  operateModalBox('open', '.img-upload__overlay', '.img-upload__cancel', closeUploadModal);

  control.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')) {
      zoom.out();
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      zoom.in();
    }
  });
};

function closeUploadModal () {
  operateModalBox('close', '.img-upload__overlay');
  form.reset();
  zoom.reset();
}

export {openUploadModal};
