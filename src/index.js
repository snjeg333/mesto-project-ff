// импортируем начальные данные
import { initialCards } from "./components/cards.js";
// импортируем стили css
import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {clearValidationErrors, enableValidation} from "./components/validation.js";
// import { enableValidation, selectors } from "./components/validation.js"
// Получаем элементы DOM
const cardsContainer = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = popupProfile.querySelector(".popup__input_type_name");
const nameOutput = document.querySelector(".profile__title");
const professionInput = popupProfile.querySelector(
  ".popup__input_type_description"
);
const professionOutput = document.querySelector(".profile__description");
const popupFormProfile = popupProfile.querySelector(".popup__form");
const popupFormAddPlace = popupAddPlace.querySelector(".popup__form");
const popupImage = document.querySelector(".popup_type_image");
const zoomImage = popupImage.querySelector(".popup__image");
const zoomImageTitle = popupImage.querySelector(".popup__caption");
const placeName = popupAddPlace.querySelector(".popup__input_type_card-name");
const placeLink = popupAddPlace.querySelector(".popup__input_type_url");
const closeButtons = document.querySelectorAll(".popup__close");


// Функция для отрисовки карточек
function renderCards(cards) {
  for (const card of cards) {
    const newCard = createCard(
      card.link,
      card.name,
      deleteCard,
      openCard,
      likeCard
    );
    cardsContainer.append(newCard);
  }
}

// Открытие попапа редактирования профиля
function openEditPopup() {
  // Вызов функции очистки ошибок валидации
  clearValidationErrors();

  openPopup(popupProfile);
  nameInput.value = nameOutput.textContent;
  professionInput.value = professionOutput.textContent;
  
  // Вызов функции для включения валидации
  enableValidation();
}

// Сохранение отредактированных данных профиля
function submitEditProfile(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  professionOutput.textContent = professionInput.value;
  closePopup(popupProfile);
}

// Добавление новой карточки
function addCard(evt) {
  evt.preventDefault();
  closePopup(popupAddPlace);
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  // popupFormAddPlace.reset();
  cardsContainer.prepend(
    createCard(newCard.link, newCard.name, deleteCard, openCard, likeCard)
  );
}

// Увеличение карточки
function openCard(click) {
  openPopup(popupImage);
  zoomImage.alt = click.target.alt;
  zoomImage.src = click.target.src;
  zoomImageTitle.innerText = click.target.alt;
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});


// Обработчики событий
cardAddButton.addEventListener("click", () => {
  // Вызов функции очистки ошибок валидации
  clearValidationErrors();
  // Вызов функции для включения валидации
  enableValidation();
  openPopup(popupAddPlace);
 
});

profileEditButton.addEventListener("click", openEditPopup);
popupFormProfile.addEventListener("submit", submitEditProfile);
popupFormAddPlace.addEventListener("submit", addCard);

// отрисовка начальных карточек
renderCards(initialCards);





// // Функция для показа ошибки ввода
// const showInputError = (popupElement, popupInput, errorMessage) => {
//   const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
//   popupInput.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input-error_active');
// };
// // Функция для скрытия ошибки ввода
// const hideInputError = (popupElement, popupInput) => {
//   const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
//   popupInput.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
  
// };
// // Функция для проверки валидности ввода
// const checkInputValidity = (popupElement, popupInput) => {

//   if (popupInput.validity.patternMismatch) {
//     popupInput.setCustomValidity(popupInput.dataset.errorMessage);
//   } else {
//     popupInput.setCustomValidity("");
//   } 


//   if (!popupInput.validity.valid) {
//     showInputError(popupElement, popupInput, popupInput.validationMessage);
//   } else {
//     hideInputError(popupElement, popupInput);
//   }
// };
// // Функция для установки обработчиков событий на поля ввода
// const setEventListeners = (popupElement) => {
//   const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
//   const buttonElement = popupElement.querySelector('.popup__button');
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((popupInput) => {
//     popupInput.addEventListener('input', function () {
//       checkInputValidity(popupElement, popupInput);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };
// // Функция для включения валидации полей формы
// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((popupElement) => {
//   popupElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//   });
// const fieldsetList = Array.from(document.forms);
//   fieldsetList.forEach((fieldset) => {
//   setEventListeners(fieldset);
//   });
// // setEventListeners(popupElement);
// });
// };
// // Функция для проверки наличия невалидного ввода
// const hasInvalidInput = (inputList) => {
// return inputList.some((popupInput) => {
//   return !popupInput.validity.valid;
// }); 
// }
// // Функция для переключения состояния кнопки
// const toggleButtonState = (inputList, buttonElement) => {
//    if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//         buttonElement.disabled = true;
//     buttonElement.classList.add('popup__submit_disabled');
//   } else {
//         // иначе сделай кнопку активной
//         buttonElement.disabled = false;
//     buttonElement.classList.remove('popup__submit_disabled');
//   }
// }; 

// // Очистка ошибок валидации
// const clearValidationErrors = () => {
//   const inputList = Array.from(document.querySelectorAll('.popup__input'));
//   inputList.forEach((popupInput) => {
//     hideInputError(popupInput.closest('.popup__form'), popupInput);
//   });
// };

// // Вызов функции для включения валидации
// enableValidation();
