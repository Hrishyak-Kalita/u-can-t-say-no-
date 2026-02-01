
const params = new URLSearchParams(window.location.search);
const pookieName = params.get("name") || "Pookie";
const selectedSong = params.get("song") || "soft-music.mp3";

const musicSource = document.getElementById("musicSource");
musicSource.src = selectedSong;
bgMusic.load();


const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.getElementById("card");
const loader = document.getElementById("loader");
const content = document.getElementById("content");

let escapeCount = 0;

const messages = [
  "Why you running, pookie? 🥺",
  "Think again, cutie 😏",
  "No? That hurts my heart 💔",
  "You sure about that? 👀",
  "Don’t be shy 😌",
  "Just say yes already 😭",
  "Playing hard to get? 😘"
];

// Fake loading 💗
setTimeout(() => {
  loader.classList.add("hidden");
  content.classList.remove("hidden");
}, 1500);

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

function moveNo() {
  escapeCount++;

  const cardRect = card.getBoundingClientRect();
  const maxX = cardRect.width - noBtn.offsetWidth;
  const maxY = cardRect.height - noBtn.offsetHeight - 90;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  showMessage(x, y);

  // gets harder 😈
  noBtn.style.transitionDuration =
    `${Math.max(0.07, 0.22 - escapeCount * 0.015)}s`;

  card.querySelector("h1").innerText = "Stop running, you’re my pookie 🥺💗";

}

function showMessage(x, y) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerText = messages[Math.floor(Math.random() * messages.length)];

  msg.style.left = `${x}px`;
  msg.style.top = `${y - 28}px`;

  card.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
}

yesBtn.addEventListener("mouseenter", () => {
  yesBtn.style.transform = "translateX(-50%) scale(1.15)";
});


setInterval(() => {
  const heart = document.createElement("div");
  heart.innerText = "💖";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";
  heart.style.fontSize = "18px";
  heart.style.opacity = "0.8";
  heart.style.animation = "floatUp 6s linear";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 800);


document.querySelector("h1").innerText =
  `${pookieName}, will you go out with me? 🥹💖`;


function generateLink() {
  const name = document.getElementById("nameInput").value || "Pookie";
  const song = document.getElementById("songInput").value;

  const url =
    `${window.location.origin}${window.location.pathname}` +
    `?name=${encodeURIComponent(name)}&song=${encodeURIComponent(song)}`;

  navigator.clipboard.writeText(url);
  alert("💖 Pookie link copied! Send it with love 😌");
}
