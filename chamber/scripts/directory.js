// directory.js: fetch members.json (async/await), render grid/list, filter by membership
document.addEventListener("DOMContentLoaded", () => {
    const directoryEl = document.getElementById("directory");
    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");
    const filterEl = document.getElementById("filter-level");

    let members = [];

    async function loadMembers() {
        try {
            const res = await fetch("data/members.json", { cache: "no-store" });
            if (!res.ok) throw new Error(`Failed to load members.json (${res.status})`);
            members = await res.json();
            renderMembers(members);
        } catch (err) {
            console.error(err);
            directoryEl.innerHTML = `<p>Sorry — member data could not be loaded.</p>`;
        }
    }

    function renderMembers(list) {
        if (!Array.isArray(list)) list = [];
        directoryEl.innerHTML = "";
        if (list.length === 0) {
            directoryEl.innerHTML = "<p>No members found.</p>";
            return;
        }

        list.forEach(member => {
            const card = document.createElement("article");
            card.className = "member-card";
            card.setAttribute("data-membership", member.membership);

            // build card inner HTML (images lazy-loaded)
            card.innerHTML = `
        <img src="images/${member.image}" alt="${escapeHtml(member.name)} logo" loading="lazy" width="120" height="80">
        <div class="member-info">
          <h3>${escapeHtml(member.name)}</h3>
          <p class="address">${escapeHtml(member.address)}</p>
          <p class="phone">${escapeHtml(member.phone)}</p>
          <p class="website"><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        </div>
      `;

            directoryEl.appendChild(card);
        });
    }

    // Utility for very small XSS safety
    function escapeHtml(unsafe) {
        return String(unsafe).replace(/[&<>"']/g, function (m) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m];
        });
    }

    // view toggles
    function setView(view) {
        if (view === "grid") {
            directoryEl.classList.remove("directory-list");
            directoryEl.classList.add("directory-grid");
            gridBtn.setAttribute("aria-pressed", "true");
            listBtn.setAttribute("aria-pressed", "false");
        } else {
            directoryEl.classList.remove("directory-grid");
            directoryEl.classList.add("directory-list");
            gridBtn.setAttribute("aria-pressed", "false");
            listBtn.setAttribute("aria-pressed", "true");
        }
    }

    gridBtn?.addEventListener("click", () => setView("grid"));
    listBtn?.addEventListener("click", () => setView("list"));

    // filter membership
    filterEl?.addEventListener("change", (e) => {
        const level = e.target.value;
        if (!level) {
            renderMembers(members);
        } else {
            const filtered = members.filter(m => String(m.membership) === String(level));
            renderMembers(filtered);
        }
    });

    // initial setup
    setView("grid");
    loadMembers();
});
