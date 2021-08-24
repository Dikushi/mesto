import Popup from "./Popup.js";

/* Класс, который отвечает за открытие и
закрытие попапа у превью изображений */

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageData = this._popupSelector.querySelector('.popup__image');
    this._imageName = this._popupSelector.querySelector('.popup__image-name');
  }

  // Перезапись родительского, отвечает за открытие превью изображения
  open(data) {
    super.open();
    this._imageData.src = data.link;
    this._imageData.alt = data.name;
    this._imageName.textContent = data.name;
  }
}
