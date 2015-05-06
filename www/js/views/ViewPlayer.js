function ViewPlayer(x,y, player) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.playerName = player.playerName;
  this.money = player.money;
  this.piles = [];
  this.container = new PIXI.DisplayObjectContainer();
  window.stage.addChild(this.container);
  this.container.position = {x: x, y: y};
  this.container.pivot = {x: 0.5, y: 0.5};

  viewPlayer = this;

  player.hands.forEach(function(hand) {
    cardPile = new CardPile(hand)
    viewPlayer.piles.push(cardPile);
  });

  this.renderPile = function() {
    this.cardSprites = [];

    var cards = this.piles[0].cards;
    var offset = (cards.length*50)/2;
    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i], window.stage);

      cardSprite.sprite.scale.x = 0.25;
      cardSprite.sprite.scale.y = 0.25;
      //TODO centering with anchor position.
      cardSprite.sprite.anchor.x = 0.5;
      cardSprite.sprite.anchor.y = 0.5;

      //TODO: refine logic to space out the cards
      cardSprite.sprite.position.x = x+(i*50)- offset;
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);

    }
  }

  this.renderPlayerSum = function() {
    sumText = new PIXI.Text(this.piles[0].sumTotal(), {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(sumText, this.container, 80, 76);
  }

  this.renderPlayerBet = function() {
    betText = new PIXI.Text("$" + this.piles[0].bet, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, this.container, -30, 76);
  }

  this.renderPlayerName = function() {
    nameText = new PIXI.Text("YOU", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, this.container, 28, -73);
  }

  this.renderPlayerMoney = function() {
    moneyText = new PIXI.Text("TOTAL: $" + this.money, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(moneyText, this.container, 25, 110);
  }

  this.movePile = function(x, y) {
    for (var i = 0; i < cardSprites.length; i++) {

      //TODO: refine logic to space out the cards
      cardSprites[i].sprite.position.x = x+(i*50);
      cardSprites[i].sprite.position.y = y;
    }
  }
}
