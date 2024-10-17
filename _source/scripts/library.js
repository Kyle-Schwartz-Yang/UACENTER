// ----------------------------------------------------------
import { initialSwiper } from "./library/_Swiper.js";
import { initSwiperThumbs } from "./library/_Swiper-thumbs.js";
// ----------------------------------------------------------


export const library = {
  init: function () {
    console.log('Library initialized');
  },

  initialSwiper: initialSwiper,
  initSwiperThumbs: initSwiperThumbs,

};

