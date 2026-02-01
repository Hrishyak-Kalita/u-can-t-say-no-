const card = document.getElementById("card");
const loader = document.getElementById("loader");
const content = document.getElementById("content");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const bgMusic = document.getElementById("bgMusic");

document.body.classList.add("romantic-mode");

let heartbreakMode = false;


let escapeCount = 0;

const messages = [
    
  "Wait wait 😳",
  "Are you sure?",
  "Why you running, pookie? 🥺",
  "That hurt 💔",
  "I’m begging now 😭",
  "PLEASE 😭💖",
  "Okay last chance 😭"
];

/* Show card content */
setTimeout(() => {
  loader.classList.add("hidden");
  content.classList.remove("hidden");
}, 1500);

/* Enable music on first interaction */
function enableMusic() {
  bgMusic.muted = false;
  bgMusic.volume = 0;
  bgMusic.play().catch(() => {});
  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    bgMusic.volume = Math.min(v, 0.25);
    if (v >= 0.25) clearInterval(fade);
  }, 100);
}
document.body.addEventListener("click", enableMusic, { once: true });
document.body.addEventListener("touchstart", enableMusic, { once: true });

/* NO button logic */
function moveNo() {
  escapeCount++;

  // 💔 switch mood once
  if (!heartbreakMode) {
    heartbreakMode = true;
    document.body.classList.remove("romantic-mode");
    document.body.classList.add("heartbreak-mode");
  }

  const rect = card.getBoundingClientRect();
  const x = Math.random() * (rect.width - noBtn.offsetWidth);
  const y = Math.random() * (rect.height - noBtn.offsetHeight - 90);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerText =
    messages[Math.min(escapeCount - 1, messages.length - 1)];
  msg.style.left = `${x}px`;
  msg.style.top = `${y - 28}px`;
  card.appendChild(msg);
  setTimeout(() => msg.remove(), 1400);
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

function showHeartBreak(x, y) {
  const heart = document.createElement("div");
  heart.innerText = "💔";
  heart.style.position = "absolute";
  heart.style.left = `${x + 10}px`;
  heart.style.top = `${y - 10}px`;
  heart.style.fontSize = "18px";
  heart.style.opacity = "0.8";
  heart.style.animation = "heartBreakFloat 1.4s ease forwards";
  heart.style.pointerEvents = "none";

  card.appendChild(heart);
  setTimeout(() => heart.remove(), 1400);
}


/* YES celebration */
yesBtn.addEventListener("click", () => {
  for (let i = 0; i < 30; i++) {
    const h = document.createElement("div");
    h.innerText = "💖";
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    h.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }

  setTimeout(() => {
    window.location.href = "next.html";
  }, 800);
});

/* Background heart rain */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";

  heart.innerText = heartbreakMode ? "💔" : "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 900);

