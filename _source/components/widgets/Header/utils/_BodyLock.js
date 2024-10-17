


// Собрать все фиксированные элементы 
const fixedElement = document.querySelectorAll('.fixed-element');


//$ - Lock scrollbar
export function bodyLock() {

  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth + 'px';

  // ---------------------------------------------
  if (fixedElement.length > 0) {
    // Все fixedElement получает paddingRight: 
    for (let index = 0; index < fixedElement.length; index++) {
      const el = fixedElement[index];
      el.style.paddingRight = scrollBarWidth;
    }
  }
  // ---------------------------------------------
  document.body.style.paddingRight = scrollBarWidth;
  document.body.classList.add('_lock-body-hidden');
}

//$ - UnLock scrollbar
export function bodyUnLock() {

  setTimeout(() => {
    if (fixedElement.length > 0) {
      // Все fixedElement очистят paddingRight: 
      for (let index = 0; index < fixedElement.length; index++) {
        const el = fixedElement[index];
        el.style.paddingRight = '0px';
      }
    }

    // ------------------------------
    document.body.style.paddingRight = '0px';
    document.body.classList.remove('_lock-body-hidden');
    // ------------------------------

    // Уменьшее задержи для более быстрого появление scrollbar
  }, 300);

}



