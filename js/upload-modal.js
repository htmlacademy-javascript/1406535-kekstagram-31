import {operateModalBox} from './operate-modal-box.js';
import './validate-form.js';

const form = document.querySelector('#upload-select-image');

const openUploadModal = () => {
  operateModalBox('open', '.img-upload__overlay', '.img-upload__cancel', closeUploadModal);
};

function closeUploadModal () {
  operateModalBox('close', '.img-upload__overlay');
  form.reset();
}

export {openUploadModal};
