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
      formStatus.textContent = "Thank you. We’ll contact you within 24 hours.";
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


// Move the zoom focus toward the pointer.
const galleryStage = document.querySelector('.gallery-stage');

galleryStage?.addEventListener('mousemove', (event) => {
  if (!galleryMain) return;

  const rect = galleryStage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  galleryMain.style.transformOrigin = `${x}% ${y}%`;
});

galleryStage?.addEventListener('mouseleave', () => {
  if (galleryMain) {
    galleryMain.style.transformOrigin = 'center center';
  }
});


// Carousel controls
const galleryPrev = document.querySelector('.gallery-arrow.prev');
const galleryNext = document.querySelector('.gallery-arrow.next');
const galleryCount = document.querySelector('.gallery-count');
const galleryItems = Array.from(document.querySelectorAll('.gallery-thumb'));

let galleryIndex = Math.max(
  0,
  galleryItems.findIndex((item) => item.classList.contains('active'))
);

function showGalleryImage(index) {
  if (!galleryMain || !galleryItems.length) return;

  galleryIndex = (index + galleryItems.length) % galleryItems.length;

  const item = galleryItems[galleryIndex];

  galleryItems.forEach((thumb) => {
    thumb.classList.remove('active');
    thumb.setAttribute('aria-selected', 'false');
  });

  item.classList.add('active');
  item.setAttribute('aria-selected', 'true');

  galleryMain.src = item.dataset.image;
  galleryMain.alt =
    item.dataset.alt || 'KayBeeVending smart vending machine';

  galleryMain.style.transformOrigin = 'center center';

  if (galleryCount) {
    galleryCount.textContent =
      `${galleryIndex + 1} / ${galleryItems.length}`;
  }

  item.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest'
  });
}

galleryItems.forEach((item, index) =>
  item.addEventListener('click', () => {
    galleryIndex = index;

    if (galleryCount) {
      galleryCount.textContent =
        `${galleryIndex + 1} / ${galleryItems.length}`;
    }
  })
);

galleryPrev?.addEventListener('click', (event) => {
  event.stopPropagation();
  showGalleryImage(galleryIndex - 1);
});

galleryNext?.addEventListener('click', (event) => {
  event.stopPropagation();
  showGalleryImage(galleryIndex + 1);
});

// Touch gestures make the gallery feel natural on phones.
let galleryTouchStartX = 0;

galleryStage?.addEventListener('touchstart', (event) => {
  galleryTouchStartX = event.changedTouches[0]?.clientX || 0;
}, { passive: true });

galleryStage?.addEventListener('touchend', (event) => {
  const endX = event.changedTouches[0]?.clientX || 0;
  const distance = endX - galleryTouchStartX;

  if (Math.abs(distance) < 45) return;
  showGalleryImage(galleryIndex + (distance < 0 ? 1 : -1));
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (!galleryStage || !galleryStage.matches(':hover')) return;

  if (event.key === 'ArrowLeft') {
    showGalleryImage(galleryIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    showGalleryImage(galleryIndex + 1);
  }
});


document.querySelectorAll('[data-contact]').forEach((el) => {
  el.addEventListener('click', () => { window.location.href = el.dataset.contact; });
});
