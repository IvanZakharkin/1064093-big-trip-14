import FilterView from './view/filter';
import MenuView from './view/menu';
import PointEditView from './view/point-edit';
import PointView from './view/point';
import SortingView from './view/sorting';
import TripInfoView from './view/trip-info';
import MessageView from './view/message';
import generatePoints from './mock/points';
import cities from './mock/cities';
import { offersList } from './mock/const';
import { RenderPosition } from './consts/render';
import { render } from './utils/render';
import { sortPointsByDate } from './utils/points';

const POINT_COUNT = 20;
const EMPTY_POINTS_MESSAGE = 'Click New Event to create your first point';

const pointsContainer = document.querySelector('.trip-events__list');
const points = generatePoints(POINT_COUNT);
const sortedPointsByDate = sortPointsByDate(points);

const renderFilter = () => {
  render(
    document.querySelector('.trip-controls__filters'),
    new FilterView().getElement(),
    RenderPosition.BEFOREEND,
  );
};
const renderMenu = () => {
  render(
    document.querySelector('.trip-controls__navigation'),
    new MenuView().getElement(),
    RenderPosition.BEFOREEND,
  );
};
const renderSorting = () => {
  render(pointsContainer, new SortingView().getElement(), 'beforebegin');
};
const renderTripInfo = (points) => {
  render(
    document.querySelector('.trip-main'),
    new TripInfoView(points).getElement(),
    RenderPosition.AFTERBEGIN,
  );
};
const renderPoints = (points = []) => {
  if (!points.length) {
    render(
      document.querySelector('.trip-events'),
      new MessageView(EMPTY_POINTS_MESSAGE).getElement(),
      RenderPosition.AFTERBEGIN,
    );
    return;
  }

  points.forEach((point) => {
    const pointComponent = new PointView(point, offersList);
    const pointEditComponent = new PointEditView(point, offersList, cities);

    const replacePointToForm = () => {
      render(pointComponent, pointEditComponent, RenderPosition.REPLACEWITH);
    };
    const replaceFormToPoint = () => {
      render(pointEditComponent, pointComponent, RenderPosition.REPLACEWITH);
    };
    const onEscKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setCloseEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointsContainer, pointComponent, 'beforeend');
  });
  renderSorting();
  renderTripInfo(sortedPointsByDate);
};

renderFilter();
renderMenu();
renderPoints(sortedPointsByDate);
