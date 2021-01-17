function go_next(a) {
  var cards = document.getElementsByClassName('content_card');

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  document.getElementById('content_card_' + a).style.display = "block";
}

var how_you_feel = "",
  name_string = "asdf", 
  disease = "",
  smoke = "",
  response = "",
  family = "",
  interaction = "",
  age = "",
  pincode = "",
  user_id = "asdf",
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
  await populate_endpanel();
  go_next(11);
}


async function send_data() {

  var settings = {
    url: "https://stump-messy-geometry.glitch.me/logs/",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
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
      userId: user_id,
    }),
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);
  });

}


async function populate_endpanel() {
  await get_user_stats();
  await get_a_song();
  await get_backup_song();
  await get_giphy();
  await get_name();
}


async function get_user_stats() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://stump-messy-geometry.glitch.me/logs/user_status_number/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
}

async function get_a_song() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://stump-messy-geometry.glitch.me/logs/get_a_song/",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}


async function get_backup_song() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://stump-messy-geometry.glitch.me/logs/backup_song/",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}


async function get_giphy() {

  var mykey = "qCX7Jiw8tA6S2Ncyi8ixZ90SNwPD6pMm";
  var mytag = 'cartoon';
  var xhr = $.get(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&tag=${mytag}&limit=1`);
  xhr.done(
    function(data) {
      console.log(data);
  })
}


async function get_name() {
  var xhr = $.get(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=1c81d0af693a4bb796e1e03feda584b8`
  );
  xhr.done(function (data) {
    console.log(data.ip_address);
    console.log(data.region_geoname_id);
  });
}