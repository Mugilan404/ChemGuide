// main.js
// Generic site-wide scripts (navigation, theme, etc.)

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navbar toggle
  const menuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Dark mode toggle (optional)
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
      );
    });

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
  }
});
