import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getDuration = (dateTo, dateFrom) => {
  return dayjs.duration(dateTo.diff(dateFrom));
};

export const getHumanizedDuration = (dateTo, dateFrom) => {
  const duration = getDuration(dateTo, dateFrom);

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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
