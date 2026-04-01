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
});