let stringGameOver = "Game Over, Press Any Key to Restart";
let state = {
  WAIT: 0,
  START: 1,
  SHOW: 2,
  INPUT: 3,
  GAMEOVER: 4,
};
let gameState = state.WAIT;
let buttonColours = ["green", "red", "yellow", "blue"];
let randomChosenColour = [];
let playerInput = [];
let titleSelector = $(".title");
let gameOverSound = new Audio("sounds/wrong.mp3");

$(".btn").click((e) => {
  if (gameState === state.INPUT) {
    gameState = state.WAIT;
    let color = e.target.classList[1];
    playerInput.push(color);
    $(`#${color}`).addClass("clickOnBtn");
    playSoundColor(color);
    setTimeout(() => {
      $(`#${color}`).removeClass("clickOnBtn");
    }, 100);
    comparePlayerInput();
  }
});

function btnOnClick(color) {}

function gameOver() {
  gameState = state.GAMEOVER;
  gameOverSound.play();
  titleSelector.html(stringGameOver);
  $("body").addClass("gameOver");
  setTimeout(() => {
    $("body").removeClass("gameOver");
  }, 100);
  randomChosenColour = [];
}

function playSoundColor(color) {
  let sound;
  switch (color) {
    case "green":
      sound = new Audio("sounds/green.mp3").play();
      break;
    case "red":
      sound = new Audio("sounds/red.mp3").play();

      break;
    case "yellow":
      sound = new Audio("sounds/yellow.mp3").play();

      break;
    case "blue":
      sound = new Audio("sounds/blue.mp3").play();

      break;
  }
  delete sound;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function comparePlayerInput() {
  if (
    playerInput[playerInput.length - 1] !=
    randomChosenColour[playerInput.length - 1]
  ) {
    gameOver();
    return;
  }
  if (playerInput.length === randomChosenColour.length)
    setTimeout(nextSequence, 700);
  else gameState = state.INPUT;
}

function nextSequence() {
  playerInput = [];
  gameState = state.SHOW;
  let color = buttonColours[generateRandomNumber()];
  randomChosenColour.push(color);
  titleSelector.html(`Level ${randomChosenColour.length}`);
  playSoundColor(color);
  $(`.${color}`).fadeOut(100).fadeIn(100);
  gameState = state.INPUT;
}

function game() {
  randomChosenColour = [];
  setTimeout(nextSequence, 200);
}

$(document).keydown((e) => {
  if (gameState === state.WAIT || gameState === state.GAMEOVER) {
    gameState = state.SHOW;
    game();
  }
});
