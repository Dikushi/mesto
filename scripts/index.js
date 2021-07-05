const content = document.querySelector('.root');
const infoName = content.querySelector('.profile__info-name');
const infoJob = content.querySelector('.profile__info-job');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popUpEditProfile = content.querySelector('.popup_type_edit-profile');
const popUpPreviewImage = content.querySelector('.popup_type_preview-image');
const popUpAddCard = content.querySelector('.popup_type_add-card');
const popupCloseEditProfile = popUpEditProfile.querySelector('.popup__close_type_editProfile');
const popupFormEditProfile = popUpEditProfile.querySelector('.popup__form_type_editProfile');
const previewImage = popUpPreviewImage.querySelector('.popup__image');
const nameImage = popUpPreviewImage.querySelector('.popup__image-name');
const popupClosePreviewCard = popUpPreviewImage.querySelector('.popup__close_type_previewCard');
const popupCloseAddCard = popUpAddCard.querySelector('.popup__close_type_addCard');
const popupFormAddCard = popUpAddCard.querySelector('.popup__form_type_addCard');
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

// Рендерим изначально добавленные в массив обьекты
initialCards.forEach((elem) => {
  cardsElements.append(addCard(elem.name, elem.link));
});

// Открытие попапа редактирования профиля
function openPopUpEditProfile() {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;

  popUpEditProfile.classList.add('popup_opened');
};

// Закрытие попапа редактирования профиля
function closePopUpEditProfile() {
  popUpEditProfile.classList.remove('popup_opened');
};

// Открытие попапа добавления карточки
function openPopUpAddCard() {
  inputLinkPhoto.value = '';
  inputNamePhoto.value = '';

  popUpAddCard.classList.add('popup_opened');
};

// Закрытие попапа добавления карточки
function closePopUpAddCard() {
  popUpAddCard.classList.remove('popup_opened');
};

// Функция сохранения введенной информации в попапе редактирования профиля
function submitFormEditProfile(e) {
  e.preventDefault();

  infoName.textContent = inputName.value;
  infoJob.textContent = inputJob.value;

  closePopUpEditProfile();
};

// Функция сохранения новой карточки
function submitFormAddCard(e) {
  e.preventDefault();

  cardsElements.prepend(addCard(inputNamePhoto.value, inputLinkPhoto.value));

  closePopUpAddCard();
};

// Функция добавления карточки
function addCard(nameCard, linkCard) {
  const anotherCard = itemTemplate.querySelector('.elements__item').cloneNode(true);

  anotherCard.querySelector('.elements__item-image').src = linkCard;
  anotherCard.querySelector('.elements__item-image').alt = nameCard;
  anotherCard.querySelector('.elements__info-text').textContent = nameCard;

  anotherCard.querySelector('.elements__info-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__info-like_active');
  })

  anotherCard.querySelector('.elements__delete-card').addEventListener('click', (evt) => {
    evt.target.closest('.elements__item').remove();
  })

  anotherCard.querySelector('.elements__item-image').addEventListener('click', () => setPreviewImage())

  function setPreviewImage() {
    previewImage.src = linkCard;
    previewImage.alt = nameCard;
    nameImage.textContent = nameCard;

    popUpPreviewImage.classList.add('popup_opened');
  }

  return anotherCard;
}

editButton.addEventListener('click', openPopUpEditProfile);
addButton.addEventListener('click', openPopUpAddCard);
popupCloseEditProfile.addEventListener('click', closePopUpEditProfile);
popupCloseAddCard.addEventListener('click', closePopUpAddCard);
popupFormEditProfile.addEventListener('submit', submitFormEditProfile);
popupFormAddCard.addEventListener('submit', submitFormAddCard);
popupClosePreviewCard.addEventListener('click', () => popUpPreviewImage.classList.remove('popup_opened'));
