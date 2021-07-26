import {
  openModal,
  popUpPreviewImage,
  previewImage,
  nameImage
} from "./index.js";

export default class Card {
  constructor(data, templateSelectorById) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelectorById = templateSelectorById;
  }

  // Генерация карточки с данными
  generateCard() {
    this._element = this._getTemplate();
    this._setEvetListeners();

    this._element.querySelector('.elements__item-image').src = this._link;
    this._element.querySelector('.elements__item-image').alt = this._link;
    this._element.querySelector('.elements__info-text').textContent = this._title;

    return this._element;
  }

  // Метод для забирания темплейта карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelectorById)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardTemplate;
  }

  // Действие для кнопки удалить
  _handleDeleteButton() {
    this._element.querySelector('.elements__delete-card').closest('.elements__item').remove();
  }

  // Действие для кнопки лайка
  _handleLikeButton() {
    this._element.querySelector('.elements__info-like').classList.toggle('elements__info-like_active');
  }

  // Действие для превью-изображения
  _handlePreviewImage() {
    previewImage.src = this._link;
    previewImage.alt = this._link;
    nameImage.textContent = this._title;

    openModal(popUpPreviewImage);
  }

  // Метод для навешивания слушателей
  _setEvetListeners() {
    this._element.querySelector('.elements__info-like').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.elements__delete-card').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._element.querySelector('.elements__item-image').addEventListener('click', () => {
      this._handlePreviewImage();
    });
  }
}
