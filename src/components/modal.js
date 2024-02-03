// Открытие попапа
export function openPopup(popup) {
    popup.classList.add("popup_is-opened");
  }

// Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
  }

  // закрытие попапов по клику вне попапа мышью
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(event.target);
    }
  });

  // закрытия при нажатии на клавишу "Escape"
export function closePopupOnEscape(event, popup) {
    if (event.key === "Escape") {
      popup.classList.remove("popup_is-opened");
    }
  }
  