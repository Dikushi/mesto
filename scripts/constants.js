// Шесть изначальных карточек
export const initialCards = [{
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

// Данные для валидации, классы, селекторы
export const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Основные переменные
export const content = document.querySelector('.root');
export const infoName = content.querySelector('.profile__info-name');
export const infoJob = content.querySelector('.profile__info-job');
export const editButton = content.querySelector('.profile__edit-button');
export const addButton = content.querySelector('.profile__add-button');
export const popUpEditProfile = content.querySelector('.popup_type_edit-profile');
export const popUpPreviewImage = content.querySelector('.popup_type_preview-image');
export const popUpAddCard = content.querySelector('.popup_type_add-card');
export const popupCloseEditProfile = popUpEditProfile.querySelector('.popup__close_type_edit-profile');
export const popupFormEditProfile = popUpEditProfile.querySelector('.popup__form_type_edit-profile');
export const previewImage = popUpPreviewImage.querySelector('.popup__image');
export const nameImage = popUpPreviewImage.querySelector('.popup__image-name');
export const popupClosePreviewCard = popUpPreviewImage.querySelector('.popup__close_type_preview-card');
export const popupCloseAddCard = popUpAddCard.querySelector('.popup__close_type_add-card');
export const popupFormAddCard = popUpAddCard.querySelector('.popup__form_type_add-card');
export const inputName = popupFormEditProfile.querySelector('.popup__input_type_name');
export const inputJob = popupFormEditProfile.querySelector('.popup__input_type_job');
export const inputNamePhoto = popupFormAddCard.querySelector('.popup__input_type_photo-name');
export const inputLinkPhoto = popupFormAddCard.querySelector('.popup__input_type_photo-link');
export const itemTemplate = document.querySelector('#card').content;
export const cardsElements = content.querySelector('.elements');

export const ESC_KEY = 'Escape';
