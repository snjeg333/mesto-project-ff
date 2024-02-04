// импортируем начальные данные
import { initialCards } from "./components/cards.js";
// импортируем стили css
import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

// Получаем элементы DOM
const cardsContainer = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = popupProfile.querySelector(".popup__input_type_name");
const nameOutput = document.querySelector(".profile__title");
const professionInput = popupProfile.querySelector(
  ".popup__input_type_description"
);
const professionOutput = document.querySelector(".profile__description");
const popupFormProfile = popupProfile.querySelector(".popup__form");
const popupFormAddPlace = popupAddPlace.querySelector(".popup__form");
const popupImageClose = document.querySelector(".popup__content_content_image");
const popupImageCloseButton = popupImageClose.querySelector(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const zoomImage = popupImage.querySelector(".popup__image");
const zoomImageTitle = popupImage.querySelector(".popup__caption");
const popupAddCardCloseButton = popupAddPlace.querySelector(".popup__close");
const placeName = popupAddPlace.querySelector(".popup__input_type_card-name");
const placeLink = popupAddPlace.querySelector(".popup__input_type_url");

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
  openPopup(popupProfile);
  nameInput.value = nameOutput.textContent;
  professionInput.value = professionOutput.textContent;
}

// Сохранение отредактированных данных профиля
function submitEditProfile(event) {
  event.preventDefault();
  nameOutput.textContent = nameInput.value;
  professionOutput.textContent = professionInput.value;
  closePopup(popupProfile);
}

// Добавление новой карточки
function addCard(event) {
  event.preventDefault();
  closePopup(popupAddPlace);
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  popupFormAddPlace.reset();
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
cardAddButton.addEventListener("click", () => {
  openPopup(popupAddPlace);
});
popupProfileCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
});
profileEditButton.addEventListener("click", openEditPopup);
popupFormProfile.addEventListener("submit", submitEditProfile);
popupFormAddPlace.addEventListener("submit", addCard);
popupImageCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});
popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

// отрисовка начальных карточек
renderCards(initialCards);
