// ---------- MUSIC FADE-IN ----------
const music = document.getElementById("bgMusic");
music.volume = 0;

let v = 0;
const fade = setInterval(() => {
  v += 0.02;
  music.volume = Math.min(v, 0.25);
  if (v >= 0.25) clearInterval(fade);
}, 100);

// ---------- FLOATING HEARTS ----------
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "💖";

  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random() * 20 + "px";

  const dur = 5 + Math.random() * 3;
  h.style.animationDuration = dur + "s";

  document.body.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}

setInterval(spawnHeart, 700);
