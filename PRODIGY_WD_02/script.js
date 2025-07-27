let startTime;
let running = false;
let elapsed = 0;
let interval;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const millis = Math.floor((diff % 1000) / 10);

  display.textContent = 
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(millis).padStart(2, '0')}`;
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
    startStopBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    startStopBtn.textContent = "Start";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  elapsed = 0;
  running = false;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (!running) return;
  const li = document.createElement("li");
  li.textContent = display.textContent;
  laps.appendChild(li);
});
