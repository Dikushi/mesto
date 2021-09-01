/* Класс отвечает за управление отображением
 информации о пользователе на странице. */

export default class UserInfo {
  constructor({
    selectorUserName,
    selectorUserJob,
    selectorUserAvatar
  }) {
    this._selectorUserName = selectorUserName;
    this._selectorUserJob = selectorUserJob;
    this._selectorUserAvatar = selectorUserAvatar;
    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._selectorUserName.textContent,
      about: this._selectorUserJob.textContent,
      avatar: this._selectorUserAvatar.src,
      userId: this._userId
    };
    return userInfo;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userInfo) {
    this._selectorUserName.textContent = userInfo.name;
    this._selectorUserJob.textContent = userInfo.job || userInfo.about;
    this._selectorUserAvatar.src = userInfo.avatar;
    this._userId = userInfo._id;
  }
}
