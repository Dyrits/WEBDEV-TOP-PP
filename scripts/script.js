const workTimeRange = document.querySelector("#worktime");
const workTimeLabel = document.querySelector("#worktime-label");
const breakTimeRange = document.querySelector("#breaktime");
const breakTimeLabel = document.querySelector("#breaktime-label");

const minutes = document.querySelector("#work-minutes");
const seconds = document.querySelector("#work-seconds");

const tomatoLogo = document.querySelector("#logo");
const countingDown = {
  work: false,
  break: false,
};

tomatoLogo.addEventListener("click", startSession);

workTimeRange.onchange = () => {
  workTimeLabel.innerHTML = workTimeRange.value;
  minutes.innerHTML = workTimeRange.value;
};

breakTimeRange.onchange = () => {
  breakTimeLabel.innerHTML = breakTimeRange.value;
};

function startSession() {
  let mn = workTimeRange.value;
  let sec = 59;

  const minutes_interval = setInterval(minutesTimer, 60000);
  const seconds_interval = setInterval(secondsTimer, 1000);

  function minutesTimer() {
    mn = mn - 1;
    minutes.innerHTML = mn;
  }

  function secondsTimer() {
    sec = sec - 1;
    seconds.innerHTML = sec;

    // Check if the seconds and minutes counter has reached 0
    // If reached 0 then end the session
    if (seconds <= 0) {
      if (minutes <= 0) {
        // Clears the interval to stops counter
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
      }
    }
  }
}
