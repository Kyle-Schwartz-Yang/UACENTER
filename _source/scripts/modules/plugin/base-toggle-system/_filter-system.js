import { BaseToggleSystem } from './_base-toggle-system.js';

/*
- PUG
$-  #tabs-default(class='tabs-default')
$-    .tabs-default__buttons > .tabs-default__button(data-button-system='unique')
$-   .tabs-default__contents > .tabs-default__content(data-content-system='unique')
*/


// -------------------------------------------
export class FilterSystem extends BaseToggleSystem {


  // ---------------------------- Если необхоидо показать ALL
  /*
    constructor(selectorParent, config) {
    super(selectorParent, config);
    this.setActiveALL(); // Показываем все элементы при инициализации
  }
  */

  // ---------------------------- Если необхоидо показать ALL

  //+-----------------------------------------------------Not necessary
  init() {
    super.init();
    // Устанавливаем активный фильтр (по умолчанию)
    if (this.toggles.length > 0) {
      this.handleToggle(this.toggles[0]);
    }
  }
  //+-----------------------------------------------------Not necessary

  handleToggle(button) {
    const buttonAttribut = button.getAttribute('data-button-system');

    //------------------------------------
    this.toggles.forEach(b => b.classList.remove(this.activeSelector));
    this.contents.forEach(c => c.classList.remove(this.activeSelector));
    button.classList.add(this.activeSelector);
    //------------------------------------

    (buttonAttribut === 'all') ? this.setActiveALL() : this.setActiveContent(buttonAttribut)
  }

  setActiveALL() {
    this.contents.forEach(content => {
      content.classList.add(this.activeSelector);
    });
  }

  setActiveContent(buttonAttribut) {
    this.contents.forEach(content => {
      if (content.getAttribute('data-content-system') === buttonAttribut) {
        content.classList.add(this.activeSelector);
      } else {
        content.classList.remove(this.activeSelector);
      }
    });
  }

}

/*
  const filterSystem = new modules.FilterSystem('#tab', {
    toggleSelector: '.tab-button',
    contentSelector: '.tab-content',
    activeSelector: '_active'
  })
  filterSystem.init();
*/



