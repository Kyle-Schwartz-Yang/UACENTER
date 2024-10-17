
/*
let isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
*/


export let isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); },
  screenSize: function () { return window.innerWidth <= 768; },
  touchDevice: function () { return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0; },
  tablet: function () { return navigator.userAgent.match(/Tablet|iPad/i) || (isMobile.any() && window.innerWidth > 768); },
  modern: function () { return 'mediaDevices' in navigator; },
  isTrue: function () { return isMobile.any() || isMobile.screenSize() || isMobile.touchDevice(); },

  // Добавленные проверки для отдельных браузеров
  Chrome: function () { return navigator.userAgent.match(/Chrome/i); },
  Safari: function () { return navigator.userAgent.match(/Safari/i) && !this.Chrome(); },
  Firefox: function () { return navigator.userAgent.match(/Firefox/i); },
  Edge: function () { return navigator.userAgent.match(/Edge/i); },
  IE: function () { return navigator.userAgent.match(/MSIE|Trident/i); }
};