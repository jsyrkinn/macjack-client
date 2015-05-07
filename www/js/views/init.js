// create an new instance of a pixi stage
var interactive = true
window.stage = new PIXI.Stage(0x5F6870, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

checkHomeScreen();


function makeNewViewPlayer(player, x, y) {
  viewPlayer = new ViewPlayer(x, y, player);

  viewPlayer.renderPile();
  viewPlayer.renderPlayerSum();
  viewPlayer.renderPlayerBet();
  viewPlayer.renderPlayerName();
  viewPlayer.renderPlayerMoney();

  if (player.isCurrentPlayer){
    viewPlayer.renderCurrentPlayerSignal();
  }

  return viewPlayer
}


function makeNewViewOpponent(opponent, x, y, scaleX, scaleY) {
  viewOpponent = new ViewOpponent(opponent, x, y, scaleX, scaleY);

  viewOpponent.renderPile();
  viewOpponent.renderOpponentName();
  viewOpponent.renderOpponentBet();
  viewOpponent.renderOpponentSum();

  if (opponent.isCurrentPlayer){
  viewOpponent.renderCurrentPlayerSignal();
  }

  return viewOpponent
}


function makeNewViewDealer(dealerHand, x, y) {
  viewDealer = new ViewDealer(x, y, dealerHand);

  viewDealer.renderPile();
  viewDealer.renderDealerSum();
  viewDealer.renderDealerName();

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

function addGameIDText(){
    var gameIDText = new PIXI.Text("Game ID: ", {font:"14px 'Poiret One' bold", fill:"#f3f3f3"});
    var gameIDNumberText = new PIXI.Text(window.gameID, {font:"14px 'Poiret One' bold", fill:"#f6b26b"});
    positionAndAddText(gameIDText, window.stage, window.innerWidth/10, window.innerHeight/19);
    positionAndAddText(gameIDNumberText, window.stage, window.innerWidth/10.7, window.innerHeight/12.5);
}

function repositionOpponents(opponentList) {
  var len = opponentList.length;

  if (len == 1) {
    makeNewViewOpponent(opponentList[0], innerWidth/2,innerHeight/2, 0.2, 0.2);
  } else if (len == 2) {
    makeNewViewOpponent(opponentList[0], innerWidth/5, innerHeight/2, 0.18, 0.18);
    makeNewViewOpponent(opponentList[1], innerWidth*5/6, innerHeight/2, 0.18, 0.18);
  }
  //} else if (len == 3) {

  //} else if (len == 4) {

  // }
  // else {
  //    console.log("too many players!")
  // }
}

function createGameStateView(modelGameState) {
  if (modelGameState.betting) {
    if (window.betGoing) {
      startSpinner();
    } else {
      makeBetScreen(modelGameState);
    }
  } else {
    //betting is finished
    window.betGoing = false;
    stopSpinner();

    if (window.textBox) { //bet textbox already exists
      window.textBox.parentNode.remove(); 
      window.textBox = null;
    }

    window.stage.removeChildren();

    addGameIDText();

    //Making the dealer, player, and opponents
    makeNewViewDealer(modelGameState.dealerHand, window.innerWidth/2.4, window.innerHeight/5.5);
    var opponents = modelGameState.opponents;
    repositionOpponents(opponents);
    var player = modelGameState.player;
    makeNewViewPlayer(player, window.innerWidth/2, window.innerHeight-125);




    //TODO: Add dark pop up box around these buttons and text
    if (modelGameState.finished) {
      newRoundText = new PIXI.Text("End of round. \n Would you like to play again?", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
      positionAndAddText(newRoundText, window.stage, window.innerWidth/2, window.innerHeight/2.5)

      // leave game button
      addButton(
        {   scale: {x:0.8, y:0.8},
           anchor: {x:0.0, y:0.0},
         position: {x:innerWidth/2.8, y:innerHeight/1.85}  },
        "img/buttons/quit.png",
        function(touchData){
          leaveGame();
        }
      );

      // add continue button
      addButton(
        {  position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
        "img/buttons/newRound.png",
        function(touchData) {
          console.log("New Round!");
          sendContinue();
        }
      );
    } else {
      addTouchHandlerToStage();
    }
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
  spinner.position = {x: window.innerWidth/2, y: window.innerHeight/2};
  spinner.anchor = {x: 0.5, y: 0.5};
  spinner.scale = {x: 0.5, y:0.5};
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
