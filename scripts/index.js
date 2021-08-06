import Card from './Card.js';
import FormValidator from './FormValidator.js';

import {
  initialCards,
  dataValidation,
  infoName,
  infoJob,
  editButton,
  addButton,
  popUpEditProfile,
  popUpPreviewImage,
  popUpAddCard,
  popupCloseEditProfile,
  popupFormEditProfile,
  popupClosePreviewCard,
  popupCloseAddCard,
  popupFormAddCard,
  inputName,
  inputJob,
  inputNamePhoto,
  inputLinkPhoto,
  cardsElements,
  ESC_KEY
} from './constants.js'

// Общая функция открытия модалки
export const openModal = (modal) => {
  modal.classList.add('popup_opened');

  document.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalbyEscape);
};

// Общая функция закрытия модалки
export const closeModal = (modal) => {
  modal.classList.remove('popup_opened');

  document.removeEventListener('click', closeModalByOverlay);
  document.removeEventListener('keydown', closeModalbyEscape);
};

// Условие для закрытие модального окна [ESC_KEY = Escape]
const closeModalbyEscape = (event) => {
  if (event.key === ESC_KEY) {
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

// Открытие попапа редактирования профиля
const openPopUpEditProfile = () => {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;
  profileForm.toggleButtonState();

  profileForm.hideValidityError(inputName);
  profileForm.hideValidityError(inputJob);

  openModal(popUpEditProfile);
};

// Открытие попапа добавления карточки
const openPopUpAddCard = () => {
  popupFormAddCard.reset();
  cardForm.toggleButtonState();

  cardForm.hideValidityError(inputNamePhoto);
  cardForm.hideValidityError(inputLinkPhoto);

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
  return new Card(data, '#card', openModal).generateCard();
};

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
