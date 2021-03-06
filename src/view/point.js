import Abstract from './abstract';
import { createElement } from '../utils/render';
import { getHumanizedDuration } from '../utils/common';
import { getOffersPoint } from '../utils/points';

const getTemplateOffers = (offers) => {
  return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.map((offer) => `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span></li>`).join('')}
    </ul>`;
};

const getTemplate = (point, offers) => {
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${point.dateFrom.format('MMM DD')}</time>
      <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.name}</h3>
      <div class="event__schedule">
          <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${point.dateFrom.format('HH:mm')}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${point.dateTo.format('HH:mm')}</time>
          </p>
          <p class="event__duration">${getHumanizedDuration(point.dateTo,point.dateFrom)}</p>
      </div>
      <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
      </p>
      ${getTemplateOffers(offers)}
      <button class="event__favorite-btn ${point.isFavorites ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
      </button>
      <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends Abstract {
  constructor(point, offersList = []) {
    super();
    this._point = point;
    this._offersList = offersList;

    this._element = createElement(this.getTemplate());
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  _getOffers() {
    return getOffersPoint(this._point, this._offersList);
  }

  getTemplate() {
    return getTemplate(this._point, this._getOffers());
  }

  _editClickHandler() {
    this._callbacks.editClick();
  }

  setEditClickHandler(callback) {
    this._callbacks.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
