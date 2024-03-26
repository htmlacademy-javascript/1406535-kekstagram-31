import {initGallery, setSortClick, applySort} from './gallery.js';
import {debounce} from './util.js';
import {getData} from './data.js';
import {openUploadModal} from './upload-modal.js';

const RERENDER_DELAY = 500;

document.querySelector('.img-upload__input').addEventListener('change', () => {
  openUploadModal();
});

getData()
  .then((photos) => {
    initGallery(photos);
    setSortClick(debounce(() => applySort(photos), RERENDER_DELAY));
  });
