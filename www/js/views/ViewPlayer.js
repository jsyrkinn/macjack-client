function ViewPlayer(x,y, player) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.playerName = player.playerName;
  this.money = player.money;
  this.piles = [];

  viewPlayer = this;

  player.hands.forEach(function(hand) {
    cardPile = new CardPile(hand)
    viewPlayer.piles.push(cardPile);
  });

  this.renderPile = function() {
    this.cardSprites = [];

    var cards = this.piles[0].cards;

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i]);

      cardSprite.sprite.scale.x = 0.25;
      cardSprite.sprite.scale.y = 0.25;
      //TODO centering with anchor position.
      cardSprite.sprite.anchor.x = 0.5;
      cardSprite.sprite.anchor.y = 0.5;

      //TODO: refine logic to space out the cards
      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);

    }
  }

  this.renderPlayerSum = function() {
    sumText = new PIXI.Text(this.piles[0].sumTotal(), {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(sumText, window.innerWidth/1.5, window.innerHeight - 45);
  }

  this.renderPlayerBet = function() {
    betText = new PIXI.Text("$" + this.piles[0].bet, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, window.innerWidth/3.2, window.innerHeight - 45)
  }

  this.renderPlayerName = function() {
    nameText = new PIXI.Text("YOU", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, window.innerWidth/2, window.innerHeight/1.55)
  }

  this.renderPlayerMoney = function() {
    moneyText = new PIXI.Text("TOTAL: $" + this.money, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(moneyText, window.innerWidth/2, window.innerHeight - 10 )
  }

  this.movePile = function(x, y) {
    for (var i = 0; i < cardSprites.length; i++) {

      //TODO: refine logic to space out the cards
      cardSprites[i].sprite.position.x = x+(i*50);
      cardSprites[i].sprite.position.y = y;
    }
  }
}
