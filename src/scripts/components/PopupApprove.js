import Popup from "./Popup.js";

/* Класс, который отвечает за открытие и
закрытие попапа у форм */

export default class PopupApprove extends Popup {
  constructor(popupSelector, {
    handleClickConfirm
  }) {
    super(popupSelector);
    this._handleClickConfirm = handleClickConfirm; // колбэк клика на кнопку
    this._button = this._popupSelector.querySelector('.popup__save')
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  _handleOpenConfirm(evt) {
    evt.preventDefault()
    this._handleClickConfirm(this._cardId, this._cardElement);
  }

  /* Перезапись родительского, должнен так же
  добавлять обработчик сабмита формы */
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', this._handleOpenConfirm.bind(this));
  }
}
