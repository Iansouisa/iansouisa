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

const activeSections = new Set();
const navSections = document.querySelectorAll("#about, #work, #contact");

function updateActiveNav() {
  const atBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;

  let topSection = null;

  if (atBottom) {
    topSection = document.querySelector("#contact");
  } else {
    activeSections.forEach((section) => {
      if (!topSection || section.getBoundingClientRect().top < topSection.getBoundingClientRect().top) {
        topSection = section;
      }
    });
  }

  navSections.forEach((section) => {
    const links = document.querySelectorAll(`[href*="#${section.id}"]`);
    links.forEach((link) => link.classList.toggle("active", section === topSection));
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSections.add(entry.target);
      } else {
        activeSections.delete(entry.target);
      }
    });
    updateActiveNav();
  },
  { rootMargin: "0px 0px -70% 0px" },
);

navSections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", updateActiveNav, { passive: true });

const workCards = document.querySelectorAll(".work-card");

function updateWorkCards() {
  workCards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const next = workCards[i + 1];
    if (!next) {
      card.style.filter = "";
      card.style.opacity = "";
      return;
    }
    const nextRect = next.getBoundingClientRect();
    const rawOverlap = 1 - nextRect.top / window.innerHeight;
    const overlap = Math.max(0, Math.min(1, (rawOverlap - 0.3) / 0.7));
    const blur = overlap * 12;
    const scale = 1 - overlap * 0.05;
    const opacity = 1 - overlap * 0.7;
    card.style.filter = `blur(${blur}px)`;
    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
  });
}

window.addEventListener("scroll", updateWorkCards, { passive: true });
