const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 100;
let y = 100;
let dx = 2;
let dy = 2;
const radius = 20;

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'lime';
  ctx.fill();
  ctx.closePath();
}

function update() {
  x += dx;
  y += dy;

  if (x + radius > canvas.width || x - radius < 0) dx = -dx;
  if (y + radius > canvas.height || y - radius < 0) dy = -dy;
}

function loop() {
  drawBall();
  update();
  requestAnimationFrame(loop);
}

loop();
