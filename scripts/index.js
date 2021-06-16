const content = document.querySelector('.root');
const infoName = content.querySelector('.profile__info-name');
const infoJob = content.querySelector('.profile__info-job');
const editButton = content.querySelector('.profile__edit-button');
const popUp = content.querySelector('.popup');
const popupClose = popUp.querySelector('.popup__close');
const popupForm = popUp.querySelector('.popup__form');
const inputName = popupForm.querySelector('.popup__input_type_name');
const inputJob = popupForm.querySelector('.popup__input_type_job');

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
