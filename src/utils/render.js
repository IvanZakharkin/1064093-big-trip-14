import { RenderPosition } from '../consts/render';

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place) => {
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
  }
};
