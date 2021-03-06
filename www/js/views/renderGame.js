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

  return viewPlayer;
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

  return viewOpponent;
}

function makeNewViewDealer(dealerHand, x, y) {
  viewDealer = new ViewDealer(x, y, dealerHand);

  viewDealer.renderPile();
  viewDealer.renderDealerSum();
  viewDealer.renderDealerName();

  return viewDealer;
}

function addTouchHandlerToStage() {
  if (window.touchHandler) {
    if (window.stage.children.indexOf(window.touchHandler.touchHandler) < 0) {
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
    makeNewViewOpponent(opponentList[0], innerWidth/1.9, innerHeight/2.1, 0.2, 0.2);
  } else if (len == 2) {
    makeNewViewOpponent(opponentList[0], innerWidth*1/3, innerHeight/2, 0.18, 0.18);
    makeNewViewOpponent(opponentList[1], innerWidth*2/3, innerHeight/2, 0.18, 0.18);
  }
}

function createGameStateView(modelGameState) {
  if (modelGameState.betting) {
    if (window.betGoing) {
      startSpinner();
    } else {
      makeBetScreen(modelGameState);
    }
  } else {  //betting is finished
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

    if (modelGameState.finished) {
      stage.addChild(rectangle(0, window.innerHeight/2.9, 1000, 180, 0x42494E, 0x42494E, 10));
      newRoundText = new PIXI.Text("End of round. \n Would you like to play again?", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
      positionAndAddText(newRoundText, window.stage, window.innerWidth/2, window.innerHeight/2.5)

      addButton(
        {   scale: {x:0.8, y:0.8},
           anchor: {x:0.0, y:0.0},
         position: {x:innerWidth/2.8, y:innerHeight/1.8}  },
        "img/buttons/quit.png",
        function(touchData){
          leaveGame();
        }
      );

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
