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

const header = document.querySelector('.site-header');
const mobileProject = document.querySelector('.mobile-project');
const contact = document.querySelector('#contact');
let contactVisible = false;
const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 44);
  if (mobileProject) mobileProject.classList.toggle('is-visible', !contactVisible && window.scrollY > 260);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('.hover-video').forEach((video) => {
  video.addEventListener('loadedmetadata', () => { video.currentTime = 0.01; }, { once: true });
  video.closest('.service-card').addEventListener('pointerenter', () => {
    if (window.matchMedia('(pointer: fine)').matches) video.play().catch(() => {});
  });
  video.closest('.service-card').addEventListener('pointerleave', () => {
    video.pause();
    video.currentTime = 0.01;
  });
});

if (mobileProject && contact && 'IntersectionObserver' in window) {
  const contactObserver = new IntersectionObserver(([entry]) => {
    contactVisible = entry.isIntersecting;
    updateHeader();
  }, { threshold: 0.12 });
  contactObserver.observe(contact);
}

const heroMedia = document.querySelector('.hero-media');
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroMedia && motionOK && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 1.2;
    const y = (event.clientY / window.innerHeight - 0.5) * 1.2;
    heroMedia.style.transform = `translate(${x}%, ${y}%)`;
  }, { passive: true });
}
