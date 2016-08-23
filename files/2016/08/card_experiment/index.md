---
layout: default
noindex: true
comments: false
title: "The complete code for the harmonic oscillator."
---

# Magic card trick

A magician performs the following card trick. She asks a volunteer to secretly select a number between 1 and 10 and deal out that many cards from a well- shuffled deck of 52 standard playing cards. The last card dealt determines a new number of cards to be dealt form those remaining: if it is an ace, the new number is 1; if it is a Jack, Queen or King, the new number is 5; otherwise the new number is the face value of the card. The process is repeated until there are not enough cards left in the deck to deal. The magician then identifies the last dealt card.

The trick is that the magician repeats the process with the same deck that was given to the volunteer starting with the number 1. This will usually (but not always) result in selecting the correct final card, no matter what number the volunteer originally selected.

---

## Cart experiment

The following program runs the magic trick multiple times and computes its *success rate*. By *success* here we mean an event when magician selects the same card as did the volunteer. By using the large number of experiments we can estimate the probability of the success for this trick.

<p>Number of experiments<br>
    <input class="CardsExperiment-input" type="number" name="springConstant" min="1" max="100000" step="1" pattern="\d*">
</p>

<p>
  <button class="CardsExperiment-runButton">Run experiments</button>
</p>

<p>
  <span>Success rate:</span> <span class="CardsExperiment-successRate">unknown</span>
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
   * Returns the last card dealt or null if the deck does not have enough
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
      case "J":
      case "K":
      case "Q":
        return 5;
      default:
        if (card.length == 3) { return 10; } // This is card "10"
        return parseInt(rank, 10);
    }
  }

  /**
   * Deals the cards from the deck until there are not enough cards to deal.
   *
   * Starts by dealing `number` of cards from the deck.
   * The last card dealt determines a new number of cards to be dealt form those remaining:
   *   if it is an ace, the new number is 1;
   *   if it is a Jack, Queen or King, the new number is 5;
   *   otherwise the new number is the face value of the card.
   *
   * Returns the last dealt card.
   */
  function dealCards(deck, number) {
    var lastCardDealt;

    do {
      var currentLastCart = dealCardsFromDeck(deck, number);

      if (currentLastCart === null) {
        return lastCardDealt;
      } else {
        lastCardDealt = currentLastCart;
        number = cardValue(lastCardDealt);
      }
    }
    while (true);
  }

  /**
   * Shuffles the deck and runs the experiment.
   */
  function runExperiment() {
    var shuffledDeck = originalDeck.slice();

    // Vounteer shuffles the deck
    var shuffledDeckVolunteer = shuffleArray(shuffledDeck);

    // Make a copy of volunteer's deck, it will be used later by the magician
    var shuffledDeckMagician = shuffledDeckVolunteer.slice();

    // Volunteer picks a random number between 1 and 10
    var randomNumber = getRandomInt(1,10);

    // Volunteer deals the cards
    var lastCardVolunteer = dealCards(shuffledDeckVolunteer, randomNumber);

    // Magician deals the cards starting with 1
    var lastCardMagician = dealCards(shuffledDeckMagician, 1);

    var len = shuffledDeckVolunteer.length;
    updateSuccessRate("volunteer: " + lastCardVolunteer + " magician: " + lastCardMagician);
  }



  button.onclick = runExperiment;
})();

</script>
