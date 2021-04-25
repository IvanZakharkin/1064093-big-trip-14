import generatePoints from './mock/points';
import TripPresenter from './presenter/trip';

const POINT_COUNT = 20;

const points = generatePoints(POINT_COUNT);

new TripPresenter({
  pointsListContainer: document.querySelector('.trip-events__list'),
  filterContainer: document.querySelector('.trip-controls__filters'),
  menuContainer: document.querySelector('.trip-controls__navigation'),
  tripInfoContainer: document.querySelector('.trip-main'),
}).init(points);
