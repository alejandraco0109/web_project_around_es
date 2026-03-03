import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleDelete) {
    super(selector);

    this._handleDelete = handleDelete;
    this._confirmButton = this._popup.querySelector("#deleteCard-btn");
    
    this._cancelButton = this._popup.querySelector(".popup-delete-card__button_cancel");

    this._cardId = null;
    this._cardElement = null;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleDelete(this._cardId)
        .then(() => {
          this._cardElement.remove();
          this.close();
        })
        .catch(console.error);
    });

   
    this._cancelButton.addEventListener("click", () => {
      this.close();
    });
  }
}