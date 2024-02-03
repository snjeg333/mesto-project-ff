// импортируем начальные данные
import { initialCards } from "./components/cards.js";

// импортируем стили css
import "./pages/index.css";

// Получаем элементы DOM
const cardTemplate = document.querySelector("#card-template").content;
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

// Создание карточки
function createCard(link, name, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = name;
  const pictureCard = card.querySelector(".card__image");
  pictureCard.setAttribute("src", link);
  pictureCard.setAttribute("alt", name);

  // Обработчик для кнопки лайка
  const likeCard = card.querySelector(".card__like-button");
  likeCard.addEventListener("click", () => {
    likeCard.classList.toggle("card__like-button_is-active");
  });

  // Обработчик для увеличения карточки
  const selectedImage = card.querySelector(".card__image");
  selectedImage.addEventListener("click", openCard);
  cardsContainer.prepend(card);

  // Обработчик для кнопки удаления карточки
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCard(card);
  });

  return card;
}

// Функция для отрисовки карточек
function renderCards(cards) {
  for (const card of cards) {
    const newCard = createCard(card.link, card.name, deleteCard);
    cardsContainer.append(newCard);
  }
}

// Удаление карточки
function deleteCard(card) {
  card.remove();
}

// Открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// закрытие попапов по клику вне попапа мышью
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
});

// закрытия при нажатии на клавишу "Escape"
function closePopupOnEscape(event, popup) {
  if (event.key === "Escape") {
    popup.classList.remove("popup_is-opened");
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
function addCard(event) {
  event.preventDefault();
  closePopup(popupAddPlace);
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  popupFormAddPlace.reset();
  createCard(newCard.link, newCard.name, deleteCard);
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
document.addEventListener("keydown", (event) => {
  closePopupOnEscape(event, popupImage);
});
document.addEventListener("keydown", (event) => {
  closePopupOnEscape(event, popupProfile);
});
document.addEventListener("keydown", (event) => {
  closePopupOnEscape(event, popupAddPlace);
});
// Рендеринг начальных карточек
renderCards(initialCards);
