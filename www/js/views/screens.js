function addLogo() {
  var logoSprite = new PIXI.Sprite.fromImage("img/logosIcons/logoHome.png");

  logoSprite.scale.x = 0.9;
  logoSprite.scale.y = 0.9;
  logoSprite.anchor.x = 0.5;
  logoSprite.anchor.y = 0.5;
  logoSprite.position.x = window.innerWidth/2;
  logoSprite.position.y = window.innerHeight/4;

  window.stage.addChild(logoSprite);
}




function makeHomeScreenReturning() {

  window.stage.removeChildren(); // remove all sprites from stage

  addLogo();


  var deleteStoreButton = new PIXI.Sprite.fromImage("img/buttons/exitButtonBlue.png");

  deleteStoreButton.scale.x = 0.3;
  deleteStoreButton.scale.y = 0.3;
  deleteStoreButton.anchor.x = 0.0;
  deleteStoreButton.anchor.y = 0.0;
  deleteStoreButton.position.x = 0.0;
  deleteStoreButton.position.y = 0.0;

  deleteStoreButton.interactive = true;

  deleteStoreButton.tap = function(touchData){
    console.log("Delete LocalStorage!");
    window.localStorage.removeItem('clientAuth');
    window.localStorage.removeItem('clientID');
    checkHomeScreen();
  }

  window.stage.addChild(deleteStoreButton);




  var newGameButton = new PIXI.Sprite.fromImage("img/buttons/aboutUsButton.png");

  newGameButton.scale.x = 0.9;
  newGameButton.scale.y = 0.9;
  newGameButton.anchor.x = 0.5;
  newGameButton.anchor.y = 0.0;
  newGameButton.position.x = window.innerWidth/2;
  newGameButton.position.y = window.innerHeight/2;

  newGameButton.interactive = true;

  newGameButton.tap = function(touchData){
    console.log("New Game!");
    setupNewGame();
    poll();
  }

  window.stage.addChild(newGameButton);


  var joinGameButton = new PIXI.Sprite.fromImage("img/buttons/signUpButton.png");

  joinGameButton.scale.x = 0.9;
  joinGameButton.scale.y = 0.9;
  joinGameButton.anchor.x = 0.5;
  joinGameButton.anchor.y = 0.5;
  joinGameButton.position.x = window.innerWidth/2;
  joinGameButton.position.y = window.innerHeight*0.75;

  joinGameButton.interactive = true;

  joinGameButton.tap = function(touchData){
    console.log("Join Game!");
  }

  window.stage.addChild(joinGameButton);

}






function makeHomeScreenFirstTime() {

  window.stage.removeChildren(); // remove all sprites from stage

  addLogo();

  var signUpButton = new PIXI.Sprite.fromImage("img/buttons/signUpButton.png");

  signUpButton.scale.x = 0.9;
  signUpButton.scale.y = 0.9;
  signUpButton.anchor.x = 0.5;
  signUpButton.anchor.y = 0.0;
  signUpButton.position.x = window.innerWidth/2;
  signUpButton.position.y = window.innerHeight/2;

  signUpButton.interactive = true;

  signUpButton.tap = function(touchData){
    console.log("signUp!");
    makeSignUpScreen();
  }

  window.stage.addChild(signUpButton);


  var aboutUsButton = new PIXI.Sprite.fromImage("img/buttons/aboutUsButton.png");

  aboutUsButton.scale.x = 0.9;
  aboutUsButton.scale.y = 0.9;
  aboutUsButton.anchor.x = 0.5;
  aboutUsButton.anchor.y = 0.5;
  aboutUsButton.position.x = window.innerWidth/2;
  aboutUsButton.position.y = window.innerHeight*0.75;

  aboutUsButton.interactive = true;

  aboutUsButton.tap = function(touchData){
    console.log("aboutUs!");
  }

  window.stage.addChild(aboutUsButton);

}



function makeSignUpScreen() {
  window.stage.removeChildren(); // remove all sprites from stage

  addLogo();

  var firstNameBox = document.createElement("input");
  firstNameBox.type = "textbox";
  firstNameBox.id = "firstName"

  firstNameBox.className = "macjacktextbox";

  document.body.appendChild(firstNameBox);

  var submitButton = new PIXI.Sprite.fromImage("img/buttons/signUpButton.png");

  submitButton.scale.x = 0.9;
  submitButton.scale.y = 0.9;
  submitButton.anchor.x = 0.5;
  submitButton.anchor.y = 0.5;
  submitButton.position.x = window.innerWidth/2;
  submitButton.position.y = window.innerHeight*0.75;

  submitButton.interactive = true;

  submitButton.tap = function(touchData){
    var firstName = document.getElementById("firstName").value;
    console.log(firstName);
    getClientAuth(firstName);
  }

  window.stage.addChild(submitButton);

}
