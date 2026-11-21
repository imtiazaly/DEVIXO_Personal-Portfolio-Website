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
});
