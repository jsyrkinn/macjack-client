// create an new instance of a pixi stage
var interactive = true
window.stage = new PIXI.Stage(0x5F6870, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


/*
deck = new Deck();

//TODO: function to calculate xy position for player and dealer
dealer = new ViewDealer(100,150);

dealerPile = dealer.pile.cards;

dealerPile.push(deck.drawCard());

dealer.renderPile();
*/

touchHandler = new TouchHandler();



var newGameRequest = new XMLHttpRequest();

newGameRequest.open( "GET", 'http://' + serverIP + ':1337/games/1/state.json', true );
newGameRequest.setRequestHeader('X-auth-code', 1);  //replace with actual client auth

newGameRequest.onload = function() {
  //call the next poll

  if (this.status >= 200 && this.status < 400) {
    // Success!
    console.log("success!");
    var serverGameState = JSON.parse(this.response);
    if (serverGameState.moveNumber != gameState.moveNumber) {
      gameState = serverGameState;
      var modelGameState = new ModelGameState(gameState);
      createGameStateView(modelGameState);
    }
  }
};

newGameRequest.onerror = function() {
  //call the next poll
  poll();

  console.log('Connection Failed');
};

newGameRequest.send();




function repositionAllHands(player, dealer, opponents) {

}

function repositionOpponents(opponentList) {
  var len = opponentList.length;

  if (len == 0) {

  } else if (len == 1) {

  } else if (len == 2) {

  } else if (len == 3) {

  } else if (len == 4) {

  } else {
     console.log("too many players!")
  }

  allPlayers.forEach(function(player) {
    player.movePile(x, y);
  });

}


function makeNewViewPlayer(player, x, y) {
  viewPlayer = new ViewPlayer(x, y);

  // change to display multiple hands
  player.hands[0].cards.forEach(function(card) {
     viewPlayer.pile.push(card);
  });

  viewPlayer.renderPile();
  viewPlayer.renderSumText();

  return viewPlayer
}


function makeNewViewOpponent(opponent, x, y) {
  viewOpponent = new ViewOpponent(x, y);

  // change to display multiple hands
  opponent.hands[0].cards.forEach(function(card) {
     viewOpponent.pile.push(card);
  });

  viewOpponent.renderPile();

  return viewOpponent
}


playerClient = new ViewPlayer(80,window.innerHeight - 150); // somewhere

allPlayers = [];

function createGameStateView(modelGameState) {

  window.stage.removeChildren(); // remove all sprites from stage

  modelGameState.opponents.forEach(function(opponent) {
    allPlayers[opponent.playerID] = makeNewViewPlayer(opponent, 100, 100);
  });

  var player = modelGameState.player

  allPlayers[player.playerID] = makeNewViewPlayer(player, 80,window.innerHeight - 150);

  // repositionAllHands();

};



getClientAuth();
//setupNewGame();
//testHit();
poll();


requestAnimFrame( animate );

function animate() {
  requestAnimFrame( animate );
  // put anything that needs to be animated in here
  // render the stage

  renderer.render(window.stage);

}
