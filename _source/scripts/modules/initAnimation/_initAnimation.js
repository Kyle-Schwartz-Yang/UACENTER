
/*
Список библиотек:
  - ScrollReveal.js
  - Animate On Scroll (AOS)
  - Wow.js
  - GSAP
*/

export const initAnimation = (options = {}) => {
  const defaultOptions = {
    animationClass: '.on-animated',
    visibilityClass: '._animation',
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
    delay: 200, // Задержка в миллисекундах
    disableClass: 'off-repeat-animation' // Класс для отключения анимации
  };

  const mergedOptions = { ...defaultOptions, ...options };
  const { animationClass, visibilityClass, threshold, rootMargin, delay, disableClass } = mergedOptions;

  const animElements = document.querySelectorAll(animationClass);

  if (animElements.length === 0) {
    console.warn('Warning: Animation not found on page !');
    return;
  }
  // ------------------------------------------------------------
  // Функция для добавления анимационного класса
  const addAnimationClass = (element) => {
    element.classList.add(visibilityClass.replace('.', ''));
  };

  // Функция для удаления анимационного класса
  const removeAnimationClass = (element) => {
    element.classList.remove(visibilityClass.replace('.', ''));
  };

  // Ограничивает частоту вызовов функции в зависимости от заданного лимита времени (limit)
  const throttle = (func, limit) => {
    let lastFunc, lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  }


  // Функция для обработки каждого entry
  const handleEntry = (entry) => {
    if (entry.isIntersecting) {
      addAnimationClass(entry.target);
    } else {
      if (!entry.target.classList.contains(disableClass)) {
        clearTimeout(entry.target.animationTimeout);
        removeAnimationClass(entry.target);
      }
    }
  };


  // Представляет собой оптимизированную версию handleEntry с использованием throttle.
  const throttledHandleEntry = throttle(handleEntry, delay);


  // --------------------------------------------------------
  // Создание нового IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(throttledHandleEntry);
  }, { threshold, rootMargin });


  // Наблюдение за каждым элементом
  animElements.forEach((elem) => observer.observe(elem));
};


/*
# ИСПОЛЬЗОВАНИЕ: 
-----------------------------------------------------------------------
.on-animated {opacity: 0}
.on-animated._animation {opacity: 1}
-----------------------------------------------------------------------
.&__list.on-animated {
  > :nth-of-type(1) {opacity: 0}
  > :nth-of-type(2) {opacity: 0}
  > :nth-of-type(3) {opacity: 0}
}
.&__list.on-animated._animation {
  >*{ transtition: 1s }
  > :nth-of-type(1) {opacity: 1; transition-delay: .33s}
  > :nth-of-type(2) {opacity: 1; transition-delay: .66s}
  > :nth-of-type(3) {opacity: 1; transition-delay: .99s}
}
-----------------------------------------------------------------------

*/
