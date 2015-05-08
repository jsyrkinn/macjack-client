function ViewDealer(x,y,dealerHand) {

  this.pile = new CardPile(dealerHand);

  this.container = new PIXI.DisplayObjectContainer();
  window.stage.addChild(this.container);
  this.container.position = {x: x, y: y};
  this.container.pivot = {x: 0.5, y: 0.5};
  this.hiddenCardSprite = new PIXI.Sprite.fromImage("img/cards/cardBack.png");
  this.hiddenCardSprite.scale = {x:0.25, y: 0.25};
  this.hiddenCardSprite.anchor = {x:0.5, y: 0.5};
  this.hiddenCardSprite.position.x = x;
  this.hiddenCardSprite.position.y = y;

  window.stage.addChild(this.hiddenCardSprite);

  this.renderPile = function() {
    this.cardSprites = [];
    var cards = this.pile.cards;

    if (cards.length == 1) {
      this.hiddenCardSprite.visible = true;
    } else {
      this.hiddenCardSprite.visible = false;
    }

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i], window.stage);

      cardSprite.sprite.scale.x = 0.25;
      cardSprite.sprite.scale.y = 0.25;
      cardSprite.sprite.anchor.x = 0.5;
      cardSprite.sprite.anchor.y = 0.5;

      //Spreading out of cards
      cardSprite.sprite.position.x = x + (i*50) + (this.hiddenCardSprite.visible ? 50 : 0);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);
    }
  }

  this.renderDealerSum = function() {
      var sumText = new PIXI.Text(this.pile.sumTotal(), {font:"20px 'Poiret One'", fill:"#f3f3f3"});
      positionAndAddText(sumText, this.container, 80, 77);
  }

  this.renderDealerName = function() {
      var nameText = new PIXI.Text("DEALER", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
      positionAndAddText(nameText, this.container, 28, -73);
  }
}
