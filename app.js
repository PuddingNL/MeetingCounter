let interval = null;
let startTime = null;
let elapsed = 0;
let paused = false;
let people = 0;
let rate = 0;

const setup = document.getElementById('setup');
const timer = document.getElementById('timer');
const elapsedEl = document.getElementById('elapsed');
const totalCostEl = document.getElementById('totalCost');
const perSecondEl = document.getElementById('perSecond');
const summaryPeople = document.getElementById('summaryPeople');
const summaryAvg = document.getElementById('summaryAvg');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const addPersonBtn = document.getElementById('addPersonBtn');
const removePersonBtn = document.getElementById('removePersonBtn');
const peopleInput = document.getElementById('people');
const rateInput = document.getElementById('rate');

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function update() {
  if (!startTime) return;
  const ms = paused ? elapsed : Date.now() - startTime + elapsed;
  const hours = ms / 3600000;
  const cost = people * rate * hours;
  const perSec = (people * rate) / 3600;
  elapsedEl.textContent = formatTime(ms);
  totalCostEl.textContent = `€${cost.toFixed(2)}`;
  perSecondEl.textContent = `€${perSec.toFixed(2)} / sec`;
  summaryPeople.textContent = people;
  summaryAvg.textContent = `€${rate.toFixed(2)}`;
}

startBtn.addEventListener('click', () => {
  people = parseInt(peopleInput.value, 10);
  rate = parseFloat(rateInput.value);
  if (!people || people < 1 || isNaN(rate) || rate < 0) return;

  setup.classList.add('hidden');
  timer.classList.remove('hidden');

  elapsed = 0;
  paused = false;
  startTime = Date.now();
  update();
  interval = setInterval(update, 1000);
});

stopBtn.addEventListener('click', () => {
  if (paused) {
    paused = false;
    startTime = Date.now();
    stopBtn.textContent = 'Stop';
    interval = setInterval(update, 1000);
  } else {
    paused = true;
    elapsed = Date.now() - startTime + elapsed;
    stopBtn.textContent = 'Resume';
    clearInterval(interval);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  startTime = null;
  elapsed = 0;
  paused = false;
  people = 0;
  rate = 0;
  stopBtn.textContent = 'Stop';

  elapsedEl.textContent = '00:00:00';
  totalCostEl.textContent = '€0.00';
  perSecondEl.textContent = '€0.00 / sec';
  summaryPeople.textContent = '0';
  summaryAvg.textContent = '€0.00';

  timer.classList.add('hidden');
  setup.classList.remove('hidden');
});

addPersonBtn.addEventListener('click', () => {
  if (paused) return;
  people++;
  update();
});

removePersonBtn.addEventListener('click', () => {
  if (paused) return;
  if (people > 1) {
    people--;
    update();
  }
});
