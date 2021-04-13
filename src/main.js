import { getFilterTemplate } from './view/filter';
import { getMenuTemplate } from './view/menu';
import { getPointEditTemplate } from './view/point-edit';
import { getPointTemplate } from './view/point';
import { getSortingTemplate } from './view/sorting';
import { getTripInfoTemplate } from './view/trip-info';
import { sortPointsByDate } from './utils';
import generatePoints from './mock/points';

const POINT_COUNT = 20;

const pointsContainer = document.querySelector('.trip-events__list');
const points = generatePoints(POINT_COUNT);
const sortedPointsByDate = sortPointsByDate(points);
const editPoint = sortedPointsByDate.shift();

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
const renderPoints = (sortedPointsByDate) => {
  sortedPointsByDate.forEach((point) =>
    render(pointsContainer, getPointTemplate(point), 'beforeend'),
  );
};
const renderPointEdit = (editPoint) => {
  render(pointsContainer, getPointEditTemplate(editPoint), 'afterbegin');
};
const renderSorting = () => {
  render(pointsContainer, getSortingTemplate(), 'beforebegin');
};
const renderTripInfo = (sortedPointsByDate) => {
  render(
    document.querySelector('.trip-main'),
    getTripInfoTemplate(sortedPointsByDate),
    'afterbegin',
  );
};

renderFilter();
renderMenu();
renderPoints(sortedPointsByDate);
renderPointEdit(editPoint);
renderSorting();
renderTripInfo(sortedPointsByDate);
