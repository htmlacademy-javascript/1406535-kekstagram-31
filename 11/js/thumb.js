const template = document.querySelector('#picture').content;
const thumbTemplate = template.querySelector('.picture');

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

export {createThumb};
