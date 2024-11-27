
$(document).ready(function() {
  let slidePerView = 4;
  console.log($(window).width())
  if($(window).width() < 991) {
    slidePerView = 1
  } else if($(window).width() < 1500 ) {
    slidePerView = 2
  }
  const swiper = new Swiper('.swiper', {
    speed: 400,
    slidesPerView: slidePerView,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});


