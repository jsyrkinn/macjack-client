function checkHomeScreen() {
  // checks to see if user is already signed up

  window.clientAuth = window.localStorage.getItem('clientAuth');
  window.clientID = window.localStorage.getItem('clientID');

  if (!window.clientAuth) {
    makeFirstTimeHomeScreen();
  } else {
    makeReturningHomeScreen();
  }
}


//---- HOME MENU - FIRST TIME ----//

function makeFirstTimeHomeScreen() {

  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();

  // Sign up Button
  addButton(
    {  anchor: {x:0.5, y:0.0},
     position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
    "img/buttons/signUp.png",
    function(touchData){
      console.log("Sign Up!");
      makeSignUpScreen();
    }
  );

  // About Button
  addButton(
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
  addNameBox("name", validateAndSubmitName);

  // Submit Button
  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData) {
      console.log("Submit!")
      validateAndSubmitName();
    }
  );
}


//---- HOME MENU - RETURNING (HAS AUTH) ----//

function makeReturningHomeScreen() {

  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();

  // New Game Button
  addButton(
    {  anchor: {x:0.5, y:0.0},
     position: {x:window.innerWidth/2, y:window.innerHeight/2}  },
    "img/buttons/newGame.png",
    function(touchData){
      console.log("New Game!");
      setupNewGame();
    }
  );

  // Join Game Button
  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/joinGame.png",
    function(touchData){
      console.log("Join Game!");
    }
  );

  // Delete LocalStorage Button -- DEBUG
  addButton(
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

function makeGameIdScreen() {
  window.stage.removeChildren();

  console.log("Display Game ID!")

  var text = new PIXI.Text(window.gameID, {font:"100px PoiretOne", fill:"#f3f3f3"});
  text.position = {x: window.innerWidth/2, y: window.innerHeight/2};
  text.anchor = {x: 0.5, y: 0.5};
  window.stage.addChild(text);

  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/start.png",
    function(touchData) {
      console.log("Start!");
      updateGame(); // start polling
    }
  );
}


//---- BETTING DISPLAY ----//

function makeBetScreen() {

  if (!window.nameBox) {
    window.stage.removeChildren();

    console.log("Make Bet Screen!")

    addNumberBox("bet", validateAndSubmitBet);

    addButton(
      {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
      "img/buttons/submit.png",
      function(touchData) {
        console.log("Submit Bet!");
        validateAndSubmitBet();
      }
    );
  }
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

function addButton(placement, imagePath, tapCallback) {
  var button = new PIXI.Sprite.fromImage(imagePath);

  button.scale = placement.scale || {x:0.9, y:0.9}
  button.anchor = placement.anchor || {x:0.5, y:0.5};
  button.position = placement.position || {x:0.0, y: 0.0};
  button.interactive = true;
  button.tap = tapCallback;
  window.stage.addChild(button);
}


function addNameBox(id, submitCallback) {
  var form = document.createElement("form");
  form.onsubmit = submitCallback;
  document.body.appendChild(form);

  window.nameBox = document.createElement("input");
  window.nameBox.type = "textbox";
  window.nameBox.id = id;
  window.nameBox.className = "macjacktextbox";
  window.nameBox.onblur = function() {window.scrollTo(0,0)};

  form.appendChild(window.nameBox);
}

// change name
function addNumberBox(id, submitCallback) {
  var form = document.createElement("form");
  form.onsubmit = submitCallback;
  document.body.appendChild(form);

  window.nameBox = document.createElement("input");
  window.nameBox.type = "number";
  window.nameBox.id = id;
  window.nameBox.className = "macjacktextbox";
  window.nameBox.onblur = function() {window.scrollTo(0,0)};

  form.appendChild(window.nameBox);
}

function validateAndSubmitName() {
  if (window.nameBox.id != "name") {
    console.log("nameBox incorrect!")
  } else if (window.nameBox.value != "") {
    name = window.nameBox.value;
    window.nameBox.parentNode.remove(); // should remove form
    window.nameBox = null;
    getClientAuth(name);
  }
}


function validateAndSubmitBet() {
  if (window.nameBox.id != "bet") {
    console.log("nameBox incorrect!")
  } else if (window.nameBox.value != 0) {
    bet = window.nameBox.value;
    window.nameBox.parentNode.remove(); // should remove form
    window.nameBox = null;
    console.log(bet);
    sendBet(bet);
  }
}
