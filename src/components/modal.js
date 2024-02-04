// Открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

// закрытие попапов по клику вне попапа мышью
const popupContainer = document.querySelector(".page__content");
popupContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
});

// закрытия при нажатии на клавишу "Escape"
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
