function ViewOpponent(x,y, opponent) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.playerName = opponent.playerName;
  this.money = opponent.money;
  this.piles = [];

  viewOpponent = this;

  opponent.hands.forEach(function(hand) {
    cardPile = new CardPile(hand)
    viewOpponent.piles.push(cardPile);
  });

  this.renderPile = function() {
    this.cardSprites = [];

    var cards = this.piles[0].cards;

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i]);

      cardSprite.sprite.scale.x = 0.25;
      cardSprite.sprite.scale.y = 0.25;

      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);
    }
  }

  this.renderOpponentName = function() {
    nameText = new PIXI.Text(this.playerName, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, window.innerWidth/2, window.innerHeight/2)
  }

  this.renderOpponentBet = function() {
    betText = new PIXI.Text(this.piles[0].bet, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, window.innerWidth/2, window.innerHeight/2)
  }

  this.movePile = function(x, y) {
    for (var i = 0; i < cardSprites.length; i++) {

      cardSprites[i].sprite.position.x = x+(i*50);
      cardSprites[i].sprite.position.y = y;
    }
  }
}
