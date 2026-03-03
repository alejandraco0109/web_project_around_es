/* ================= POPUPS ================= */
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

/* ================= SELECTORES DOM ================= */
export const editName = document.querySelector(".main__paragraph_name");
export const profileImage = document.querySelector(".main__profile-image");
export const editJob = document.querySelector(".main__paragraph_about");

export const cardTemplate = document.querySelector("#main__template").content;
export const cardsZone = document.querySelector(".main__gallery");

/* ================= INITIAL CARDS ================= */
export const initialCards = [
  { name: "Valle de Yosemite", link: "./images/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "./images/moved_lake-louise.jpg" },
  { name: "Montañas Calvas", link: "./images/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "./images/moved_latemar.jpg" },
  { name: "Vanois National Park", link: "./images/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "./images/moved_lago.jpg" },
];

/* ================= POPUPS Y BOTONES ================= */
// Image popup
export const imageContainer = document.querySelector(".popup_image");
export const cardImage = imageContainer?.querySelector(".card__image");
export const imagePopupCloseButton = document.querySelector(".popup__button-close-image");

// Add card popup
export const popupAddPlace = document.querySelector(".popup-add-place");
export const addButton = document.querySelector(".main-bar__button-type-add");
export const formAdd = document.querySelector(".form__add");
export const addPlaceInput = document.querySelector(".form__input-place");
export const addLinkInput = document.querySelector(".form__input-link");
export const closeAddButton = document.querySelector(".popup__button-close-place");

// Delete card popup
export const popupDeleteCard = document.querySelector(".popup-delete-card");
export const deleteConfirmationBtn = document.querySelector(".form__button-delete");
export const closeDeletePopup = document.querySelector(".popup__button-close-delete-card");

// Avatar popup
export const avatarContainer = document.querySelector(".popup-edit-avatar");
export const closeAvatarBtn = document.querySelector(".popup__button-close-avatar");
export const editProfileAvatarBtn = document.querySelector(".edit-icon");
export const saveAvatarBtn = document.querySelector(".form__button-save");