function Deck() {
  this.cards = [];

  //change to number code later
  suits = ["spades", "clubs", "hearts", "diamonds"];
  ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    // create all the cards
  for (s = 0; s < suits.length; s++) {
    for (r = 0; r < ranks.length; r++) {
      this.cards.push(new Card(ranks[r], suits[s]));
    }
  }

  this.drawCard = function() {
    if (this.cards.length > 0) {
      var idx = Math.floor(Math.random()*this.cards.length)
      console.log("card drawn");
      return this.cards.splice(idx, 1)[0];
    } else {
      console.log("Error: Deck is empty!")
    }
  }
}
