/* Отвечает за отрисовку элементов на странице.
У класса нет своей разметки.
Он получает разметку через функцию-колбэк и вставляет её в контейнер. */

export default class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._items = items; // массив данных который нужно добавить
    this._renderer = renderer; // функция отрисовки
    this._containerSelector = containerSelector;
  }

  /* Отвечает за отрисовку всех элементов, а renderer
  отвечает за отрисовку каждого по отдельности */
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Принимает на вход DOM-элемент и добавляет его в контейнер перед первым дочерним
  addItemPrepend(elem) {
    this._containerSelector.prepend(elem);
  }

  // Принимает на вход DOM-элемент и добавляет его в контейнер после последнего дочернего
  addItemAppend(elem) {
    this._containerSelector.append(elem);
  }
}
