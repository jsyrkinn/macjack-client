//init views

var stage = null;

// document.addEventListener('deviceready', function() {

  // create an new instance of a pixi stage
  var interactive = true
  stage = new PIXI.Stage(0x66FF99, interactive);

  // create a renderer instance.
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimFrame( animate );


  function animate() {

    requestAnimFrame( animate );

    // put anything that needs to be animated in here

    // render the stage
    renderer.render(stage);
  }

//});
