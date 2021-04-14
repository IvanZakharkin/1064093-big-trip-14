import { offersList } from '../const';
import { getOffersPoint } from '../utils';

const calcOffersPrice = (offers) => {
  return offers.reduce((acc, offer) => acc + offer.price, 0);
};

const calcCommonPrice = (points) => {
  return points.reduce((acc, point) => {
    const offers = getOffersPoint(point, offersList);

    return acc + point.price + calcOffersPrice(offers);
  }, 0);
};

const getStringChainCities = (points) => {
  if (points.length <= 3) {
    return points.map((el) => el.name).join('&nbsp;&mdash;&nbsp;');
  }

  return [points[0].name, '...', points[points.length - 1].name].join('&nbsp;&mdash;&nbsp;');
};

const getStringDates = (points) => {
  const dateStart = points[0].dateFrom;
  const dateEnd = points[points.length - 1].dateTo;

  if (dateStart.month() === dateEnd.month()) {
    return `${dateStart.format('DD')}&nbsp;&mdash;&nbsp;${dateEnd.format('DD MMM')}`;
  }

  return `${dateStart.format('DD MMM')}&nbsp;&mdash;&nbsp;${dateEnd.format('DD MMM')}`;
};

const getTripInfoTemplate = (points) => {
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getStringChainCities(points)}</h1>
      <p class="trip-info__dates">${getStringDates(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calcCommonPrice(points)}</span>
    </p>
  </section>`;
};

export { getTripInfoTemplate };
