function go_next(a) {
  var cards = document.getElementsByClassName('content_card');

  setTimeout(function () {
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
      }
      document.getElementById("content_card_" + a).style.display = "block";
  }, 200);
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
  undisable_button(2);
}

function update_disease(q) {
  disease = q;
  undisable_button(3);
}

function update_smoke(w) {
  smoke = w;
  undisable_button(4);
}

function update_response(e) {
  response = e;
  undisable_button(5);
}

function update_family(p) {
  family = p;
  undisable_button(6);
}

function update_interaction(z) {
  interaction = z;
  undisable_button(7);
}

function update_age(den) {
  age = document.getElementById(den).value;
}

function update_pin(pinvalue) {
  pincode = document.getElementById(pinvalue).value;
  undisable_button(9);
}

async function update_spotify(sp_link) {
  spotify_link = document.getElementById(sp_link).value;

    await get_name();
    await send_data();

  await populate_endpanel();
  go_next(11);
}


async function send_data() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var send_payload = {
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
  }

  var raw = JSON.stringify(send_payload);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://stump-messy-geometry.glitch.me/logs/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log())
    .catch((error) => console.log("error", error));
}


async function populate_endpanel() {
  await get_user_stats();
  await get_a_song();
  await get_backup_song();
  await get_giphy();
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
          <p>We try to share song links with each other to make it fun to share health details. Click on the Music box.</p>\
          <img class="song_image" src="https://media.giphy.com/media/FwDvNgZRhIGTu6xwl3/giphy.gif" width="50px"/>\
        </div>\
      </div></a>';
    document.getElementById("song_space").innerHTML = html;
    }
    else {
      var html =
        '<a target="blank" href="' +
        get_backup_song() +
        '"><div class="song_div">\
        <div class="song_first_row">\
          <img src="https://media.giphy.com/media/YQMiQtopRjjZRSYRJF/giphy.gif" width="90px"/> <h2>A Song for you</h2>\
          <p>We try to share song links with each other to make it fun to share health details. Click on the Music box.</p>\
          <img class="song_image" src="https://media.giphy.com/media/FwDvNgZRhIGTu6xwl3/giphy.gif" width="50px"/>\
        </div>\
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
    'https://ipgeolocation.abstractapi.com/v1/?api_key=1c81d0af693a4bb796e1e03feda584b8'
  );
  xhr.done(function (data) {
    name_string = '"' + data.ip_address + '"';
    user_id = '"' + data.region_geoname_id + '"';
  });


}


async function test_spotify(link) {
  var url = link;
  var re = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/;
  var flag = re.test(url);

  return flag;
}


function change_background() {
  var background = [
    "https://media.giphy.com/media/SYQZsJBTf2zE4/giphy.gif",
    "https://media.giphy.com/media/26gZ1Ye2gkRUxtj9u/giphy.gif",
    "https://media.giphy.com/media/1USKMDPjuH4ovL7J5h/giphy.gif",
    "https://media.giphy.com/media/Ka1r959yBXQQrEK2vZ/giphy.gif",
    "https://media.giphy.com/media/l4pSWmhzCYJyINwGs/giphy.gif",
    "https://media.giphy.com/media/2Y59FyfIQe2W0wDYS0/giphy.gif",
    "https://media.giphy.com/media/dwABcccmUZcU3pdXgD/giphy.gif",
    "https://media.giphy.com/media/St2aawWmTL7ggtJTuB/giphy.gif",
    "https://media.giphy.com/media/QxGdCR801b0nUmR7LE/giphy.gif",
    "https://media.giphy.com/media/l0IygnBoXeQ94kJQQ/giphy.gif",
    "https://media.giphy.com/media/kgFlsAswa9dXG/giphy.gif",
    "https://media.giphy.com/media/xThtaaVNrPdQ64U9vq/giphy.gif",
    "https://media.giphy.com/media/GB3MktbhWQPW8/giphy.gif",
    "https://media.giphy.com/media/3o7WIHvqsj3emiv3eE/giphy.gif",
  ];

  document.body.style.background = "url(" + background[Math.floor(Math.random() * 14)] + ")";
  document.body.style.backgroundSize = "100vw 100vh";

}

setInterval(function () {
  change_background()
}, 5000);



var action_button = document.getElementsByClassName('action_button');
function undisable_button(index) {
  action_button[index].disabled = false;
}

document.getElementById("age_input").addEventListener("click", function () {
    undisable_button(8);
});

document.getElementById("pincode_input").addEventListener("click", function () {
  undisable_button(9);
});

document.getElementById("spotify_input").addEventListener("click", function () {
  undisable_button(10);
});


get_name();
