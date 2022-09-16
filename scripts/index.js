import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

new Swiper('.goods__block', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    prevEl: '.goods__arrow--prev',
    nextEl: '.goods__arrow--next'
  }
});

// Плавный скролл

const smothScroll = (trigger) => {
  const SPEED = 0.3;
  const scrolled = e => {
    e.preventDefault();
    const target = e.target;

    if (target.matches('[href^="#"]')) {
      let start = 0;
      const pageY = window.pageYOffset;
      const hash = target.getAttribute('href');

      if (hash === '#') return;

      const elem = document.querySelector(hash);
      const coordinateElem = elem.getBoundingClientRect().top;
      const allDistance = pageY + coordinateElem;
      const scroll = time => {
        if (!start) start = time;
        const progress = time - start;
        const r = (coordinateElem < 0 ?
          Math.max(pageY - progress / SPEED, allDistance) :
          Math.min(pageY + progress / SPEED, allDistance));

        window.scrollTo(0, r);

        const scrolling = coordinateElem < 0 ?
          r > allDistance :
          r < allDistance;
        if (scrolling) requestAnimationFrame(scroll);
      }
      requestAnimationFrame(scroll)
    }
  }
  trigger.addEventListener('click', scrolled);
}
smothScroll(document.querySelector('.header__navigation'))
smothScroll(document.querySelector('.footer__navigation'))
