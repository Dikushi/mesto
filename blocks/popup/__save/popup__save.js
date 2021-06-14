function formSubmit(e) {
  e.preventDefault();

  document.querySelector('.profile__info-name').textContent = document.querySelector('.popup__input-name').value;
  document.querySelector('.profile__info-job').textContent = document.querySelector('.popup__input-job').value;

  document.querySelector('.popup').classList.remove('popup__container_opened');
}

document.querySelector('.popup__form').addEventListener('submit', formSubmit);
