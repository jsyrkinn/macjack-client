function ViewOpponent(opponent, x, y, scaleX, scaleY) {

  this.playerName = opponent.playerName;
  this.money = opponent.money;
  this.piles = [];

  viewOpponent = this;

  this.container = new PIXI.DisplayObjectContainer();
  this.container.pivot = {x: 0.5, y: 0.5};
  this.container.position = {x: x, y: y};
  window.stage.addChild(this.container);

  opponent.hands.forEach(function(hand) {
    cardPile = new CardPile(hand, window.stage);
    viewOpponent.piles.push(cardPile);
  });

  this.renderPile = function() {
    var cardSpritesContainer = new PIXI.DisplayObjectContainer();
    cardSpritesContainer.anchor = {x: 0.5, y: 0.5}
    cardSpritesContainer.position = {x: 0, y: 0}
    this.container.addChild(cardSpritesContainer);

    var cards = this.piles[0].cards;

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i], cardSpritesContainer);

      var spacing = 30;

      var offset = (((cards.length-1)*spacing)+cardSprite.sprite.width)/2;

      cardSprite.sprite.scale = {x: scaleX, y: scaleY};

      cardSprite.sprite.anchor = {x: 0, y: 0.5}

      cardSprite.sprite.position.x = (i*spacing)-offset;
      cardSprite.sprite.position.y = 0;

    }
  }

  this.renderOpponentName = function() {
    var nameText = new PIXI.Text(this.playerName.toUpperCase(), {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, this.container, -7, -60);
  }

  this.renderOpponentBet = function() {
    var betText = new PIXI.Text("$" + this.piles[0].bet, {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, this.container, -51, 65);
  }

  this.renderOpponentSum = function() {
    var sumText = new PIXI.Text(this.piles[0].sumTotal(), {font:"15px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(sumText, this.container, 45, 65);
  }

  this.renderCurrentPlayerSignal = function() {
    var currentOpponentNameText = new PIXI.Text(this.playerName.toUpperCase(), {font:"15px Poiret One", fill:"#39c9ff"});
    positionAndAddText(currentOpponentNameText, this.container, -7, -60);
  }
}
