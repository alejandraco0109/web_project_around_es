import { openPopup, closePopup } from "./utils.js";
import { cardsInitials, cardsAdd } from "./card.js";
import {
  setupEditFormValidation,
  setupNewCardFormValidation
} from "./FormValidator.js";

/* ================= SELECTORES ================= */

const editButton = document.querySelector(".main__button_edit");
const addButton = document.querySelector(".main__button_add");

const editPopup = document.querySelector("#edit-profile-popup");
const newCardPopup = document.querySelector("#new-card-popup");

const editCloseBtn = document.querySelector(
  "#edit-profile-popup .popup__button_close"
);
const addCloseBtn = document.querySelector(
  "#new-card-popup .popup__button_close"
);

const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#add-card-form");

const gallery = document.querySelector(".main__gallery");

const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_about");

const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");

const cardTitleInput = document.querySelector(".popup__input_title");
const cardLinkInput = document.querySelector(".popup__input_link");

/* ================= DATA ================= */

const initialCards = [
  { name: "Valle de Yosemite", link: "./images/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "./images/moved_lake-louise.jpg" },
  { name: "Montañas Calvas", link: "./images/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "./images/moved_latemar.jpg" },
  { name: "Vanois National Park", link: "./images/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "./images/moved_lago.jpg" },
];

/* ================= FUNCIONES ================= */

function imagePopup(name, link) {
  const popupImage = document.querySelector(".popup__image");
  const popupText = document.querySelector(".popup__paragraph");

  popupImage.src = link;
  popupImage.alt = name;
  popupText.textContent = name;
}

/* ================= INICIALIZACIÓN ================= */

cardsInitials(initialCards, gallery, imagePopup);

setupEditFormValidation();
setupNewCardFormValidation();

/* ================= EVENT LISTENERS ================= */

editButton.addEventListener("click", () => {
  inpName.value = inName.textContent;
  inpAbout.value = inAbout.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

editCloseBtn.addEventListener("click", () => closePopup(editPopup));
addCloseBtn.addEventListener("click", () => closePopup(newCardPopup));

editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  closePopup(editPopup);
});

newCardForm.addEventListener("submit", function (e) {
  e.preventDefault();

  cardsAdd(
    cardTitleInput.value,
    cardLinkInput.value,
    gallery,
    imagePopup
  );

  closePopup(newCardPopup);
  newCardForm.reset();
});





