const btn = document.getElementById("revealBtn");
const countdownEl = document.getElementById("countdown");
const revealSection = document.getElementById("revealSection");

btn.addEventListener("click", () => {
  btn.disabled = true;
  btn.style.display = "none";
  startCountdown();
});

function startCountdown() {
  let count = 3;
  countdownEl.classList.remove("d-none");
  countdownEl.innerText = count;

  const timer = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(timer);
      countdownEl.classList.add("d-none");
      revealSection.classList.remove("d-none");
      startConfetti();
    } else {
      countdownEl.innerText = count;
    }
  }, 1000);
}

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 6 + 2,
      color: `hsl(110,100%,${40 + Math.random()*40}%)`
    });
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = 0;
  });
  requestAnimationFrame(animate);
}
