// Update current year
document.getElementById('year').textContent = new Date().getFullYear();

// Load JSON data and build cards
fetch('data/discover.json')
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('cardGrid');
        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.gridArea = `card${index + 1}`;
            card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
            grid.appendChild(card);
        });
    });

// Visitor message
const visitMessage = document.getElementById('visitMessage');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days < 1) visitMessage.textContent = "Back so soon! Awesome!";
    else if (days === 1) visitMessage.textContent = "You last visited 1 day ago.";
    else visitMessage.textContent = `You last visited ${days} days ago.`;
}

localStorage.setItem('lastVisit', now);
