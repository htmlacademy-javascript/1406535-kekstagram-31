let isPopupOpen = false;

const openModal = (modalSelector, closeButtonSelector, cb) => {
  const modal = document.querySelector(modalSelector);
  const closeButton = modal.querySelector(closeButtonSelector);

  const onKeydown = (evt) => {
    if (evt.key === 'Escape' && !isPopupOpen) {
      evt.preventDefault();
      callback();
    }
  };

  const onCloseButtonClick = () => callback();

  function callback () {
    cb();
    document.removeEventListener('keydown', onKeydown);
    closeButton.removeEventListener('click', onCloseButtonClick);
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const closeModal = (modalSelector) => {
  document.querySelector(modalSelector).classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const openPopup = (popupSelector, closeButtonSelector, cb) => {
  const popup = document.querySelector(popupSelector).content.children[0].cloneNode(true);
  const closeButton = popup.querySelector(closeButtonSelector);

  const onKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      callback();
    }
  };

  const onClick = (evt) => {
    if (evt.target === popup || evt.target === closeButton) {
      callback();
    }
  };

  function callback () {
    cb();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClick);
  }

  document.body.append(popup);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onClick);
  isPopupOpen = true;
};

const closePopup = (popupSelector) => {
  document.querySelector(popupSelector).remove();
  isPopupOpen = false;
};

export {openModal, closeModal, openPopup, closePopup};
