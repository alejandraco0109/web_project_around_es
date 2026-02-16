import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";   
import PopupWithForm from "./components/PopupWithForms.js";
import PopupWithImage from "./components/PopupWithImage.js";
import { cardsInitials, cardsAdd } from "./components/Card.js";
import {
  setupEditFormValidation,
  setupNewCardFormValidation
} from "./components/FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
/* ================= DATA ================= */

const initialCards = [
  { name: "Valle de Yosemite", link: "./images/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "./images/moved_lake-louise.jpg" },
  { name: "Montañas Calvas", link: "./images/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "./images/moved_latemar.jpg" },
  { name: "Vanois National Park", link: "./images/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "./images/moved_lago.jpg" },
];

/* ================= USER INFO ================= */

const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about"
});

/* ================= IMAGE POPUP ================= */

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

/* ================= SECTION ================= */

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsInitials([item], document.querySelector(".main__gallery"), (name, link) => {
        imagePopup.open({ name, link });
      });
    }
  },
  ".main__gallery"
);

section.renderItems();

/* ================= EDIT PROFILE POPUP ================= */

const editPopup = new PopupWithForm("#edit-profile-popup", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.description
  });
});

editPopup.setEventListeners();

/* ================= NEW CARD POPUP ================= */

const addPopup = new PopupWithForm("#new-card-popup", (data) => {
  cardsAdd(
    data.title,
    data.link,
    document.querySelector(".main__gallery"),
    (name, link) => imagePopup.open({ name, link })
  );
});

addPopup.setEventListeners();

/* ================= BOTONES ================= */

document
  .querySelector(".main__button_edit")
  .addEventListener("click", () => editPopup.open());

document
  .querySelector(".main__button_add")
  .addEventListener("click", () => addPopup.open());

/* ================= VALIDATION ================= */

setupEditFormValidation();
setupNewCardFormValidation();





