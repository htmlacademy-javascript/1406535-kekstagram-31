const modalBox = document.querySelector('.big-picture');
const modalCloseButton = document.querySelector('#picture-cancel');
const commentsBox = modalBox.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
  // eslint-disable-next-line no-use-before-define
    closePhotoModal();
  }
};

modalCloseButton.addEventListener('click', () => {
  // eslint-disable-next-line no-use-before-define
  closePhotoModal();
});

const renderComments = (comments, startIndex = 0, endIndex = comments.length) => {
  commentsBox.innerHTML = '';

  const fragment = new DocumentFragment();

  for (let i = startIndex; i < Math.min(endIndex, comments.length); i++) {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `<img class="social__picture" src="${comments[i].avatar}" alt="${comments[i].name}" width="35" height="35">
    <p class="social__text">${comments[i].message}</p>`;

    fragment.append(comment);
  }

  commentsBox.append(fragment);
};

const renderContent = (photo) => {
  modalBox.querySelector('.big-picture__img img').src = photo.url;
  modalBox.querySelector('.likes-count').textContent = photo.likes;
  modalBox.querySelector('.social__caption').textContent = photo.description;
  renderComments(photo.comments);
  modalBox.querySelector('.social__comment-shown-count').textContent = commentsBox.children.length;
  modalBox.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  modalBox.querySelector('.social__comment-count').classList.add('hidden');
  modalBox.querySelector('.comments-loader').classList.add('hidden');
};

const openPhotoModal = (photo) => {
  modalBox.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  renderContent(photo);
};

const closePhotoModal = () => {
  modalBox.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

export {openPhotoModal};
