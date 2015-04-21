// create an new instance of a pixi stage
var interactive = true
window.stage = new PIXI.Stage(0x5F6870, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


/*
deck = new Deck();

//TODO: function to calculate xy position for player and dealer
dealer = new ViewDealer(100,150);

dealerPile = dealer.pile.cards;

dealerPile.push(deck.drawCard());

dealer.renderPile();
*/


function addLogo() {
  var logoSprite = new PIXI.Sprite.fromImage("img/logosIcons/logoHome.png");

  logoSprite.scale.x = 1.0;
  logoSprite.scale.y = 1.0;
  logoSprite.anchor.x = 0.5;
  logoSprite.anchor.y = 0.5;
  logoSprite.position.x = window.innerWidth/2;
  logoSprite.position.y = window.innerHeight/4;

  window.stage.addChild(logoSprite);
}

addLogo();

var signUpButton = new PIXI.Sprite.fromImage("img/buttons/signUpButton.png");

signUpButton.scale.x = 1.0;
signUpButton.scale.y = 1.0;
signUpButton.anchor.x = 0.5;
signUpButton.anchor.y = 0.0;
signUpButton.position.x = window.innerWidth/2;
signUpButton.position.y = window.innerHeight/2;

signUpButton.interactive = true;

signUpButton.tap = function(touchData){
  console.log("signUp!");

  window.stage.removeChildren(); // remove all sprites from stage

  addLogo();

  var firstNameBox = document.createElement("input");
  firstNameBox.type = "textbox";
  firstNameBox.id = "firstName"

  firstNameBox.style.position = "fixed";
  firstNameBox.style.top = "50%";
  firstNameBox.style.left = "50%";
  firstNameBox.style.width = "60%";
  firstNameBox.style.border = "2px solid f6b26b"; // FIXME
  firstNameBox.style.borderRadius = "10px";
  firstNameBox.style.background = "transparent";
  firstNameBox.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(firstNameBox);

  var submitButton = new PIXI.Sprite.fromImage("img/buttons/signUpButton.png");

  submitButton.scale.x = 1.0;
  submitButton.scale.y = 1.0;
  submitButton.anchor.x = 0.5;
  submitButton.anchor.y = 0.5;
  submitButton.position.x = window.innerWidth/2;
  submitButton.position.y = window.innerHeight*0.75;

  submitButton.interactive = true;

  submitButton.tap = function(touchData){
    firstName = document.getElementById("firstName").value;
    console.log(firstName);
    getClientAuth(firstName);
  }

  window.stage.addChild(submitButton);

}




window.stage.addChild(signUpButton);


var aboutUsButton = new PIXI.Sprite.fromImage("img/buttons/aboutUsButton.png");

aboutUsButton.scale.x = 1.0;
aboutUsButton.scale.y = 1.0;
aboutUsButton.anchor.x = 0.5;
aboutUsButton.anchor.y = 0.5;
aboutUsButton.position.x = window.innerWidth/2;
aboutUsButton.position.y = window.innerHeight*0.75;

aboutUsButton.interactive = true;

aboutUsButton.tap = function(touchData){
  console.log("aboutUs!");

}

window.stage.addChild(aboutUsButton);




function repositionAllHands(player, dealer, opponents) {

}

function repositionOpponents(opponentList) {
  var len = opponentList.length;

  if (len == 0) {

  } else if (len == 1) {

  } else if (len == 2) {

  } else if (len == 3) {

  } else if (len == 4) {

  } else {
     console.log("too many players!")
  }

  allPlayers.forEach(function(player) {
    player.movePile(x, y);
  });

}


function makeNewViewPlayer(player, x, y) {
  viewPlayer = new ViewPlayer(x, y);

  // change to display multiple hands
  player.hands[0].cards.forEach(function(card) {
     viewPlayer.pile.push(card);
  });

  viewPlayer.renderPile();
  viewPlayer.renderSumText();

  return viewPlayer
}


function makeNewViewOpponent(opponent, x, y) {
  viewOpponent = new ViewOpponent(x, y);

  // change to display multiple hands
  opponent.hands[0].cards.forEach(function(card) {
     viewOpponent.pile.push(card);
  });

  viewOpponent.renderPile();

  return viewOpponent
}



allPlayers = [];

function createGameStateView(modelGameState) {

  window.stage.removeChildren(); // remove all sprites from stage

  modelGameState.opponents.forEach(function(opponent) {
    allPlayers[opponent.playerID] = makeNewViewPlayer(opponent, 100, 100);
  });

  var player = modelGameState.player

  allPlayers[player.playerID] = makeNewViewPlayer(player, 80,window.innerHeight - 150);

  // repositionAllHands();

};



requestAnimFrame( animate );

function animate() {
  requestAnimFrame( animate );
  // put anything that needs to be animated in here
  // render the stage

  renderer.render(window.stage);

}
