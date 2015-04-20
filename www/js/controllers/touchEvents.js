function TouchHandler() {
  var turnOver = new PIXI.Text("Your turn is over!", {font:"50px PioretOne", fill:"#f3f3f3"});
  turnOver.position.x = window.innerWidth - 600;
  turnOver.position.y = window.innerHeight - 300;
  this.touchHandler = new PIXI.DisplayObject();
  this.touchHandler.interactive = true;
  this.touchHandler.hitArea = new PIXI.Rectangle(0,0,window.innerWidth,window.innerHeight);

  this.startX = null;
  this.startY = null;

  window.stage.addChild(this.touchHandler);

  this.touchHandler.touchstart = function(touchData) {
    this.startX = touchData.global.x;
    this.startY = touchData.global.y;
  }

  this.touchHandler.touchend = function(touchData) {
    var endX = touchData.global.x;
    var endY = touchData.global.y;
    var dist = Math.abs(endX-this.startX);
    var tot21 = 0;

    if (dist < 10) { //Player Hit

      //request card from server, wait for next poll

    } else if (dist > 60) { // Player Stayed
      window.stage.addChild(turnOver);
    }


    for (var i=totals.length-1; i >= 0; i--) {
      if (totals[i] > 21) {
        tot21 = totals[i];
        totals.splice(i,1);
      }
    }
    text.setText("Sum: " + totals);

    if (totals.length === 0) {
      text.setText("BUSTED: " + tot21);
      window.stage.addChild(turnOver);
    }
    else {
      text.setText("Sum: " + totals);
    }
  }
}
