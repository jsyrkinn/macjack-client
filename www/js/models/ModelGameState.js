function ModelGameState(gameState) {
  //players is list of player objects. player.hands, player.playerID
  //gameState.dealerCards
  this.opponents = [];
  this.player = null;

  model = this;

  gameState.players.forEach(function(player) {
    if (player.playerID == window.clientID) {
      model.player = player;
    } else {
      model.opponents.push(player);
    }

  });


  this.dealerCards = gameState.dealerCards;


}
