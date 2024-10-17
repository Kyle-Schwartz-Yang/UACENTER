
import { isMobile } from "./helpers/_isMobile";


export const connectDropdownMenu = () => {


  // ---------------------------------------------------
  //+ 1. Step One:  Возьмем дом-элемент "body" 
  let body = document.querySelector('body');
  // ---------------------------------------------------

  if (isMobile.any()) {
    //+ 2. Stem Two: Если это сенсорное устройство, Добавить класс(touch) 
    body.classList.add('touch');


    //$ 3. STEP Three: Получить все li.dropdown__item которые будут открывать выподающие меню 
    const dropdownItems = document.querySelectorAll('.dropdown__item');

    //* 4 STEP : Перебор всех li.dropdown__item
    dropdownItems.forEach(item => {
      //* 4.1 STEP : Получить arrow и меню
      const arrow = item.querySelector('.dropdown__arrow');
      const menu = item.querySelector('.dropdown__menu');

      item.addEventListener('click', (e) => {
        //* 4.2:  Остановить всплытие и поведение по умолчанию (на случай если это ссылки)
        e.preventDefault();
        e.stopPropagation();

        // Проверяем, является ли текущий элемент подменю
        // const isSubmenu = item.classList.contains('dropdown__sub-item');

        // Функция для закрытия всех родительских меню
        const closeParentMenus = (element) => {
          const parent = element.closest('.dropdown__item');
          if (parent) {
            parent.querySelector('.dropdown__arrow')?.classList.remove('_active');
            parent.querySelector('.dropdown__menu')?.classList.remove('_active');
            closeParentMenus(parent.parentElement);
          }
        };

        // Если клик был на ссылке внутри подменю, закрываем все родительские меню
        if (e.target.closest('a') && !e.target.nextElementSibling) {
          closeParentMenus(item);
          return;
        }


        // Закрываем все открытые меню на том же уровне, кроме текущего
        const siblings = Array.from(item.parentNode.children);
        console.log(siblings)
        siblings.forEach(sibling => {
          if (sibling !== item) {
            sibling.querySelector('.dropdown__arrow')?.classList.remove('_active');
            sibling.querySelector('.dropdown__menu')?.classList.remove('_active');
          }
        });


        // Если это не подменю, закрываем все открытые подменю
        // if (!isSubmenu) {
        //   const openSubmenus = item.querySelectorAll('.dropdown__sub-item ._active');
        //   openSubmenus.forEach(submenu => {
        //     submenu.classList.remove('_active');
        //   });
        // }

        // Закрываем все вложенные меню в текущем элементе (при открытие нового подменю)
        const nestedMenus = item.querySelectorAll('.dropdown__menu');
        console.log(nestedMenus);
        nestedMenus.forEach(nestedMenu => {

          if (nestedMenu !== menu) {
            nestedMenu.classList.remove('_active');
            nestedMenu.parentNode.querySelector('.dropdown__arrow')?.classList.remove('_active');
          }
        });

        arrow?.classList.toggle('_active');
        menu?.classList.toggle('_active');
      });
    });


    //#-------------------  Дополнительно: 
    // Закрытие меню при клике вне его
    document.addEventListener('click', () => {
      dropdownItems.forEach(item => {
        item.querySelector('.dropdown__arrow')?.classList.remove('_active');
        item.querySelector('.dropdown__menu')?.classList.remove('_active');
      });
    });
    //#-------------------  Дополнительно: 

  } else {
    //+ 2.1. Stem Two: Если это сенсорное устройство, Добавить класс(mouse) 
    body.classList.add('mouse');
  }

}








