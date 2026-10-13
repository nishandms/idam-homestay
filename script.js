/**
 * IDAM HOMESTAYS — MINIMAL & ARCHITECTURAL INTERACTION ENGINE
 * Tactile micro-interactions, seamless gallery, and quiet conversion handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '919037052794';

  // 1. DYNAMIC NAVIGATION ON SCROLL
  const siteNav = document.querySelector('.site-nav');
  const siteNavBtn = document.querySelector('.site-nav-btn');
  const siteNavToggle = document.querySelector('.site-nav-toggle');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteNav?.classList.add('scrolled');
      if (siteNavBtn) {
        siteNavBtn.classList.remove('btn-outline-light');
        siteNavBtn.classList.add('btn-outline-dark');
      }
      if (siteNavToggle) {
        siteNavToggle.classList.remove('text-white');
        siteNavToggle.classList.add('text-stone-900');
      }
    } else {
      siteNav?.classList.remove('scrolled');
      if (siteNavBtn) {
        siteNavBtn.classList.add('btn-outline-light');
        siteNavBtn.classList.remove('btn-outline-dark');
      }
      if (siteNavToggle) {
        siteNavToggle.classList.add('text-white');
        siteNavToggle.classList.remove('text-stone-900');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. MOBILE DRAWER NAVIGATION
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileMenuBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeDrawer();
  });
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. BOOKING DATES SETUP & CALCULATION
  const checkinInput = document.getElementById('checkinDate');
  const checkoutInput = document.getElementById('checkoutDate');
  const guestSelect = document.getElementById('guestCount');
  const checkBtn = document.getElementById('checkAvailabilityBtn');

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(tomorrow);
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(dayAfter);

    checkinInput.addEventListener('change', () => {
      const selectedCheckin = new Date(checkinInput.value);
      const nextDay = new Date(selectedCheckin);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = formatDate(nextDay);
      if (new Date(checkoutInput.value) <= selectedCheckin) {
        checkoutInput.value = formatDate(nextDay);
      }
    });
  }

  // Handle Booking Strip Click
  checkBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const checkin = checkinInput?.value || 'Flexible';
    const checkout = checkoutInput?.value || 'Flexible';
    const guests = guestSelect?.value || '2 Guests';

    let nightsInfo = '';
    if (checkin && checkout && checkin !== 'Flexible') {
      const diffTime = Math.abs(new Date(checkout) - new Date(checkin));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nightsInfo = ` (${diffDays} night${diffDays > 1 ? 's' : ''})`;
    }

    const message = `Hello Idam Homestays,\n\nI would like to check availability for the private homestay:\n• Dates: ${checkin} to ${checkout}${nightsInfo}\n• Guests: ${guests}\n\nPlease let me know if the home is available. Thank you.`;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });

  // 4. ACCORDION MICRO-INTERACTIONS
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      accordionItems.forEach(other => other.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 5. GALLERY FILTER & LIGHTBOX
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let visibleGalleryCards = [...galleryCards];
  let activeIndex = 0;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      visibleGalleryCards = [];

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          visibleGalleryCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const openLightbox = (index) => {
    if (!visibleGalleryCards.length) return;
    activeIndex = (index + visibleGalleryCards.length) % visibleGalleryCards.length;
    const card = visibleGalleryCards[activeIndex];
    const img = card.querySelector('img');
    const title = card.getAttribute('data-title') || 'Idam Homestay';

    if (lightboxImg && img) lightboxImg.src = img.src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCounter) lightboxCounter.textContent = `${activeIndex + 1} of ${visibleGalleryCards.length}`;

    lightbox?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = visibleGalleryCards.indexOf(card);
      if (idx !== -1) openLightbox(idx);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => openLightbox(activeIndex - 1));
  lightboxNext?.addEventListener('click', () => openLightbox(activeIndex + 1));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(activeIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(activeIndex + 1);
  });

  // 6. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value || '';
    const phone = document.getElementById('formPhone')?.value || '';
    const email = document.getElementById('formEmail')?.value || '';
    const message = document.getElementById('formMessage')?.value || '';

    const text = `Hello Idam Homestays,\n\nInquiry from Website:\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email || 'Not provided'}\n• Message: ${message}`;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    contactForm.reset();
  });
});
