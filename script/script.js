// Invert scroll direction
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  window.scrollBy(0, -e.deltaY);
}, { passive: false });

// Handle button cloning
const container = document.querySelector('.button-container');
const originalBtn = document.querySelector('.clone-btn');

originalBtn.addEventListener('click', () => {
  const newBtn = originalBtn.cloneNode(true);
  newBtn.addEventListener('click', cloneHandler);
  container.appendChild(newBtn);
});

function cloneHandler(e) {
  const clone = e.target.cloneNode(true);
  clone.addEventListener('click', cloneHandler);
  container.appendChild(clone);
}

// Confetti trigger
function triggerConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
}

// Trigger confetti when user scrolls to final message
const finalMsg = document.querySelector('.final-message');
let confettiFired = false;

window.addEventListener('scroll', () => {
  const rect = finalMsg.getBoundingClientRect();
  if (rect.top < window.innerHeight && !confettiFired) {
    confettiFired = true;
    triggerConfetti();
  }
});

// Reset functionality
document.getElementById('reset-btn').addEventListener('click', () => {
  const container = document.querySelector('.button-container');
  const allButtons = container.querySelectorAll('.clone-btn');

  allButtons.forEach(btn => btn.remove());
   let previousState = confettiFired;
  confettiFired = true;

  window.scrollTo({ top: 0, behavior: 'smooth' });
   setTimeout(() => {
    confettiFired = false;
  }, 1000);
});
