const command = 'copilot --mode build --focus momentum';
const typedText = document.querySelector('#typedText');
const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeCommand() {
  if (!typedText) return;
  if (reduceMotion) {
    typedText.textContent = command;
    return;
  }

  let index = 0;
  const typeNext = () => {
    typedText.textContent = command.slice(0, index++);
    if (index <= command.length) window.setTimeout(typeNext, 48);
  };
  typeNext();
}

typeCommand();

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const originalText = button.textContent;
    button.textContent = originalText === 'View workflow' ? 'Workflow ready ✓' : 'Mission started ✓';
    button.setAttribute('aria-live', 'polite');
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  });
});

// Keep the decorative momentum chart from animating every time it enters view.
const chart = document.querySelector('.chart-card');
if (chart && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      chart.classList.add('is-visible');
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(chart);
}
