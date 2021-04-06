const SITE = document.querySelector('.site');
const TRIGGER = document.querySelector('.trigger');
const REVEAL = document.querySelector('.main-nav');

// Toggle reveal class on body element, set aria-expanded and screen reader text on TRIGGER:
function revealMenu() {
  SITE.classList.toggle('reveal');
  REVEAL.classList.add('open');
  TRIGGER.getAttribute('aria-expanded') == 'false'
    ? TRIGGER.setAttribute('aria-expanded', true)
    : TRIGGER.setAttribute('aria-expanded', false);
}

function removeMenu() {
  if (TRIGGER.getAttribute('aria-expanded') == 'false') {
    REVEAL.classList.remove('open');
  }
}

// Listen for clicks on TRIGGER button:
TRIGGER.addEventListener('click', revealMenu, false);

SITE.addEventListener('transitionend', removeMenu, false);
