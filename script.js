const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

const heroMedia = document.querySelector('.hero-media');
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroMedia && motionOK && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 1.2;
    const y = (event.clientY / window.innerHeight - 0.5) * 1.2;
    heroMedia.style.transform = `translate(${x}%, ${y}%)`;
  }, { passive: true });
}
