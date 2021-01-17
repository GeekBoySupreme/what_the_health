function go_next(a) {
  var cards = document.getElementsByClassName('content_card');

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  document.getElementById('content_card_' + a).style.display = "block";
}

function update_howifeel(b) {
  how_you_feel = b;
}

function update_disease(q) {
  disease = q;
}

