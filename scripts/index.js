let content = document.querySelector('.root');
let popupClose = content.querySelector('.popup__close');
let popUp = content.querySelector('.popup');
let infoName = content.querySelector('.profile__info-name');
let infoJob = content.querySelector('.profile__info-job');
let inputName = content.querySelector('.popup__input-name');
let inputJob = content.querySelector('.popup__input-job');
let popupForm = content.querySelector('.popup__form');
let editButton = content.querySelector('.profile__edit-button');

// Функция закрытия поп-апа
function closePopup() {
  popUp.classList.remove('popup_opened');
}

// Функция открытия поп-апа
function openPopup() {
  popUp.classList.add('popup_opened');
}

// Функция сохранения введенной информации в поп-апе
function formSubmit(e) {
  e.preventDefault();

  infoName.textContent = inputName.value;
  infoJob.textContent = inputJob.value;

  closePopup();
}

// Функция редактирования профиля
function editProfile() {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;

  openPopup();
}

popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmit);
editButton.addEventListener('click', editProfile);
