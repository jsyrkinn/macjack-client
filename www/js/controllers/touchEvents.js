function TouchHandler() {
  this.touchHandler = new PIXI.DisplayObject();
  this.touchHandler.interactive = true;
  this.touchHandler.hitArea = new PIXI.Rectangle(0,0,window.innerWidth,window.innerHeight);

  this.startX = null;
  this.startY = null;

  stage.addChild(this.touchHandler);

  this.touchHandler.touchstart = function(touchData) {
    this.startX = touchData.global.x;
    this.startY = touchData.global.y;
  }

  this.touchHandler.touchend = function(touchData) {
    console.log("hi");
    var endX = touchData.global.x;
    var endY = touchData.global.y;
    var dist = Math.abs(endX-this.startX);

    if (dist < 10) { //player tapped
      //checking of sums move to its own function
      console.log("Hit");
      playerPile.push(deck.drawCard());
      player.renderPile();

      var totals = playerPile.sumTotal();

      for (var i=0; i < totals.length; i++) {
        //console.log("inside for loop")
        console.log('total: ' + totals[i]);
        if (totals[i] > 21) {
          var index = totals.indexOf(total[i]);
          totals.splice(index,1);
          i = 0;
        }
      }
      text.setText("Sum: " + totals); 
      if (totals.length === 0) {
        console.log("BUST!");
         window.alert("BUST!");
         //location.reload();
      }
    }

    else if (dist > 60) {
      console.log("Stay")
      //window.alert("Your turn is over!");
    }
  }
}
