import Abstract from './abstract';
import { pointTypes } from '../mock/const';
import { createElement } from '../utils/render';


const getTempalteDestination = (description, photos) => {
  if (!description && !photos.length) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((photo) =>`<img class="event__photo" src="${photo.src}" alt="${photo.description}"></img>`).join('')}
        </div>
      </div>
    </section>`;
};

const getTempalteOffers = (pointOffers, offersList) => {
  if (!pointOffers.length) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersList.map((offer) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${pointOffers.includes(offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`).join('')}
      </div>
    </section>`;
};

const getTemplate = (point = {}, offersList, cities) => {
  const {
    name = '',
    description = '',
    photos = [],
    type = pointTypes[0],
    price = '',
    offers = [],
  } = point;

  const filteredOfferslistByType = offersList.filter((offer) => offer.type === type);
  const dateFrom  = !point.dateFrom ? '' : point.dateFrom.format('DD/MM/YY HH:MM');
  const dateTo  = !point.dateTo ? '' : point.dateTo.format('DD/MM/YY HH:MM');

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${pointTypes.map((type) => `<div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
              </div>`).join('')}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${cities.map((city) => `<option value="${city.name}"></option>`).join('')}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${getTempalteOffers(offers, filteredOfferslistByType)}
        ${getTempalteDestination(description, photos)}
      </section>
    </form>
  </li>`;
};

export default class PointEdit extends Abstract{
  constructor(point  = {}, offersList = [], cities = []) {
    super();
    this._point = point;
    this._offersList = offersList;
    this._cities = cities;

    this._element = createElement(this.getTemplate());
    this._closeEditClickHandler = this._closeEditClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return getTemplate(this._point, this._offersList, this._cities);
  }

  _closeEditClickHandler() {
    this._callbacks.closeEditClick();
  }

  setCloseEditClickHandler(callback) {
    this._callbacks.closeEditClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeEditClickHandler);
  }

  _formSubmitHandler(e) {
    e.preventDefault();
    this._callbacks.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callbacks.formSubmit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._formSubmitHandler);
  }
}
