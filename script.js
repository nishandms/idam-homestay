$(document).ready(function () {
  const tourButton = $('#tourButton');
  const tourModal = document.getElementById('tourModal');
  const closeTourModal = document.getElementById('closeTourModal');
  const tourVideo = document.getElementById('tourVideo');
  const prevSection = document.getElementById('prevSection');
  const nextSection = document.getElementById('nextSection');
  const sectionIndicator = document.getElementById('sectionIndicator');
  const whatsappBtn = $('.whatsapp-btn');
  const instagramBtn = $('.instagram-btn');

  let currentSection = 1;
  const totalSections = 5;
  const sections = [
    '/sample_video.mp4',
    '/sample_video.mp4',
    '/sample_video.mp4',
    '/sample_video.mp4',
    '/sample_video.mp4'
  ];

  tourButton.on('click', () => {
    tourModal.classList.remove('hidden');
    tourModal.classList.add('flex');
    tourVideo.play();
  });

  closeTourModal.addEventListener('click', () => {
    tourModal.classList.add('hidden');
    tourModal.classList.remove('flex');
    tourVideo.pause();
    tourVideo.currentTime = 0;
  });

  prevSection.addEventListener('click', () => {
    if (currentSection > 1) {
      currentSection--;
      updateSection();
    }
  });

  nextSection.addEventListener('click', () => {
    if (currentSection < totalSections) {
      currentSection++;
      updateSection();
    }
  });

  whatsappBtn.on('click', () => {
    window.location = "https://wa.me/9037052794";
  });

  instagramBtn.on('click', () => {
    window.location = "https://www.instagram.com/idam_homestay/";
  });

  function updateSection() {
    tourVideo.src = sections[currentSection - 1];
    sectionIndicator.textContent = `${currentSection}/${totalSections}`;
    tourVideo.play();
    updateNavigationButtons();
  }

  function updateNavigationButtons() {
    prevSection.style.opacity = currentSection === 1 ? '0.5' : '1';
    prevSection.style.cursor = currentSection === 1 ? 'not-allowed' : 'pointer';
    nextSection.style.opacity = currentSection === totalSections ? '0.5' : '1';
    nextSection.style.cursor = currentSection === totalSections ? 'not-allowed' : 'pointer';
  }

  tourModal.addEventListener('click', (e) => {
    if (e.target === tourModal) {
      tourModal.classList.add('hidden');
      tourModal.classList.remove('flex');
      tourVideo.pause();
      tourVideo.currentTime = 0;
    }
  });

  // Gallery Lightbox
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const close = document.querySelector('.close');
  galleryImages.forEach(img => {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightbox.style.display = 'flex';
    });
  });
  close.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  const menuButton = document.querySelector('.ri-menu-line');
  const nav = document.querySelector('nav');
  menuButton.addEventListener('click', function () {
    console.log("its here")
    nav.classList.toggle('custom-nav');
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
    nav.classList.toggle('flex-col');
    nav.classList.toggle('absolute');
    nav.classList.toggle('top-16');
    nav.classList.toggle('right-4');
    nav.classList.toggle('bg-white');
    nav.classList.toggle('p-4');
    nav.classList.toggle('rounded');
    nav.classList.toggle('shadow-lg');
  });
});
