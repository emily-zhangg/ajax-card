const button = document.getElementById("create-game");
const playerBanner = document.getElementById("identity");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const dealButton = document.getElementById("deal");
const p1Card = document.getElementById("p1Card");
const p2Card = document.getElementById("p2Card");
const score = document.getElementById("score");
let player1Id;
let player2Id;
let p1Score = 0;
let p2Score = 0;
const makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};
const deck = makeDeck();
button.addEventListener("click", async () => {
  const gameElements = document.querySelectorAll(".game");
  gameElements.forEach((element) => {
    element.setAttribute("class", "show");
  });
  console.log("click");
  const dbData = await axios.get("/match");
  let randomPlayer = Math.floor(Math.random() * dbData.data.users.length);
  console.log(dbData);
  player1Id = dbData.data.users[Number(dbData.data.userCookie) - 1].id;
  console.log(dbData.data.users[Number(dbData.data.userCookie) - 1].id);
  const player1Name =
    dbData.data.users[Number(dbData.data.userCookie) - 1].email;
  while (randomPlayer + 1 == Number(dbData.data.userCookie)) {
    randomPlayer = Math.floor(Math.random() * dbData.data.users.length);
  }
  console.log(randomPlayer);
  player2Id = dbData.data.users[randomPlayer].id;
  const player2Name = dbData.data.users[randomPlayer].email;
  playerBanner.innerHTML = `Player 1: ${player1Name} vs Player 2:${player2Name}`;
});

dealButton.addEventListener("click", async () => {
  let winningPlayer;
  const card1 = deck.pop();
  const card2 = deck.pop();
  p1Card.innerHTML = `P1: ${card1.name} of ${card1.suit}`;
  p2Card.innerHTML = `P2: ${card2.name} of ${card2.suit}`;
  if (card1.rank > card2.rank) {
    winningPlayer = player1Id;
    p1Score += 1;
    player1.setAttribute("class", "show");
    player2.setAttribute("class", "hide");
  } else {
    winningPlayer = player2Id;
    p2Score += 1;
    player2.setAttribute("class", "show");
    player1.setAttribute("class", "hide");
  }
  console.log(player1Id);
  axios.post("/gameResult", [deck, [card1, card2], player1Id]);
  score.innerHTML = `P1 Score: ${p1Score} and p2 Score: ${p2Score}`;
});
