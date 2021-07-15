const content = document.querySelector('.root');
const infoName = content.querySelector('.profile__info-name');
const infoJob = content.querySelector('.profile__info-job');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popUpEditProfile = content.querySelector('.popup_type_edit-profile');
const popUpPreviewImage = content.querySelector('.popup_type_preview-image');
const popUpAddCard = content.querySelector('.popup_type_add-card');
const popupCloseEditProfile = popUpEditProfile.querySelector('.popup__close_type_edit-profile');
const popupFormEditProfile = popUpEditProfile.querySelector('.popup__form_type_edit-profile');
const previewImage = popUpPreviewImage.querySelector('.popup__image');
const nameImage = popUpPreviewImage.querySelector('.popup__image-name');
const popupClosePreviewCard = popUpPreviewImage.querySelector('.popup__close_type_preview-card');
const popupCloseAddCard = popUpAddCard.querySelector('.popup__close_type_add-card');
const popupFormAddCard = popUpAddCard.querySelector('.popup__form_type_add-card');
const inputName = popupFormEditProfile.querySelector('.popup__input_type_name');
const inputJob = popupFormEditProfile.querySelector('.popup__input_type_job');
const inputNamePhoto = popupFormAddCard.querySelector('.popup__input_type_photo-name');
const inputLinkPhoto = popupFormAddCard.querySelector('.popup__input_type_photo-link');
const itemTemplate = document.querySelector('#card').content;
const cardsElements = content.querySelector('.elements');


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
const openModal = (modal) => {
  modal.classList.add('popup_opened');

  modal.querySelector('.popup__save').classList.add('popup__save_disabled')
  modal.querySelector('.popup__save').setAttribute("disabled", "")
  document.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalbyEscape);
}

// Общая функция закрытия модалки
const closeModal = (modal) => {
  modal.classList.remove('popup_opened');

  modal.querySelector('.popup__save').classList.remove('popup__save_disabled')
  modal.querySelector('.popup__save').removeAttribute("disabled")
  document.removeEventListener('click', closeModalByOverlay);
  document.removeEventListener('keydown', closeModalbyEscape);
}

// Условие для закрытие модального окна [KEY = ESCAPE]
const closeModalbyEscape = (event) => {
  if (event.key === 'Escape') {
    const activePopUp = document.querySelector('.popup_opened');
    closeModal(activePopUp);
  }
}

// Условие для закрытие модального окна
const closeModalByOverlay = (event) => {
  if (event.target.classList.contains('popup_opened')) {
    closeModal(event.target);
  }
}

// Открытие попапа редактирования профиля
const openPopUpEditProfile = () => {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;

  openModal(popUpEditProfile);
};

// Открытие попапа добавления карточки
const openPopUpAddCard = () => {
  popupFormAddCard.reset();

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

  cardsElements.prepend(addCard(inputNamePhoto.value, inputLinkPhoto.value));

  closeModal(popUpAddCard);
};

// Функция добавления карточки
const addCard = (nameCard, linkCard) => {
  const anotherCard = itemTemplate.querySelector('.elements__item').cloneNode(true);

  anotherCard.querySelector('.elements__item-image').src = linkCard;
  anotherCard.querySelector('.elements__item-image').alt = nameCard;
  anotherCard.querySelector('.elements__info-text').textContent = nameCard;

  anotherCard.querySelector('.elements__info-like').addEventListener('click', (event) => {
    event.target.classList.toggle('elements__info-like_active');
  })

  anotherCard.querySelector('.elements__delete-card').addEventListener('click', (event) => {
    event.target.closest('.elements__item').remove();
  })

  anotherCard.querySelector('.elements__item-image').addEventListener('click', () => setPreviewImage());

  const setPreviewImage = () => {
    previewImage.src = linkCard;
    previewImage.alt = nameCard;
    nameImage.textContent = nameCard;

    openModal(popUpPreviewImage);
  }

  return anotherCard;
}

// Рендерим изначально добавленные в массив обьекты
initialCards.forEach((elem) => {
  cardsElements.append(addCard(elem.name, elem.link));
});


// Вешаем слушателей
editButton.addEventListener('click', openPopUpEditProfile);
addButton.addEventListener('click', openPopUpAddCard);
popupFormEditProfile.addEventListener('submit', submitFormEditProfile);
popupFormAddCard.addEventListener('submit', submitFormAddCard);
popupCloseEditProfile.addEventListener('click', () => closeModal(popUpEditProfile));
popupCloseAddCard.addEventListener('click', () => closeModal(popUpAddCard));
popupClosePreviewCard.addEventListener('click', () => closeModal(popUpPreviewImage));
