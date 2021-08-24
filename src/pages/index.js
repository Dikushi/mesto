import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

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
  popupFormEditProfile,
  popupFormAddCard,
  inputName,
  inputJob,
  inputNamePhoto,
  inputLinkPhoto,
  cardsElements
} from '../scripts/utils/constants.js'

// Обьект для управлением данными пользователя
const userInfo = new UserInfo({
  selectorUserName: infoName,
  selectorUserJob: infoJob
})

// Попап - превью изображения
const popupWithImage = new PopupWithImage(popUpPreviewImage);
popupWithImage.setEventListeners();

// Попап - редактирование профиля
const popupEditProfile = new PopupWithForm(popUpEditProfile, {
     submitFormCallBack: (data) => {
      userInfo.setUserInfo(data);
   }
});
popupEditProfile.setEventListeners();

// Попап - добавление карточки
const popupAddCard = new PopupWithForm(popUpAddCard, {
   submitFormCallBack: (data) => {
      const cardData = {
        name: data["photo-name"],
        link: data["photo-link"]
      }
      sectionWithCard.addItemPrepend(prepareCard(cardData));
   }
});
popupAddCard.setEventListeners();

// Секция с карточками
const sectionWithCard = new Section({
  renderer: (item) => {
    sectionWithCard.addItemAppend(prepareCard(item))
  }
}, cardsElements);

// Функция для открытия изображения, передается как колбэк в Card
const openPreviewImage = (card) => {
  const data = {
    name: card.title,
    link: card.src
  };
  popupWithImage.open(data);
}

// Функция подготовки карточки к отрисовке
function prepareCard(data) {
  return new Card(data, '#card', openPreviewImage).generateCard();
};

// Рендерим изначальные карточки (константы)
sectionWithCard.renderItems(initialCards);

// Создаем обьект для валидации и включаем валидацию
const profileForm = new FormValidator(dataValidation, popupFormEditProfile);
const cardForm = new FormValidator(dataValidation, popupFormAddCard);
profileForm.enableValidation();
cardForm.enableValidation();

// Навыешиваем слушателей на кнопки
editButton.addEventListener('click', () => {
  popupEditProfile.open();
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().job;

  profileForm.toggleButtonState();
  profileForm.hideValidityError(inputName);
  profileForm.hideValidityError(inputJob);
});
addButton.addEventListener('click', () => {
  popupAddCard.open()

  cardForm.toggleButtonState();
  cardForm.hideValidityError(inputNamePhoto);
  cardForm.hideValidityError(inputLinkPhoto);
});
