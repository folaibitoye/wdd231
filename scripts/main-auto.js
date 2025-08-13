/* nav hamburger + dark/light toggle scaffold */
const nav = document.getElementById("siteNav");
const toggle = document.getElementById("navToggle");

toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
});

/* footer year */
document.getElementById("year").textContent = new Date().getFullYear();

/* update LS badge on every page */
function updateBadge() {
    const badge = document.querySelector("[data-submissions]");
    if (!badge) return;
    const count = Number(localStorage.getItem("ash-form-count")) || 0;
    badge.textContent = count;
}
updateBadge();
