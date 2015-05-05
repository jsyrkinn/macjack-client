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
     position: {x:window.innerWidth/2, y:window.innerHeight/1.7}  },
    "img/buttons/begin.png",
    function(touchData){
      console.log("Sign Up!");
      makeSignUpScreen();
    }
  );
}


function makeSignUpScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();
  addTextBox("name", "textbox", validateAndSubmitName);

  //add text: "All we need is your first name!"
  signUpText = new PIXI.Text("Enter your first name below", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(signUpText, window.innerWidth/2, window.innerHeight/2.1);

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
      makeJoinScreen();
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

  //TODO: Add back button
  window.stage.removeChildren();

  console.log("Display Game ID!")

  gameIDInstructions = new PIXI.Text("Here is your game code. \n Share this with your friends \n so that they can join your game!", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(gameIDInstructions, window.innerWidth/2, window.innerHeight/3);

  var gameIDText = new PIXI.Text(window.gameID, {font:"100px 'Poiret One'", fill:"#f3f3f3"});
  positionAndAddText(gameIDText, window.innerWidth/2, window.innerHeight/2);

  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/start.png",
    function(touchData) {
      console.log("Start!");
      updateGame(); // start polling
    }
  );
}


//---- JOIN GAME DISPLAY ----//

function makeJoinScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();
  addTextBox("gameid", "number", validateAndSubmitGameId);

  // Submit Button
  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData) {
      console.log("Submit!")
      validateAndSubmitGameId();
    }
  );
}


//---- BETTING DISPLAY ----//

function makeBetText() {
  //TODO: getting the dealer card displayed
  //dealerCardShowing = new PIXI.Text("Dealer is showing \n the " + dealerCardLogic {font:"30px 'Poiret One'", fill:"#f3f3f3"});
  //positionAndAddText(dealerCardShowing, window.innerWidth/2, window.innerHeight/2.5);

  betText = new PIXI.Text("Place your bet below", {font:"30px 'Poiret One'", fill:"#f3f3f3"});
  positionAndAddText(betText, window.innerWidth/2, window.innerHeight/2.5);
}

function makeBetScreen() {
  if (!window.textBox) {
    window.stage.removeChildren();
    console.log("Make Bet Screen!")

    makeBetText();

    addTextBox("bet", "number", validateAndSubmitBet);
    addButton(
      {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
      "img/buttons/start.png",
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

function positionAndAddText(text, x, y){
  text.anchor.x = 0.5;
  text.anchor.y = 0.5;
  text.position.x = x;
  text.position.y = y;
  window.stage.addChild(text);
}


function addTextBox(id, type, submitCallback) {
  var form = document.createElement("form");
  form.onsubmit = function(event) {
    event.preventDefault();
    submitCallback();
  };
  document.body.appendChild(form);

  window.textBox = document.createElement("input");
  window.textBox.type = type; // "textbox" or "number"
  window.textBox.id = id;
  window.textBox.className = "macjacktextbox";
  window.textBox.style.top = "60%";
  window.textBox.onblur = function() {window.scrollTo(0,0)};

  form.appendChild(window.textBox);
}


function validateAndSubmitName() {
  if (window.textBox.id != "name") {
    console.log("textBox incorrect!")
  } else if (window.textBox.value != "") { //TODO: add validation to server
    name = window.textBox.value;
    window.textBox.parentNode.remove(); // remove form
    window.textBox = null;
    getClientAuth(name);
  }
}


function validateAndSubmitBet() {
  if (window.textBox.id != "bet") {
    console.log("textBox id incorrect, is: " + window.textBox.id);
    console.log("textBox incorrect!")
  } else if (window.textBox.value != 0) {
    bet = window.textBox.value;
    window.textBox.parentNode.remove(); // remove form
    window.textBox = null;
    sendBet(bet);
  } else {
    console.log("HI: " + window.textBox.value);
  }
}


function validateAndSubmitGameId() {
  if (window.textBox.id != "gameid") {
    console.log("textBox incorrect!")
  } else if (window.textBox.value.length == 4) {
    gameid = window.textBox.value;
    window.textBox.parentNode.remove(); // remove form
    window.textBox = null;
    sendJoinGame(gameid);
  } else {
    console.log("Game Id length should be 4, is actually: " + window.textBox.value.length)
  }
}
