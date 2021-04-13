import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getHumanizedDuration = (dateTo, dateFrom) => {
  const duration = dayjs.duration(dateTo.diff(dateFrom));

  return ['d', 'h', 'm'].reduce((acc, el) => {
    const unitTime = duration.get(el);

    if (!unitTime && !acc) {
      return acc;
    }

    if (unitTime < 10) {
      acc += ' 0';
    } else {
      acc += ' ';
    }

    acc += `${unitTime}${el.toUpperCase()}`;

    return acc;
  }, '');
};

export const getOffersPoint = (point, offersList) => {
  return offersList.filter((el) => point.offers.includes(el.id));
};

export const sortPointsByDate = (points) => {
  return points.sort(
    (a, b) => a.dateFrom.unix() - b.dateFrom.unix(),
  );
};
