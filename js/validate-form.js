import {checkOriginality} from './util.js';
import {sendData} from './data.js';
import {closeUploadModal} from './upload-modal.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_NUMBER = 5;

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('#upload-submit');
const hashtagField = form.querySelector('[name="hashtags"]');
const commentField = form.querySelector('[name="description"]');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

pristine
  .addValidator(commentField,
    (value) => value.length <= COMMENT_MAX_LENGTH,
    'Длина комментария больше 140 символов');

pristine
  .addValidator(hashtagField,
    (value) => value.split(' ').length <= HASHTAGS_MAX_NUMBER,
    'Превышено количество хэштегов');

pristine
  .addValidator(hashtagField,
    (value) => {
      const hashtags = value.toLowerCase().split(' ');
      return checkOriginality(hashtags);
    },
    'Хэштеги повторяются');

pristine
  .addValidator(hashtagField,
    (value) => {
      if (value.length === 0) {
        return true;
      }

      const hashtags = value.split(' ');
      const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
      return hashtags.every((hashtag) => regexp.test(hashtag));
    }, 'Введён невалидный хэштег');

function onFieldKeydown (evt) {
  evt.stopPropagation();
  if (evt.key === 'Escape') {
    this.blur();
  }
}

hashtagField.addEventListener('keydown', onFieldKeydown);
commentField.addEventListener('keydown', onFieldKeydown);

const resetValidator = () => pristine.reset();

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляю...';

    sendData(new FormData(evt.target), closeUploadModal)
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      });
  }
});

export {resetValidator};
