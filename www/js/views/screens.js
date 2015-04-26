function addLogo() {
  var logoSprite = new PIXI.Sprite.fromImage("img/logosIcons/logoHome.png");

  logoSprite.scale.x = 0.8;
  logoSprite.scale.y = 0.8;
  logoSprite.anchor.x = 0.5;
  logoSprite.anchor.y = 0.5;
  logoSprite.position.x = window.innerWidth/2;
  logoSprite.position.y = window.innerHeight/4;

  window.stage.addChild(logoSprite);
}


function addMenuButton(placement, imagePath, tapFunction) {
    var button = new PIXI.Sprite.fromImage(imagePath);

    button.scale = placement.scale || {x:0.9, y:0.9}
    button.anchor = placement.anchor || {x:0.5, y:0.5};
    button.position = placement.position || {x:0.0, y: 0.0};
    button.interactive = true;
    window.stage.addChild(button);

    button.tap = tapFunction
}


function makeHomeScreenReturning() {

  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();

  // New Game Button
  addMenuButton(
    {  anchor: {x:0.5, y:0.0},
     position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
    "img/buttons/newGame.png",
    function(touchData){
      console.log("New Game!");
      setupNewGame();
      updateGame(); // start polling
    }
  );

  // Join Game Button
  addMenuButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/joinGame.png",
    function(touchData){
      console.log("Join Game!");
    }
  );

  // Delete LocalStorage Button -- DEBUG
  addMenuButton(
    {   scale: {x:0.3, y:0.3},
       anchor: {x:0.0, y:0.0},
     position: {x:0.0, y:0.0}  },
    "img/buttons/exitButtonBlue.png",
    function(touchData){
      console.log("Delete LocalStorage!");
      window.localStorage.removeItem('clientAuth');
      window.localStorage.removeItem('clientID');
      checkHomeScreen();
    }
  );

}



function makeHomeScreenFirstTime() {

  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();

  // Sign up Button
  addMenuButton(
    {  anchor: {x:0.5, y:0.0},
     position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
    "img/buttons/signUp.png",
    function(touchData){
      console.log("Sign Up!");
      makeSignUpScreen();
    }
  );

  // About Button
  addMenuButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/about.png",
    function(touchData){
      console.log("About Us!");
    }
  );

}


function createTextBox(id) {
    var textbox = document.createElement("input");
    textbox.type = "textbox";
    textbox.id = id;
    textbox.className = "macjacktextbox";
    document.body.appendChild(textbox);
    return textbox
}



function makeSignUpScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();

  nameBox = createTextBox("firstName");


  // Submit Button
  addMenuButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData){
      console.log("Submit!")
      if (nameBox.value != "") {
        name = nameBox.value;
        nameBox.remove();
        getClientAuth(name);
      }
    }
  );

}



function checkHomeScreen() {
  // checks to see if user is already signed up

  window.clientAuth = window.localStorage.getItem('clientAuth');
  window.clientID = window.localStorage.getItem('clientID');

  if (!window.clientAuth) {
    makeHomeScreenFirstTime();
  } else {
    makeHomeScreenReturning();
  }

}
