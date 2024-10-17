
/* HTML
-----------------------------------------------------------------------------
  button.modal-open(type='button', data-modal-target='modal-id1', aria-label='Open modal') Модальное окно
  button.modal-open(type='button', data-modal-target='modal-id2', aria-label='Open modal') Модальное окно
------------------------------------------------------------------------------
.modals-group.hidden
  .modal#modal-id1 
    .modal__wrapper
      .modal__body > (содержимое любое)
  .modal#modal-id2
    .modal__wrapper
      .modal__body > (содержимое любое)
------------------------------------------------------------------------------
*/


export const initModals = () => {
  // ------------------------------------------------------
  const options = {
    modalsGroupSelector: '.modals-group',
    buttonsSelector: '.modals-buttons-group',
    closingButtonsSelector: '.modal__cross',
    thisModal: '.modal',
    fixedElement: '.lock-padding',
  };
  // ------------------------------------------------------

  function bindModal(options) {
    // ----------------------------------------------------------------------------------
    const { modalsGroupSelector, buttonsSelector, closingButtonsSelector, thisModal, fixedElement } = options;

    const modalsGroup = document.querySelector(modalsGroupSelector);
    const buttons = document.querySelectorAll(buttonsSelector);
    const closingButtons = document.querySelectorAll(closingButtonsSelector);
    // -----------------paddingXscroll починить 
    const lockPadding = document.querySelectorAll(fixedElement); //Чинить фиксированные элементы
    console.log(lockPadding);
    const bodyLock = document.body; // Lock (блокировать прокрутку)

    // -----------------paddingXscroll починить

    // ----------------------------------------------------------------------------------
    // : --------------------------------------Оптимизация :
    // -----------Заблокировать scrool body
    function bodyBlocking() {
      /*
      #Два способа получить scrollbar ширину:
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth + 'px';
      */
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth + 'px';



      // ---------------------------------------------
      if (lockPadding.length > 0) {
        // Все fixedElement получает paddingRight: 
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = scrollBarWidth;

        }
      }
      // ---------------------------------------------
      bodyLock.style.paddingRight = scrollBarWidth;
      bodyLock.classList.add('_lock-body-hidden');
    }

    // ------ Разблокировать scroll body
    function bodyUnLock() {

      setTimeout(() => {

        if (lockPadding.length > 0) {
          // Все fixedElement очистят paddingRight: 
          for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
          }
        }

        // ----------fire scroll
        bodyLock.style.paddingRight = '0px';
        bodyLock.classList.remove('_lock-body-hidden');
        // ----------fire scroll

        // Уменьшее задержи для более быстрого появление scrollbar
      }, 100);

    }

    // -------Показать модальное окно
    const showModal = (contentUnique) => {

      modalsGroup.classList.remove('hidden');
      contentUnique.classList.add('active');

      // ------------Lock scroll
      bodyBlocking()
      // ------------Lock scroll
    };
    // ---------Закрыть модальное окно
    const closeModal = (contentUnique) => {

      contentUnique.classList.remove('active');
      // ----------------------------------------------
      setTimeout(() => {
        modalsGroup.classList.add('hidden');
        bodyUnLock(); // Unlock scroll
      }, 300);
    };
    // : --------------------------------------Оптимизация :
    // ----------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------
    if (buttons.length > 0 && modalsGroup) {
      buttons.forEach(button => button.addEventListener('click', event => {

        event.preventDefault(); // Отменить перезагрузку страницы ( <a href='#'>Если кнопка ссылка</a> )
        const getDataAttribut = event.currentTarget.dataset.modalTarget;
        const contentUnique = document.getElementById(getDataAttribut);

        // ------------------------------
        console.log('Click buttons: ', button.dataset.modalTarget)
        console.log('Open modal: ', getDataAttribut);

        // --------------------------
        //---При нажатие на кнопку у которой есть атрибут data-close-menu
        //---Будет удялен класс _active что приведет к закрытию .menu__overlay 
        if (button.hasAttribute('data-close-menu')) {
          const menu = document.querySelector('.menu__overlay')
          const body = document.body;

          const burger = document.querySelector('.menu__burger');

          body.classList.remove('_lock-body-fixed');
          menu.classList.remove('_active');
          burger.classList.remove('_open');
        }

        // --------------------------
        if (button && contentUnique && modalsGroup) {
          showModal(contentUnique);

          // --------------------------
          closingButtons.forEach(close => {
            close.addEventListener('click', () => { closeModal(contentUnique) })
          })
          // --------------------------

          // Если клик был на contentUnique, то закрываем модальное окно
          contentUnique.addEventListener('click', function (event) {
            if (event.target === contentUnique) {
              closeModal(contentUnique);
            }

            if (event.target.hasAttribute('data-close-modal')) {
              closeModal(contentUnique);
            }
          });


          // --------------------------
          document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
              closeModal(contentUnique);
            }
          });

        }

      }))
    }


  }

  bindModal(options);
}


/*
-------------------------
- Достаночно вызвать данную функцию, остальное это правильно созданное html + scss
-------------------------
  modules.initModals();
*/


