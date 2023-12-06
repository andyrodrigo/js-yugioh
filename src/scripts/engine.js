const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playersSides: {
    player1: "player-cards",
    computer: "computer-cards",
    player1Box: document.querySelector("#player-cards"),
    computerBox: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};

const pathImages = "./src/assets/icons/";

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    WinOf: [0],
    LoseOf: [1],
  },
];

function getRamdomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

function createCardImage(randomIdCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", `${pathImages}card-back.png`);
  cardImage.setAttribute("data-id", randomIdCard);
  cardImage.classList.add("card");
  if (fieldSide === state.playersSides.player1) {
    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });
  }

  return cardImage;
}

function drawSelectedCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Atribute: " + cardData[index].type;
}

function removeAllCardsImages() {
  let cards = state.playersSides.computerBox;
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  cards = state.playersSides.player1Box;
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

function setCardsField(cardId) {
  removeAllCardsImages();
  let computerCardId = getRamdomCardId();

  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.style.display = "block";

  state.cardSprites.avatar;
  state.cardSprites.name.innerText = "selecione";
  state.cardSprites.name.innerText = "uma carta";

  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;

  let duelResults = checkDuelResults(cardId, computerCardId);

  drawButton(duelResults);
  updateScore();
}

function drawButton(text) {
  state.actions.button.innerText = text;
  state.actions.button.style.display = "block";
}

function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "Empate";
  let playerCard = cardData[playerCardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    duelResults = "Ganhou";
    state.score.playerScore++;
    playAudio("win");
  }

  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResults = "Perdeu";
    state.score.computerScore++;
    playAudio("lose");
  }
  return duelResults;
}

function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = getRamdomCardId();
    const cardImage = createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

function playAudio(status) {
  console.log(status);
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  try {
    audio.play();
  } catch {}
}

function resetDuel() {
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
  init();
}

function init() {
  drawCards(5, state.playersSides.player1);
  drawCards(5, state.playersSides.computer);
}

init();
