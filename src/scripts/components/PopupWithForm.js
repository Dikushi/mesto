import Popup from "./Popup.js";

/* Класс, который отвечает за открытие и
закрытие попапа у форм */

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {
    submitFormCallBack
  }) {
    super(popupSelector);
    this._submitFormCallBack = submitFormCallBack; // колбэк сабмита формы
    this._inputs = this._popupSelector.querySelectorAll('.popup__input');
    this._form = this._popupSelector.querySelector('.popup__form');
    this._button = this._popupSelector.querySelector('.popup__save');
  }

  // Перезапись родительского, должен так же сбрасывать формы
   close() {
    super.close();
    this._form.reset();
  }

  _handleSumbitForm(evt) {
    evt.preventDefault();
    this._submitFormCallBack(this._getInputValues());
    this.close();
  }

  // Собирает данные всех полей формы, отдает объект
  _getInputValues() {
    this._formsValues = {};
    this._inputs.forEach((input) => {
       this._formsValues[input.name] = input.value;
      });
    return this._formsValues;
  }

  /* Перезапись родительского, должнен так же
  добавлять обработчик сабмита формы */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSumbitForm.bind(this));
  }
}
