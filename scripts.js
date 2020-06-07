const displays = document.querySelectorAll('.note-display');
const transitionDuration = 6000;
const totalRange = 100;

function strokeTransition(display, note) {
  let progress = display.querySelector('.circle__progress--fill');
  let radius = progress.r.baseVal.value;
  let circumference = 2 * Math.PI * radius;
  let offset = circumference * (totalRange - note) / totalRange;

  progress.style.setProperty('--initialStroke', circumference);
  progress.style.setProperty('--transitionDuration', `${transitionDuration}ms`);
}

function increaseNumber(display, number, className) {
  let element = display.querySelector(`.percent__${className}`),
    interval = transitionDuration / number,
    counter = 0;

  let increaseInterval = setInterval(() => {
    if (counter === number) { window.clearInterval(increaseInterval); }

    element.textContent = counter;
    counter++;
  }, interval);
}

displays.forEach(display => {
  let progress = display.querySelector('.circle__progress--fill');
  let radius = progress.r.baseVal.value; // <svg><circle r="38"... 
  let circumference = 2 * Math.PI * radius;
  let isMPH = display.dataset.mph;
  console.log("isMPH = " + isMPH)
  let note = parseFloat(display.dataset.note);
  let int = Number(display.dataset.note);
  int = isMPH ? int*1.5 : int*25;

  let offset = circumference * (totalRange - note) / totalRange;

  progress.style.setProperty('--transitionDuration', `${transitionDuration}ms`);
  progress.style.setProperty('--initialStroke', circumference);

  setTimeout(() => progress.style.strokeDashoffset = offset, 100)

  strokeTransition( display, note);
  increaseNumber(display, int, 'int');

});

