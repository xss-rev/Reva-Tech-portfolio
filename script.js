// REVA TECH portfolio interactions
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

// Reveal content as it enters the viewport. Falls back to visible content if unsupported.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Keep the footer year current.
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// This form prepares an email in the visitor's default email application.
// It does not send messages or store form submissions on a server.
const contactForm = document.querySelector('#contact-form');
const formFeedback = document.querySelector('#form-feedback');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name')).trim();
    const email = String(formData.get('email')).trim();
    const subject = String(formData.get('subject')).trim();
    const message = String(formData.get('message')).trim();

    const mailSubject = encodeURIComponent(`${subject} — message from ${name}`);
    const mailBody = encodeURIComponent(`Hello Abduwahab,\n\n${message}\n\nRegards,\n${name}\n${email}`);
    if (formFeedback) formFeedback.textContent = 'Opening your email application…';
    window.location.href = `mailto:meed4269@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  });
}
