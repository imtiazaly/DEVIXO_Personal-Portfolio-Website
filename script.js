/**
 * DEVIXO SOLUTIONS - WEB DEVELOPMENT INTERNSHIP
 * TASK 01: ELITE PROFESSIONAL PERSONAL PORTFOLIO
 * Author: Imtiaz Aly
 * Description: Vanilla JS Micro-interactions, Theme Engine, & UX Enhancements
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================================
       1. Theme Engine (Dark / Light Mode with LocalStorage & System Preference)
       ========================================================================== */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check saved theme in localStorage or default to system preference
  const savedTheme = localStorage.getItem("devixo-portfolio-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute("data-theme", "dark");
  } else {
    htmlElement.setAttribute("data-theme", "light");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("devixo-portfolio-theme", targetTheme);
    });
  }

  /* ==========================================================================
       2. Mobile Drawer Navigation
       ========================================================================== */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile drawer when clicking any link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile drawer when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ==========================================================================
       3. Reading Progress Bar & Header Shadow on Scroll
       ========================================================================== */
  const progressBar = document.getElementById("scroll-progress");
  const header = document.getElementById("header");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Update reading progress bar
      if (progressBar && docHeight > 0) {
        const progressPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progressPercent}%`;
      }

      // Add subtle shadow elevation to header
      if (header) {
        if (scrollTop > 50) {
          header.style.boxShadow = "var(--shadow-md)";
        } else {
          header.style.boxShadow = "none";
        }
      }
    },
    { passive: true },
  );

  /* ==========================================================================
       4. Active Section Highlighting (ScrollSpy)
       ========================================================================== */
  const sections = document.querySelectorAll("section[id]");

  function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav__menu a[href*="${sectionId}"]`,
      );

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add("active-link");
        } else {
          correspondingLink.classList.remove("active-link");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightActiveSection, { passive: true });

  /* ==========================================================================
       5. Contact Form Submission UI Feedback
       ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("form-submit-btn");

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const originalBtnContent = submitBtn.innerHTML;

      // Show feedback state
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.85";
      submitBtn.innerHTML = `
                <span>Message Sent Successfully!</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            `;

      // Reset form fields
      contactForm.reset();

      // Revert button after 3.5 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = originalBtnContent;
      }, 3500);
    });
  }

  /* ==========================================================================
       6. Dynamic Footer Year
       ========================================================================== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
       7. Skills Auto-Showcase Engine (Automatic Cycle with Hover-Pause)
       ========================================================================== */
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillCards = document.querySelectorAll(".skill-card[data-category]");
  const skillsSection = document.getElementById("skills");

  if (skillTabs.length && skillCards.length) {
    const categories = ["frontend", "backend", "database", "mobile"];
    let currentCategoryIndex = 0;
    let autoPlayTimer = null;
    let isPaused = false;

    function setCategory(category) {
      // Update Tab states
      skillTabs.forEach((tab) => {
        const isSelected = tab.getAttribute("data-category") === category;
        tab.classList.toggle("active", isSelected);
        tab.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      // Filter cards with smooth entrance
      skillCards.forEach((card) => {
        if (card.getAttribute("data-category") === category) {
          card.classList.remove("is-hidden");
          card.classList.add("is-visible");
        } else {
          card.classList.add("is-hidden");
          card.classList.remove("is-visible");
        }
      });
    }

    // Initialize with default (Frontend)
    setCategory(categories[0]);

    function nextCategory() {
      if (!isPaused) {
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        setCategory(categories[currentCategoryIndex]);
      }
    }

    // Start Auto-Cycle (Every 4.5 seconds)
    function startAutoPlay() {
      if (!autoPlayTimer) {
        autoPlayTimer = setInterval(nextCategory, 4500);
      }
    }

    function stopAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }

    startAutoPlay();

    // Pause when mouse hovers over skills section
    if (skillsSection) {
      skillsSection.addEventListener("mouseenter", () => {
        isPaused = true;
      });

      skillsSection.addEventListener("mouseleave", () => {
        isPaused = false;
      });
    }

    // Allow manual clicking anytime
    skillTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        currentCategoryIndex = index;
        setCategory(tab.getAttribute("data-category"));
      });
    });
  }
});
