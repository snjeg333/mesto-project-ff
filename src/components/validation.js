/* модуль содержащий скрипты валидации форм */

export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Функция для показа ошибки ввода
const showInputError = (popupElement, popupInput, errorMessage, selectors) => {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

// Функция для скрытия ошибки ввода
const hideInputError = (popupElement, popupInput, selectors) => {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};

// Функция для проверки валидности ввода
const checkInputValidity = (popupElement, popupInput, selectors) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  }

  if (!popupInput.validity.valid) {
    showInputError(popupElement, popupInput, popupInput.validationMessage, selectors);
  } else {
    hideInputError(popupElement, popupInput, selectors);
  }
};

// Функция для установки обработчиков событий на поля ввода
const setEventListeners = (popupElement, selectors) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(selectors.inputSelector)
  );

  const buttonElement = popupElement.querySelector(
    selectors.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", function () {
      checkInputValidity(popupElement, popupInput, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

// Функция для включения валидации полей формы
export const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((form) => {
    setEventListeners(form, selectors);
  });
};

// Функция для проверки наличия невалидного ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  });
};

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
};

// Функция для очистки ошибок валидации и сброса состояния кнопки
export const clearValidationErrors = (form, selectors) => {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const buttonElement = form.querySelector(selectors.submitButtonSelector);
  inputList.forEach((popupInput) => {
    hideInputError(form, popupInput, selectors);
    popupInput.setCustomValidity("");
  });

  toggleButtonState(inputList, buttonElement, selectors);
};
