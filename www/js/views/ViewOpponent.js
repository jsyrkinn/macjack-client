function ViewOpponent(x,y) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.pile = new CardPile();

  this.renderPile = function() {
    this.cardSprites = [];

    var cards = this.pile.cards;

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i]);

      cardSprite.sprite.scale.x = 0.25;
      cardSprite.sprite.scale.y = 0.25;

      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);
    }
  }

//TODO: JAMEY- This should call some function such as 'getPlayerName()' from cardPile.js and print the opponent's name
  this.renderOpponentName = function() {
    nameText = new PIXI.Text(this.pile.getPlayerName(), {font:"20px PoiretOne", fill:"#f3f3f3"});
    // nameText.position.x = window.innerWidth/2;
    // nameText.position.y = window.innerHeight - 200;
    // window.stage.addChild(nameText);
  }

//TODO: JAMEY- This should call bet() from cardPile.js and print the bet
  this.renderOpponentBet = function() {
    betText = new PIXI.Text(this.pile.getBet(), {font:"20px PoiretOne", fill:"#f3f3f3"});
    // betText.position.x = window.innerWidth/2;
    // betText.position.y = window.innerHeight - 200;
    // window.stage.addChild(betText);
  }

  this.movePile = function(x, y) {
    for (var i = 0; i < cardSprites.length; i++) {

      cardSprites[i].sprite.position.x = x+(i*50);
      cardSprites[i].sprite.position.y = y;
    }
  }
}
