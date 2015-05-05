function ModelGameState(gameState) {
  this.dealerHand = gameState.dealerHand;
  this.opponents = [];
  this.player = null;
  this.betting = gameState.betting;
  this.finished = gameState.finished;
  model = this;
  
  gameState.players.forEach(function(player) {
    if (player.playerID == window.clientID) {
      model.player = player;
    } else {
      model.opponents.push(player);
    }
  });
}