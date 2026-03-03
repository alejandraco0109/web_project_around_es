import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";

import PopupWithForm from "./components/PopupWithForms.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupAvatar from "./components/PopupAvatar.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";

import { api } from "./components/api.js";

import {
  setupEditFormValidation,
  setupNewCardFormValidation
} from "./components/FormValidator.js";

import { initialCards, cardsZone } from "./utils.js";

/* ================= USER INFO ================= */
const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about"
});

/* ================= IMAGE POPUP ================= */
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

/* ================= DELETE CARD ================= */
export const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-popup",
  (cardId, cardElement) => api.deleteCard(cardId)
);
deleteCardPopup.setEventListeners();

/* ================= SECTION ================= */
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#main__template",
        (data) => imagePopup.open(data),
        (cardId, element) => deleteCardPopup.open(cardId, element)
      );
      section.addItem(card.generateCard());
    }
  },
  ".main__gallery"
);

// Renderizamos las cards iniciales
section.renderItems(initialCards);

/* ================= PROFILE EDIT ================= */
const editPopup = new PopupWithForm(
  "#edit-profile-popup",
  (data) => {
    editPopup.renderLoading(true);
    api.editProfile({ name: data.name, about: data.description })
      .then(userData => {
        userInfo.setUserInfo({ name: userData.name, about: userData.about });
        editPopup.close();
      })
      .catch(console.error)
      .finally(() => editPopup.renderLoading(false));
  }
);
editPopup.setEventListeners();

/* ================= ADD CARD ================= */
const addPopup = new PopupWithForm(
  "#new-card-popup",
  (data) => {
    addPopup.renderLoading(true);
    api.addNewCard({ name: data.title, link: data.link })
      .then(cardData => {
        const card = new Card(
          cardData,
          "#main__template",
          (data) => imagePopup.open(data),
          (id, element) => deleteCardPopup.open(id, element)
        );
        section.addItem(card.generateCard());
        addPopup.close();
      })
      .catch(console.error)
      .finally(() => addPopup.renderLoading(false));
  }
);
addPopup.setEventListeners();

/* ================= BUTTONS ================= */
document.querySelector(".main__button_edit").addEventListener("click", () => editPopup.open());
document.querySelector(".main__button_add").addEventListener("click", () => addPopup.open());

/* ================= AVATAR ================= */
const avatarImage = document.querySelector(".main__profile-image");
const avatarPopup = new PopupAvatar(
  "#popup-edit-avatar",
  (url) => {
    api.changeAvatar({ avatar: url })
      .then(userData => {
        avatarImage.src = userData.avatar;
        avatarPopup.close();
      })
      .catch(console.error);
  }
);
avatarPopup.setEventListeners();


const editIcon = document.querySelector(".main__profile-edit-icon");
console.log("¿Ícono encontrado?", editIcon);

if (editIcon) {
  editIcon.addEventListener("click", (evt) => {
    console.log("¡Clic detectado en el ícono!");
    evt.preventDefault(); // Por si acaso
    avatarPopup.open();
  });
} else {
  console.log("ERROR: No se encontró el ícono con clase .main__profile-edit-icon");
}


/* ================= VALIDATION ================= */
setupEditFormValidation();
setupNewCardFormValidation();

/* ================= INITIAL LOAD ================= */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    section.renderItems(cards);
  })
  .catch(console.error);
