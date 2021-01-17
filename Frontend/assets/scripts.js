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

function update_smoke(w) {
  smoke = w;
}

function update_response(e) {
  response = e;
}

function update_family(p) {
  family = p;
}

function update_interaction(z) {
  interaction = z;
}

function update_age(den) {
  age = document.getElementById(den).value;
}

function update_pin(pinvalue) {
  pincode = document.getElementById(pinvalue).value;
}

function update_spotify(sp_link) {
  spotify_link = document.getElementById(sp_link).value;
}