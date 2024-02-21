// импортируем начальные данные
import { initialCards } from "./components/cards.js";
// импортируем стили css
import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup, clearInputValues } from "./components/modal.js";
import {
  enableValidation,
  clearValidationErrors
} from "./components/validation.js";

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

const formEdit = document.querySelector (".form_edit");
const formNewCard = document.querySelector (".form_new-card");


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
  fillContent()
  clearValidationErrors(formEdit);
  openPopup(popupProfile);
}

// Функция для заполнения контента в попапе
function fillContent() {
  nameInput.value = nameOutput.textContent;
  professionInput.value = professionOutput.textContent;
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

// Обработчики событий
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

cardAddButton.addEventListener("click", () => {
  clearInputValues();
  clearValidationErrors(formNewCard);
  openPopup(popupAddPlace);
});

profileEditButton.addEventListener("click", openEditPopup);
popupFormProfile.addEventListener("submit", submitEditProfile);
popupFormAddPlace.addEventListener("submit", addCard);

// отрисовка начальных карточек
renderCards(initialCards);

// вызов волидации 
enableValidation();

