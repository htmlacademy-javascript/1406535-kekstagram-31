import {initGallery, setSortClick, applySort} from './gallery.js';
import {debounce} from './util.js';
import {getData} from './data.js';
import {loadPhoto} from './load-photo.js';
import {openUploadModal} from './upload-modal.js';

const RERENDER_DELAY = 500;

document.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  loadPhoto(evt);
  openUploadModal();
});

const onDataLoad = (photos) => {
  initGallery(photos);
  setSortClick(debounce(() => applySort(photos), RERENDER_DELAY));
};

getData(onDataLoad);
