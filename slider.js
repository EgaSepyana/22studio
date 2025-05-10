document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-nav-dot");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentIndex = 0;
  let slideInterval;

  // Initialize slider
  function initSlider() {
    updateSlides();
    startAutoSlide();
  }

  // Update slide positions
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "next", "prev", "hidden", "hidden-prev");

      if (index === currentIndex) {
        slide.classList.add("active");
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add("next");
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add("prev");
      } else if (index > currentIndex) {
        slide.classList.add("hidden");
      } else {
        slide.classList.add("hidden-prev");
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Go to next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  // Go to previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  // Start auto sliding
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3000);
  }

  // Reset auto sliding timer
  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.dataset.index);
      updateSlides();
      resetAutoSlide();
    });
  });

  // Initialize
  initSlider();

  // Pause on hover
  const sliderContainer = document.querySelector(".slider-container");
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  sliderContainer.addEventListener("mouseleave", () => {
    resetAutoSlide();
  });
});
