const workTimeRange = document.querySelector("#worktime");
const workTimeLabel = document.querySelector("#worktime-label");
const breakTimeRange = document.querySelector("#breaktime");
const breakTimeLabel = document.querySelector("#breaktime-label");
const tomatoLogo = document.querySelector("#logo");
const countingDown = false;

workTimeRange.onchange = () => {
  workTimeLabel.innerHTML = workTimeRange.value;
  updateTimer("work", workTimeRange.value);
}
breakTimeRange.onchange = () => {
  breakTimeLabel.innerHTML = breakTimeRange.value;
  updateTimer("break", workTimeRange.value);
}



function updateTimer(workOrBreak, value) {
  if (!countingDown) {
    if (value < 0) { value = 0; }
    if (value < 10) { value = "0" + value; }
    document.querySelector("#" + workOrBreak + "-minutes").innerHTML = value || 0;
    document.querySelector("#" + workOrBreak + "-seconds").innerHTML = "00";
  }
}
