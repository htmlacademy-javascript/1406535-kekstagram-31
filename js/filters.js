const effects = {
  chrome: { range: { min: 0, max: 1, }, start: 0, step: 0.1, },
  sepia: { range: { min: 0, max: 1, }, start: 0, step: 0.1, },
  marvin: { range: { min: 0, max: 100, }, start: 0, step: 1, },
  phobos: { range: { min: 0, max: 3, }, start: 0, step: 0.1, },
  heat: { range: { min: 1, max: 3, }, start: 1, step: 0.1, },
};

const form = document.querySelector('#upload-select-image');
const picture = form.querySelector('.img-upload__preview img');
const controls = form.querySelectorAll('.effects__list input[type="radio"]');
const filterSliderBox = form.querySelector('.img-upload__effect-level');
const filterSlider = form.querySelector('.effect-level__slider');
const filterField = form.querySelector('.effect-level__value');

let currentFilter;

const applyFilter = (value) => {
  switch (currentFilter) {
    case 'chrome':
      picture.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      picture.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      picture.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      picture.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      picture.style.filter = `brightness(${value})`;
      break;
    case 'none':
    default:
      filterSliderBox.classList.add('hidden');
      picture.style.filter = '';
  }
};

const resetFilter = () => {
  currentFilter = 'none';
  applyFilter();
};

noUiSlider.create(filterSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

filterSlider.noUiSlider.on('update', () => {
  const newValue = filterSlider.noUiSlider.get();
  filterField.value = newValue;
  applyFilter(newValue);
});

for (const control of controls) {
  control.addEventListener('click', () => {
    currentFilter = control.value;

    if (currentFilter === 'none') {
      resetFilter();
    } else {
      filterSliderBox.classList.remove('hidden');
      filterSlider.noUiSlider.updateOptions(effects[currentFilter]);
    }
  });
}

export {resetFilter};
