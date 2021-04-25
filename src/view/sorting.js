import Abstract from './abstract';
import { createElement } from '../utils/render';
import { sortTypes } from '../consts/sorting';

const getTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortTypes.DAY}" checked>
        <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortTypes.EVENT}" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortTypes.TIME}">
        <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortTypes.PRICE}">
        <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortTypes.OFFER}" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;
};

export default class Sorting extends Abstract {
  constructor() {
    super();

    this._element = createElement(this.getTemplate());

    this._changeSortTypesHandler = this._changeSortTypesHandler.bind(this);
  }

  getTemplate() {
    return getTemplate();
  }

  _changeSortTypesHandler(e) {
    this._callbacks.changeSortTypes(e.target.value);
  }

  setChangeSortTypesHandler(callback) {
    this._callbacks.changeSortTypes = callback;
    this.getElement()
      .querySelectorAll('.trip-sort__input')
      .forEach((input) =>
        input.addEventListener('change', this._changeSortTypesHandler),
      );
  }
}
