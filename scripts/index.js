let content = document.querySelector('.content');
let popupClose = content.querySelector('.popup__close');
let popUp = content.querySelector('.popup');
let infoName = content.querySelector('.profile__info-name');
let infoJob = content.querySelector('.profile__info-job');
let inputName = content.querySelector('.popup__input_name');
let inputJob = content.querySelector('.popup__input_job');
let popupForm = content.querySelector('.popup__form');


popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmit);
document.querySelector('.profile__edit-button').addEventListener('click', editProfile);


// Функция закрытия поп-апа
function closePopup() {
  popUp.classList.remove('popup_opened')
}

// Функция сохранения введенной информации в поп-апе
function formSubmit(e) {
  e.preventDefault();

  infoName.textContent = inputName.value;
  infoJob.textContent = inputJob.value;

  popUp.classList.remove('popup_opened');
}

// Функция редактирования профиля
function editProfile() {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;

  popUp.classList.add('popup_opened');
}
