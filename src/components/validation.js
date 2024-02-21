/* модуль содержащий скрипты валидации форм */

// const selectors = {
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__submit_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__input-error_active",
//   };

// Функция для показа ошибки ввода
const showInputError = (popupElement, popupInput, errorMessage) => {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// Функция для скрытия ошибки ввода
const hideInputError = (popupElement, popupInput) => {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

// Функция для проверки валидности ввода
const checkInputValidity = (popupElement, popupInput) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  }

  if (!popupInput.validity.valid) {
    showInputError(popupElement, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupElement, popupInput);
  }
};

// Функция для установки обработчиков событий на поля ввода
const setEventListeners = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll(".popup__input"));

  const buttonElement = popupElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((popupInput) => {
    popupInput.addEventListener("input", function () {
      checkInputValidity(popupElement, popupInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция для включения валидации полей формы
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((popupElement) => {
    popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(popupElement);
  });
};

// Функция для проверки наличия невалидного ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  });
};

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__submit_disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__submit_disabled");
  }
};


// Функция для очистки ошибок валидации и сброса состояния кнопки
export const clearValidationErrors = (form) => {
    const inputList = Array.from(form.querySelectorAll(".popup__input")); 
    const buttonElement = form.querySelector(".popup__button"); 
    inputList.forEach((popupInput) => {
        hideInputError(form, popupInput); 
        popupInput.setCustomValidity(""); 
    });

    toggleButtonState(inputList, buttonElement); 
};