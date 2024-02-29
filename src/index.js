import "./pages/index.css";
import {
  createCard,
  handleLikeCard,
  handleDeleteCard,
} from "./components/card.js";
import { openPopup, closePopup, clearInputValues } from "./components/modal.js";
import {
  enableValidation,
  clearValidationErrors,
  selectors,
} from "./components/validation.js";

import {
  getUserData,
  getCardsData,
  updateUserData,
  addNewCard,
  editAvatar,
  likeCard,
  dislikeCard,
  deleteCard,
} from "./components/api.js";

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

const formEdit = document.forms["edit-profile"];
const formNewCard = document.forms["new-place"];
const formAvatar = document.forms["edit-avatar"];

const profileAvatarButton = document.querySelector(".profile__image");

const avatarPopup = document.querySelector(".popup-avatar");

let userId;

// Функция для обновления аватара пользователя
function handleAvatar(evt) {
  evt.preventDefault();
  const button = avatarPopup.querySelector(".popup__button");
  Loading(true, button);
  const popupLink = formAvatar.elements.link;
  editAvatar(popupLink.value)
    .then((res) => {
      profileAvatarButton.style.backgroundImage = `url(\'${res.avatar}\')`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => Loading(false, button));
  closePopup(avatarPopup);
}

// Смена кнопки загрузки
function Loading(Loading, button) {
  button.textContent = Loading ? "Сохранение..." : "Сохранить";
}

// Открытие попапа редактирования профиля
function openEditPopup() {
  fillContent();
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
  const button = popupProfile.querySelector(".popup__button");
  Loading(true, button);
  updateUserData(nameInput.value, professionInput.value)
    .then((res) => {
      nameOutput.textContent = res.name;
      professionOutput.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => Loading(false, button));
  closePopup(popupProfile);
}

// Добавление новой карточки
function addCard(evt) {
  evt.preventDefault();
  const button = popupAddPlace.querySelector(".popup__button");
  Loading(true, button);
  const newCard = {
    name: placeName.value,
    link: placeLink.value,
  };
  addNewCard(placeName.value, placeLink.value)
    .then((res) => {
      cardsContainer.prepend(
        createCard(
          handleDeleteCard,
          handleLikeCard,
          openCard,
          res,
          userId,
          likeCard,
          dislikeCard,
          deleteCard,
          newCard
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => Loading(false, button));
  closePopup(popupAddPlace);
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

profileAvatarButton.addEventListener("click", function () {
  clearInputValues();
  clearValidationErrors(formAvatar);
  openPopup(avatarPopup);
});

cardAddButton.addEventListener("click", () => {
  clearInputValues();
  clearValidationErrors(formNewCard);
  openPopup(popupAddPlace);
});

profileEditButton.addEventListener("click", openEditPopup);
formAvatar.addEventListener("submit", handleAvatar);
popupFormProfile.addEventListener("submit", submitEditProfile);
popupFormAddPlace.addEventListener("submit", addCard);

// вызов волидации
enableValidation(selectors);

Promise.all([getUserData(), getCardsData()])
  .then(([userData, cardsList]) => {
    nameOutput.textContent = userData.name;
    professionOutput.textContent = userData.about;
    profileAvatarButton.style.backgroundImage = `url(\'${userData.avatar}\')`;
    userId = userData._id;
    cardsList.forEach((cardData) => {
      cardsContainer.append(
        createCard(
          handleDeleteCard,
          handleLikeCard,
          openCard,
          cardData,
          userId,
          likeCard,
          dislikeCard,
          deleteCard
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
