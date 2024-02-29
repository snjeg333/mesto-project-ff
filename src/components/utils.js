// Смена кнопки загрузки
export function renderLoading(isLoading, button) {
    button.textContent = isLoading ? "Сохранение..." : "Сохранить";
  }