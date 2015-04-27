// create an new instance of a pixi stage
var interactive = true
window.stage = new PIXI.Stage(0x5F6870, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


checkHomeScreen();




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



allPlayers = [];

function createGameStateView(modelGameState) {

  window.stage.removeChildren(); // remove all sprites from stage

  modelGameState.opponents.forEach(function(opponent) {
    allPlayers[opponent.playerID] = makeNewViewPlayer(opponent, 100, 100);
  });

  var player = modelGameState.player

  allPlayers[player.playerID] = makeNewViewPlayer(player, 80,window.innerHeight - 150);

  // repositionAllHands();

  var deleteStoreButton = new PIXI.Sprite.fromImage("img/buttons/exitButtonBlue.png");

  deleteStoreButton.scale.x = 0.3;
  deleteStoreButton.scale.y = 0.3;
  deleteStoreButton.anchor.x = 0.0;
  deleteStoreButton.anchor.y = 0.0;
  deleteStoreButton.position.x = 0.0;
  deleteStoreButton.position.y = 0.0;

  deleteStoreButton.interactive = true;

  deleteStoreButton.tap = function(touchData){
    console.log("Bet!");
    sendBet(10);
  }

  window.stage.addChild(deleteStoreButton);

};


function stopSpinner() {
  window.showSpinner = false;
  window.spinners.forEach(function(spinner) {
    window.stage.removeChild(spinner);
  });
}


function startSpinner() {
  window.showSpinner = true;
  window.spinners.forEach(function(spinner) {
    window.stage.addChild(spinner);
  });
}

window.spinners = [];
var numSpinners = 5;

for (i = 0; i < numSpinners; i++) {
  var spinner = new PIXI.Sprite.fromImage("img/buttons/exitButtonBlue.png");
  spinner.position = {x: window.innerWidth/2, y: window.innerHeight/2}
  spinner.anchor = {x: 0.5, y: 0.5}
  spinner.scale = {x: 0.5, y:0.5}
  window.spinners.push(spinner);
}

requestAnimFrame( animate );

function animate() {
  requestAnimFrame( animate );
  // put anything that needs to be animated in here

  if (window.showSpinner) {
    for (i = 0; i < window.spinners.length; i++) {
      window.spinners[i].rotation += 0.009*i+0.01;
    }

    if (window.stage.children.indexOf(window.spinners[0]) < 0) {
      // spinner was removed by some other method than stopSpinner
      stopSpinner();
    }
  }

  // render the stage
  renderer.render(window.stage);

}
