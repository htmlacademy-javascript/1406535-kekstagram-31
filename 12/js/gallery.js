import {createPhotos} from './data.js';
import {createThumb} from './thumb.js';
import {openPhotoModal} from './photo-modal.js';

const photos = createPhotos();
const thumbsBox = document.querySelector('.pictures');

const renderThumbs = (thumbs) => {
  const fragment = new DocumentFragment();
  thumbs.forEach((photo) => fragment.append(createThumb(photo)));
  thumbsBox.append(fragment);
};

renderThumbs(photos);

thumbsBox.addEventListener('click', (evt) => {
  const thumbUrl = evt.target.closest('a')?.dataset.origin;
  if (thumbUrl) {
    const targetPhoto = photos.find((photo) => photo.url === thumbUrl);
    openPhotoModal(targetPhoto);
  }
});
