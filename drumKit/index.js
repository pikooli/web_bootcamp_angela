function playSound(e) {
  e.style.borderColor = "#da0463";

  let audio;
  switch (e.classList[0]) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      break;
    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      break;
    case "s":
      audio = new Audio("sounds/tom-3.mp3");
      break;
    case "d":
      audio = new Audio("sounds/tom-4.mp3");
      break;
    case "j":
      audio = new Audio("sounds/snare.mp3");
      break;
    case "k":
      audio = new Audio("sounds/kick-bass.mp3");
      break;
    case "l":
      audio = new Audio("sounds/crash.mp3");
      break;
  }
  if (audio) {
    audio.play();
    delete audio;
  }
  setTimeout(() => {
    e.style.borderColor = "#404b69";
  }, 500);
}

document.addEventListener("keydown", (e) => {
  let element = document.getElementsByClassName(e.key);
  if (element.length) element[0].click();
});
document.querySelectorAll("button").forEach((e) => {
  e.addEventListener("click", () => playSound(e));
});
