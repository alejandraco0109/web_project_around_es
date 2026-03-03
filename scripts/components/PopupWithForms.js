import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputs =
      this._form.querySelectorAll(".popup__input");

    this._submitButton =
      this._form.querySelector(
        ".popup__button_save, .form__button-save"
      );

    this._defaultButtonText =
      this._submitButton.textContent;
  }

  /* ================= GET VALUES ================= */

  _getInputValues() {
    const values = {};

    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  /* ================= LOADING ================= */

  renderLoading(isLoading, text = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent =
        this._defaultButtonText;
    }
  }

  /* ================= EVENTS ================= */

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(
        this._getInputValues()
      );
    });
  }

  /* ================= OPEN/CLOSE ================= */

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
