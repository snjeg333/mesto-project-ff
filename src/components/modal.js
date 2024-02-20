// Открытие попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("mousedown", handleOverlay);
  
  
  const inputs = popup.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input.value = "";
  });

}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("mousedown", handleOverlay);
  
}

// закрытие попапов по клику вне попапа мышью
function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

// закрытия при нажатии на клавишу "Escape"
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
