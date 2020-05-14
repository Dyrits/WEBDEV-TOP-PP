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
    count: 0,
  }
}
let pause = true;

workTimeRange.oninput = () => {
  workTimeLabel.innerHTML = workTimeRange.value;
  // Si le compteur tourne déjà, la valeur n'est pas mis à jour:
  if (!countingDown["work"]) { updateTimer("work", "minutes", workTimeRange.value); }
  else if (pause) { updateTimer("work", "minutes", workTimeRange.value); }
}

breakTimeRange.oninput = () => {
  breakTimeLabel.innerHTML = breakTimeRange.value;
  // Si le compteur tourne déjà, la valeur n'est pas mis à jour:
  if (!countingDown["break"]) { updateTimer("break", "minutes", breakTimeRange.value); }
  else if (pause) { updateTimer("break", "minutes", breakTimeRange.value); }
}


tomatoLogo.addEventListener("click", () => {
  if (!pause) {
    pauseTimer();
  }
  else {
    pause = false;
    countingDown["break"] ? startTimer("break") : startTimer("work"); // Le timer est relancé sur la phase où il s'était arrêté.
  }
})

tomatoLogo.addEventListener("dblclick", () => {
    pauseTimer()
    timers["work"].seconds = 0;
    timers["break"].seconds = 0;
    updateTimer("work", "minutes", workTimeRange.value);
    updateTimer("break", "minutes", breakTimeRange.value);
})


function updateTimer(workOrBreak, minutesOrSeconds, value) {
  // Rétablir la valeur a 0 est juste une sécurité, pas forcément nécéssaire si tout fonctionne bien:
  if (value < 0) { value = 0; }
  // Si la valeur est plus petite que 10, on ajouter un 0 pour avoir un affichage propre.
  if (value < 10) { value = "0" + value; }
  // Mise à jour des minutes:
  if (minutesOrSeconds === "minutes") {
    document.querySelector("#" + workOrBreak + "-minutes").innerHTML = value; // Selectionne et met à jour le compteur correspondant.
    document.querySelector("#" + workOrBreak + "-seconds").innerHTML = "00"; // Selectionne et met à jour le compteur correspondant.
    // Le timer est remis à jour afin que celui-ci soit aussi à jour dans le cas d'une mise à jour manuelle.
    timers[workOrBreak].minutes = Number(value);
  }
  // Mise à jour des secondes:
  else if (minutesOrSeconds === "seconds") {
    document.querySelector("#" + workOrBreak + "-seconds").innerHTML = value;
    timers[workOrBreak].seconds = Number(value);
  }
}

function startTimer(workOrBreak) {
  countingDown[workOrBreak] = true; 
  timers[workOrBreak].timerID = setInterval(function () {
    timers[workOrBreak].seconds -= 1; // Décrémente le compteur de 1 par seconde.
    if (timers[workOrBreak].seconds < 0) {
      // Si le compteur se termine, celui-ci est stoppé, et le suivant est lancé:
      if (timers[workOrBreak].minutes === 0) {
        return switchTimer(workOrBreak);
      }
      timers[workOrBreak].seconds = 59; // Si le compteur descend en dessous de 0, le nombre de secondes est mis à jour à 59 
      timers[workOrBreak].minutes -= 1; // Si le compteur descend en dessous de 0, décrémente le compteur de minute.
    }
    // Mise à jour des minutes:
    updateTimer(workOrBreak, "minutes", timers[workOrBreak].minutes);
    updateTimer(workOrBreak, "seconds", timers[workOrBreak].seconds);

  }, 1000)
}

function switchTimer(workOrBreak) {
  // L'intervalle est stoppé, et l'autre compteur est lancé:
  clearInterval(timers[workOrBreak].timerID);
  if (workOrBreak === "work") {
    if (timers["break"].count === 4) { 
      timers["break"].minutes *= 3; // Après quatres pauses, la durée de la pause est trois fois plus longue.
      timers["break"].count = 0;
      // Les tomates sont réinitialisés:
      setTomatoesOpacity(0);
    }
    timers["break"].minutes = workTimeRange.value; // La valeur est réinitialiser à la valeur du de l'input.
    startTimer("break");
    countingDown["work"] = false;
  }
  if (workOrBreak === "break") {
    timers["break"].count += 1;
    // Une tomate devient opaque:
    setTomatoesOpacity(timers["break"].count);
    timers["work"].minutes = workTimeRange.value; // La valeur est réinitialiser à la valeur du de l'input.
    startTimer("work");
    countingDown["break"] = false;
  }
}

function pauseTimer() {
  clearInterval(timers["work"].timerID);
  clearInterval(timers["break"].timerID);
  pause = true;
}

function setTomatoesOpacity(numberOfTomatoes) {
  const tomatoes = document.querySelectorAll(".tomato-session");
  // Le nombre de tomate opaque est ajustée:
  for (let iteration = 0; iteration < 4; iteration ++) {
    if (iteration < numberOfTomatoes) {
      tomatoes[iteration].style.opacity = 1;
    } else { tomatoes[iteration].style.opacity = 0.25;}
  }
}