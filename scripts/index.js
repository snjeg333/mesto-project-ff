const cardTemplate = document.querySelector("#card-template").content;

const placeList = document.querySelector(".places__list");

function creatingCards(link, name, deleteCards) {
  const cardSections = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardSections.querySelector(".card__title");
  cardTitle.textContent = name;
  const pictureCard = cardSections.querySelector(".card__image");
  pictureCard.setAttribute("src", link);
  pictureCard.setAttribute("alt", name);
  const deleteButton = cardSections.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCards(cardSections);
  });
  return cardSections;
}

function displayCards(cards) {
  for (const card of cards) {
    const cardSections = creatingCards(card.link, card.name, deleteCards);
    placeList.append(cardSections);
  }
}

function deleteCards(cardSections) {
  cardSections.remove();
}

displayCards(initialCards);
