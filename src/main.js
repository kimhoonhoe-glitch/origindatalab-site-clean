// entry file for Vite multipage build

async function loadPartial(id, url) {
  const target = document.getElementById(id);
  if (!target) return;

  try {
    const res = await fetch(url);
    target.innerHTML = await res.text();
  } catch (e) {
    console.error(`Failed to load ${url}`, e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("site-header", "/partials/header.html");
  loadPartial("site-footer", "/partials/footer.html");

  initHeroSlider();

  // 헤더 partial 로딩 후 햄버거 연결
  setTimeout(() => {
    const header = document.querySelector(".site-header");
    const btn = document.querySelector(".hamburger-btn");

    if (header && btn) {
      btn.addEventListener("click", () => {
        const isOpen = header.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }
  }, 600);
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
  }, 4000); // 4초마다 변경
}