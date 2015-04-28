function TouchHandler() {
  var turnOver = new PIXI.Text("Your turn is over!", {font:"50px PioretOne", fill:"#f3f3f3"});
  turnOver.position.x = window.innerWidth - 600;
  turnOver.position.y = window.innerHeight - 300;
  this.touchHandler = new PIXI.Sprite();
  this.touchHandler.interactive = true;
  this.touchHandler.hitArea = new PIXI.Rectangle(0,0,window.innerWidth,window.innerHeight);

  this.startX = null;
  this.startY = null;

  this.touchHandler.touchstart = function(touchData) {
    this.startX = touchData.global.x;
    this.startY = touchData.global.y;
  }

  this.touchHandler.touchend = function(touchData) {
    var endX = touchData.global.x;
    var endY = touchData.global.y;
    var dist = Math.abs(endX-this.startX);
    var tot21 = 0;

    if (dist < 10) {
      //Player Hit

      //request card from server, wait for next poll
      sendHit();

    } else if (dist > 60) {
      // Player Stayed
      sendStay();
      window.stage.addChild(turnOver);
    }
  }
}
