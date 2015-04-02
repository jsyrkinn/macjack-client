//init views

// create an new instance of a pixi stage
var interactive = true
var stage = new PIXI.Stage(0x476A34, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

deck = new Deck();

//TODO: function to calculate xy position for player and dealer
dealer = new Dealer(100,150);

/*
player = new Player();
tutorialBox = new TutorialBox();
betText = new BetText();
totalText = new TotalText();
*/

dealerPile = dealer.pile.cards;

dealerPile.push(deck.drawCard());

dealer.renderPile();



player = new Player(80,window.innerHeight - 150);

playerPile = player.pile;

playerPile.push(deck.drawCard());
playerPile.push(deck.drawCard());

player.renderPile();

touchHandler = new TouchHandler();


text = new PIXI.Text("Sum: " + playerPile.sumTotal(), {font:"24px RalewayTest", fill:"black", stroke:"white", strokeThickness:"2"});
text.position.x = 10;
text.position.y = window.innerHeight - 50;
stage.addChild(text);


/*
// buttons
hitButton = new ActionButton("hit");
stayButton = new ActionButton("stay");
doneButton = new ActionButton("done");

*/



requestAnimFrame( animate );

function animate() {
  requestAnimFrame( animate );
  // put anything that needs to be animated in here
  // render the stage

  renderer.render(stage);

}

//});
