export function cardsInitials(initialCards, gallery, imagePopup) {
  initialCards.forEach((item) => {
    const cardTemplate = document.querySelector("#main__template").content;
    const cardElement = cardTemplate
      .querySelector(".main__gallery-card")
      .cloneNode(true);

    cardElement.querySelector(".main__gallery-image").src = item.link;
    cardElement.querySelector(".main__gallery-image").alt = item.name;
    cardElement.querySelector(".main__gallery-paragraph").textContent =
      item.name;

    cardElement
      .querySelector(".main__button_like")
      .addEventListener("click", function (e) {
        e.target.classList.toggle("main__button_like_active");
      });

    cardElement
      .querySelector(".main__button_delete")
      .addEventListener("click", function () {
        cardElement.remove();
      });

    cardElement
      .querySelector(".main__gallery-image")
      .addEventListener("click", function () {
        imagePopup(item.name, item.link);
      });

    gallery.append(cardElement);
  });
}

export function cardsAdd(titleValue, linkValue, gallery, imagePopup) {
  const cardTemplate = document.querySelector("#main__template").content;
  const cardElement = cardTemplate
    .querySelector(".main__gallery-card")
    .cloneNode(true);

  cardElement.querySelector(".main__gallery-image").src = linkValue;
  cardElement.querySelector(".main__gallery-image").alt = titleValue;
  cardElement.querySelector(".main__gallery-paragraph").textContent =
    titleValue;

  cardElement
    .querySelector(".main__button_like")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("main__button_like_active");
    });

  cardElement
    .querySelector(".main__button_delete")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  cardElement
    .querySelector(".main__gallery-image")
    .addEventListener("click", function () {
      imagePopup(titleValue, linkValue);
    });

  gallery.prepend(cardElement);
}