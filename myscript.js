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
  for (i = 0; i < suits.length; i++) {
    for (n = 0; n < cards.length; n++) {
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
console.log(player1, player2);
// console.log(communityCards);

function checkHand(hand, cc) {
  let combinedHand = hand.concat(cc.join(" ")).join(" ");
  let combinedHandArray = combinedHand.split(" ");
  var combinedHandArrayClone = [...combinedHandArray];

  const madeHands = {
    hasPair: false,
    hasTwoPair: false,
    hasThreeOfaKind: false,
    hasStraight: false,
    hasFlush: false,
    hasFullHouse: false,
    hasFourOfaKind: false,
    hasStraightFlush: false,
    hasRoyalFlush: false,
    handStrength: 0,
    typeOfFlush : ''
  };

  function checkPair(hand) {
    for (let i = 0; i < hand.length; i++) {
      for (let n = 0; n < hand.length; n++) {
        if (hand[i][0] == hand[n][0] && i != n && madeHands.hasPair == false) {
          // Create copy to splice

          // Clone array is spliced to find second pair
          combinedHandArrayClone.splice(i, 1);
          combinedHandArrayClone.splice(n - 1, 1);

          madeHands.hasPair = true;
          madeHands.handStrength = 1;
          break;
        }
      }
    }
  }
  function checkTwoPair(hand) {
    for (let i = 0; i < hand.length; i++) {
      for (let n = 0; n < hand.length; n++) {
        if (madeHands.hasPair == true && hand[i][0] == hand[n][0] && i != n) {
          madeHands.hasTwoPair = true;
          madeHands.handStrength = 2;
          break;
        }
      }
    }
  }
  function checkThreeOfaKind(hand) {
    for (let i = 0; i < hand.length; i++) {
      for (let n = 0; n < hand.length; n++) {
        for (let y = 0; y < hand.length; y++) {
          if (
            madeHands.hasPair == true &&
            hand[i][0] == hand[n][0] &&
            hand[i][0] == hand[y][0] &&
            i != n &&
            i != y &&
            n != y
          ) {
            madeHands.hasThreeOfaKind = true;
            madeHands.handStrength = 3;
            break;
          }
        }
      }
    }
  }
  function checkStraight(hand) {
    // Check for straight
    // 14 cards without suits with A in the beginning
    let thirteenCardsInOrder = createDeck().slice(0, 13);
    let thirteenCardsWithoutSuit = [];
    thirteenCardsInOrder.forEach(removeSuit);
    function removeSuit(item, index, arr) {
      thirteenCardsWithoutSuit.push(item[0]);
    }
    thirteenCardsWithoutSuit.unshift("A");
    // temp Array with 5 cards
    // 9 itterations

    var sortedCombinedHandArray = [...hand].sort();
    // Sort player + communityCards
    function customSort(sortedArray, kindOfStraight) {
      var tempPlaceHolder = [];
      // If regular straight
      if (kindOfStraight == "regular") {
        for (let i = 0; i < sortedArray.length; i++) {
          // Loop for numbers
          if (isNaN(sortedArray[i][0]) != true) {
            tempPlaceHolder.push(sortedArray[i][0]);
          }
          // Loop for letters
          // Push T J Q K A to tempPlaceHolder
        }
        let letterCards = ["T", "J", "Q", "K", "A"];

        // Push spliced element into tempPlaceHolder function
        function pushTJQKA(card, t) {
          for (let i = 0; i < sortedArray.length; i++) {
            if (isNaN(card[i][0]) != false && card[i][0] == t) {
              tempPlaceHolder.push(card[i][0]);
            }
          }
        }
        for (let i = 0; i < letterCards.length; i++) {
          pushTJQKA(sortedArray, letterCards[i]);
        }
        // remove duplicates for reg straight
        let noDuplicateTemp = [...new Set(tempPlaceHolder)];
        noDuplicateTemp.unshift("A");
        // console.log(noDuplicateTemp);
        return noDuplicateTemp;
        // else if straight flush
      } else if (kindOfStraight == "flush") {
        for (let i = 0; i < sortedArray.length; i++) {
          // Loop for numbers
          if (isNaN(sortedArray[i][0]) != true) {
            tempPlaceHolder.push(sortedArray[i]);
          }
        }
        // Loop for letters
        // Push T J Q K A to tempPlaceHolder
        let letterCards = ["T", "J", "Q", "K", "A"];

        // Push spliced element into tempPlaceHolder function
        function pushTJQKA(card, t) {
          for (let i = 0; i < sortedArray.length; i++) {
            if (isNaN(card[i][0]) != false && card[i][0] == t) {
              tempPlaceHolder.push(card[i]);
            }
          }
        }
        for (let i = 0; i < letterCards.length; i++) {
          pushTJQKA(sortedArray, letterCards[i]);
          // console.log(sortedArray);
        }

        // console.log(tempPlaceHolder);
      }
    }
    let slicedArrayOfFive;
    for (let i = 0; i < 10; i++) {
      var tempArrayOfFive = [];
      tempArrayOfFive.push(thirteenCardsWithoutSuit.slice(i, i + 5));

      for (let n = 0; n < 4; n++) {
        slicedArrayOfFive = customSort(
          sortedCombinedHandArray,
          "regular"
        ).slice(n, n + 5);

        if (slicedArrayOfFive.toString() == tempArrayOfFive.toString()) {
          madeHands.hasStraight = true;
          madeHands.handStrength = 4;
          break;
        }
      }
    }
  }
  function checkFlush(hand) {
    const suitCounter = { hearts: 0, spades: 0, clubs: 0, diamonds: 0 };

    for (let i = 0; i < hand.length; i++) {
      if (hand[i][1] == "H") suitCounter.hearts++;
      if (hand[i][1] == "S") suitCounter.spades++;
      if (hand[i][1] == "C") suitCounter.clubs++;
      if (hand[i][1] == "D") suitCounter.diamonds++;
    }

    if (
      suitCounter.hearts == 5 ||
      suitCounter.spades == 5 ||
      suitCounter.clubs == 5 ||
      suitCounter.diamonds == 5
    ) {
      madeHands.hasFlush = true;
      madeHands.handStrength = 5;
    }
    for (i = 0; i < Object.values(suitCounter).length; i++) {
      if (Object.values(suitCounter)[i] > 4) {
        typeOfFlush = Object.keys(suitCounter)[i]
      }
    }
    console.log(suitCounter.typeOfFlush)
    
  }
  function checkFullHouse() {
    if (madeHands.hasTwoPair == true && madeHands.hasThreeOfaKind == true) {
      madeHands.hasFullHouse = true;
      madeHands.handStrength = 6;
    }
  }
  function checkFourOfaKind(hand) {
    for (let i = 0; i < hand.length; i++) {
      for (let n = 0; n < hand.length; n++) {
        if (hand[i][0] == hand[n][0] && i != n) {
          for (let x = 0; x < hand.length; x++) {
            if (hand[n][0] == hand[x][0] && n != x && i != x) {
              for (let y = 0; y < hand.length; y++) {
                if (hand[x][0] == hand[y][0] && x != y && n != y && i != y) {
                  madeHands.hasFourOfaKind = true;
                  madeHands.hasFullHouse = false;
                  madeHands.handStrength = 7;
                }
              }
            }
          }
        }
      }
    }
  }

  checkPair(combinedHandArray);
  checkTwoPair(combinedHandArrayClone);
  checkThreeOfaKind(combinedHandArray);
  checkStraight(combinedHandArray);
  checkFlush(combinedHandArray);
  checkFullHouse();
  checkFourOfaKind(combinedHandArray);

  // Log madeHands bools
  // console.log(madeHands);

  // Display current hand
  console.log(combinedHandArray);
  console.log("Hand strenght: " + madeHands.handStrength);
  // console.log(madeHands);
  return madeHands;
}
// const playerOneHandStrenght = checkHand(player1, communityCards).handStrength;
// const playerTwoHandStrenght = checkHand(player2, communityCards).handStrength;

// if (playerOneHandStrenght > playerTwoHandStrenght) {
//   console.log("Player 1 wins");
// } else if (playerTwoHandStrenght > playerOneHandStrenght) {
//   console.log("Player 2 wins");
// }
// checkHand(player2, communityCards);
// check;
// check Straight
// checkHand(["QH", "AC"], ["KD", "JD", "TS", "AD", "8C"]);
// check Full house
// checkHand(["QH", "AC"], ["KD", "AD", "TS", "AD", "QC"]);
// check Flush
checkHand(["QH", "AH"], ["KH", "2H", "TH", "AD", "QC"]);
// check Four of a kind
// checkHand(["QH", "AC"], ["AD", "KH", "AS", "AD", "8C"]);
// const playerOne = new player();
// playerOne.bank = 10;
// console.log(playerOne);
// // const playerOne = {
//   playerCurrentHand: [],
//   handStrength: 0 - 9,
//   bank: 10,
//   score: 0,
// };

// const playerTWO = {
//   playerCurrentHand: [],
//   bank: 10,
//   handStrength: 0 - 9,
//   score: 0,
// };

// // const currentRound = {
// //   pot: 0,
// // };

// function endGame() {
//   if player1 wins playerOne.score ++
//   resetGame() {
//     player1, player2 currentHand = [];
//     player1.handStrength = 0

//     communityCards = [];
//     freshDeck = [];
//   }
// }

// if (playerOne.handStrength > playerTWO.handStrength) {
//   console.log("playerOne wins");
// }
