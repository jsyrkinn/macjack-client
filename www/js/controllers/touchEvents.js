function TouchHandler() {
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
    if (dist < 10) { //Player Hit
      sendHit();
    } else if (dist > 60) { // Player Stayed
      sendStay();
    }
  }
}
