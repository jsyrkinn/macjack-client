function handPosRecalc(hand) {
  //posInitial = window.innerWidth*0.20;
  //posOffset = window.innerWidth*0.15;

  rotInitial = -0.25;
  rotOffset = 0.08;

  cardWidth = hand[0].sprite.width;
  cardHeight = hand[0].sprite.height;

  for(c = 0; c < hand.length; c++) {

    //remove and re-add sprite to ensure it's rendered last
    stage.removeChild(hand[c].sprite);
    stage.addChild(hand[c].sprite);

    hand[c].sprite.anchor.x = 0;
    hand[c].sprite.anchor.y = 2;

    hand[c].sprite.position.x = cardWidth*0.75;
    hand[c].sprite.position.y = window.innerHeight+cardHeight;

    hand[c].sprite.rotation = rotInitial+(c*rotOffset);
  }
};