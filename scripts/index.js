import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

// SimpleBar

new SimpleBar(document.querySelector('.country__list'), {
  classNames: {
    scrollbar: 'country__scrollbar',
    track: 'country__track'
  }
});

// Slider

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
  },
  preventClicks: true,
  a11y: false,
});

// Modal

const productMore = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');
const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

productMore.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('modal--open');
  })
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('modal--open');
  }
});

formInput.forEach((input, i) => {
  input.addEventListener('focus', () => {
    formPlaceholder[i].classList.add('form__placeholder--active')
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      formPlaceholder[i].classList.remove('form__placeholder--active')
    }
  });
});

// Currency

const dataCurrency = {};

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat('EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const showPrice = (currency = 'USD') => {
  const priceElems = document.querySelectorAll('[data-price]');

  priceElems.forEach(elem => {
    elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
  });
};

const myHeaders = new Headers();
myHeaders.append("apikey", "zZu3nnzCgY2YaPiMeYPZDIw5sUI6n3g9");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?&base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates)
    showPrice();
  })
  .catch(error => console.log('error', error));


// Choices

const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
  countryWrapper.classList.toggle('country__wrapper--open');
});

countryWrapper.addEventListener('click', ({target}) => {
  if (target.classList.contains('country__choise')) {
    countryWrapper.classList.remove('country__wrapper--open');
    showPrice(target.dataset.currency);
  }
});

// Smoth scroll

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
