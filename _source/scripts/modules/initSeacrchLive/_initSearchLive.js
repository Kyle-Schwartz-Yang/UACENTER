export const initSearchLive = (options = {}) => {


  // -------------------------------------------------------------------------------
  const defaults = {


    searchInputSelector: '[data-search]',
    searchElementSelector: '.xgallery__item',
    elementTittle: '.xgallery__title',
    elemHiddenFlag: 'hidden', // visible-hidden
    searchMode: true,// Режим поиска по умолчанию
  };

  const settings = { ...defaults, ...options };

  // -------------------------------------------------------------------------------

  // Получение элементов поиска и карт
  const searchInput = document.querySelector(settings.searchInputSelector);
  console.log(searchInput);
  const cards = Array.from(document.querySelectorAll(settings.searchElementSelector));

  if (!searchInput || cards.length === 0) {
    return;
  }

  // Добавить класс родителю когда input:focus (если этот родитель .search-container)

  // ------------------------------------------------------------------
  // searchInput.addEventListener('focus', function () {
  //   this.closest('.search-container').classList.add('input-focused');
  // });

  // searchInput.addEventListener('blur', function () {
  //   setTimeout(() => {
  //     this.closest('.search-container').classList.remove('input-focused');
  //   }, 10000)
  // });

  // -------------------------------------------------------------

  let hasShownAlert = false; // Флаг для отслеживания показанного предупреждения

  // Функция для обработки поиска
  const handleSearch = (event) => {
    const lowerCaseValue = event.target.value.toLowerCase();
    let hasVisibleCards = false;



    // if(searchInput)
    //   searchInput.parentElement.classList.add('_active');

    cards.forEach((card) => {

      const cardTitle = card.querySelector(settings.elementTittle);
      console.log(cardTitle)
      /*
      const keywords = card.getAttribute('data-keywords').toLowerCase();
      keywords позволил бы избавиться от cardTitleSelector
      */

      if (!cardTitle) {
        return;
      }

      const cardHeaderText = cardTitle.textContent.toLowerCase();
      // console.log(cardHeaderText)
      let isVisible;

      // Выбор режима поиска
      if (settings.searchMode) {
        isVisible = cardHeaderText.startsWith(lowerCaseValue);
      } else {
        isVisible = cardHeaderText.includes(lowerCaseValue);
      }

      // Переключение класса видимости
      card.classList.toggle(settings.elemHiddenFlag, !isVisible);

      // Добавлять класс к введенному элементу, и убирать его если lowerCaseValue = '' или isVisible === true
      if (lowerCaseValue && isVisible) {
        card.classList.add('_search-active');
        hasVisibleCards = true;
      } else {
        card.classList.remove('_search-active');
      }


      /*
      - Проверка наличия видимых карточек и показ предупреждения при их отсутствии
      ------------------------------------------------
          if (!hasVisibleCards && lowerCaseValue) {
              // Перенаправление на другую страницу
              window.location.href = 'about.html'; // замените на нужный URL
            }
      ------------------------------------------------
      */

      if (!hasVisibleCards && lowerCaseValue && !hasShownAlert) {
        // Показать предупреждение
        console.log('Привет');
        hasShownAlert = true; // Установить флаг, чтобы не показывать предупреждение повторно
      } else if (hasVisibleCards) {
        hasShownAlert = false; // Сбросить флаг, если есть видимые карточки
      }
    });
  };

  // Функция debounce для уменьшения частоты вызовов handleSearch
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Добавление обработчика события ввода
  searchInput.addEventListener('input', debounce(handleSearch, 300));
};



