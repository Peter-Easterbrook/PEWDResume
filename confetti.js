// Stars
// var count = 200;
// var defaults = {
//   spread: 30,
//   ticks: 50,
//   gravity: 0,
//   decay: 0.97,
//   angle: -15,
//   drift: 1,
//   startVelocity: 30,
//   shapes: ['star'],
//   colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
//   origin: { x: 0.05, y: 0.05 },
// };

// function shoot() {
//   document.getElementById('pointingHand').addEventListener('mousedown', () => {
//     confetti({
//       ...defaults,
//       particleCount: 50,
//       scalar: 1.2,
//       // shapes: ['star'],
//     });

//     confetti({
//       ...defaults,
//       particleCount: 30,
//       scalar: 0.75,
//       // shapes: ['circle'],
//     });
//   });
// }

// setTimeout(shoot, 100);
// setTimeout(shoot, 200);
// setTimeout(shoot, 400);
var count = 200;
var defaults = {
  origin: { x: 0.06, y: 0.05 },
  angle: -15,
  drift: 1,
  colors: ['#235ac2', '#5384e0', '#95b4ec'],
};

function fire(particleRatio, opts) {
  document.getElementById('pointingHand').addEventListener('mousedown', () => {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
