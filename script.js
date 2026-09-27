const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

// CONTACT FORM: submit directly through Formspree
const leadForm = document.getElementById('leadForm');
const formStatus = document.getElementById('formStatus');

leadForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const button = form.querySelector('button[type="submit"]');

  button.disabled = true;
  button.textContent = 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      formStatus.textContent = "Thank you. We’ll typically contact you within one business day.";
      button.textContent = 'Request Sent';
    } else {
      formStatus.textContent = 'Something went wrong. Please try again.';
      button.disabled = false;
      button.textContent = 'Request My Free Evaluation';
    }
  } catch (error) {
    formStatus.textContent = 'Something went wrong. Please try again.';
    button.disabled = false;
    button.textContent = 'Request My Free Evaluation';
  }
});


document.querySelectorAll('[data-contact]').forEach((el) => {
  el.addEventListener('click', () => { window.location.href = el.dataset.contact; });
});
