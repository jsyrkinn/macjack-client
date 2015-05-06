function ViewOpponent(opponent, x, y, scaleX, scaleY) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.playerName = opponent.playerName;
  this.money = opponent.money;
  this.piles = [];

  viewOpponent = this;

  this.container = new PIXI.DisplayObjectContainer();
  window.stage.addChild(this.container);
  this.container.position = {x: x, y: y};
  this.container.pivot = {x: 0.5, y: 0.5};
  this.hiddenCardSprite = new PIXI.Sprite.fromImage("img/cards/cardBack.png");
  this.hiddenCardSprite.scale = {x:0.25, y: 0.25};
  this.hiddenCardSprite.anchor = {x:0.5, y: 0.5};
  this.hiddenCardSprite.position.x = x;
  this.hiddenCardSprite.position.y = y;

  opponent.hands.forEach(function(hand) {
    cardPile = new CardPile(hand, window.stage);
    viewOpponent.piles.push(cardPile);
  });

  this.renderPile = function() {
    this.cardSprites = [];

    var cards = this.piles[0].cards;

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i], window.stage);

      cardSprite.sprite.scale.x = scaleX;
      cardSprite.sprite.scale.y = scaleY;

      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);
    }
  }

  this.renderOpponentName = function() {
    nameText = new PIXI.Text(this.playerName.toUpperCase(), {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, this.container, 28, -73);
  }

  this.renderOpponentBet = function() {
    betText = new PIXI.Text("$" + this.piles[0].bet, {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, this.container, -25, 65);
  }

  this.renderOpponentSum = function() {
    sumText = new PIXI.Text(this.piles[0].sumTotal(), {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(sumText, this.container, 80, 65);
  }
}
