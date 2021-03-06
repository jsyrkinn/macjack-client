function ModelGameState(gameState) {
  this.dealerHand = gameState.dealerHand;
  this.opponents = [];
  this.player = null;
  this.betting = gameState.betting;
  this.finished = gameState.finished;
  model = this;
  gameState.players[gameState.currentPlayer].isCurrentPlayer = true;

  gameState.players.forEach(function(player) {
    player.piles = [];
    player.hands.forEach(function(hand) {
      cardPile = new CardPile(hand);
      player.piles.push(cardPile);
    });

    if (player.playerID == window.clientID) {
      model.player = player;
    } else {
      model.opponents.push(player);
    }
  });
}
