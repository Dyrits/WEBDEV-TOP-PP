const workTimeRange = document.querySelector("#worktime");
const workTimeLabel = document.querySelector("#worktime-label");
const breakTimeRange = document.querySelector("#breaktime");
const breakTimeLabel = document.querySelector("#breaktime-label");
const tomatoLogo = document.querySelector("#logo");
const countingDown = {
  "work": false,
  "break": false
};
const timers = {
  "work":  {
    minutes: 25,
    seconds: 0,
    timerID: null,
  },
  "break": {
    minutes: 5,
    seconds: 0,
    timerID: null,
  }
}

workTimeRange.onchange = () => {
  workTimeLabel.innerHTML = workTimeRange.value;
  updateTimer("work", "minutes", workTimeRange.value);
}

breakTimeRange.onchange = () => {
  breakTimeLabel.innerHTML = breakTimeRange.value;
  updateTimer("break", "minutes", breakTimeRange.value);
}


function updateTimer(workOrBreak, minutesOrSeconds, value) {
  if (!countingDown[workOrBreak]) {
    if (value < 0) { value = 0; }
    if (value < 10) { value = "0" + value; }
    if (minutesOrSeconds = "minutes") {
      document.querySelector("#" + workOrBreak + "-minutes").innerHTML = value || 0;
      document.querySelector("#" + workOrBreak + "-seconds").innerHTML = "00";
    }
    else if (minutesOrSeconds = "seconds") {
      document.querySelector("#" + workOrBreak + "-seconds").innerHTML = value || 0;
    }
  }
}

function startTimer(workOrBreak) {
  countingDown[workOrBreak] = true;
  let input = "#" + workOrBreak + "time";
  timers[workOrBreak].timerID = setInterval(function () {
    timers[workOrBreak].seconds -= 1;
    if (timers[workOrBreak].seconds < 0) {
      if (timers[workOrBreak] == 0) {
        return stopTimer();
      }
      timers[workOrBreak].seconds = 59;
      timers[workOrBreak].minutes--;
    }

    updateTimer(workOrBreak, "seconds", timers[workOrBreak].minutes);
    updateTimer(workOrBreak, "minutes", timers[workOrBreak].seconds);

  }, 1000)
}

