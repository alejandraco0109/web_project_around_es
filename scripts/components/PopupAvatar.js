import Popup from './Popup.js';

export default class PopupAvatar extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._urlInput = this._popup.querySelector('input[name="avatar"]');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._urlInput.value);
    });
  }

  open() {
    super.open();
    this._form.reset();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
