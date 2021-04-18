import { createElement } from '../utils';

const getTemplate = () => {
  return  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
};

export default class Menu {
  constructor() {
    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return getTemplate();
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

