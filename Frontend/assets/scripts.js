function go_next(a) {
  var cards = document.getElementsByClassName('content_card');

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  document.getElementById('content_card_' + a).style.display = "block";
}

var how_you_feel = "",
  name_string = "", 
  disease = "",
  smoke = "",
  response = "",
  family = "",
  interaction = "",
  age = "",
  pincode = "",
  user_id = "",
  spotify_link = "";

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

async function update_spotify(sp_link) {
  spotify_link = document.getElementById(sp_link).value;

  await send_data();
  go_next(11);
}


async function send_data() {

  try {

    var post_payload = {
      name: name_string,
      how_you_feel: how_you_feel,
      other_ailments: disease,
      have_you_smoked: smoke,
      response_to_covid: response,
      people_in_household: family,
      interact: interaction,
      age: age,
      zipcode: pincode,
      spotify_link: spotify_link,
      userId: user_id
    };

    console.log(post_payload);
    $.post(
      "https://stump-messy-geometry.glitch.me/logs/",
      post_payload,
      function (data) {
        console.log(data);
      }
    );
  } catch (e) {
    //Just Do what else is to be done. Opens End Page.
  }
}