 //moves a player has made

 socket.on('drawnCard', function(drawnCard) {
    console.log(drawnCard);
    card = findCard(drawnCard.rank, drawnCard.suit);
    card.moveToHand();
    playerHand.push(card);
    handPosRecalc(playerHand);
  });


  socket.on('playedCard', function(playedCard) {
    console.log("playedCard:" + playedCard);
    card = findCard(playedCard.rank, playedCard.suit);
    console.log("card found");
    card.moveToBoard();
    idx = playerHand.indexOf(card);
    if (idx > -1) {
      // card found
      playerHand.splice(idx, 1);

      if (topCard) {
        topCard.moveToNull(); // hide previous top card
      }
      topCard = card;
    }
  });


  socket.on("Error", function(message) {
    console.log("Error: " + message);
  });

  // create button to draw new cards
  deckButtonTexture = PIXI.Texture.fromImage("img/cards/card_back.jpg");
  var deckButtonSprite = new PIXI.Sprite(deckButtonTexture);

  deckButtonSprite.scale.x = 0.3;
  deckButtonSprite.scale.y = 0.3;

  deckButtonSprite.anchor.x = 0.5;
  deckButtonSprite.anchor.y = 0.5;

  deckButtonSprite.position.x = window.innerWidth*0.250;
  deckButtonSprite.position.y = window.innerHeight*0.200;

  deckButtonSprite.interactive = true;
  window.stage.addChild(deckButtonSprite);

  deckButtonSprite.tap = function(touchData){
    console.log("TAP!");
    socket.emit("draw");
  }
