function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  let randomNumber1;
  let randomNumber2;
  let result;

  randomNumber1 = generateRandomNumber();
  randomNumber2 = generateRandomNumber();

  document
    .querySelector(".img1")
    .setAttribute("src", `images/dice${randomNumber1}.png`);

  document
    .querySelector(".img2")
    .setAttribute("src", `images/dice${randomNumber2}.png`);

  if (randomNumber1 > randomNumber2) result = "🚩 Player 1 Wins!";
  else if (randomNumber1 < randomNumber2) result = "Player 2 Wins! 🚩";
  else result = "Draw!";

  document.querySelector("h1").textContent = result;
}
