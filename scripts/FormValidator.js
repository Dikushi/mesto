export default class FormValidator {
  constructor(dataValidation, elemForm) {
    this._elemForm = elemForm;
    this._formSelector = dataValidation.formSelector;
    this._inputSelector = dataValidation.inputSelector;
    this._submitButtonSelector = dataValidation.submitButtonSelector;
    this._inactiveButtonClass = dataValidation.inactiveButtonClass;
    this._inputErrorClass = dataValidation.inputErrorClass;
    this._errorClass = dataValidation.errorClass;
    this._inputList = Array.from(this._elemForm.querySelectorAll(this._inputSelector));
    this._buttonElement = this._elemForm.querySelector(this._submitButtonSelector);
  }

  // Метод для включения валидации
  enableValidation() {
    this._setEventListeners();
  }

  // Метод для показа ошибки под инпутами
  _showValidityError(inputElement) {
    const errorElement = this._elemForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Метод для скрытия ошибки под инпутами
  hideValidityError(inputElement) {
    const errorElement = this._elemForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Условия для отображения/скрытия ошибок под инпутами
  _showInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showValidityError(inputElement);
    } else {
      this.hideValidityError(inputElement);
    };
  }

  // Проверка валидности инпутов
  _checkinputValidity() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Тогл активности для кнопки, зависит от валидности инпутов
  toggleButtonState() {
    if (this._checkinputValidity()) {
      this._buttonElement.setAttribute("disabled", "");
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    };
  }

  // Метод навешивания слушателей
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._showInputValidity(inputElement);
        this.toggleButtonState();
      })
    })
  }
}
