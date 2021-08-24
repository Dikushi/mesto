/* Класс отвечает за управление отображением
 информации о пользователе на странице. */

export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob }) {
    this._selectorUserName = selectorUserName;
    this._selectorUserJob = selectorUserJob;
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._selectorUserName.textContent,
      job: this._selectorUserJob.textContent
    };
    return userInfo;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userInfo) {
    this._selectorUserName.textContent = userInfo.name;
    this._selectorUserJob.textContent = userInfo.job;
  }
}
