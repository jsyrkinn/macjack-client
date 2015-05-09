function createSpinner(numBeams) {
  window.spinners = [];
  window.showSpinner = false;

  for (i = 0; i < numBeams; i++) {
    var spinner = new PIXI.Sprite.fromImage("img/buttons/exitButtonBlue.png");
    spinner.position = {x: window.innerWidth/2, y: window.innerHeight/2};
    spinner.anchor = {x: 0.5, y: 0.5};
    spinner.scale = {x: 0.5, y:0.5};
    window.spinners.push(spinner);
  }
}

function startSpinner() {
  window.showSpinner = true;
  window.spinners.forEach(function(spinner) {
    window.stage.addChild(spinner);
  });
}

function stopSpinner() {
  window.showSpinner = false;
  window.spinners.forEach(function(spinner) {
    window.stage.removeChild(spinner);
  });
}

function rotateSpinner() {
  for (i = 0; i < window.spinners.length; i++) {
    window.spinners[i].rotation += 0.009*i+0.01;
  }
  if (window.stage.children.indexOf(window.spinners[0]) < 0) {
    stopSpinner();
  }
}
