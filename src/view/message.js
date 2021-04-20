import { createElement } from '../utils/render';

const getTemplate = (message) => {
  return `<p class="trip-events__msg">${message}</p>`;
};


export default class Message {
  constructor(message) {
    this._message = message;

    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return getTemplate(this._message);
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
