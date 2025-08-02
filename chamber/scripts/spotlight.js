fetch('data/members.json')
    .then(res => res.json())
    .then(members => {
        const qualified = members.filter(m => m.membership === 'gold' || m.membership === 'silver');
        const spotlights = [];

        while (spotlights.length < 2) {
            const rand = qualified[Math.floor(Math.random() * qualified.length)];
            if (!spotlights.includes(rand)) spotlights.push(rand);
        }

        const container = document.getElementById('spotlight-container');
        spotlights.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight');
            card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.logo}" alt="${member.name} logo">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">${member.membership} member</p>
      `;
            container.appendChild(card);
        });
    });