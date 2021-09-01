export default class Api {
  constructor() {
    this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-27'
    this._token = '412f1be1-333d-43fa-9fcf-b27fa8d84808'
  }

  // Возвращает общую для всех запросов заготовку
  _initRequest(path, init) {
    path = this._baseUrl + path;
    init.headers = {
      'Content-Type': 'application/json',
      Authorization: this._token
    };

    return new Request(path, init);
  }

  // Общая для всех реализация проверки, что сообщение пришло с кодом 2хх
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
  }

  // Получения карточек с апишки
  getInitialCards() {
    const init = {
      method: 'GET'
    }

    return fetch(this._initRequest('/cards', init))
      .then(res => this._checkResponse(res))
  }

  // Добавляем новую карточку
  addCard(name, link) {
    const init = {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    }

    return fetch(this._initRequest('/cards', init))
      .then(res => this._checkResponse(res))
  }

  // Удалить карточку
  deleteCard(cardId) {
    const init = {
      method: 'DELETE'
    }

    return fetch(this._initRequest(`/cards/${cardId}`, init))
      .then(res => this._checkResponse(res))
  }

  // Ставит лайк под карточку
  setLike(cardId) {
    const init = {
      method: 'PUT'
    }

    return fetch(this._initRequest(`/cards/likes/${cardId}`, init))
      .then(res => this._checkResponse(res))
  }

  // Убирает лайк под карточкой
  removeLike(cardId) {
    const init = {
      method: 'DELETE'
    }

    return fetch(this._initRequest(`/cards/likes/${cardId}`, init))
      .then(res => this._checkResponse(res))
  }

  // Получаем информацию о пользователе
  getUserInfo() {
    const init = {
      method: 'GET'
    }

    return fetch(this._initRequest('/users/me', init))
      .then(res => this._checkResponse(res))
  }

  // Обновляем информацию о пользователе
  updateUserInfo(name, about) {
    const init = {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    }

    return fetch(this._initRequest('/users/me', init))
      .then(res => this._checkResponse(res))
  }

  // Апдейтит аватарку
  updateUserAvatar(link) {
    const init = {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      })
    }

    return fetch(this._initRequest('/users/me/avatar', init))
      .then(res => this._checkResponse(res))
  }
}
