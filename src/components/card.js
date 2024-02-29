const cardTemplate = document.querySelector("#card-template").content;

// Создание карточки
export function createCard(
  handleDeleteCard,
  handleLikeCard,
  openCard,
  cardData,
  userId,
  likeCard,
  dislikeCard,
  deleteCard
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  const pictureCard = card.querySelector(".card__image");
  pictureCard.setAttribute("src", cardData.link);
  pictureCard.setAttribute("alt", cardData.name);

  const cardLikeNumber = card.querySelector(".card__like-number");
  const likeButton = card.querySelector(".card__like-button");
  cardLikeNumber.textContent = cardData.likes.length;

  if (cardData.likes.some((isLiked) => userId === isLiked._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  const deleteButton = card.querySelector(".card__delete-button");
  const userVerification = (ownerId, userId, deleteButton) => {
    if (ownerId !== userId) {
      deleteButton.style.display = "none";
    }
  };

  // Обработчик для кнопки лайка
  likeButton.addEventListener("click", function () {
    handleLikeCard(
      likeButton,
      cardLikeNumber,
      cardData._id,
      likeCard,
      dislikeCard
    );
  });

  // Обработчик для увеличения карточки
  pictureCard.addEventListener("click", (evt) => {
    openCard(evt);
  });

  // Обработчик для кнопки удаления карточки
  userVerification(cardData.owner._id, userId, deleteButton);
  deleteButton.addEventListener("click", () => {
    handleDeleteCard(card, cardData._id, deleteCard);
  });

  return card;
}

// Удаление карточки
export const handleDeleteCard = (card, cardId, deleteCard) => {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(err));
};

// Функция для лайка карточки
export const handleLikeCard = (
  likeButton,
  likeCounter,
  cardId,
  like,
  dislike
) => {
  const putLike = likeButton.classList.contains("card__like-button_is-active")
    ? dislike
    : like;
  putLike(cardId)
    .then((result) => {
      likeCounter.textContent = result.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
};
