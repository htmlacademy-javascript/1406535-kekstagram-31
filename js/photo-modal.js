const modalBox = document.querySelector('.big-picture');
const modalCloseButton = document.querySelector('#picture-cancel');
const commentShownCount = modalBox.querySelector('.social__comment-shown-count');
const commentsBox = modalBox.querySelector('.social__comments');
const loadMoreButton = modalBox.querySelector('.comments-loader');
const COMMENTS_STEP = 5;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhotoModal();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.classList.contains('overlay')) {
    closePhotoModal();
  }
};

modalCloseButton.addEventListener('click', () => {
  closePhotoModal();
});

const renderLotComments = (startIndex = 0, quantity = COMMENTS_STEP) => {
  const fragment = new DocumentFragment();
  let lastIndex = startIndex;

  for (let i = startIndex; i < Math.min(startIndex + quantity, comments.length); i++) {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `<img class="social__picture" src="${comments[i].avatar}" alt="${comments[i].name}" width="35" height="35">
    <p class="social__text">${comments[i].message}</p>`;

    fragment.append(comment);
    lastIndex = i + 1;
  }

  if (lastIndex === comments.length) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }

  commentShownCount.textContent = lastIndex;
  commentsBox.append(fragment);
};

const renderContent = (photo) => {
  comments = [...photo.comments];

  // Блок social__header
  modalBox.querySelector('.big-picture__img img').src = photo.url;
  modalBox.querySelector('.social__caption').textContent = photo.description;
  modalBox.querySelector('.likes-count').textContent = photo.likes;

  // Блоки social__comment-count и social__comments
  commentsBox.innerHTML = '';
  modalBox.querySelector('.social__comment-total-count').textContent = comments.length;

  if (comments.length !== 0) {
    renderLotComments();
  } else {
    commentShownCount.textContent = 0;
    loadMoreButton.classList.add('hidden');
  }
};

const onLoadMoreButtonClick = () => {
  const startIndex = parseInt(commentShownCount.textContent, 10);
  renderLotComments(startIndex);
};

function openPhotoModal (photo) {
  modalBox.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  document.body.classList.add('modal-open');
  renderContent(photo);
  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
}

function closePhotoModal () {
  modalBox.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  document.body.classList.remove('modal-open');
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
}

export {openPhotoModal};
