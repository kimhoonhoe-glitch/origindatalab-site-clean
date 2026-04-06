// entry file for Vite multipage build

async function loadPartial(id, url) {
  const target = document.getElementById(id);
  if (!target) return false;

  try {
    const res = await fetch(url);
    target.innerHTML = await res.text();
    return true;
  } catch (e) {
    console.error(`Failed to load ${url}`, e);
    return false;
  }
}

function initHamburgerMenuDelegation() {
  document.addEventListener("click", (e) => {
    const hamburgerBtn = e.target.closest(".hamburger-btn");
    const navLink = e.target.closest(".site-header .nav a");
    const header = document.querySelector(".site-header");

    if (!header) return;

    if (hamburgerBtn) {
      const isOpen = header.classList.toggle("is-open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      return;
    }

    if (navLink) {
      header.classList.remove("is-open");

      const btn = document.querySelector(".hamburger-btn");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  initHamburgerMenuDelegation();

  await loadPartial("site-header", "/partials/header.html");
  await loadPartial("site-footer", "/partials/footer.html");

  initHeroSlider();
});

// HERO SLIDER
function initHeroSlider() {
  const slides = document.querySelectorAll("#heroSlider .hero-bg");

  if (!slides.length) {
    console.log("No hero slides found");
    return;
  }

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 4000);
}