---
layout: default
noindex: true
comments: false
title: "The complete code for magic card trick."
---


# The source code for the maric card trick

This is the complete source code for the [magic card trick](/files/2016/08/card_experiment/).

```Html
<p class='isTextCentered'>
  <button class="CardsExperiment-runButton Button">Repeat the experiment</button> <input class="CardsExperiment-numberOfTrials isTextCentered Input Input--isMedium" type="number" min="1" max="100000" step="1" pattern="\d*" value="10000"> times
</p>

<h3 class="isTextCentered">
  <span>Success rate:</span> <span class="CardsExperiment-successRate">unknown</span>
</h3>

<script>

(function(){
  // The deck of cards. The first character is the rank and the second is the suit.
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

  /**
   * Updates the success rate message.
   */
  function updateSuccessRate(text) {
    var successRate = document.querySelector(".CardsExperiment-successRate");
    successRate.innerHTML=text;
  }

  /**
   * Returns the number of trials the user has selected. The default number is 1000.
   */
  function numberOfTrialsSelected() {
    var input = document.querySelector(".CardsExperiment-numberOfTrials");
    var value = parseInt(input.value, 10);

    if (isNaN(value)) {
      input.value = 1000;
      return 1000;
    }

    return value;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Sorts the array with random order.
   */
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
      var currentLastCard = dealCardsFromDeck(deck, number);

      if (currentLastCard === null) {
        return lastCardDealt;
      } else {
        lastCardDealt = currentLastCard;
        number = cardValue(lastCardDealt);
      }
    }
    while (true);
  }

  var successes = 0;// The number of successful experiments;

  /**
   * Shows the proportion of successful trials to the user.
   */
  function showSuccessRate(numberOfTrials) {
    var proportion = successes / numberOfTrials;

    proportion = parseFloat(Math.round(proportion * 100000) / 100000).toFixed(5);
    updateSuccessRate(proportion);
  }

  /**
   * Shuffles the deck and runs the experiment many times.
   */
  function repeatTheExperiment() {
    successes = 0;
    var numberOfTrials = numberOfTrialsSelected();

    for (var i = 0; i < numberOfTrials; i++) {
      if (runExperiment()) {
        successes += 1;
      }
    }

    showSuccessRate(numberOfTrials);
  }

  /**
   * Shuffles the deck and runs the experiment.
   * Returns true if the experiment was successful (when magician and volunteer select the same card)
   */
  function runExperiment() {
    var shuffledDeck = originalDeck.slice();

    // Volunteer shuffles the deck
    var shuffledDeckVolunteer = shuffleArray(shuffledDeck);

    // Make a copy of volunteer's deck, it will be used later by the magician
    var shuffledDeckMagician = shuffledDeckVolunteer.slice();

    // Volunteer picks a random number between 1 and 10
    var randomNumber = getRandomInt(1, 10);

    // Volunteer deals the cards
    var lastCardVolunteer = dealCards(shuffledDeckVolunteer, randomNumber);

    // Magician deals the cards starting with 1
    var lastCardMagician = dealCards(shuffledDeckMagician, 1);

    return lastCardVolunteer === lastCardMagician;
  }


  button.onclick = repeatTheExperiment;
})();

</script>
```