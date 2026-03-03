import { api } from "./api.js";
import { deleteCardPopup } from "../index.js";

export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".main__gallery-card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLike() {
    const likeBtn =
      this._element.querySelector(".main__button_like");

    if (likeBtn.classList.contains("main__button_like_active")) {
      api.unlikeTheCard(this._data._id).then(() => {
        likeBtn.classList.remove(
          "main__button_like_active"
        );
      });
    } else {
      api.likeTheCard(this._data._id).then(() => {
        likeBtn.classList.add(
          "main__button_like_active"
        );
      });
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".main__button_like")
      .addEventListener("click", () =>
        this._handleLike()
      );

    this._element
      .querySelector(".main__button_delete")
      .addEventListener("click", () =>
        deleteCardPopup.open(
          this._data._id,
          this._element
        )
      );

    this._element
      .querySelector(".main__gallery-image")
      .addEventListener("click", () =>
        this._handleImageClick({
          name: this._data.name,
          link: this._data.link,
        })
      );
  }

  generateCard() {
    this._element = this._getTemplate();

    const image =
      this._element.querySelector(
        ".main__gallery-image"
      );

    image.src = this._data.link;
    image.alt = this._data.name;

    this._element.querySelector(
      ".main__gallery-paragraph"
    ).textContent = this._data.name;

    this._setEventListeners();

    return this._element;
  }
}
