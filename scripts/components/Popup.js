export default class Popup {
  constructor(selector) {
  this._popup = document.querySelector(selector);
  
  
  if (!this._popup) {
    console.error(`No se encontró elemento con selector: ${selector}`);
    return;
  }
  
  this._closeButtons = this._popup.querySelectorAll(".popup__button_close");
}

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButtons.forEach((btn) =>
      btn.addEventListener("click", () => this.close())
    );

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}