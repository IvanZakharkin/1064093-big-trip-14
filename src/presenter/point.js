import PointEditView from '../view/point-edit';
import PointView from '../view/point';
import { offersList } from '../mock/const';
import { RenderPosition } from '../consts/render';
import { render, removeComponent } from '../utils/render';
import cities from '../mock/cities';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointsListContainer, changeData, resetTasksView) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._resetTasksView = resetTasksView;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point, offersList);
    this._pointEditComponent = new PointEditView(point, offersList, cities);

    this._pointComponent.setEditClickHandler(this._editClickHandler);
    this._pointComponent.setFavoritesClickHandler(this._favoritesClickHandler);
    this._pointEditComponent.setCloseEditClickHandler(this._formSubmitHandler);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(
        this._pointsListContainer,
        this._pointComponent,
        RenderPosition.BEFOREEND,
      );
      return;
    }
    render(
      prevPointComponent,
      this._pointComponent,
      RenderPosition.REPLACEWITH,
    );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  remove() {
    removeComponent(this._pointComponent);
    removeComponent(this._pointEditComponent);
  }

  _replacePointToForm() {
    this._mode = Mode.EDITING;
    render(
      this._pointComponent,
      this._pointEditComponent,
      RenderPosition.REPLACEWITH,
    );
  }

  _replaceFormToPoint() {
    this._mode = Mode.DEFAULT;
    render(
      this._pointEditComponent,
      this._pointComponent,
      RenderPosition.REPLACEWITH,
    );
  }

  _editClickHandler() {
    this._resetTasksView();
    this._replacePointToForm();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _closeEditClickHandler() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _formSubmitHandler() {
    this._replaceFormToPoint();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _favoritesClickHandler() {
    this._changeData(
      Object.assign({}, this._point, { isFavorites: !this._point.isFavorites }),
    );
  }
}
