function Player(x,y) {
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

      //TODO: refine logic to space out the cards
      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);

    }
  }
}
