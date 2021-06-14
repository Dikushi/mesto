let content = document.querySelector('.content');
let popupClose = content.querySelector('.popup__close');
let popUp = content.querySelector('.popup');
let infoName = content.querySelector('.profile__info-name');
let infoJob = content.querySelector('.profile__info-job');
let inputName = content.querySelector('.popup__input_name');
let inputJob = content.querySelector('.popup__input_job');
let popupForm = content.querySelector('.popup__form');
let infoLike = content.querySelectorAll('.elements__info-like');
let editButton = content.querySelector('.profile__edit-button');

popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmit);
editButton.addEventListener('click', editProfile);

// Слушаем каждый лайк на предмет нажатия
for (let i = 0; i < infoLike.length; i++) {
  infoLike[i].addEventListener('click', function () {
    infoLike[i].classList.toggle('elements__info-like_active');
  });
}

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
