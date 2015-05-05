
function CardPile(hand) {
  this.cards = hand.cards;
  this.bet = hand.bet;
  this.busted = hand.busted;
  this.finished = hand.finished;

  this.sumTotal = function() {
    var tot21 = 0;
    var totals = [];
    totals[0] = 0;

    this.cards.forEach(function(card) {
      for (var i=totals.length-1; i >= 0; i--) {
        if (card.rank == 1) {
          // ace
          if (totals.indexOf(totals[i]+1) == -1) {
            totals.push(totals[i] + 1);
          }
          totals[i] += 11;

        } else if (card.rank < 10) {
          // number card
          totals[i] += card.rank;

        } else {
          // face card
          totals[i] += 10;
        }

        if (totals[i] > 21) {
          tot21 = totals[i];
          totals.splice(i,1);
        }
      }
    });

    if (totals.length == 0) {
      totals = tot21
    }

    return totals.sort();
  }
}
