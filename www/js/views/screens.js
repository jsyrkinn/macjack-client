
//Checks to see if user is already signed up
function checkHomeScreen() {

  window.clientAuth = window.localStorage.getItem('clientAuth');
  window.clientID = window.localStorage.getItem('clientID');
  window.gameID = window.localStorage.getItem('gameID');

  if (window.textBox) {
    window.textBox.parentNode.remove(); // remove form
    window.textBox = null;
  }

  if (!window.clientAuth) {
    makeFirstTimeHomeScreen();
  } else {
    if (!window.gameID) {
      makeReturningHomeScreen();
    } else {
      updateGame();  // rejoining existing game
    }
  }
}

//---- HOME MENU - FIRST TIME ----//

function makeFirstTimeHomeScreen() {
  window.stage.removeChildren(); // creating blank stage
  addLogo();

  introText1 = new PIXI.Text("Welcome!", {font:"40px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(introText1, window.stage, window.innerWidth/2, window.innerHeight/2.3);
  introText2 = new PIXI.Text("This is a Macalester-themed \n blackjack app. You can play \n against the dealer or hook up \n to a game with your friends.", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(introText2, window.stage, window.innerWidth/2, window.innerHeight/1.72);
  introText3 = new PIXI.Text("Have fun!", {font:"30px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(introText3, window.stage, window.innerWidth/2, window.innerHeight/1.4);

  addButton(
    {  anchor: {x:0.5, y:0.0},
     position: {x:window.innerWidth/2, y:window.innerHeight/1.3}  },
    "img/buttons/begin.png",
    function(touchData) {
      console.log("Sign Up!");
      makeInstructionsScreen();
    }
  );
}

function makeInstructionsScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();

  var toPlayText = new PIXI.Text("To play:", {font:"30px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(toPlayText, window.stage, window.innerWidth/2, window.innerHeight/2.1);
  var instructionsText = new PIXI.Text("Tap to hit or \n swipe right to stay.", {font:"30px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(instructionsText, window.stage, window.innerWidth/2, window.innerHeight/1.7);
  // Submit Button
  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/begin.png",
    function(touchData) {
      console.log("Start")
      makeSignUpScreen();
    }
  );
}

function makeSignUpScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();
  addTextBox("name", "textbox", validateAndSubmitName);

  signUpText = new PIXI.Text("Enter your first name below", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(signUpText, window.stage, window.innerWidth/2, window.innerHeight/2.1);

  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData) {
      console.log("Submit!")
      validateAndSubmitName();
    }
  );

  addButton(
    {   scale: {x:0.4, y:0.4},
       anchor: {x:0.0, y:0.0},
     position: {x:10, y:25}  },
  "img/buttons/back.png",
    function(touchData){
      leaveGame();
    }
  );
}

//---- HOME MENU - RETURNING (HAS AUTH) ----//

function makeReturningHomeScreen() {
  window.stage.removeChildren();
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

  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/joinGame.png",
    function(touchData){
      console.log("Join Game!");
      makeJoinScreen();
    }
  );

  // Delete LocalStorage Button -- FOR DEBUGGING
  addButton(
    {   scale: {x:0.4, y:0.4},
       anchor: {x:0.0, y:0.0},
     position: {x:0.0, y:20}  },
    "img/buttons/back.png",
    function(touchData){
      console.log("Delete LocalStorage!");
      window.localStorage.removeItem('clientAuth');
      window.localStorage.removeItem('clientID');
      window.localStorage.removeItem('gameID');
      checkHomeScreen();
    }
  );
}

//---- GAME ID DISPLAY ----//

function makeGameIdScreen() {

  window.stage.removeChildren();
  console.log("Display Game ID!")
  var gameIDInstructions = new PIXI.Text("Here is your game code. \n Share this with your friends \n so that they can join your game!", {font:"20px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(gameIDInstructions, window.stage, window.innerWidth/2, window.innerHeight/3);

  var gameIDText = new PIXI.Text(window.gameID, {font:"100px 'Poiret One'", fill:"#f3f3f3"});
  positionAndAddText(gameIDText, window.stage, window.innerWidth/2, window.innerHeight/2.1);

  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/start.png",
    function(touchData) {
      console.log("Start!");
      updateGame();
    }
  );

  addButton(
    {   scale: {x:0.4, y:0.4},
       anchor: {x:0.0, y:0.0},
     position: {x:10, y:25}  },
    "img/buttons/back.png",
    function(touchData){
      leaveGame();
    }
  );
}

//---- JOIN GAME DISPLAY ----//

function makeJoinScreen() {
  window.stage.removeChildren(); // remove all sprites from stage
  addLogo();
  var joinGameIDText = new PIXI.Text("Enter your game code below", {font:"20px 'Poiret One'", fill:"#f3f3f3"});
  positionAndAddText(joinGameIDText, window.stage, window.innerWidth/2, window.innerHeight/2);

  addTextBox("gameid", "number", validateAndSubmitGameId);

  addButton(
    {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
    "img/buttons/submit.png",
    function(touchData) {
      console.log("Submit!")
      validateAndSubmitGameId();
    }
  );

  addButton(
    {   scale: {x:0.4, y:0.4},
       anchor: {x:0.0, y:0.0},
     position: {x:10, y:25}  },
    "img/buttons/back.png",
    function(touchData){
      leaveGame();
    }
  );
}

function betTurnSignal(model){
  betText = new PIXI.Text("Place your bet below. \n You have $" + model.player.money + " left", {font:"30px 'Poiret One'", fill:"#f3f3f3", align: "center"});
  positionAndAddText(betText, window.stage, window.innerWidth/2, window.innerHeight/2.5);
}

function makeBetScreen(model) {
  if (!window.textBox) {
    window.stage.removeChildren();
    console.log("Make Bet Screen!");
    betTurnSignal(model);
    addTextBox("bet", "number", validateAndSubmitBet);
    addButton(
      {  position: {x:window.innerWidth/2, y:window.innerHeight*0.75}  },
      "img/buttons/start.png",
      function(touchData) {
        console.log("Submit Bet!");
        validateAndSubmitBet();
      }
    );

    addButton(
      {   scale: {x:0.4, y:0.4},
         anchor: {x:0.0, y:0.0},
       position: {x:10, y:25}  },
      "img/buttons/back.png",
      function(touchData){
        leaveGame();
      }
    );
  }
}

//--- HELPER FUNCTIONS ----//

function leaveGame() {
  if (window.pollTimeout) {
    clearTimeout(window.pollTimeout);
  }
  window.gameID = null;
  window.localStorage.removeItem('gameID');
  checkHomeScreen();
}

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

//Credit to http://www.html5gamedevs.com/topic/3114-question-about-rectangle-drawing/
function rectangle( x, y, width, height, backgroundColor, borderColor, borderWidth ) { 
 var box = new PIXI.Graphics();
 box.beginFill(backgroundColor);
 box.lineStyle(borderWidth , borderColor);
 box.drawRect(0, 0, width - borderWidth, height - borderWidth);
 box.endFill();
 box.position = {x: x + borderWidth/2, y: y + borderWidth/2};
 return box;
};

function positionAndAddText(text, parent, x, y) {
  text.anchor = {x: 0.5, y:0.5};
  text.position.x = x;
  text.position.y = y;
  parent.addChild(text);
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
  } else if (window.textBox.value != "") { 
    name = window.textBox.value;
    window.textBox.parentNode.remove(); 
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
    window.textBox.parentNode.remove(); 
    window.textBox = null;
    sendBet(bet);
  } else {
    console.log(window.textBox.value);
  }
}

function validateAndSubmitGameId() {
  if (window.textBox.id != "gameid") {
    console.log("textBox incorrect!")
  } else if (window.textBox.value.length == 4) {
    gameid = window.textBox.value;
    window.textBox.parentNode.remove(); 
    window.textBox = null;
    sendJoinGame(gameid);
  } else {
    console.log("Game Id length should be 4, is actually: " + window.textBox.value.length)
  }
}
