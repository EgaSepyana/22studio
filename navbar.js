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
    mobileMenu.classList.remove("open");
    mobileMenuButton.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
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
