
  // create button to draw new cards
  deckButtonTexture = PIXI.Texture.fromImage("img/cards/card_back.jpg");
  var deckButtonSprite = new PIXI.Sprite(deckButtonTexture);

  deckButtonSprite.scale.x = 0.3;
  deckButtonSprite.scale.y = 0.3;

  deckButtonSprite.anchor.x = 0.5;
  deckButtonSprite.anchor.y = 0.5;

  deckButtonSprite.position.x = window.innerWidth*0.250;
  deckButtonSprite.position.y = window.innerHeight*0.200;

  deckButtonSprite.interactive = true;
  window.stage.addChild(deckButtonSprite);

  }
