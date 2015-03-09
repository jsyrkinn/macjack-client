var allCards = [];
var playerHand = [];
var topCard = null;

function findCard(rank, suit) {
  //search for card
	for(c = 0; c < allCards.length; c++) {
		if (allCards[c].rank === rank && allCards[c].suit === suit) {
	return allCards[c];
    }
  }
};

