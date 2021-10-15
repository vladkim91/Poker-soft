'use strict'
function createDeck() {
    const suits = ["Heart", "Spade", "Diamond", "Club"];
    const cards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
      "A",
    ];
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let n = 0; n < cards.length; n++) {
        let suitShort = suits[i].slice(0, 1);
        deck.push(cards[n] + suitShort);
      }
    }
    //function returns brand new deck
    return deck;
  }
  
  // Shuffle and return shuffled deck
  function shuffleDeck(newDeck) {
    for (let i = newDeck.length - 1; i >= 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[randomIndex]] = [newDeck[randomIndex], newDeck[i]];
    }
    return newDeck;
  }
  
  let player1 = [];
  let player2 = [];
  let player3 = [];
  
  let freshDeck = shuffleDeck(createDeck());
  // Deal for 2 or 3
  function dealCards(deck, players) {
    if (players == 2) {
      function dealForTwo(deck, players) {
        player1 = [deck.splice(0, 1) + " " + deck.splice(players - 1, 1)];
        player2 = [deck.splice(0, 2).join(" ")];
      }
      dealForTwo(deck, players);
    }
    if (players == 3) {
      function dealForThree(deck, players) {
        player1 = [deck.splice(0, 1) + " " + deck.splice(players - 1, 1)];
        player2 = [deck.splice(0, 1) + " " + deck.splice(players - 2, 1)];
        player3 = [deck.splice(0, 2).join(" ")];
        console.log(player1, player2, player3);
        return player1, player2, player3;
      }
      dealForThree(deck, players);
    }
  }
  
  // Deal community cards
  let communityCards = [];
  // Burn one card
  function burnAndTurn(deck) {
    deck.splice(0, 1);
  }
  function dealFlop(deck) {
    burnAndTurn(deck);
    communityCards = deck.splice(0, 3);
  }
  function dealTurn(deck) {
    burnAndTurn(deck);
    communityCards.push(deck.splice(0, 1).join());
  }
  function dealRiver(deck) {
    burnAndTurn(deck);
    communityCards.push(deck.slice(0, 1).join());
  }


dealCards(freshDeck, 2);
dealFlop(freshDeck);
dealTurn(freshDeck);
dealRiver(freshDeck);