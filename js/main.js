const NAMES = ['Виктория', 'Олег', 'Иван', 'Петр', 'Джеймс', 'Ольга', 'Катя', 'Виктор', 'Александр', 'Женя', 'Оливер', 'Ахмет', 'София', 'Ильяс', 'Гретта'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = ['#природа', '#собаки', '#портрет', '#семья'];
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const OBJ_QUANTITY = 25;

const getRandomInt = (start, end) => Math.round(Math.random() * (end - start) + start);

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const comment = () => ({
  id: getRandomInt(0, 1000),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const generateObjects = (quantity) => {
  const array = [];
  for (let i = 0; i < quantity; i++) {
    array[i] = {
      id: `${i + 1}`,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: Array.from({length: getRandomInt(COMMENTS_MIN, COMMENTS_MAX)}, comment)
    };
  }
  return array;
};

generateObjects(OBJ_QUANTITY);
