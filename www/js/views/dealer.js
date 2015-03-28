function Dealer(x,y) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.pile = new CardPile();

  this.hiddenCardSprite = new PIXI.Sprite.fromImage("img/minCards/card_back.png");
  this.hiddenCardSprite.scale.x = 0.25;
  this.hiddenCardSprite.scale.y = 0.25;

  this.hiddenCardSprite.anchor.x = 0.5;
  this.hiddenCardSprite.anchor.y = 0.5;

  this.hiddenCardSprite.position.x = x;
  this.hiddenCardSprite.position.y = y;

  stage.addChild(this.hiddenCardSprite);

  this.renderPile = function() {
    this.cardSprites = [];

    var cards = this.pile.cards;

    if (cards.length == 1) {
      this.hiddenCardSprite.visible = true;

    } else {
      this.hiddenCardSprite.visible = false;
    }

    for (var i = 0; i < cards.length; i++) {
      var cardSprite = new CardSprite(cards[i]);

      cardSprite.sprite.scale.x = 0.25;
      cardSprite.sprite.scale.y = 0.25;

      //TODO: refine logic to space out the cards
      cardSprite.sprite.position.x = x + (i*100) + (this.hiddenCardSprite.visible ? 100 : 0);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);

    }
  }

  this.updatePile = function(newPile) {
    //TODO: check for updates and update when there is a change - take this function out?
    //Do this to pile itself, don't call updatePile
    // show face down card if there is only one face up card

  }
}
