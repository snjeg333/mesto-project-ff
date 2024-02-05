// Открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", handleOverlay);
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("mousedown", handleOverlay);
}

// закрытие попапов по клику вне попапа мышью
function handleOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

// закрытия при нажатии на клавишу "Escape"
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
