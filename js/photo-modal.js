import {operateModalBox} from './operate-modal-box.js';

const modalBox = document.querySelector('.big-picture');
const commentShownCountElement = modalBox.querySelector('.social__comment-shown-count');
const commentsBox = modalBox.querySelector('.social__comments');
const loadMoreButton = modalBox.querySelector('.comments-loader');
const COMMENTS_STEP = 5;
let comments = [];
let commentShownCount;

const updateCommentCount = () => {
  commentShownCountElement.textContent = commentShownCount;

  if (commentShownCount === comments.length) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
};

const renderLotComments = () => {
  const fragment = new DocumentFragment();

  let i = commentShownCount;
  for (i; i < Math.min(commentShownCount + COMMENTS_STEP, comments.length); i++) {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `<img class="social__picture" src="${comments[i].avatar}" alt="${comments[i].name}" width="35" height="35">
    <p class="social__text">${comments[i].message}</p>`;

    fragment.append(comment);
  }
  commentsBox.append(fragment);
  commentShownCount = i;
};

const onLoadMoreButtonClick = () => {
  renderLotComments();
  updateCommentCount();
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
  commentShownCount = 0;
  updateCommentCount();

  if (comments.length !== 0) {
    renderLotComments();
    updateCommentCount();
  }
};

function openPhotoModal (photo) {
  operateModalBox('open', '.big-picture', '.big-picture__cancel', closePhotoModal);
  modalBox.scrollTo(0, 0);
  renderContent(photo);
  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
}

function closePhotoModal () {
  operateModalBox('close', '.big-picture');
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
}

export {openPhotoModal};
