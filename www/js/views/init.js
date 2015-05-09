// create an new instance of a pixi stage
var interactive = true
window.stage = new PIXI.Stage(0x5F6870, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

checkHomeScreen();
createSpinner(5);

requestAnimFrame( animate );

function animate() {
  requestAnimFrame( animate );

  if (window.showSpinner) {
    rotateSpinner();
  }
  renderer.render(window.stage);
}
