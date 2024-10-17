



// -------------------------------------------------------------------------------------------------
import Swiper from 'swiper';
// import 'swiper/css'; //base
import 'swiper/css/bundle';

// import { Pagination, Keyboard, EffectCards, Autoplay, Navigation, Thumbs } from 'swiper/modules';
// -------------------------------------------------------------------------------------------------

export function initialSwiper(selector, config = {}) {

  // ! Адаптивность : 
  const brakpoints = {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 1,
      spaceBetween: 40
    }
  }

  const events = {
    init: function () {
      console.log('Swiper initialized');
    },
    slideChange: function () {
      console.log('Slide changed to: ', this.activeIndex);
    },
  }

  const defaultConfig = {
    // modules: [Navigation, Keyboard, Pagination, EffectCards, Autoplay, Thumbs],
    modules: [],
    direction: 'horizontal',
    loop: true,
    autoHeight: false,
    grabCursor: true,
    slidesPerView: 1,
    // spaceBetween: 24,
    speed: 700,
    keyboard: { enabled: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },




    // ---------------------------------------------------------------
    // ! Ситуативные настройки
    // breakpoints: brakpoints,
    // on: events,
    // ---------------------------------------------------------------
  };

  const swiperConfig = { ...defaultConfig, ...config };




  return new Swiper(selector, swiperConfig);

}




// ------------------------------------------------------------

// Initialize pagination



/*
--------------------------------------------
  - Переписывай config под свои потребности
  - Создавай множество swiper-ов.
--------------------------------------------


library.initialSwiper('.swiper-dog', { autoplay: { delay: 3000 } });
library.initialSwiper('.swiper-cat', { autoplay: { delay: 100 },  direction: 'horizontal' });

*/