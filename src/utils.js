import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RenderPosition } from './const';

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
  return points.sort((a, b) => a.dateFrom.unix() - b.dateFrom.unix());
};

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.REPLACEWITH:
      container.replaceWith(element);
      break;
  }
};
