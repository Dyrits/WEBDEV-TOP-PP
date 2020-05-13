const workTimeRange = document.querySelector("#worktime");
const workTimeLabel = document.querySelector("#worktime-label");
const breakTimeRange = document.querySelector("#breaktime");
const breakTimeLabel = document.querySelector("#breaktime-label");
const tomatoLogo = document.querySelector("#logo");
const countingDown = false;

workTimeRange.onchange = () => workTimeLabel.innerHTML = workTimeRange.value;
breakTimeRange.onchange = () => breakTimeLabel.innerHTML = breakTimeRange.value;


