const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.getElementById("card");
const loader = document.getElementById("loader");
const content = document.getElementById("content");

const messages = [
  "Are you sure? 🤔",
  "Think again 😏",
  "No is not allowed 😌",
  "Almost had it 😂",
  "Why so serious? ❤️",
  "Just click yes 😇"
];

// Fake loading
setTimeout(() => {
  loader.classList.add("hidden");
  content.classList.remove("hidden");
}, 1500);

noBtn.addEventListener("mouseenter", () => {
  const cardRect = card.getBoundingClientRect();

  const maxX = cardRect.width - noBtn.offsetWidth;
  const maxY = cardRect.height - noBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  showMessage(x, y);
});

function showMessage(x, y) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerText = messages[Math.floor(Math.random() * messages.length)];

  msg.style.left = `${x}px`;
  msg.style.top = `${y - 25}px`;

  card.appendChild(msg);

  setTimeout(() => msg.remove(), 1500);
}

yesBtn.addEventListener("click", () => {
  window.location.href = "next.html";
});
