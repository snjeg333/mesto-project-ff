const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7/",
  headers: {
    authorization: "d719fc4a-e1e1-4b07-abbc-753979aebadb",
    "Content-Type": "application/json",
  },
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getCardsData = () => {
  return fetch(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const updateUserData = (newName, newAbout) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
