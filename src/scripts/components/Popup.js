import {
  ESC_KEY
} from '../utils/constants.js'

// Класс, который отвечает за открытие и закрытие попапа

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close');
    this._classPopupOpen = 'popup_opened';
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleBackgroundClickClose = this._handleBackgroundClickClose.bind(this);
  }

  // Отвечает за открытие попапа
  open() {
    this._popupSelector.classList.add(this._classPopupOpen);
  }

  // Отвечает за закрытие попапа
  close() {
    this._popupSelector.classList.remove(this._classPopupOpen);
  }

  // Отвечает за закрытие попапа клавишей ESC
   _handleEscClose(evt) {
     if (evt.key === ESC_KEY) {
      this.close();
    }
  }

  //  Отвечает за закрытие попапа нажатием по бэкграунду
   _handleBackgroundClickClose(evt) {
      if (evt.target.classList.contains(this._classPopupOpen)) {
        this.close();
      }
    }

  /* Добавляет слушатель клика (функция закрытия)
  иконке закрытия попапа и бэкграунду */
  setEventListeners() {
    document.addEventListener('click', this._handleBackgroundClickClose);
    document.addEventListener('keydown', this._handleEscClose);
    this._popupCloseButton.addEventListener('click', () => {
      this.close()
    })
  }

  // Удаляем слушателей
  removeEventListeners() {
    document.removeEventListener('click', this._handleBackgroundClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupCloseButton.removeEventListener('click', () => {
      this.close()
    })
  }
}
