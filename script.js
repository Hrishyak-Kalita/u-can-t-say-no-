const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonArea = document.getElementById("buttonArea");
const bgMusic = document.getElementById("bgMusic");

let canMove = true;

const messages = [
  "Wait 😳",
  "Heyyy nooo 🥺",
  "Think again 💖",
  "Why running? 😭",
  "That hurt 💔",
  "Still no? 🥹",
];

let msgIndex = 0;

/* ---------- MUSIC ---------- */
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

/* ---------- NO ESCAPE (CLAMPED) ---------- */
function moveNo() {
  if (!canMove) return;
  canMove = false;

  const area = buttonArea.getBoundingClientRect();
  const yes = yesBtn.getBoundingClientRect();
  const padding = 16;
  const safeZone = 40;

  const maxX = area.width - noBtn.offsetWidth - padding;
  const maxY = area.height - noBtn.offsetHeight - padding;

  // current position
  const startRect = noBtn.getBoundingClientRect();
  const startX = startRect.left - area.left;
  const startY = startRect.top - area.top;

  let targetX, targetY;
  let tries = 0;

  do {
    targetX = Math.random() * maxX;
    targetY = Math.random() * maxY;

    // 🔥 FORCE LONG MOVEMENT (MIN DISTANCE)
    const dist = Math.hypot(targetX - startX, targetY - startY);
    if (dist < Math.min(maxX, maxY) * 0.55) {
      tries++;
      continue;
    }

    const noRect = {
      left: area.left + targetX,
      right: area.left + targetX + noBtn.offsetWidth,
      top: area.top + targetY,
      bottom: area.top + targetY + noBtn.offsetHeight,
    };

    const yesSafe = {
      left: yes.left - safeZone,
      right: yes.right + safeZone,
      top: yes.top - safeZone,
      bottom: yes.bottom + safeZone,
    };

    var overlap =
      noRect.right > yesSafe.left &&
      noRect.left < yesSafe.right &&
      noRect.bottom > yesSafe.top &&
      noRect.top < yesSafe.bottom;

    tries++;
  } while (overlap && tries < 20);

  // 🏃‍♂️ fast → slow animation
  const duration = 520;
  const startTime = performance.now();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOut(progress);

    const x = startX + (targetX - startX) * eased;
    const y = startY + (targetY - startY) * eased;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      canMove = true;
    }
  }

  requestAnimationFrame(animate);

  // 💬 floating message
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = messages[msgIndex++ % messages.length];
  msg.style.left = `${targetX + 18}px`;
  msg.style.top = `${targetY - 12}px`;

  buttonArea.appendChild(msg);
  setTimeout(() => msg.remove(), 2600);
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

/* ---------- YES ---------- */
// yesBtn.addEventListener("click", () => {
//   window.location.href = "next.html";
// });

/* ---------- FALLING HEARTS ---------- */
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "💖";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random() * 12 + "px";
  const dur = 5 + Math.random() * 3;
  h.style.animationDuration = dur + "s";
  document.body.appendChild(h);
  h.getBoundingClientRect();
  setTimeout(() => h.remove(), dur * 1000);
}

setInterval(spawnHeart, 800);
