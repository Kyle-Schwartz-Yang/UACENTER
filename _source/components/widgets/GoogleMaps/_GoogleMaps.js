// // -------------------------------MAPS Preloader


// -------------------------------MAPS Preloader

const DISPLAY_NONE = 'none';
const LOAD_EVENT = 'load';
const ERROR_EVENT = 'error';

export const initGoogleMaps = () => {
  const mapFrame = document.getElementById('map-frame');
  const mapLoader = document.getElementById('map-spiner');

  if (!mapFrame || !mapLoader) {
    console.warn('Map frame or loader element not found');
    return;
  };

  const hideLoader = () => {
    mapLoader.style.display = DISPLAY_NONE;
  };

  //Карта загрузилась, убрать спинер
  mapFrame.addEventListener(LOAD_EVENT, hideLoader);
  // Произошла ошибка 
  mapFrame.addEventListener(ERROR_EVENT, hideLoader);


  // Проверка на случай, если карта загрузилась слишком быстро
  if (mapFrame.complete) {
    hideLoader();
  }

  // Возвращаем функцию для удаления обработчиков событий, что полезно для очистки при необходимости.
  // Такой подходы обычно используется в Библиотеках (монтирование и размонтирование)
  return () => {
    mapFrame.removeEventListener(LOAD_EVENT, hideLoader);
    mapFrame.removeEventListener(ERROR_EVENT, hideLoader);
  };
}