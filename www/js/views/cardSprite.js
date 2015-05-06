function CardSprite(card, parent) {
  this.rank = card.rank;
  this.suit = card.suit;
  this.sprite = new PIXI.Sprite.fromImage("img/cards/" + this.suit.toLowerCase() + this.rank + ".png");
  this.sprite.anchor = {x: 0.5, y: 0.5}; 
  this.sprite.scale = {x:0.25, y: 0.25};
  this.sprite.visible = true;
  parent.addChild(this.sprite);
}