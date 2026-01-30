const editButton = document.querySelector(".main__button_edit");
const addButton = document.querySelector(".main__button_add");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_about");
const popup = document.querySelector(".popup");
const editCloseBtn = document.querySelector("#edit-profile-popup .popup__button_close");
const addCloseBtn = document.querySelector("#new-card-popup .popup__button_close");
const butClose = document.querySelector(".popup__button_close");
const editPopup = document.querySelector("#edit-profile-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#add-card-form");
const popButSave = document.querySelector(".popup__button_save");
const popButAdd = document.querySelector(".popup__button_add");
const form = document.querySelector(".popup__container");
const popimg = document.querySelector(".popup__images");
const gallery = document.querySelector(".main__gallery");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const title = document.querySelector(".popup__subtitle");
const cardTitleInput = document.querySelector('.popup__input_type_title');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const editSubmitButton = document.querySelector('#edit-profile-submit-button');
const editForm = document.querySelector("#edit-profile-form");
const createButton = newCardForm.querySelector('.popup__button_save');
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");

console.log("editPopup existe:", editPopup);
console.log("newCardPopup existe:", newCardPopup);
console.log("popup genérico existe:", popup);
console.log("inpName existe:", inpName);
console.log("inpAbout existe:", inpAbout);
console.log("cardTitleInput existe:", cardTitleInput);
console.log("cardLinkInput existe:", cardLinkInput);

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "./images/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/moved_latemar.jpg",
  },
  {
    name: "Vanois National Park",
    link: "./images/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/moved_lago.jpg",
  },
];



function openEditAdd(e) {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    inpName.value = inName.textContent;
    inpAbout.value = inAbout.textContent;
    title.textContent = "Editar perfil";
    inpName.placeholder = "Nombre";
    inpAbout.placeholder = "Acerca de mi";
    popup.classList.toggle("popup_opened");
    popButSave.style.display = "block";
    popButAdd.style.display = "none";
    popimg.style.display = "none";
  } else if (butClass.contains("main__button_add")) {
    inpName.value = "";
    inpAbout.value = "";
    title.textContent = "Nuevo lugar";
    inpName.placeholder = "Título";
    inpAbout.placeholder = "Enlace a la imagen";
    popup.classList.toggle("popup_opened");
    popButSave.style.display = "none";
    popButAdd.style.display = "block";
    popimg.style.display = "none";
    inpName.addEventListener("input", validarCampos);
    inpAbout.addEventListener("input", validarCampos);
    validarCampos();
  }
}


function close() {
  popup.classList.toggle("popup_opened");
  popimg.removeAttribute("style");
  form.removeAttribute("style");
}

function checkFormValidity(form, submitButton) {
  const isValid = form.checkValidity();
  
  if (isValid) {
    submitButton.disabled = false;
    submitButton.classList.remove('popup__button_disabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('popup__button_disabled');
  }
}

function saveChangeEdit(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}  



editButton.addEventListener("click", () => openPopup(editPopup));
addButton.addEventListener("click", () => openPopup(newCardPopup));

editCloseBtn.addEventListener("click", () => closePopup(editPopup));
addCloseBtn.addEventListener("click", () => closePopup(newCardPopup));

editForm.addEventListener("submit", saveChangeEdit);

function saveChangeEdit(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  closePopup(editPopup);
}

setupEditFormValidation();  

function setupEditFormValidation() {
  const editForm = document.querySelector("#edit-profile-form");
  const editSaveButton = editForm.querySelector(".popup__button_save");
  const nameInput = editForm.querySelector(".popup__input_name");
  const aboutInput = editForm.querySelector(".popup__input_about");
  
  
  function validateEditForm() {
    checkFormValidity(editForm, editSaveButton);
  }
  

  nameInput.addEventListener("input", validateEditForm);
  aboutInput.addEventListener("input", validateEditForm);
  
  
  validateEditForm();
}


function cardsInitials() {
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
cardsInitials();

function cardsAdd(titleValue, linkValue) {
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

function setupNewCardFormValidation() {
  const newCardForm = document.querySelector("#add-card-form");
  const newCardSaveButton = newCardForm.querySelector(".popup__button_save");
  const titleInput = newCardForm.querySelector(".popup__input_type_title");
  const linkInput = newCardForm.querySelector(".popup__input_type_link");

  function validateNewCardForm() {
    checkFormValidity(newCardForm, newCardSaveButton);
  }

  titleInput.addEventListener("input", validateNewCardForm);
  linkInput.addEventListener("input", validateNewCardForm);

  validateNewCardForm();
}

function imagePopup(name, title) {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");
  popimag.src = title;
  popimag.alt = name;
  poptxt.textContent = name;
  popup.classList.toggle("popup_opened");
  form.style.display = "none";
}

setupNewCardFormValidation(); 

newCardForm.addEventListener("submit", function (e) {
  e.preventDefault();
  cardsAdd(cardTitleInput.value, cardLinkInput.value);
  closePopup(newCardPopup);
  newCardForm.reset();
   
  cardTitleInput.value = "";
  cardLinkInput.value = "";
});

function closeByEscape(evt) {
  if (evt.key === 'Escape') { 
 const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}