document.addEventListener("DOMContentLoaded", function () {
  let sections = document.querySelectorAll(".section");
  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout;

  function smoothScroll(index) {
      isScrolling = true;
      sections[index].scrollIntoView({
          behavior: "smooth",
          block: "start"
      });

      setTimeout(() => {
          isScrolling = false;
      }, 1000); // 1s delay for smoother transitions
  }

  window.addEventListener("wheel", (event) => {
      if (isScrolling) return;

      let currentSection = sections[currentIndex];

      if (event.deltaY > 0) {
          // Scroll down logic
          if (currentSection.scrollHeight > currentSection.clientHeight && currentSection.scrollTop < currentSection.scrollHeight - currentSection.clientHeight) {
              return; // Allow internal scrolling for tall sections
          }
          currentIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else {
          // Scroll up logic
          if (currentSection.scrollTop > 0) {
              return; // Allow internal scrolling
          }
          currentIndex = Math.max(currentIndex - 1, 0);
      }

      smoothScroll(currentIndex);
  });

  // Fix Navbar Click Scrolling Issue
  document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", (event) => {
          event.preventDefault();
          let targetSectionId = link.getAttribute("href").substring(1);
          let targetSection = document.getElementById(targetSectionId);

          if (targetSection) {
              clearTimeout(scrollTimeout);

              scrollTimeout = setTimeout(() => {
                  let offset = 80; // Adjust for navbar height
                  let elementPosition
