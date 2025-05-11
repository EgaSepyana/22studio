// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  mobileMenuButton.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    mobileMenuButton.classList.toggle("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  const backToUpTogle = document.getElementById("back-to-up-toggle");

  if (window.scrollY > 300) {
    backToUpTogle.classList.remove("opacity-0");
    backToUpTogle.classList.add("opacity-100");
  } else {
    backToUpTogle.classList.remove("opacity-100");
    backToUpTogle.classList.add("opacity-0");
  }

  if (window.scrollY > 50) {
    navbar.classList.add("shadow-lg");
    navbar.classList.add("py-1");
    navbar.classList.remove("py-4");
  } else {
    navbar.classList.remove("shadow-lg");
    navbar.classList.remove("py-1");
    navbar.classList.add("py-4");
  }
});
