export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract class, only concrete one.');
    }

    this._element = null;
    this._callbacks = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
