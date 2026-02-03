// ---------- MUSIC FADE-IN ----------
const music = document.getElementById("bgMusic");
music.volume = 0;

let v = 0;
const fade = setInterval(() => {
  v += 0.02;
  music.volume = Math.min(v, 0.25);
  if (v >= 0.25) clearInterval(fade);
}, 100);

// ---------- SHOW TIME TAKEN ----------
const timeEl = document.getElementById("timeInfo");
const timeTaken = localStorage.getItem("timeTakenSec");

if (timeTaken) {
  timeEl.textContent = `⏱ You took ${timeTaken} seconds to say YES 😌`;
} else {
  timeEl.textContent = `⏱ You said YES instantly 😳💖`;
}

// ---------- SHOW NO COUNT ----------
const noCountEl = document.getElementById("noCountInfo");
const noCount = localStorage.getItem("noClickCount");

if (noCount && Number(noCount) > 0) {
  noCountEl.textContent = `🙈 You tried saying NO ${noCount} time${noCount > 1 ? "s" : ""} before saying YES 💖`;
} else {
  noCountEl.textContent = `😳 You didn’t even try to say NO, That's cool! I can feel the true love`;
}

// ---------- SHARE (IMAGE + WHATSAPP IN ONE GO) ----------
const shareBtn = document.getElementById("shareBtn");
const resultCard = document.getElementById("resultCard");

shareBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // 📸 Capture snapshot
  const canvas = await html2canvas(resultCard, {
    scale: 2,
    backgroundColor: null,
  });

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );

  const file = new File([blob], "yes-result.png", { type: "image/png" });

  const message = timeTaken
    ? `I said YES 💖😌\nTook me ${timeTaken} seconds to decide 😉`
    : `I said YES 💖😌`;

  // ✅ TRY NATIVE SHARE WITH IMAGE (ANDROID)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "I said YES 💖",
        text: message,
      });
      return; // success → stop here
    } catch (err) {
      console.log("Native share cancelled or failed, falling back");
    }
  }

  // 🔁 FALLBACK — DOWNLOAD IMAGE
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "yes-result.png";
  link.click();

  // 🔗 OPEN WHATSAPP TEXT SHARE
  const text = encodeURIComponent(
    message +
      "\n\n(Attached image 👆)\nTry it yourself 👉 " +
      window.location.origin,
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");
});

// ---------- FLOATING HEARTS ----------
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "💖";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random() * 22 + "px";
  const dur = 5 + Math.random() * 3;
  h.style.animationDuration = dur + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}

setInterval(spawnHeart, 700);

// cleanup (optional)
setTimeout(() => {
  localStorage.removeItem("noClickCount");
  localStorage.removeItem("timeTakenSec");
}, 3000);
