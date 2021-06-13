function editProfile() {
  document.querySelector('.popup__input-name').value = document.querySelector('.profile__info-name').textContent;
  document.querySelector('.popup__input-job').value = document.querySelector('.profile__info-job').textContent;

  document.querySelector('.popup')
    .classList.add('popup__container_opened');
}

document.querySelector('.profile__edit-button').addEventListener('click', editProfile);
