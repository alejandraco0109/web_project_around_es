export function checkFormValidity(form, submitButton) {
  const isValid = form.checkValidity();

  if (isValid) {
    submitButton.disabled = false;
    submitButton.classList.remove("popup__button_disabled");
  } else {
    submitButton.disabled = true;
    submitButton.classList.add("popup__button_disabled");
  }
}

export function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.classList[1]}-error`
  );

  if (errorElement) {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("popup__error_hidden");
  }
}

export function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.${inputElement.classList[1]}-error`
  );

  if (errorElement) {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.add("popup__error_hidden");
    errorElement.textContent = "";
  }
}

export function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

export function setupEditFormValidation() {
  const editForm = document.querySelector("#edit-profile-form");
  const editSaveButton = editForm.querySelector(".popup__button_save");
  const nameInput = editForm.querySelector(".popup__input_name");
  const aboutInput = editForm.querySelector(".popup__input_about");

  function validateEditForm() {
    checkInputValidity(editForm, nameInput);
    checkInputValidity(editForm, aboutInput);
    checkFormValidity(editForm, editSaveButton);
  }

  nameInput.addEventListener("input", validateEditForm);
  aboutInput.addEventListener("input", validateEditForm);

  validateEditForm();
}

export function setupNewCardFormValidation() {
  const newCardForm = document.querySelector("#add-card-form");
  const newCardSaveButton = newCardForm.querySelector(".popup__button_save");
  const titleInput = newCardForm.querySelector(".popup__input_title");
  const linkInput = newCardForm.querySelector(".popup__input_link");

  function validateNewCardForm() {
    checkInputValidity(newCardForm, titleInput);
    checkInputValidity(newCardForm, linkInput);
    checkFormValidity(newCardForm, newCardSaveButton);
  }

  titleInput.addEventListener("input", validateNewCardForm);
  linkInput.addEventListener("input", validateNewCardForm);

  validateNewCardForm();
}
