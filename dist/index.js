document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal-text");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // Triggers when 50% of the element is visible
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-icon");
  const fullscreenMenu = document.getElementById("fullscreen-menu");
  // 1. Select all the links inside the fullscreen menu
  const menuLinks = document.querySelectorAll("#fullscreen-menu a");

  // Ensure menu is closed on load
  fullscreenMenu.classList.remove("active");
  hamburgerButton.classList.remove("opened");
  hamburgerButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
  document.body.classList.remove("overflow-y-hidden");

  if (hamburgerButton && fullscreenMenu) {
    // Your original code for the hamburger button click
    hamburgerButton.addEventListener("click", function () {
      this.classList.toggle("opened");
      const isOpened = this.classList.contains("opened");
      this.setAttribute("aria-expanded", isOpened);
      fullscreenMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
      document.body.classList.toggle("overflow-y-hidden");
    });

    // 2. NEW: Add a click listener to each menu link
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // When a link is clicked, always close the menu
        hamburgerButton.classList.remove("opened");
        hamburgerButton.setAttribute("aria-expanded", "false");
        fullscreenMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
        document.body.classList.remove("overflow-y-hidden");
      });
    });
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
