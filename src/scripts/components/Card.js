export default class Card {
  constructor(data, templateSelectorById, currentUser, callbacks) {
    // Забираем данные из ответа
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerCardId = data.owner._id;

    // Данные текущего пользователя передаю сюда
    this._ownerId = currentUser.userId;

    // Коллбэки
    this._openPreviewImage = callbacks.openPreviewImage; // Функция-колбэк для открытия попапа с картинкой при клике на карточку
    this._handleOpenConfirm = callbacks.handleOpenConfirm; // Функция-колбэк для удаления карточек
    this._setLike = callbacks.setLike; // Функция-колбэк для постановки лайка
    this._removeLike = callbacks.removeLike; // Функция-колбэк для убирания лайка

    this._templateSelectorById = templateSelectorById;
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector('.elements__item-image');
    this._infoText = this._element.querySelector('.elements__info-text');
    this._counterLikes = this._element.querySelector('.elements__like-counter');
    this._infoLike = this._element.querySelector('.elements__info-like');
    this._deleteButton = this._element.querySelector('.elements__delete-card');
    this._classOfActiveLike = 'elements__info-like_active';
  }

  // Генерация карточки с данными
  generateCard() {
    this._setEvetListeners();

    this._counterLikes.textContent = this._likes.length;
    this._itemImage.src = this._link;
    this._itemImage.alt = this._title;
    this._infoText.textContent = this._title;

    if (this._isLiked()) {
      this._infoLike.classList.add(this._classOfActiveLike);
    };
    if (this._isOwner()) {
      this._deleteButton.remove();
    };
    return this._element;
  }

  // Проверка есть ли на карточке уже лайк текущего пользователя
  _isLiked() {
    if (this._likes.some(like => like._id === this._ownerId)) {
      return true;
    }
  }

  // Проверка принадлежит ли карточка текущему пользователю
  _isOwner() {
    if (!(this._ownerCardId === this._ownerId)) {
      return true;
    }
  }

  // Метод для забирания темплейта карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelectorById)
      .content.querySelector('.elements__item')
      .cloneNode(true);

    return cardTemplate;
  }

  // Действие для кнопки удалить [открывает попап]
  _handleClickConfirm() {
    this._handleOpenConfirm(this._cardId, this._element)
  }

  // Действие для кнопки лайка
  _handleLikeButton() {
    if (!this._infoLike.classList.contains(this._classOfActiveLike)) {
      this._setLike(this._cardId)
        .then(json => this._counterLikes.textContent = json.likes.length)
        .then(this._infoLike.classList.add(this._classOfActiveLike))
    } else {
      this._removeLike(this._cardId)
        .then(json => this._counterLikes.textContent = json.likes.length)
        .then(this._infoLike.classList.remove(this._classOfActiveLike))
    }
  }

  // Действие для превью-изображения
  _handlePreviewImage() {
    const card = {
      src: this._link,
      alt: this._title,
      title: this._title
    }

    this._openPreviewImage(card);
  }

  // Метод для навешивания слушателей
  _setEvetListeners() {
    this._infoLike.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleClickConfirm();
    });

    this._itemImage.addEventListener('click', () => {
      this._handlePreviewImage();
    });
  }
}
