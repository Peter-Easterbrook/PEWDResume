const doItNow = (evt, hard) => {
  const direction = Math.sign(lastX - evt.clientX);
  lastX = evt.clientX;
  const particleCount = hard ? r(200, 300) : r(100, 150);
  confetti({
    colors: ['#235ac2', '#5384e0', '#95b4ec'],
    particleCount,
    angle: r(0, 0 + direction * 30),
    spread: r(45, 80),
    origin: {
      x: evt.clientX / window.innerWidth,
      y: evt.clientY / window.innerHeight,
    },
  });
};
const doIt = (evt, hard) => {
  doItNow(evt, false);
};

const doItHard = (evt) => {
  doItNow(evt, true);
};

let lastX = 0;
// const navConfetti = document.querySelector('.main-nav');
// navConfetti.addEventListener('mousemove', doIt);
const pointingHand = document.querySelector('.pointingHand');
pointingHand.addEventListener('mousedown', doItHard);

function r(mi, ma) {
  return parseInt(Math.random() * (ma - mi) + mi);
}
