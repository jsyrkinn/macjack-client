//init views

// create an new instance of a pixi stage
var interactive = true
var stage = new PIXI.Stage(0x66FF99, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {resolution:2});

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

//TODO: function to calculate xy position for player and dealer
dealer = new Dealer(50,100);

/*
player = new Player();
tutorialBox = new TutorialBox();
betText = new BetText();
totalText = new TotalText();
*/

card1 = new Card("ace", "spades");
card2 = new Card("two", "diamonds");
card3 = new Card("three", "hearts");


dealerPile = dealer.pile.cards;

dealerPile.push(card1);
dealerPile.push(card2);
dealerPile.push(card3);

dealer.renderPile();



player = new Player(50,window.innerHeight - 200);
card1 = new Card("ace", "diamonds");
card2 = new Card("two", "hearts");
card3 = new Card("four", "hearts");


playerPile = player.pile.cards;

playerPile.push(card1);
playerPile.push(card2);
playerPile.push(card3);

player.renderPile();

touchHandler = new TouchHandler();


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
