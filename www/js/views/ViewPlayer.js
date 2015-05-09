function ViewPlayer(x,y, player) {

  this.playerName = player.playerName;
  this.money = player.money;
  this.piles = player.piles;

  this.container = new PIXI.DisplayObjectContainer();
  this.container.pivot = {x: 0.5, y: 0.5};
  this.container.position = {x: x, y: y};
  window.stage.addChild(this.container);

  this.renderPile = function() {
    var cardSpritesContainer = new PIXI.DisplayObjectContainer();
    cardSpritesContainer.anchor = {x: 0.5, y: 0.5}
    cardSpritesContainer.position = {x: 0, y: 0}
    this.container.addChild(cardSpritesContainer);
    var cards = this.piles[0].cards;

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i], cardSpritesContainer);
      var offset = (((cards.length-1)*50)+cardSprite.sprite.width)/2;
      cardSprite.sprite.scale = {x: 0.25, y: 0.25};
      cardSprite.sprite.anchor = {x: 0, y: 0.5}
      cardSprite.sprite.position.x = (i*50)-offset;
      cardSprite.sprite.position.y = 0;
    }
  }

  this.renderPlayerSum = function() {
    var sumText = new PIXI.Text(this.piles[0].sumTotal(), {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(sumText, this.container, 52, 77);
  }

  this.renderPlayerBet = function() {
    var betText = new PIXI.Text("$" + this.piles[0].bet, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(betText, this.container, -58, 77);
  }

  this.renderPlayerName = function() {
    var nameText = new PIXI.Text("YOU", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(nameText, this.container, 0, -73);
  }

  this.renderPlayerMoney = function() {
    var moneyText = new PIXI.Text("TOTAL: $" + this.money, {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    positionAndAddText(moneyText, this.container, -3, 110);
  }

  this.renderCurrentPlayerSignal = function() {
    var currentNameText = new PIXI.Text("YOU", {font:"20px 'Poiret One'", fill:"#39c9ff"});
    positionAndAddText(currentNameText, this.container, 0, -73);
  }

}
