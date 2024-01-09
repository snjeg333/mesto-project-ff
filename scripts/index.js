const cardTemplate = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".places__list");

function createCards(link, name, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = name;
  const pictureCard = card.querySelector(".card__image");
  pictureCard.setAttribute("src", link);
  pictureCard.setAttribute("alt", name);
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCard(card);
  });
  return card;
}

function renderCards(cards) {
  for (const card of cards) {
    const newCard = createCards(card.link, card.name, deleteCard);
    cardsContainer.append(newCard);
  }
}

function deleteCard(card) {
  card.remove();
}

renderCards(initialCards);
