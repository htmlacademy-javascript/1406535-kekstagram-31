const checkLength = (string, maxlength) => string.length <= maxlength;

checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false

const isPalindrom = (string) => {
  string = string.toString().replaceAll(' ', '').toUpperCase();
  let revertString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    revertString += string[i];
  }
  return revertString === string;
};

isPalindrom('топот'); // true
isPalindrom('ДовОд'); // true
isPalindrom('Кекс'); // false
isPalindrom('Лёша на полке клопа нашёл '); // true

const findPositiveInt = (string) => {
  string = string.toString();
  let positiveInt = '';
  for (let i = 0 ; i < string.length; i++) {
    const symbol = parseInt(string[i], 10);
    if (!Number.isNaN(symbol)) {
      positiveInt += symbol;
    }
  }
  if (positiveInt === '') {
    return NaN;
  }
  return parseInt(positiveInt, 10);
};

findPositiveInt('2023 год'); // 2023
findPositiveInt('ECMAScript 2022'); // 2022
findPositiveInt('1 кефир, 0.5 батона'); // 105
findPositiveInt('агент 007'); // 7
findPositiveInt('а я томат'); // NaN
findPositiveInt(2023); // 2023
findPositiveInt(-1); // 1
findPositiveInt(1.5); // 15
