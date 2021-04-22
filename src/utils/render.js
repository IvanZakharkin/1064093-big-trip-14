import Abstract from '../view/abstract.js';
import { RenderPosition } from '../consts/render';

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  if (!(container instanceof Element) || !(element instanceof Element)) {
    throw new Error('Arguments isn\'t DOM-element\'s or components without elements');
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.REPLACEWITH:
      container.replaceWith(element);
      break;
    default:
      throw new Error('Unknown render place');
  }
};
