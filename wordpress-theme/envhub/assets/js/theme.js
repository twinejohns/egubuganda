/* EnvHub Uganda theme scripts: header state, mobile nav, hero carousel, FAQs. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Sticky header state */
    var header = document.getElementById("site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 40);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Mobile nav */
    var toggle = document.getElementById("nav-toggle");
    if (toggle && header) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      header.querySelectorAll(".nav-mobile a").forEach(function (link) {
        link.addEventListener("click", function () {
          header.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Hero carousel */
    var hero = document.querySelector("[data-carousel]");
    if (hero) {
      var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero__slide"));
      var dots = Array.prototype.slice.call(hero.querySelectorAll(".hero__dot"));
      var index = 0;
      var timer = null;

      var show = function (next) {
        index = (next + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle("is-active", i === index);
          slide.setAttribute("aria-hidden", i === index ? "false" : "true");
        });
        dots.forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === index);
        });
      };

      var start = function () {
        if (slides.length > 1) {
          timer = window.setInterval(function () {
            show(index + 1);
          }, 7000);
        }
      };

      var restart = function () {
        window.clearInterval(timer);
        start();
      };

      hero.querySelectorAll("[data-carousel-prev]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          show(index - 1);
          restart();
        });
      });
      hero.querySelectorAll("[data-carousel-next]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          show(index + 1);
          restart();
        });
      });
      dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          show(i);
          restart();
        });
      });

      show(0);
      start();
    }

    /* FAQ accordion */
    document.querySelectorAll(".faq__q").forEach(function (button) {
      button.addEventListener("click", function () {
        var item = button.closest(".faq");
        var open = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
        var sign = button.querySelector("span");
        if (sign) {
          sign.textContent = open ? "\u2212" : "+";
        }
      });
    });
  });
})();
