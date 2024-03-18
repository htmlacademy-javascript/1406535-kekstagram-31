const form = document.querySelector('#upload-select-image');
const picture = form.querySelector('.img-upload__preview img');
const zoomField = form.querySelector('.scale__control--value');

const zoom = {
  default: 1,
  min: 0.25,
  max: 1,
  step: 0.25,
  current: 1,

  apply () {
    zoomField.value = `${this.current * 100}%`;
    picture.style.transform = `scale(${this.current})`;
  },

  in () {
    if (this.current < this.max) {
      this.current += this.step;
      this.apply();
    }
  },

  out () {
    if (this.current > this.min) {
      this.current -= this.step;
      this.apply();
    }
  },

  reset () {
    this.current = this.default;
    this.apply();
  }
};

export {zoom};
