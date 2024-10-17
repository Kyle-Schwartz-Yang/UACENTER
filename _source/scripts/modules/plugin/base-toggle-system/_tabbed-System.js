import { BaseToggleSystem } from './_base-toggle-system.js';

/*
- PUG
$-  #tabs-default(class='tabs-default')
$-    .tabs-default__buttons > .tabs-default__button(data-button-system='unique')
$-   .tabs-default__contents > .tabs-default__content(data-content-system='unique')
*/

// ------------------------------------------------------------------------------------------------
export class TabbedSystem extends BaseToggleSystem {
  //+-----------------------------------------------------Not necessary
  // Активируем первую кнопку или любуй другуй: (Либо можно напрямою указать в HTML)
  init() {
    super.init(); //Наследуем содержимое родителя.
    //--------------------------------------------
    if (this.toggles.length > 0) {
      this.handleToggle(this.toggles[0]);
    }
  }
  //+-----------------------------------------------------Not necessary

  handleToggle(button) {
    // const buttonAttribut = button.getAttribute('data-target');
    const buttonAttribut = button.getAttribute('data-button-system'); //button

    if (!button.classList.contains(this.activeSelector)) {
      this.removeActiveClasses();
      button.classList.add(this.activeSelector);
    }

    this.setActiveContent(buttonAttribut);
  }

  // -----------------------Оптимизация
  // Добавление класса active контенту
  setActiveContent(buttonAttribut) {
    this.contents.forEach(content => {
      const contentAttribut = content.dataset.contentSystem;
      if (contentAttribut.includes(buttonAttribut) || !buttonAttribut) {
        if (!content.classList.contains(this.activeSelector)) { content.classList.add(this.activeSelector) }
      } else {
        content.classList.remove(this.activeSelector);
      }
    });
  };

  // Очистка активных классов
  removeActiveClasses() {
    this.toggles.forEach(button => button.classList.remove(this.activeSelector));
    this.contents.forEach(content => content.classList.remove(this.activeSelector));
  }
  // -----------------------Оптимизация
}

/*
# ИСПОЛЬЗОВАНИЕ: 
-------------------------------------------------------------------------
  const tabbedSystem = new modules.TabbedSystem('#tabs-container', {
    toggleSelector: '.tab-button',
    contentSelector: '.tab-content',
    activeSelector: '_active'
  })
  tabbedSystem.init();
--------------------------------------------------------------------------
  const tabDefault = new modules.TabbedSystem('#tabs-default', {
    toggleSelector: '.tab-button',
    contentSelector: '.tab-content',
    activeSelector: '_active'
  })
  tabDefault.init();
-------------------------------------------------------------------------
*/



