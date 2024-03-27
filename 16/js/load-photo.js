const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'avif', 'webp'];
const photo = document.querySelector('.img-upload__preview img');
const previews = document.querySelectorAll('.effects__preview');

const loadPhoto = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const isImage = IMAGE_TYPES.some((it) => fileName.endsWith(it));

  if (isImage) {
    photo.src = URL.createObjectURL(file);

    previews.forEach((preview) => {
      preview.style.backgroundImage = `url(${photo.src})`;
    });
  }
};

export {loadPhoto};
