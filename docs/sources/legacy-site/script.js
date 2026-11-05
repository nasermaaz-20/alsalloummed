let toggle = document.querySelector('.toggle')
let menu = document.querySelector('.nav-menu')
let nav = document.querySelector('nav')
toggle.addEventListener('click', () => {
    menu.classList.toggle('active')
    nav.classList.toggle('active')
});

    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        }
      }
    });