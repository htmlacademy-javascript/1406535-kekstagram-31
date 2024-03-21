import {initGallery} from './gallery.js';
import {getData} from './data.js';
import {openUploadModal} from './upload-modal.js';

document.querySelector('.img-upload__input').addEventListener('change', () => {
  openUploadModal();
});

getData(initGallery);
