const cardTemplate = document.querySelector("#card-template").content;

// Создание карточки
export function createCard(link, name, deleteCard, openCard, likeCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = name;
  const pictureCard = card.querySelector(".card__image");
  pictureCard.setAttribute("src", link);
  pictureCard.setAttribute("alt", name);

  //   // Обработчик для кнопки лайка
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  // Обработчик для увеличения карточки
  pictureCard.addEventListener("click", (event) => {
    openCard(event);
  });

  // Обработчик для кнопки удаления карточки
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });

  return card;
}

// Удаление карточки
export function deleteCard(card) {
  card.remove();
}

// Функция для лайка карточки
export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}