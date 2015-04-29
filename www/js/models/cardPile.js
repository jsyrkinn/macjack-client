
function CardPile() {
  this.cards = [];

  this.push = function(thing) {
    this.cards.push(thing);
  }


  this.sumTotal = function() {
    var tot21 = 0;
    var totals = [];
    totals[0] = 0;

    for (var i = 0; i < this.cards.length; i++ ) {
      var card = this.cards[i];

      var totLength = totals.length;
      for (var b=totals.length-1; b >= 0; b--) {

        if (card.rank != 1 && card.rank <= 10) {
          totals[b] += card.rank;

        } else if (card.rank > 10){
          totals[b] += 10;

        } else {
          totals.push(totals[b] + 11);
          totals[b]+=1;
        }

        if (totals[b] > 21) {
          tot21 = totals[b];
          totals.splice(b,1);
        }
      }
    }

    if (totals.length == 0) {
      totals = tot21
    }

    return totals;
  }
}
