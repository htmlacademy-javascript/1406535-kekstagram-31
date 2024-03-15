import './gallery.js';
import {openUploadModal} from './upload-modal.js';

document.querySelector('.img-upload__input').addEventListener('change', () => {
  openUploadModal();
});
