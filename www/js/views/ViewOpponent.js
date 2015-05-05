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

      cardSprite.sprite.scale.x = 0.20;
      cardSprite.sprite.scale.y = 0.20;

      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);
    }
  }

  this.renderOpponentName = function() {
    nameText = new PIXI.Text(this.playerName.toUpperCase(), {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, window.innerWidth/2, window.innerHeight/2.5);
  }

  this.renderOpponentBet = function() {
    betText = new PIXI.Text("$" + this.piles[0].bet, {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, window.innerWidth/3.1, window.innerHeight/1.9);
  }

  this.renderOpponentSum = function() {
    sumText = new PIXI.Text(this.piles[0].sumTotal(), {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, window.innerWidth/1.5, window.innerHeight/1.7);
  }
}
