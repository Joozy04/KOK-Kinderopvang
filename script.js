(function () {
  document.addEventListener("DOMContentLoaded", function () {
    Website.init();
  });


  const Website = {
    init: function () {
      this.initSlider();
      this.initMenu();
      this.initFilter();
      this.initHamburger();
      this.initMobileZoekbalk();
    },



    initSlider: function () {
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide, .dag-slide');
      const prevBtn = document.getElementById('left');
      const nextBtn = document.getElementById('right');
      if (!slider || !slides.length) return;

      const slideWidth = slides[0].offsetWidth;
      let currentSlide = 0;

      const update = () => {
        slider.scrollTo({ left: slideWidth * currentSlide });
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentSlide === slides.length - 1 ? 'none' : 'auto';

        if (slides[0].classList.contains('dag-slide')) {
          slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
          });
        }
      };

      prevBtn.onclick = () => { if (currentSlide > 0) currentSlide--; update(); };
      nextBtn.onclick = () => { if (currentSlide < slides.length - 1) currentSlide++; update(); };

      update();
    },



    initMenu: function () {
    },



    initFilter: function () {
  const params = new URLSearchParams(window.location.search);
  const opvang = params.get("opvang");
  const locatie = params.get("locatie");

  const opvangSelect = document.getElementById("opvang");
  const locatieSelect = document.getElementById("locatie");

  if (opvang && opvangSelect) opvangSelect.value = opvang;
  if (locatie && locatieSelect) locatieSelect.value = locatie;

  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  cards.forEach(card => {
    const filter = (card.dataset.filter || "").toLowerCase();
    const opvangValue = (opvang || "").toLowerCase();
    const locatieValue = (locatie || "").toLowerCase();

    const matchesOpvang = opvang ? filter.includes(opvangValue) : true;
    const matchesLocatie = locatie ? filter.includes(locatieValue) : true;

    card.style.display = (matchesOpvang && matchesLocatie) ? "flex" : "none";
  });
},




    initHamburger: function () {
      const hamburger = document.querySelector('.hamburger');
      const menu = document.querySelector('.mobile-dropdown');
      if (!hamburger || !menu) return;

      hamburger.addEventListener('click', function () {
        menu.classList.toggle('active');
      });
    },



    initMobileZoekbalk: function () {
      const mobileZoekbalk = document.getElementById("mobile-zoekbalk");
      const zoekbalkDropdown = document.querySelector(".zoekbalk-menu-wrapper");
      const zoekbalkSvg = document.querySelector(".mobile-zoekbalk svg");
      if (!mobileZoekbalk || !zoekbalkDropdown || !zoekbalkSvg) return;

      mobileZoekbalk.addEventListener('click', function () {
        zoekbalkDropdown.classList.toggle("active");
        zoekbalkSvg.classList.toggle("active");
      });
    }

  };
})();