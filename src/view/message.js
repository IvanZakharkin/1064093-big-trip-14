import Abstract from './abstract';
import { createElement } from '../utils/render';

const getTemplate = (message) => {
  return `<p class="trip-events__msg">${message}</p>`;
};


export default class Message extends Abstract {
  constructor(message) {
    super();
    this._message = message;

    this._element = createElement(this.getTemplate());
  }

  getTemplate() {
    return getTemplate(this._message);
  }
}
