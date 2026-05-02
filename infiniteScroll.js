const REDUCED_MOTION_MEDIA = '(prefers-reduced-motion: reduce)';
const DUPLICATE_ATTR = 'data-duplicate';

const getScrollers = () => document.querySelectorAll('.scroller');

function addAnimation(scroller) {
  if (scroller.getAttribute('data-animated') === 'true') {
    return;
  }

  const scrollerInner = scroller.querySelector('.scroller__inner');
  if (!scrollerInner) {
    return;
  }

  scroller.setAttribute('data-animated', 'true');

  const scrollerContent = Array.from(scrollerInner.children).filter(
    (item) => !item.hasAttribute(DUPLICATE_ATTR),
  );

  const fragment = document.createDocumentFragment();

  scrollerContent.forEach((item) => {
    const duplicatedItem = item.cloneNode(true);
    duplicatedItem.setAttribute('aria-hidden', 'true');
    duplicatedItem.setAttribute(DUPLICATE_ATTR, 'true');
    fragment.appendChild(duplicatedItem);
  });

  scrollerInner.appendChild(fragment);
}

function removeAnimation(scroller) {
  const scrollerInner = scroller.querySelector('.scroller__inner');
  if (!scrollerInner) {
    return;
  }

  scrollerInner
    .querySelectorAll(`[${DUPLICATE_ATTR}="true"]`)
    .forEach((item) => item.remove());
  scroller.removeAttribute('data-animated');
}

function initInfiniteScroll() {
  const scrollers = getScrollers();
  if (!scrollers.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_MEDIA).matches;

  scrollers.forEach((scroller) => {
    if (prefersReducedMotion) {
      removeAnimation(scroller);
      return;
    }

    addAnimation(scroller);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInfiniteScroll, {
    once: true,
  });
} else {
  initInfiniteScroll();
}

const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_MEDIA);

if (typeof reducedMotionQuery.addEventListener === 'function') {
  reducedMotionQuery.addEventListener('change', initInfiniteScroll);
} else if (typeof reducedMotionQuery.addListener === 'function') {
  reducedMotionQuery.addListener(initInfiniteScroll);
}

window.addEventListener('pageshow', initInfiniteScroll);
