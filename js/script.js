document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('main-nav-mobile');
  const mobileNavLinks = mobileNav.querySelectorAll('a');

  function toggleMenu() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('is-open');
    
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });


  // ==========================================================================
  // 2. PORTFOLIO GALLERY FILTER
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('is-hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          }, 10);
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });


  // ==========================================================================
  // 3. SMOOTH SCROLL ACCESSIBILITY OFFSET
  // ==========================================================================
  const headerHeight = document.querySelector('.site-header').offsetHeight;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});


  // ==========================================================================
  // 4. IMG PREVIEW OPEN
  // ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.querySelector('.gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-content');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  if (galleryGrid && lightbox) {
    // Klick auf ein Bild in der Galerie abfangen
    galleryGrid.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('.gallery-img');
      if (!clickedImg) return;

      // Pfad, Alternativtext und Beschriftung (Caption) holen
      const src = clickedImg.getAttribute('src');
      const alt = clickedImg.getAttribute('alt');
      const figure = clickedImg.closest('figure');
      const captionText = figure ? figure.querySelector('figcaption').textContent : '';

      // Lightbox befüllen und anzeigen
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', alt);
      lightboxCaption.textContent = captionText;
      
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Verhindert das Scrollen im Hintergrund
    });

    // Schließen-Funktion (Klick auf X oder den dunklen Hintergrund)
    const closeLightbox = () => {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Aktiviert Scrollen wieder
      lightboxImg.setAttribute('src', ''); // Quelle leeren
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Schließen mit der ESC-Taste
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }
});

// ==========================================================================
// 5. CONTACT FORM → MAILTO SUBMISSION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const STUDIO_EMAIL = 'chicagoinkeurope@gmail.com';

  // Human-readable labels for the select values
  const styleLabels = {
    piercing: 'Piercing (Ohr, Nase, Body, etc.)',
    fineline: 'Fineline & Minimal',
    blackgrey: 'Black & Grey',
    realistic: 'Realistic',
    neotrad: 'Neo Traditional',
    lettering: 'Lettering',
    custom: 'Custom Design'
  };
  const artistLabels = {
    sava: 'Sava',
    hermes: 'Hermes'
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const phone = contactForm.querySelector('#phone').value.trim();
    const styleValue = contactForm.querySelector('#style').value;
    const artistValue = contactForm.querySelector('#artist').value;
    const message = contactForm.querySelector('#message').value.trim();

    const style = styleLabels[styleValue] || 'Keine Angabe';
    const artist = artistLabels[artistValue] || 'Keine Präferenz';

    const subject = `Terminanfrage von ${name}`;

    const bodyLines = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${phone || 'Nicht angegeben'}`,
      `Gewünschte Leistung / Stil: ${style}`,
      `Wunsch-Artist: ${artist}`,
      '',
      'Idee / Nachricht:',
      message
    ];

    const body = bodyLines.join('\n');

    const mailtoLink =
      `mailto:${STUDIO_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
});