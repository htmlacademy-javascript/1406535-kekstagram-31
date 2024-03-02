const thumbsContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const thumbTemplate = template.querySelector('.picture');

const createThumb = (photo) => {
  const thumb = thumbTemplate.cloneNode(true);
  const thumbImg = thumb.querySelector('.picture__img');
  thumbImg.src = photo.url;
  thumbImg.alt = photo.description;
  thumb.querySelector('.picture__likes').textContent = photo.likes;
  thumb.querySelector('.picture__comments').textContent = photo.comments.length;
  return thumb;
};

const renderThumbs = (photos) => {
  const fragment = new DocumentFragment();
  photos.forEach((photo) => fragment.appendChild(createThumb(photo)));
  thumbsContainer.appendChild(fragment);
};

export {renderThumbs};
