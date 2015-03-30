function CardSprite(card) {
  this.rank = card.rank;
  this.suit = card.suit;
  this.sprite = new PIXI.Sprite.fromImage("img/minCards/" + this.suit + this.rank + ".png");

  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;

  this.sprite.scale.x = 0.25;
  this.sprite.scale.y = 0.25;

  this.sprite.visible = true;

  stage.addChild(this.sprite);

/*
  this.moveToHand = function() {
    this.boardLocation = "hand";
    this.sprite.visible = true;
    this.sprite.scale.x = 0.5;
    this.sprite.scale.y = 0.5;
    this.sprite.interactive = true; // todo: only on player turn

  }

  this.moveToBoard = function() {
    this.boardLocation = "board";
    this.sprite.visible = true;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = window.innerWidth*0.750;
    this.sprite.position.y = window.innerHeight*0.200;
    this.sprite.scale.x = 0.3;
    this.sprite.scale.y = 0.3;
    this.sprite.rotation = 0;
    this.sprite.interactive = false;
  }

  this.moveToNull = function() {
    this.boardLocation = "null";
    this.sprite.visible = false;
    this.sprite.interactive = false;
  }
  */

  this.sprite.tap = function(touchData){
    console.log("TAP!");
    console.log(card);
    socket.emit("playCard", {rank: card.rank,suit: card.suit});
  }

  //TODO: change this after ranks are changed to integers
  this.toString = function() {
    return this.rank + " of " + this.suit;
  }

}