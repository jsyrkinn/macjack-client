function CardSprite(card) {
  this.rank = card.rank;
  this.suit = card.suit;
  this.sprite = new PIXI.Sprite.fromImage("img/minCards/" + this.suit.toLowerCase() + this.rank + ".png");

  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;

  this.sprite.scale.x = 0.25;
  this.sprite.scale.y = 0.25;

  this.sprite.visible = true;

  window.stage.addChild(this.sprite);

  this.sprite.tap = function(touchData){
    console.log("TAP!");
    console.log(card);
    // socket.emit("playCard", {rank: card.rank, suit: card.suit});
  }

  //TODO: change this after ranks are changed to integers
  this.toString = function() {
    return this.rank + " of " + this.suit;
  }

}
