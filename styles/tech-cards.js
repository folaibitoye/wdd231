/* simple data array (object + array + method use) */
const articles = [
    {
        id: "ev-102",
        title: "Solid‑State Batteries: What’s the Hype?",
        img: "images/battery.webp",
        blurb: "Why solid‑state cells promise faster charging and better safety."
    },
    {
        id: "lidar-456",
        title: "Is LiDAR Still Essential for Self‑Driving Cars?",
        img: "images/lidar.webp",
        blurb: "A quick look at camera‑only vs multi‑sensor approaches in 2025."
    },
    {
        id: "infotain-789",
        title: "Top Infotainment Systems Ranked",
        img: "images/infotainment.webp",
        blurb: "We score UX, update cadence, and third‑party app support."
    }
];

/* build card markup with template literals */
function makeCard(a) {
    return `
    <article class="card">
      <img src="${a.img}" alt="${a.title}" loading="lazy">
      <h3>${a.title}</h3>
      <p>${a.blurb}</p>
    </article>`;
}

document.getElementById("cardGrid").innerHTML =
    articles.map(makeCard).join("");
  