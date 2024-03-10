import {getRandomInt, getRandomArrayElement, createRandomIdGenerator} from './util.js';

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

const PHOTOS_NUMBER = 25;

const likes = {
  MIN: 15,
  MAX: 200
};

const comments = {
  MIN: 0,
  MAX: 30
};

const idNumbers = {
  MIN: 1,
  MAX: PHOTOS_NUMBER * comments.MAX
};

const getPhotoId = createRandomIdGenerator(idNumbers.MIN, idNumbers.MAX);

const createComment = () => ({
  id: getPhotoId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: `${index + 1}`,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(likes.MIN, likes.MAX),
  comments: Array.from({length: getRandomInt(comments.MIN, comments.MAX)}, createComment)
});

const createPhotos = () => Array.from({length: PHOTOS_NUMBER}, (_, index) => createPhoto(index));

export {createPhotos};
