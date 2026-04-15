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
  function closeMenu(header) {
    if (!header) return;
    header.classList.remove("is-open");

    const btn = header.querySelector(".hamburger-btn");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
    }
  }

  function toggleMenu(header, btn) {
    if (!header || !btn) return;

    const isOpen = header.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  document.addEventListener("click", (e) => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const hamburgerBtn = e.target.closest(".hamburger-btn");
    const navLink = e.target.closest(".site-header .nav a");
    const clickedInsideHeader = !!e.target.closest(".site-header");

    // 햄버거 버튼 클릭 → 열기/닫기 토글
    if (hamburgerBtn) {
      e.preventDefault();
      toggleMenu(header, hamburgerBtn);
      return;
    }

    // 메뉴 링크 클릭 → 닫기
    if (navLink) {
      closeMenu(header);
      return;
    }

    // 헤더 바깥 클릭 → 닫기
    if (!clickedInsideHeader) {
      closeMenu(header);
    }
  });

  // ESC 누르면 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const header = document.querySelector(".site-header");
      closeMenu(header);
    }
  });

  // 화면이 PC 크기로 바뀌면 모바일 메뉴 닫기
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      const header = document.querySelector(".site-header");
      closeMenu(header);
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  initHamburgerMenuDelegation();

  const headerLoaded = await loadPartial("site-header", "/partials/header.html");
  const footerLoaded = await loadPartial("site-footer", "/partials/footer.html");

  console.log("DEBUG headerLoaded:", headerLoaded);
  console.log("DEBUG footerLoaded:", footerLoaded);
  console.log("DEBUG #site-header exists:", !!document.getElementById("site-header"));
  console.log("DEBUG .site-header exists:", !!document.querySelector(".site-header"));
  console.log("DEBUG .hamburger-btn exists:", !!document.querySelector(".hamburger-btn"));
  console.log("DEBUG .nav exists:", !!document.querySelector(".site-header .nav"));

  initHeroSlider();
});

// HERO SLIDER
function initHeroSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) {
    console.log("No hero slider found");
    return;
  }

  const slides = Array.from(slider.querySelectorAll(".hero-bg"));
  if (slides.length < 2) {
    console.log("Not enough hero slides");
    return;
  }

  let current = slides.findIndex((slide) => slide.classList.contains("active"));
  if (current < 0) current = 0;

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === current);
    slide.classList.toggle("prev", false);
  });

  setInterval(() => {
    const prev = current;
    current = (current + 1) % slides.length;

    slides[prev].classList.remove("active");
    slides[prev].classList.add("prev");

    slides[current].classList.add("active");

    setTimeout(() => {
      slides[prev].classList.remove("prev");
    }, 1400);
  }, 4000);
}