const thumbTemplate = document.querySelector('#picture').content.children[0];
const thumbsBox = document.querySelector('.pictures');

const createThumb = (photo) => {
  const thumb = thumbTemplate.cloneNode(true);
  thumb.dataset.origin = photo.url;

  const thumbImg = thumb.querySelector('.picture__img');
  thumbImg.src = photo.url;
  thumbImg.alt = photo.description;

  thumb.querySelector('.picture__likes').textContent = photo.likes;
  thumb.querySelector('.picture__comments').textContent = photo.comments.length;
  return thumb;
};

const renderThumbs = (photos) => {
  const fragment = new DocumentFragment();
  photos.forEach((photo) => fragment.append(createThumb(photo)));
  thumbsBox.append(fragment);
};

const clearThumbs = () => {
  const thumbs = thumbsBox.querySelectorAll('.picture');
  thumbs.forEach((thumb) => thumb.remove());
};

export {renderThumbs, clearThumbs};
