import {renderThumbs, clearThumbs} from './thumbs.js';
import {openPhotoModal} from './photo-modal.js';
import {getRandomArray} from './util.js';

const RANDOM_PHOTOS_NUMBER = 10;
const thumbsBox = document.querySelector('.pictures');
const sortControl = document.querySelector('.img-filters__form');
const sortButtons = sortControl.querySelectorAll('[type="button"]');

const initGallery = (photos) => {
  renderThumbs(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  thumbsBox.addEventListener('click', (evt) => {
    const thumbUrl = evt.target.closest('a')?.dataset.origin;
    if (thumbUrl) {
      const targetPhoto = photos.find((photo) => photo.url === thumbUrl);
      openPhotoModal(targetPhoto);
    }
  });
};

const setSortClick = (cb) => {
  sortControl.addEventListener('click', (evt) => {
    sortButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    cb();
  });
};

const applySort = (photos) => {
  clearThumbs();

  const sortedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  const randomPhotos = getRandomArray(photos, RANDOM_PHOTOS_NUMBER);
  let selectedPhotos;

  const sortMethod = sortControl.querySelector('.img-filters__button--active').id.slice(7);

  switch (sortMethod) {
    case 'random':
      selectedPhotos = randomPhotos;
      break;
    case 'discussed':
      selectedPhotos = sortedPhotos;
      break;
    case 'default':
    default:
      selectedPhotos = photos;
  }

  renderThumbs(selectedPhotos);
};

export {initGallery, setSortClick, applySort};
