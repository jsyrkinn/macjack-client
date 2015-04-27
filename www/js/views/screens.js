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


//---- HOME MENU - FIRST TIME ----//

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


function makeSignUpScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();
  createFormBox("firstName");

  // Submit Button
  addMenuButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData) {
      console.log("Submit!")
      validateAndSubmitName();
    }
  );
}


//---- HOME MENU - RETURNING (HAS AUTH) ----//

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


//---- GAME ID DISPLAY ----//

function displayGameId() {
  window.stage.removeChildren();

  console.log("Display Game Id!")

  var text = new PIXI.Text(window.gameID, {font:"100px PoiretOne", fill:"#f3f3f3"});
  text.position = {x: window.innerWidth/2, y: window.innerHeight/2};
  text.anchor = {x: 0.5, y: 0.5};
  window.stage.addChild(text);

  addMenuButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData) {
      console.log("Start!")
      updateGame(); // start polling
    }
  );
}


//--- HELPER FUNCTIONS ----//

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

function addMenuButton(placement, imagePath, tapCallback) {
  var button = new PIXI.Sprite.fromImage(imagePath);

  button.scale = placement.scale || {x:0.9, y:0.9}
  button.anchor = placement.anchor || {x:0.5, y:0.5};
  button.position = placement.position || {x:0.0, y: 0.0};
  button.interactive = true;
  button.tap = tapCallback;
  window.stage.addChild(button);
}


function createFormBox(id) {
  var form = document.createElement("form");
  form.onsubmit = validateAndSubmitName;
  document.body.appendChild(form);

  window.nameBox = document.createElement("input");
  window.nameBox.type = "textbox";
  window.nameBox.id = id;
  window.nameBox.className = "macjacktextbox";
  form.appendChild(window.nameBox);
}


function validateAndSubmitName() {
  if (window.nameBox.value != "") {
    name = window.nameBox.value;
    window.nameBox.parentNode.remove(); // should remove form
    getClientAuth(name);
  }
}
