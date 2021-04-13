import dayjs from 'dayjs';
import cities from './cities';
import { pointTypes, offersList } from '../const';
import { getRandomInteger } from '../utils';

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  const { name, description, photos } = cities[randomIndex];

  return {
    name,
    description,
    photos,
  };
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
};

let startDate = dayjs().add(getRandomInteger(-144, 0), 'hour');
const generateDates = () => {
  const dateFrom = startDate.add(
    getRandomInteger(10, 360), //360 min is 6 hour
    'minutes',
  );
  const dateTo = dateFrom.add(
    getRandomInteger(10, 2160), //2160 min is 36 hour
    'minutes',
  );

  startDate = dateTo;

  return {
    dateFrom,
    dateTo,
  };
};

const generateOffers = (type) => {
  const IdsOfOffersByTypes = offersList
    .filter((offer) => offer.type === type)
    .map((offer) => offer.id);
  const maxCount = IdsOfOffersByTypes.length;
  const count = getRandomInteger(1, maxCount);
  const result = [];

  if (!IdsOfOffersByTypes.length) {
    return result;
  }

  while (result.length < count) {
    const randomIndex = getRandomInteger(0, maxCount - 1);
    const randomOffersId = IdsOfOffersByTypes[randomIndex];

    if (!result.includes(randomOffersId)) {
      result.push(randomOffersId);
    }
  }

  return result;
};

const generatePoint = () => {
  const { dateFrom, dateTo } = generateDates();
  const type = generateType();
  const { name, description, photos } = generateDestination();
  return {
    name,
    description,
    photos,
    type: type,
    price: getRandomInteger(0, 500),
    dateFrom,
    dateTo,
    isFavorites: !!getRandomInteger(0, 1),
    offers: generateOffers(type),
  };
};
const generatePoints = (count) => {
  return Array(count).fill().map(generatePoint);
};

export default generatePoints;
