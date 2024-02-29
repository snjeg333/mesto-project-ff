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
  })
  .then(res => responseStatus(res))
};

export const getCardsData = () => {
  return fetch(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res => responseStatus(res))
};

export const updateUserData = (newName, newAbout) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  })
  .then(res => responseStatus(res))
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  })
  .then(res => responseStatus(res))
};

export const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
  .then(res => responseStatus(res))
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(res => responseStatus(res))
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(res => responseStatus(res))
};

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(res => responseStatus(res))
};

const responseStatus = (res) => {
  if (res.ok) return res.json()
  return Promise.reject(`Ошибка: ${res.status}`)
}