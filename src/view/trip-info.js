import { offersList } from '../const';
import { createElement, getOffersPoint } from '../utils';

const getTemplate = (data) => {
  const { cities, price, dates } = data;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${cities}</h1>
      <p class="trip-info__dates">${dates}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;
};

export default class TripInfo {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  _calcCommonPrice() {
    const calcOffersPrice = (offers) => {
      return offers.reduce((acc, offer) => acc + offer.price, 0);
    };

    return this._points.reduce((acc, point) => {
      const offers = getOffersPoint(point, offersList);

      return acc + point.price + calcOffersPrice(offers);
    }, 0);
  }

  _getFirstPoint() {
    return this._points[0];
  }

  _getLastPoint() {
    return this._points[this._points.length - 1];
  }

  _getStringChainCities() {
    if (this._points.length <= 3) {
      return this._points.map((el) => el.name).join('&nbsp;&mdash;&nbsp;');
    }

    return [this._getFirstPoint().name, '...', this._getLastPoint().name].join(
      '&nbsp;&mdash;&nbsp;',
    );
  }

  _getStringDates() {
    const dateStart = this._getFirstPoint().dateFrom;
    const dateEnd = this._getLastPoint().dateTo;

    if (dateStart.month() === dateEnd.month()) {
      return `${dateStart.format('DD')}&nbsp;&mdash;&nbsp;${dateEnd.format(
        'DD MMM',
      )}`;
    }

    return `${dateStart.format('DD MMM')}&nbsp;&mdash;&nbsp;${dateEnd.format(
      'DD MMM',
    )}`;
  }

  getTemplate() {
    const data = {
      price: this._calcCommonPrice(),
      dates: this._getStringChainCities(),
      cities: this._getStringDates(),
    };

    return getTemplate(data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
