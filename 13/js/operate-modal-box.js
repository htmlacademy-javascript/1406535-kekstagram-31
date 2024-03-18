const operateModalBox = (action, modalSelector, closeButtonSelector, cb, overlay = false) => {
  const modal = document.querySelector(modalSelector);
  const closeButton = modal.querySelector(closeButtonSelector);

  const onKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      cb();
      removeListeners();
    }
  };

  const onClick = (evt) => {
    if (evt.target.classList.contains('overlay')) {
      cb();
      removeListeners();
    }
  };

  const onCloseButtonClick = () => {
    cb();
    removeListeners();
  };

  function removeListeners () {
    document.removeEventListener('keydown', onKeydown);
    closeButton.removeEventListener('click', onCloseButtonClick);

    if (overlay) {
      document.removeEventListener('click', onClick);
    }
  }


  if (action === 'open') {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onKeydown);
    closeButton.addEventListener('click', onCloseButtonClick);

    if (overlay) {
      document.addEventListener('click', onClick);
    }
  }

  if (action === 'close') {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

export {operateModalBox};
