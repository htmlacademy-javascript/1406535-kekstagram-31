import {checkOriginality} from './util.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_NUMBER = 5;

const form = document.querySelector('#upload-select-image');
const hashtagField = document.querySelector('[name="hashtags"]');
const commentField = document.querySelector('[name="description"]');

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

const checkValidity = (value) => {
  if (value.length === 0) {
    return true;
  }

  const hashtags = value.split(' ');
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtags.every((hashtag) => regexp.test(hashtag));
};

pristine.addValidator(hashtagField, checkValidity, 'Введён невалидный хэштег');

function onFieldKeydown (evt) {
  evt.stopPropagation();
  if (evt.key === 'Escape') {
    this.blur();
  }
}

hashtagField.addEventListener('keydown', onFieldKeydown);
commentField.addEventListener('keydown', onFieldKeydown);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
    form.reset();
  }
});
