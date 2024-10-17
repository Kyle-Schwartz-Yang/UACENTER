
export class BaseToggleSystem {

  constructor(selectorParent, config) {
    /*
      this.selectorParent = document.getElementById(selectorParent); // id='tabs-default'
      this.selectorParent = document.querySelector(`[data-tabs="${selectorParent}"]`) //(data-tabs="tabs-default")
      this.selectorParent = document.querySelector(selectorParent); // (#tabs-default)
    */
    this.selectorParent = document.querySelector(`[data-tabbed="${selectorParent}"]`) //(data-tabs="tabs-default")

    if (this.selectorParent) {
      this.toggles = this.selectorParent.querySelectorAll(config.toggleSelector);
      this.contents = this.selectorParent.querySelectorAll(config.contentSelector);
      // Устанавливаем класс для активного состояния, используя значение из конфигурации или 'active' по умолчанию
      this.activeSelector = config.activeSelector || '_active';

    } else {
      console.warn(`Перевір код уважно this.container: ${this.container}`);
      return
    }

    // this.init(); Обрат внимания можно вызывать здесь
  }

  // Метод инициализации
  init() {
    this.addEventListeners();
  }

  // Метод для добавления обработчиков событий
  addEventListeners() {
    this.toggles.forEach(button => {
      button.addEventListener('click', () => this.handleToggle(button));
    });
  }

  // handleToggle будет переопределена в дочерних классах (иак задумано)
  handleToggle(button) {
    console.warn('Метод handleToggle должен быть реализован в дочернем классе.');
  }

}

