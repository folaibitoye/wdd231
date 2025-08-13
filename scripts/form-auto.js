/* vehicle list */
const cars = [
    { id: "evx-24", name: "EV‑X 2024" },
    { id: "roadster-25", name: "Roadster GT 2025" },
    { id: "suvprime", name: "SUV Prime" }
];

/* populate select */
const sel = document.getElementById("vehicle");
if (sel) {
    sel.innerHTML = cars.map(c =>
        `<option value="${c.id}">${c.name}</option>`).join("");
}

/* counter in localStorage */
function bumpCount() {
    const key = "ash-form-count";
    const count = Number(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, count);
    return count;
}

/* listen for submission */
const form = document.getElementById("serviceForm");
form?.addEventListener("submit", (e) => {
    /* Let the browser scroll back to top with new #hash; keep default GET */
    const total = bumpCount();
    /* show thanks msg */
    document.getElementById("countOut").textContent = total;
    document.getElementById("thanksMsg").classList.remove("hidden");
    /* update global badge */
    const badge = document.querySelector("[data-submissions]");
    if (badge) badge.textContent = total;
});
  
/* When the page loads after a GET redirect, still show updated badge */
document.addEventListener("DOMContentLoaded", () => {
    const total = localStorage.getItem("ash-form-count") || 0;
    document.querySelector("[data-submissions]")?.textContent = total;
});
  