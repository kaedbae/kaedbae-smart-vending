document.getElementById('year').textContent = new Date().getFullYear();

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

document.getElementById('leadForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const subject = encodeURIComponent('KayBeeVending Free Site Evaluation');
  const body = encodeURIComponent(
`Name: ${f.get('name')}
Business / Property: ${f.get('business')}
Email: ${f.get('email')}
Phone: ${f.get('phone') || 'Not provided'}
Michigan city: ${f.get('city')}
Approx. daily traffic: ${f.get('traffic')}

Notes:
${f.get('message') || 'None'}`);
  window.location.href = `mailto:admin@kaedbaellc.com?subject=${subject}&body=${body}`;
});
