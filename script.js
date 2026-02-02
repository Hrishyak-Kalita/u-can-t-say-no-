// ---------- ELEMENTS ----------
const card = document.getElementById("card");
const loader = document.getElementById("loader");
const content = document.getElementById("content");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const bgMusic = document.getElementById("bgMusic");
const buttonArea = document.getElementById("buttonArea");

noBtn.style.transform = "translate(0px, 0px)";

let canMove = true;

// ---------- INITIAL STATE ----------
document.body.classList.add("romantic-mode");

let heartbreakMode = false;
let groupIndex = 0;
let messageIndex = 0;

// ---------- MESSAGE GROUPS ----------
const messageGroups = [
  [
    "Wait wait 😳",
    "Are you sure?",
    "Hey… slow down 😌",
    "That was too fast 👀",
  ],
  [
    "Playing hard to get? 😏",
    "You know you want to click YES",
    "Don’t be shy 😌",
  ],
  [
    "Why you running, pookie? 🥺",
    "That hurt a little 💔",
    "Please don’t do this 😣",
  ],
  [
    "Okay… this hurts 💔",
    "I really tried 😔",
    "This was supposed to be romantic…",
  ],
];

// ---------- LOADER ----------
setTimeout(() => {
  loader.classList.add("hidden");
  content.classList.remove("hidden");
}, 2500);

// ---------- MUSIC ----------
function enableMusic() {
  console.log("CLICK DETECTED — trying to play audio");
  bgMusic.muted = false;
  bgMusic.volume = 0;
  bgMusic.play().catch((err) => console.log(err));
  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    bgMusic.volume = Math.min(v, 0.25);
    if (v >= 0.25) clearInterval(fade);
  }, 100);
}

document.body.addEventListener("click", enableMusic, { once: true });
document.body.addEventListener("touchstart", enableMusic, { once: true });

// ---------- HEARTBREAK EMOJI ----------
function showHeartBreak(x, y) {
  const heart = document.createElement("div");
  heart.textContent = "💔";
  heart.style.position = "absolute";
  heart.style.left = `${x + 10}px`;
  heart.style.top = `${y - 10}px`;
  heart.style.fontSize = "18px";
  heart.style.pointerEvents = "none";
  heart.style.animation = "heartBreakFloat 1.4s ease forwards";
  heart.style.zIndex = "4";
  card.appendChild(heart);
  setTimeout(() => heart.remove(), 1400);
}

// ---------- NO BUTTON ----------
function moveNo() {
  if (!canMove) return; // ✅ guard FIRST
  canMove = false;

  const areaRect = buttonArea.getBoundingClientRect();
  const x = Math.random() * (areaRect.width - noBtn.offsetWidth);
  const y = Math.random() * (areaRect.height - noBtn.offsetHeight);

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  const msg = document.createElement("div");
  msg.className = "message";

  const currentGroup = messageGroups[groupIndex];
  msg.textContent = currentGroup[messageIndex];

  messageIndex++;
  if (messageIndex >= currentGroup.length) {
    messageIndex = 0;
    groupIndex = (groupIndex + 1) % messageGroups.length;
  }

  if (groupIndex === 3 && !heartbreakMode) {
    heartbreakMode = true;
    document.body.classList.remove("romantic-mode");
    document.body.classList.add("heartbreak-mode");
  }

  msg.style.left = `${x}px`;
  msg.style.top = `${y - 30}px`;

  card.appendChild(msg);
  setTimeout(() => msg.remove(), 2800);

  showHeartBreak(x, y);

  // re-enable movement after animation settles
  setTimeout(() => {
    canMove = true;
  }, 350);
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

// ---------- YES ----------
yesBtn.addEventListener("click", () => {
  // hearts
  for (let i = 0; i < 30; i++) {
    const h = document.createElement("div");
    h.textContent = "💖";
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    h.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }

  // fade out music
  let v = bgMusic.volume;
  const fadeOut = setInterval(() => {
    v -= 0.02;
    bgMusic.volume = Math.max(v, 0);
    if (v <= 0) {
      clearInterval(fadeOut);
      bgMusic.pause();
    }
  }, 80);

  // redirect after fade
  setTimeout(() => {
    window.location.href = "next.html";
  }, 1000);
});

// ---------- BACKGROUND HEART RAIN ----------
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = heartbreakMode ? "💔" : "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 900);
