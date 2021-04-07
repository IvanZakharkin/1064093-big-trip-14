import { getFilterTemplate } from './view/filter';
import { getMenuTemplate } from './view/menu';
import { getPointEditTemplate } from './view/point-edit';
import { getPointTemplate } from './view/point';
import { getSortingTemplate } from './view/sorting';
import { getTripInfoTemplate } from './view/trip-info';

const render = (container, tempalte, position) => {
  container.insertAdjacentHTML(position, tempalte);
};

const renderFilter = () => {
  render(
    document.querySelector('.trip-controls__filters'),
    getFilterTemplate(),
    'beforeend',
  );
};
const renderMenu = () => {
  render(
    document.querySelector('.trip-controls__navigation'),
    getMenuTemplate(),
    'beforeend',
  );
};

const pointsContainer = document.querySelector('.trip-events__list');

const renderPoints = () => {
  const countPoint = 3;

  for (let i = 0; i < countPoint; i += 1) {
    render(pointsContainer, getPointTemplate(), 'beforeend');
  }
};
const renderPointEdit = () => {
  render(pointsContainer, getPointEditTemplate(), 'afterbegin');
};
const renderSorting = () => {
  render(pointsContainer, getSortingTemplate(), 'beforebegin');
};
const renderTripInfo = () => {
  render(
    document.querySelector('.trip-main'),
    getTripInfoTemplate(),
    'afterbegin',
  );
};

renderFilter();
renderMenu();
renderPoints();
renderPointEdit();
renderSorting();
renderTripInfo();
