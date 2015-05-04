function ViewPlayer(x,y) {
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
//TODO centering with anchor position.
      // this.cardsSprite.sprite.anchor.x = 1;
      // this.cardsSprite.sprite.anchor.y = 1;

      //TODO: refine logic to space out the cards
      cardSprite.sprite.position.x = x+(i*50);
      cardSprite.sprite.position.y = y;

      this.cardSprites.push(cardSprite);

    }
  }

  this.renderPlayerSumText = function() {
      sumText = new PIXI.Text(this.pile.sumTotal(), {font:"20px 'Poiret One'", fill:"#f3f3f3"});
      sumText.position.x = 10;
      sumText.position.y = window.innerHeight - 50;
      window.stage.addChild(sumText);
  }

//TODO: JAMEY- This should call bet() from cardPile.js and print the bet
  this.renderPlayerBetText = function(){
    betText = new PIXI.Text("$" + this.pile.bet(), {font:"20px 'Poiret One'", fill:"#f3f3f3"}); 
    //betText.position.x = ;
    //betText.position.y = ;
    //window.stage.addChild(betText);
  }

  this.renderPlayerName = function(){
    nameText = new PIXI.Text("YOU", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
    nameText.position.x = window.innerWidth/2;
    nameText.position.y = window.innerHeight - 200;
    window.stage.addChild(nameText);
  }

  this.movePile = function(x, y) {
    for (var i = 0; i < cardSprites.length; i++) {

      //TODO: refine logic to space out the cards
      cardSprites[i].sprite.position.x = x+(i*50);
      cardSprites[i].sprite.position.y = y;
    }
  }
}
