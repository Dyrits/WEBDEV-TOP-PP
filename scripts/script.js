const workTimeRange = document.querySelector("#worktime");
const workTimeLabel = document.querySelector("#worktime-label");
const breakTimeRange = document.querySelector("#breaktime");
const breakTimeLabel = document.querySelector("#breaktime-label");
const tomatoLogo = document.querySelector("#logo");
const countingDown = false;

workTimeRange.onchange = () => workTimeLabel.innerHTML = workTimeRange.value;
breakTimeRange.onchange = () => breakTimeLabel.innerHTML = breakTimeRange.value;

function updateTimer(timer) {
  if (!countingDown) {
    if (value < 0) { value = 0; }
    if (value < 10) { value = "0" + value; }
    if (value > 59) { value = 59; }
  }
  document.querySelector(".minutes").innerHTML = (value || 0);
  timerObj[key] = value;
}
