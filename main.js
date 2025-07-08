const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let regions = [
  { x: 200, y: 300, color: "red", troops: 30 },
  { x: 800, y: 300, color: "blue", troops: 25 },
];
let selectedRegion = null;

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  for (const region of regions) {
    const dx = region.x - x;
    const dy = region.y - y;
    if (dx * dx + dy * dy < 50 * 50) {
      if (!selectedRegion) {
        selectedRegion = region;
      } else if (selectedRegion !== region) {
        attack(selectedRegion, region);
        selectedRegion = null;
      }
      return;
    }
  }
  selectedRegion = null;
});

function attack(from, to) {
  if (from.troops > 1) {
    const amount = Math.floor(from.troops / 2);
    from.troops -= amount;
    to.troops -= amount;
    if (to.troops < 0) {
      to.color = from.color;
      to.troops = Math.abs(to.troops);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const r of regions) {
    ctx.beginPath();
    ctx.arc(r.x, r.y, 45, 0, Math.PI * 2);
    ctx.fillStyle = r.color;
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${r.troops}`, r.x, r.y + 6);
    if (selectedRegion === r) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}
draw();
