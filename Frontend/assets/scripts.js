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
  await send_data();
}


async function get_user_stats() {

  var xhr = $.get(
    'https://stump-messy-geometry.glitch.me/logs/user_status_number/'
  );
  xhr.done(function (data) {
    var html =
      '<div class="status_users"><div class="feel_stats"><span><h3>😃 ' +
      data.feeling_good +
      '</h3></span><span>people are feeling Good</span></div><div class="feel_stats"><span><h3>😔 ' +
      data.feeling_bad +
      "</h3></span><span>people are not feeling good</span></div></div>";

    document.getElementById("status_space").innerHTML = html;
  });
}

async function get_a_song() {

  var xhr = $.get("https://stump-messy-geometry.glitch.me/logs/get_a_song/");

  xhr.done(function (data) {

    var test_flag = test_spotify(data.spotify_link);

    if (test_flag) {
      var html =
        '<a target="blank" href="' +
        data.spotify_link +
        '"><div class="song_div">\
        <div class="song_first_row">\
          <img src="https://media.giphy.com/media/YQMiQtopRjjZRSYRJF/giphy.gif" width="90px"/> <h2>A Song for you</h2>\
          <p>We try to share song links with each other to make it fun to share health details.</p>\
          <img class="song_image" src="https://media.giphy.com/media/FwDvNgZRhIGTu6xwl3/giphy.gif" width="50px"/>\
        </div>\
      </div></a>';
    document.getElementById("song_space").innerHTML = html;
    }
    else {
      var html =
      '<a target="blank" href="'+ get_backup_song() +'"><div class="song_div">\
        <div class="song_first_row">\
          <img src="https://media.giphy.com/media/YQMiQtopRjjZRSYRJF/giphy.gif" width="50px"/> A Song for you\
        </div>\
        <img src="https://media.giphy.com/media/IfrucYnEVfvlhrgdYd/giphy.gif" width="100px"/>\
      </div></a>';
    document.getElementById("song_space").innerHTML = html;
    }
    
  });
}


async function get_backup_song() {
  var xhr = $.get("https://stump-messy-geometry.glitch.me/logs/backup_song/");
  var song_link = "";

  xhr.done(function (data) {
    song_link = data.spotify_link;
  });

  return song_link;
}


async function get_giphy() {

  var mykey = "qCX7Jiw8tA6S2Ncyi8ixZ90SNwPD6pMm";
  var mytag = 'cartoon';
  var xhr = $.get(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&tag=${mytag}&limit=1`);
  xhr.done(
    function(data) {
      console.log(data);
      var html =
        '<a target="blank" href="' +
        data.data.bitly_gif_url +
        '"><img class="gif_holder" src="' +
        data.data.fixed_height_downsampled_url +
        '" width="200px"/>';
      
      document.getElementById("gif_space").innerHTML = html;
    })
}


async function get_name() {
  var xhr = $.get(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=1c81d0af693a4bb796e1e03feda584b8`
  );
  xhr.done(function (data) {
    name = data.ip_address;
    user_id = data.region_geoname_id;
  });
}


async function test_spotify(link) {
  var url = link;
  var re = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/;
  var flag = re.test(url);

  return flag;
}