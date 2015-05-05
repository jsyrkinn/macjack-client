function ViewDealer(x,y,dealerHand) {
  //TODO: Either make dealer and player into one file OR
  //write logic for spacing out cards in both dealer and player files.
  //Dealer object handles visibility vs. invisibility
  //Player object handles double tap, swipe right, swipe up (for betting)

  this.pile = new CardPile(dealerHand);

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
      var cardSprite = new CardSprite(cards[i]);

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
      sumText = new PIXI.Text(this.pile.sumTotal(), {font:"20px 'Poiret One'", fill:"#f3f3f3"});
      positionAndAddText(sumText, PARENTADD, window.innerWidth/1.5, window.innerHeight/3.1);
  }

    this.renderDealerName = function() {
      nameText = new PIXI.Text("DEALER", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
      positionAndAddText(nameText, PARENTADD, window.innerWidth/2, window.innerHeight/18);

  }

  this.updatePile = function(newPile) {
    //TODO: check for updates and update when there is a change - take this function out?
    //Do this to pile itself, don't call updatePile
    // show face down card if there is only one face up card

  }
}
