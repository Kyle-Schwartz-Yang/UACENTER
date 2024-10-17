
import { bodyLock, bodyUnLock } from "./utils/_BodyLock";




export const initHeaderMenu = () => {

  // ---------------------------------------------------------------
  const headerElement = {
    menu: document.querySelector('.menu'),
    openButton: document.querySelector('.menu__open'),
    closeButton: document.querySelector('.menu__close'),
  };

  const { menu, openButton, closeButton } = headerElement;
  // ---------------------------------------------------------------


  if (openButton) {
    // ---------------------------------------------------
    function toogleEvent(action) {
      menu.classList[action]('_active');
      openButton.classList[action]('_active')

      // Вариант toggle не расматривается.
      action === 'add' ? bodyLock() : bodyUnLock()
    }
    // ---------------------------------------------------

    openButton.addEventListener('click', (event) => {
      event.preventDefault();
      toogleEvent('add'); // Активировать

      // Удалить классы при нажатии на closeButton
      if (closeButton) {
        closeButton.addEventListener('click', (event) => {
          toogleEvent('remove');
        })
      }

      // Удаление классов при нажатие на 'Escape' и мимо Меню
      if (menu.classList.contains('_active')) {

        menu.addEventListener('click', (event) => {
          // Проверяем, что клик произошел на .menu__cover
          if (event.target === menu.querySelector('.menu__cover')) {
            toogleEvent('remove');
          }
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            toogleEvent('remove');
          }
        })
      }


    })

  }



}
