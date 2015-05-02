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


//TODO: Create code to position opponents
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
  viewPlayer.renderPlayerSumText();
  viewPlayer.renderPlayerBetText();
  viewPlayer.renderPlayerName();

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


function makeNewViewDealer(dealerHand, x, y) {
  viewDealer = new ViewDealer(x, y);

  // change to display multiple hands
  dealerHand.cards.forEach(function(card) {
     viewDealer.pile.push(card);
  });

  viewDealer.renderPile();
  viewDealer.renderDealerSumText();
  viewDealer.renderDealerNameText();

  return viewDealer
}


function addTouchHandlerToStage() {
  if (window.touchHandler) {
    if (window.stage.children.indexOf(window.touchHandler.touchHandler) < 0) {
      // touchHandler was removed, add it back...
      window.stage.addChild(window.touchHandler.touchHandler);
    }
  } else {
    window.touchHandler = new TouchHandler();
  }


}


allPlayers = [];

function createGameStateView(modelGameState) {

  if (modelGameState.betting) {
    if (window.betGoing) {
      startSpinner();
    } else {
      makeBetScreen();
    }
  } else {
    //betting is finished
    window.betGoing = false;
    stopSpinner();

    if (window.betBox) {
      window.betBox.parentNode.remove(); // should remove form
      window.betBox = null;
    }

    window.stage.removeChildren(); // remove all sprites from stage

    makeNewViewDealer(modelGameState.dealerHand, 100, 100);

    modelGameState.opponents.forEach(function(opponent) {
      allPlayers[opponent.playerID] = makeNewViewOpponent(opponent, 100, 500);
    });

    var player = modelGameState.player
    allPlayers[player.playerID] = makeNewViewPlayer(player, 80,window.innerHeight - 150);

    //TODO move this button elsewhere
    if (modelGameState.finished) {
      addButton(
        {  position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
        "img/buttons/start.png",
        function(touchData) {
          console.log("New Round!");
          sendContinue();
        }
      );
    } else {
      addTouchHandlerToStage();
    }
    // repositionAllHands();
  }
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
