import Card from './Card.js';
import FormValidator from './FormValidator.js';

export const content = document.querySelector('.root');
const infoName = content.querySelector('.profile__info-name');
const infoJob = content.querySelector('.profile__info-job');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popUpEditProfile = content.querySelector('.popup_type_edit-profile');
export const popUpPreviewImage = content.querySelector('.popup_type_preview-image');
const popUpAddCard = content.querySelector('.popup_type_add-card');
const popupCloseEditProfile = popUpEditProfile.querySelector('.popup__close_type_edit-profile');
export const popupFormEditProfile = popUpEditProfile.querySelector('.popup__form_type_edit-profile');
export const previewImage = popUpPreviewImage.querySelector('.popup__image');
export const nameImage = popUpPreviewImage.querySelector('.popup__image-name');
const popupClosePreviewCard = popUpPreviewImage.querySelector('.popup__close_type_preview-card');
const popupCloseAddCard = popUpAddCard.querySelector('.popup__close_type_add-card');
export const popupFormAddCard = popUpAddCard.querySelector('.popup__form_type_add-card');
export const inputName = popupFormEditProfile.querySelector('.popup__input_type_name');
export const inputJob = popupFormEditProfile.querySelector('.popup__input_type_job');
export const inputNamePhoto = popupFormAddCard.querySelector('.popup__input_type_photo-name');
export const inputLinkPhoto = popupFormAddCard.querySelector('.popup__input_type_photo-link');
const itemTemplate = document.querySelector('#card').content;
const cardsElements = content.querySelector('.elements');

// Данные для валидации, классы, селекторы
const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Шесть изначальных карточек
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Общая функция открытия модалки
export const openModal = (modal) => {
  modal.classList.add('popup_opened');

  if (!modal === popUpPreviewImage) {
    const buttonElement = modal.querySelector('.popup__save');
    buttonElement.classList.add('popup__save_disabled');
    buttonElement.setAttribute("disabled", "");
  };

  document.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalbyEscape);
};

// Общая функция закрытия модалки
export const closeModal = (modal) => {
  modal.classList.remove('popup_opened');

  if (!modal === popUpPreviewImage) {
    const buttonElement = modal.querySelector('.popup__save');
    buttonElement.classList.remove('popup__save_disabled');
    buttonElement.removeAttribute("disabled", "");
  };

  document.removeEventListener('click', closeModalByOverlay);
  document.removeEventListener('keydown', closeModalbyEscape);
};

// Условие для закрытие модального окна [KEY = ESCAPE]
const closeModalbyEscape = (event) => {
  if (event.key === 'Escape') {
    const activePopUp = document.querySelector('.popup_opened');
    closeModal(activePopUp);
  };
};

// Условие для закрытие модального окна
const closeModalByOverlay = (event) => {
  if (event.target.classList.contains('popup_opened')) {
    closeModal(event.target);
  };
};

const errorHandler = {
  errorSpanActive: "popup__input-error_active",
  errorInputActive: "popup__input_type_error"
};

// Сброс состояния невалдности данных (убираем отображение)
const errorReset = (formElement, inputElement, errorHandler) => {
  const inputSpan = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorHandler.errorInputActive);
  inputSpan.classList.remove(errorHandler.errorSpanActive);
};

// Открытие попапа редактирования профиля
const openPopUpEditProfile = () => {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;
  profileForm.toggleButtonState();

  errorReset(popUpEditProfile, inputName, errorHandler);
  errorReset(popUpEditProfile, inputJob, errorHandler);

  openModal(popUpEditProfile);
};

// Открытие попапа добавления карточки
const openPopUpAddCard = () => {
  popupFormAddCard.reset();
  cardForm.toggleButtonState();

  errorReset(popupFormAddCard, inputNamePhoto, errorHandler);
  errorReset(popupFormAddCard, inputLinkPhoto, errorHandler);

  openModal(popUpAddCard);
};

// Функция сохранения введенной информации в попапе редактирования профиля
const submitFormEditProfile = (event) => {
  event.preventDefault();


  infoName.textContent = inputName.value;
  infoJob.textContent = inputJob.value;

  closeModal(popUpEditProfile);
};

// Функция сохранения новой карточки
const submitFormAddCard = (event) => {
  event.preventDefault();

  const valueCard = {
    name: inputNamePhoto.value,
    link: inputLinkPhoto.value
  };

  cardsElements.prepend(addCard(valueCard));

  closeModal(popUpAddCard);
};

// Функция добавления карточки
const addCard = (data) => {
  return new Card(data, '#card').generateCard()
}

// Рендерим изначально добавленные в массив обьекты
initialCards.forEach((elem) => {
  cardsElements.append(addCard(elem));
});

// Создаем обьект для валидации
const profileForm = new FormValidator(dataValidation, popupFormEditProfile);
const cardForm = new FormValidator(dataValidation, popupFormAddCard);

// Включаем валидацию
profileForm.enableValidation();
cardForm.enableValidation();

// Вешаем слушателей
editButton.addEventListener('click', () => openPopUpEditProfile());
addButton.addEventListener('click', () => openPopUpAddCard());
popupFormEditProfile.addEventListener('submit', submitFormEditProfile);
popupFormAddCard.addEventListener('submit', submitFormAddCard);
popupCloseEditProfile.addEventListener('click', () => closeModal(popUpEditProfile));
popupCloseAddCard.addEventListener('click', () => closeModal(popUpAddCard));
popupClosePreviewCard.addEventListener('click', () => closeModal(popUpPreviewImage));
