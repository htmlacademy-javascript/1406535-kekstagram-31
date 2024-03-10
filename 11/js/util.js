const getRandomInt = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const createRandomIdGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
export {getRandomInt, getRandomArrayElement, createRandomIdGenerator};
