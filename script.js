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


// Product gallery: show one photo at a time.
const galleryMain = document.getElementById('galleryMain');
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
galleryThumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    if (!galleryMain) return;
    galleryThumbs.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    galleryMain.src = thumb.dataset.image;
    galleryMain.alt = thumb.dataset.alt || 'KayBeeVending smart vending machine';
  });
});

// Move the zoom focus toward the pointer, similar to a product-image viewer.
const galleryStage = document.querySelector('.gallery-stage');
galleryStage?.addEventListener('mousemove', (event) => {
  if (!galleryMain) return;
  const rect = galleryStage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  galleryMain.style.transformOrigin = `${x}% ${y}%`;
});
galleryStage?.addEventListener('mouseleave', () => {
  if (galleryMain) galleryMain.style.transformOrigin = 'center center';
});

// V5 carousel controls: move through the gallery without stacking images vertically.
const galleryPrev = document.querySelector('.gallery-arrow.prev');
const galleryNext = document.querySelector('.gallery-arrow.next');
const galleryCount = document.querySelector('.gallery-count');
const galleryItems = Array.from(document.querySelectorAll('.gallery-thumb'));
let galleryIndex = Math.max(0, galleryItems.findIndex((item) => item.classList.contains('active')));

function showGalleryImage(index) {
  if (!galleryMain || !galleryItems.length) return;
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[galleryIndex];
  galleryItems.forEach((thumb) => thumb.classList.remove('active'));
  item.classList.add('active');
  galleryMain.src = item.dataset.image;
  galleryMain.alt = item.dataset.alt || 'KayBeeVending smart vending machine';
  galleryMain.style.transformOrigin = 'center center';
  if (galleryCount) galleryCount.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
  item.scrollIntoView({behavior:'smooth', block:'nearest', inline:'nearest'});
}

galleryItems.forEach((item, index) => item.addEventListener('click', () => {
  galleryIndex = index;
  if (galleryCount) galleryCount.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
}));
galleryPrev?.addEventListener('click', (event) => { event.stopPropagation(); showGalleryImage(galleryIndex - 1); });
galleryNext?.addEventListener('click', (event) => { event.stopPropagation(); showGalleryImage(galleryIndex + 1); });
document.addEventListener('keydown', (event) => {
  if (!galleryStage || !galleryStage.matches(':hover')) return;
  if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
  if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
});
