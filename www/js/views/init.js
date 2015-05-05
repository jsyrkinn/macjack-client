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
  viewPlayer = new ViewPlayer(x, y, player);

  viewPlayer.renderPile();
  viewPlayer.renderPlayerSumText();
  viewPlayer.renderPlayerBetText();
  viewPlayer.renderPlayerName();
  viewPlayer.renderPlayerMoney()

  return viewPlayer
}


function makeNewViewOpponent(opponent, x, y) {
  viewOpponent = new ViewOpponent(x, y, opponent);

  viewOpponent.renderPile();
  //viewOpponent.renderOpponentSum();
  viewOpponent.renderOpponentName();
  viewOpponent.renderOpponentBet();

  return viewOpponent
}


function makeNewViewDealer(dealerHand, x, y) {
  viewDealer = new ViewDealer(x, y, dealerHand);

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

    window.stage.removeChildren(); 

    makeNewViewDealer(modelGameState.dealerHand, window.innerWidth/2.4, window.innerHeight/5.5);

    modelGameState.opponents.forEach(function(opponent) {
      makeNewViewOpponent(opponent, 100, 500);
    });

    var player = modelGameState.player
    makeNewViewPlayer(player, window.innerWidth/2.4, window.innerHeight-125);

    //TODO: This if statement should call functions- 
    //1. displays text for end of round 
    //2. displays two buttons (quit or new round)
    //Both of these need to be displayed on a pop up box that is darker than the rest of the game so it's visible
    if (modelGameState.finished) {
      newRoundText = new PIXI.Text("End of round. \n Would you like to play again?", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
      positionAndAddText(newRoundText, window.innerWidth/2, window.innerHeight/2.5)
  
      addButton(
        {  position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
        "img/buttons/newRound.png",
        function(touchData) {
          console.log("New Round!");
          sendContinue();
        }
      );

      //TODO: add another button: for quitting - going back to home screen (join/new game)

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
