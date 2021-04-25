import SortingView from '../view/sorting';
import MessageView from '../view/message';
import FilterView from '../view/filter';
import MenuView from '../view/menu';
import TripInfoView from '../view/trip-info';
import PointPresenter from './point';
import { updateItem } from '../utils/common';
import { sortTypes } from '../consts/sorting';
import { EMPTY_POINTS_MESSAGE } from '../consts/messages';
import {
  sortPointsByDate,
  sortPointsByTime,
  sortPointsByPrice
} from '../utils/points';
import { RenderPosition } from '../consts/render';
import { render } from '../utils/render';

export default class Trip {
  constructor(elementsContainers) {
    this._pointsListContainer = elementsContainers.pointsListContainer || null;
    this._filterContainer = elementsContainers.filterContainer || null;
    this._menuContainer = elementsContainers.menuContainer || null;
    this._tripInfoContainer = elementsContainers.tripInfoContainer || null;
    this._pointsPresenters = {};
    this._sortType = sortTypes.DAY;

    this._changeDataPointHandler = this._changeDataPointHandler.bind(this);
    this._resetTasksViewHandler = this._resetTasksViewHandler.bind(this);
    this._changeSortTypesHandler = this._changeSortTypesHandler.bind(this);
  }
  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    this._sortingComponent = new SortingView();
    this._noPointsMessageComponent = new MessageView(EMPTY_POINTS_MESSAGE);
    this._filterComponent = new FilterView();
    this._tripInfoComponent = new TripInfoView(this._sourcedPoints);
    this._menuComponent = new MenuView();

    this._renderTrip();
  }
  _renderPoints() {
    this._points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this._pointsListContainer,
        this._changeDataPointHandler,
        this._resetTasksViewHandler,
      );
      pointPresenter.init(point);
      this._pointsPresenters[point.id] = pointPresenter;
    });
  }

  _renderSorting() {
    render(
      this._pointsListContainer,
      this._sortingComponent,
      RenderPosition.BEFOREBEGIN,
    );
    this._sortingComponent.setChangeSortTypesHandler(
      this._changeSortTypesHandler,
    );
  }

  _renderNoPointsMessage() {
    render(
      this._pointsListContainer,
      this._noPointsMessageComponent,
      RenderPosition.AFTERBEGIN,
    );
  }

  _renderFilter() {
    render(
      this._filterContainer,
      this._filterComponent,
      RenderPosition.BEFOREEND,
    );
  }

  _renderMenu() {
    render(
      this._menuContainer,
      this._menuComponent,
      RenderPosition.BEFOREEND,
    );
  }

  _renderTripInfo() {
    render(
      this._tripInfoContainer,
      this._tripInfoComponent,
      RenderPosition.AFTERBEGIN,
    );
  }

  _changeDataPointHandler(updatePoint) {
    this._points = updateItem(this._points, updatePoint);
    this._pointsPresenters[updatePoint.id].init(updatePoint);
  }

  _changeSortTypesHandler(type) {
    this._sortPoints(type);
    this._removePoints();
    this._renderPoints();
  }

  _resetTasksViewHandler() {
    Object.values(this._pointsPresenters).forEach((presenter) =>
      presenter.resetView(),
    );
  }

  _removePoints() {
    Object.values(this._pointsPresenters).forEach((presenter) =>
      presenter.remove(),
    );
    this._pointsPresenters = {};
  }

  _sortPoints(type) {
    this._sortType = type;

    switch (type) {
      case sortTypes.DAY:
        this._points = sortPointsByDate(this._sourcedPoints);
        break;
      case sortTypes.TIME:
        this._points = sortPointsByTime(this._sourcedPoints);
        break;
      case sortTypes.PRICE:
        this._points = sortPointsByPrice(this._sourcedPoints);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }
  }

  _renderTrip() {
    this._renderTripInfo();
    this._renderMenu();
    this._renderFilter();
    this._renderSorting();

    if (!this._points.length) {
      this._renderNoPointsMessage();
      return;
    }

    this._sortPoints(this._sortType);
    this._renderPoints();
  }
}
