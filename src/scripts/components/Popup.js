// Класс, который отвечает за открытие и закрытие попапа

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close');
    this._button = this._popupSelector.querySelector('.popup__save');
    this._classPopupOpen = 'popup_opened';
    this._handleEscClose = this._handleEscClose.bind(this);
    this._ESC_KEY = 'Escape';
  }

  // Отвечает за открытие попапа
  open() {
    this._popupSelector.classList.add(this._classPopupOpen);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Отвечает за закрытие попапа
  close() {
    this._popupSelector.classList.remove(this._classPopupOpen);
    document.removeEventListener('keydown', this._handleEscClose);

  }

  // Отвечает за закрытие попапа клавишей ESC
  _handleEscClose(evt) {
    if (evt.key === this._ESC_KEY) {
      this.close();
    }
  }

  /* Добавляет слушатель клика (функция закрытия)
  иконке закрытия попапа и бэкграунду */
  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  // Удаляем слушателей
  removeEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
