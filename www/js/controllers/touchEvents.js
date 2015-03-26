function TouchHandler() {
  this.touchHandler = new PIXI.DisplayObject();
  this.touchHandler.interactive = true;
  this.touchHandler.hitArea = new PIXI.Rectangle(0,0,window.innerWidth,window.innerHeight);

  this.startX = null;
  this.startY = null;

  stage.addChild(this.touchHandler);

/*
  this.touchHandler.tap = function(touchData) {
    console.log(touchData);
    console.log("OMG hit")
  }
*/

  this.touchHandler.touchstart = function(touchData) {
    this.startX = touchData.global.x;
    this.startY = touchData.global.y;
  }

  this.touchHandler.touchend = function(touchData) {
    console.log("hi");
    var endX = touchData.global.x;
    var endY = touchData.global.y;

    var dist = Math.abs(endX-this.startX);
    if (dist < 10) {
      console.log("OMG hit")
    }
    else if (dist > 60) {
      console.log("OMG stay")
    }
  }
}
