const getRandomInt = (min, max) => Math.round(Math.random() * (max - min) + min);

const createRandomIdGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const checkOriginality = (array) => (new Set(array)).size === array.length;

const getRandomArray = (array, number = array.length) => {
  const randomIndex = createRandomIdGenerator(0, array.length - 1);
  const newArray = [];

  while (newArray.length < number) {
    const index = randomIndex();
    newArray.push(array[index]);
  }

  return newArray;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {checkOriginality, getRandomArray, debounce};
