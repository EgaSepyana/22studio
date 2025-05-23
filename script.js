// Settings panel toggle
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");
const closeSettings = document.getElementById("close-settings");

settingsToggle.addEventListener("click", () => {
  settingsPanel.classList.toggle("open");
});

closeSettings.addEventListener("click", () => {
  settingsPanel.classList.remove("open");
});

// Theme switcher
const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.getAttribute("data-theme");
    document.documentElement.classList.remove("dark-theme", "colorful-theme");

    if (theme !== "light") {
      document.documentElement.classList.add(`${theme}-theme`);
    }

    // Store preference in localStorage
    localStorage.setItem("theme", theme);
  });
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme && savedTheme !== "light") {
  document.documentElement.classList.add(`${savedTheme}-theme`);
}

// Animation speed control
const speedControl = document.getElementById("animation-speed");
const speedValue = document.getElementById("speed-value");

speedControl.addEventListener("input", () => {
  const speed = speedControl.value;
  speedValue.textContent = `${speed}x`;

  // Store preference in localStorage
  localStorage.setItem("animationSpeed", speed);
});

// Set initial speed if saved
const savedSpeed = localStorage.getItem("animationSpeed");
if (savedSpeed) {
  speedControl.value = savedSpeed;
  speedValue.textContent = `${savedSpeed}x`;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Contact form submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would typically send the data to a server
  console.log({ name, email, subject, message });

  // Show success message
  // alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  // contactForm.reset();
});

// Scroll animations with GSAP
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");
  const faqToggles = document.querySelectorAll(".faq-toggle");

  // Initialize FAQ items with staggered animation
  setTimeout(() => {
    faqItems.forEach((item) => {
      item.style.opacity = "1";
    });
  }, 100);

  // Toggle FAQ items
  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const parent = this.closest(".faq-item");

      // Close all other items
      if (!parent.classList.contains("active")) {
        faqItems.forEach((item) => {
          item.classList.remove("active");
        });
      }

      // Toggle current item
      parent.classList.toggle("active");
    });
  });

  // Initialize GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Get animation speed from settings
  const animationSpeed =
    parseFloat(localStorage.getItem("animationSpeed")) || 1;

  // Animate all hidden sections
  const hiddenSections = document.querySelectorAll(".hidden-section");

  hiddenSections.forEach((section, index) => {
    const delay = 0.1;

    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.8 * animationSpeed,
      delay: delay * animationSpeed,
      ease: "power3.out",
    });
  });

  // Additional animations for specific elements
  gsap.from("#settings-toggle", {
    y: 500,
    opacity: 0,
    duration: 1 * animationSpeed,
    // delay: 1 * animationSpeed,
    // ease: "power3.out"
  });

  gsap.from("#whatsap-toggle", {
    y: 500,
    opacity: 0,
    duration: 1 * animationSpeed,
    // delay: 1 * animationSpeed,
    // ease: "power3.out"
  });
});

function hideModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("hidden");

  // Clear animations
  document.getElementById("planeContainer").innerHTML = "";
  document.getElementById("confettiContainer").innerHTML = "";
}