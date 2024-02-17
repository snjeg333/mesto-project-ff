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
  openPopup(popupProfile);
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

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Обработчики событий
cardAddButton.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

profileEditButton.addEventListener("click", openEditPopup);
popupFormProfile.addEventListener("submit", submitEditProfile);
popupFormAddPlace.addEventListener("submit", addCard);

// отрисовка начальных карточек
renderCards(initialCards);



const showInputError = (popupElement, popupInput, errorMessage) => {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (popupElement, popupInput) => {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (popupElement, popupInput) => {
  if (!popupInput.validity.valid) {
    showInputError(popupElement, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupElement, popupInput);
  }
};

const setEventListeners = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', function () {
      checkInputValidity(popupElement, popupInput);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((popupElement) => {
  popupElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(popupElement);
});
};
enableValidation()