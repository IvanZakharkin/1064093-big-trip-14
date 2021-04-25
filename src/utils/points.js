import { getDuration } from './common';

export const getOffersPoint = (point, offersList) => {
  return offersList.filter((el) => point.offers.includes(el.id));
};

export const sortPointsByDate = (points) => {
  return points.sort((a, b) => a.dateFrom.unix() - b.dateFrom.unix());
};

export const sortPointsByTime = (points) => {
  const pointWithDurations = points.reduce((acc, point) => {
    const durationMs = getDuration(point.dateTo, point.dateFrom).asMilliseconds();
    acc[durationMs] = point;

    return acc;
  }, {});

  const sortDurations = Object.keys(pointWithDurations).sort((a, b) => a - b);

  return sortDurations.map((duration) => pointWithDurations[duration]);
};

export const sortPointsByPrice = (points) => {
  return points.sort((a, b) => parseInt(a.price) - parseInt(b.price));
};
