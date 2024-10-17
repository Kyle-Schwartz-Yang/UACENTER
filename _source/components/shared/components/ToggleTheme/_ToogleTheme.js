
export const initToogleThemeDark = () => {



  const switchElement = document.querySelector('.toggletheme');
  if (!switchElement) return; // Проверка на существование элемента

  const htmlElement = document.documentElement;
  const DARK_THEME = 'dark';
  const ACTIVE_CLASS = '_active';

  const setTheme = (isDark) => {
    htmlElement.classList.toggle(DARK_THEME, isDark);
    switchElement.classList.toggle(ACTIVE_CLASS, isDark);
    localStorage.setItem('user-theme', isDark ? DARK_THEME : '');
  };

  // Инициализация (сохранить выбор)
  const savedTheme = localStorage.getItem('user-theme');
  setTheme(savedTheme === DARK_THEME);


  // Действия по нажатию 
  switchElement.addEventListener('click', (e) => {
    e.preventDefault();
    const isDark = !htmlElement.classList.contains(DARK_THEME);
    setTheme(isDark);
  });
};
