export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__button_close")
      .addEventListener("click", () => this.close());
  }
}