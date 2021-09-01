import './index.css';

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupApprove from '../scripts/components/PopupApprove.js';

import {
  dataValidation,
  infoName,
  infoJob,
  infoAvatar,
  editAvatarButton,
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
  cardsElements,
  itemTemplate,
  popUpUpdateAvatar,
  popupFormUpdateAvatar,
  inputUrlUpdateAvatar,
  popUpDeleteCard
} from '../scripts/utils/constants.js'

// Обьет для работы с апишкой
const request = new Api();

// Обьект для управлением данными пользователя
const userInfo = new UserInfo({
  selectorUserName: infoName,
  selectorUserJob: infoJob,
  selectorUserAvatar: infoAvatar
});

// Попап - превью изображения
const popupWithImage = new PopupWithImage(popUpPreviewImage);
popupWithImage.setEventListeners();

// Попап - редактирование профиля
const popupEditProfile = new PopupWithForm(popUpEditProfile, {
  submitFormCallBack: (data) => {
    popupEditProfile._button.textContent = "Сохранение..."
    request
      .updateUserInfo(data.name, data.job)
      .then(json => userInfo.setUserInfo(json))
      .then(() => {
        popupEditProfile.close()
      })
      .then(() => {
        popupEditProfile._button.textContent = "Сохранить"
      })
      .catch((err) => {
        console.log(err)
        popupEditProfile._button.textContent = "Ошибка, попробуйте снова"
      })
  }
});
popupEditProfile.setEventListeners();

// Попап - добавление карточки
const popupAddCard = new PopupWithForm(popUpAddCard, {
  submitFormCallBack: (data) => {
    popupAddCard._button.textContent = "Создание..."
    request
      .addCard(data.name, data.link)
      .then(json => sectionWithCard.addItemPrepend(prepareCard(json)))
      .then(() => {
        popupAddCard.close()
      })
      .then(() => {
        popupAddCard._button.textContent = "Создать"
      })
      .catch((err) => {
        console.log(err)
        popupAddCard._button.textContent = "Ошибка, попробуйте снова"
      })
  }
});
popupAddCard.setEventListeners();

// Попап - обновление аватара
const popupUpdateAvatar = new PopupWithForm(popUpUpdateAvatar, {
  submitFormCallBack: (data) => {
    popupUpdateAvatar._button.textContent = "Сохранение..."
    request
      .updateUserAvatar(data.avatar)
      .then(json => userInfo.setUserInfo(json))
      .then(() => {
        popupUpdateAvatar.close()
      })
      .then(() => {
        popupUpdateAvatar._button.textContent = "Сохранить"
      })
      .catch((err) => {
        console.log(err)
        popupUpdateAvatar._button.textContent = "Ошибка, попробуйте снова"
      })
  }
})
popupUpdateAvatar.setEventListeners();

// Попап - удаление карточки
const popupDeleteCard = new PopupApprove(popUpDeleteCard, {
  handleClickConfirm: (cardId, cardElement) => {
    popupDeleteCard._button.textContent = "Удаление..."
    request.deleteCard(cardId)
      .then(() => {
        popupDeleteCard.close()
        cardElement.remove()
      })
      .then(() => {
        popupDeleteCard._button.textContent = "Да"
      })
      .catch((err) => {
        console.log(err)
        popupDeleteCard._button.textContent = "Ошибка, попробуйте снова"
      })
  }
})
popupDeleteCard.setEventListeners();

// Секция с карточками
const sectionWithCard = new Section({
  renderer: (item) => {
    sectionWithCard.addItemAppend(prepareCard(item))
  }
}, cardsElements);


// Обьект с коллбэками для карточки
const callBacksForCard = {
  // Коллбэк для удаления лайков
  removeLike: (cardId) => {
    return request.removeLike(cardId)
  },

  // Коллбэк для простановки лайков
  setLike: (cardId) => {
    return request.setLike(cardId)
  },

  // Коллбэк для открытия превью изображений
  openPreviewImage: (card) => {
    const data = {
      name: card.title,
      link: card.src
    };
    popupWithImage.open(data);
  },

  // Коллбэк для реализации открытия карточки и передачи пераметров
  handleOpenConfirm: (cardId, cardElement) => {
    popupDeleteCard._button.textContent = 'Да'
    popupDeleteCard.open(cardId, cardElement)
  }
}

// Функция подготовки карточки к отрисовке
function prepareCard(data) {
  return new Card(
    data,
    itemTemplate,
    userInfo.getUserInfo(),
    callBacksForCard).generateCard()
};

// Создаем обьекты для валидации
const profileForm = new FormValidator(dataValidation, popupFormEditProfile);
const cardForm = new FormValidator(dataValidation, popupFormAddCard);
const avatarUpdateForm = new FormValidator(dataValidation, popupFormUpdateAvatar)

// Включаем валидацию
profileForm.enableValidation();
cardForm.enableValidation();
avatarUpdateForm.enableValidation();

// Навешиваем слушатель на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile._button.textContent = 'Сохранить';
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().about;

  profileForm.toggleButtonState();
  profileForm.hideValidityError(inputName);
  profileForm.hideValidityError(inputJob);
});

// Навешиваем слушатель на кнопку добавления карточки
addButton.addEventListener('click', () => {
  popupAddCard.open()
  popupAddCard._button.textContent = 'Добавить';

  cardForm.toggleButtonState();
  cardForm.hideValidityError(inputNamePhoto);
  cardForm.hideValidityError(inputLinkPhoto);
});

// Навешиваем слушатель на кнопку обновления аватара
editAvatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open()
  popupUpdateAvatar._button.textContent = 'Сохранить';

  avatarUpdateForm.toggleButtonState();
  avatarUpdateForm.hideValidityError(inputUrlUpdateAvatar);
})

// Отрисовка всех карточек изначальных
request
  .getInitialCards()
  .then(json => sectionWithCard.renderItems(json))
  .catch(err => console.log(err));

// Подгрузка данных пользователя
request
  .getUserInfo()
  .then(json => userInfo.setUserInfo(json))
  .catch(err => console.log(err));
