const cardBoard = document.querySelector("#cardboard");
const imgs = [
  "vue.svg",
  "angular.svg",
  "react.svg",
  "ember.svg",
  "backbone.svg",
  "aurelia.svg"
];

let cardHTML = "";

// Embaralha o array imgs
imgs.sort(() => Math.random() - 0.5);

imgs.forEach(img => {
  cardHTML += `<div class="memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}"/>
    <img class="back-face" src="img/js-badge.svg">
  </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim da Renderização HTML */

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;
let pairsFound = 0; // variável para controlar o número de pares encontrados

function flipCard() {
  if (lockCards) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);

  // incrementa o contador de pares encontrados se houver um par correspondente
  if (isMatch) {
    pairsFound++;
    if (pairsFound === imgs.length) {
      // exibe a mensagem de fim de jogo quando todos os pares forem encontrados
      setTimeout(() => {
        alert("Parabéns, você ganhou o jogo!");
      }, 1000);
    }
  }
}

function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));