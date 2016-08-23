---
layout: default
noindex: true
comments: false
title: "The complete code for the harmonic oscillator."
---

# Magic card experiment

<p>Number of experiments<br>
    <input class="CardsExperiment-input" type="number" name="springConstant" min="1" max="100000" step="1" pattern="\d*">
</p>

<p>
  <button class="CardsExperiment-runButton">Run experiments</button>
</p>

<p>
  <span>Success rate:</span> <span class="CardsExperiment-successRate">Unknown</span>
</p>

<script>

(function(){
  var originalDeck = [
    "AH",
    "2H",
    "3H",
    "4H",
    "5H",
    "6H",
    "7H",
    "8H",
    "9H",
    "10H",
    "JH",
    "QH",
    "KH",
    "AD",
    "2D",
    "3D",
    "4D",
    "5D",
    "6D",
    "7D",
    "8D",
    "9D",
    "10D",
    "JD",
    "QD",
    "KD",
    "AC",
    "2C",
    "2C",
    "2C",
    "5C",
    "6C",
    "7C",
    "8C",
    "9C",
    "10C",
    "JC",
    "QC",
    "KC",
    "AS",
    "2S",
    "3S",
    "4S",
    "5S",
    "6S",
    "7S",
    "8S",
    "9S",
    "10S",
    "JS",
    "QS",
    "KS"];

  var button = document.querySelector(".CardsExperiment-runButton");

  function updateSuccessRate(text) {
    var successRate = document.querySelector(".CardsExperiment-successRate");
    successRate.innerHTML=text;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  /**
   * Removes "number" from the start of the deck.
   * Return the last card dealt or null if the deck does not have enough
   * cards to deal.
   */
  function dealCardsFromDeck(deck, number) {
    if (deck.length < number) { return null; }
    var cardsDealt = deck.splice(0, number);
    return cardsDealt[cardsDealt.length - 1];
  }

  /**
   * Returns a card value number:
   *   Ace is one,
   *   Jack, Queen or King are 5,
   *   the remaining cards are their face value.
   */
  function cardValue(card) {
    var rank = card[0];

    switch(rank) {
      case "A":
        return 1;
        break;
      case "J":
      case "K":
      case "Q":
        return 5;
        break;
      default:
        if (card.length == 3) { return 10; } // This is card "10"
        return parseInt(rank, 10);
    }
  }

  function runExperiment() {
    var shuffledDeck = originalDeck.slice();

    // Shuffle the deck
    shuffledDeck = shuffleArray(shuffledDeck);

    // Volunteer picks a random number between 1 and 10
    var randomNumber = getRandomInt(1,10);

    var lastCard = dealCardsFromDeck(shuffledDeck, randomNumber);

    var len = shuffledDeck.length;
    updateSuccessRate("random: " + randomNumber + " " + len + " " + lastCard + " " + cardValue(lastCard));
  }

  button.onclick = runExperiment;

  document.write("hello");
})();

</script>
