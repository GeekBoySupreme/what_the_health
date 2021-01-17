const express = require("express");
const router = express.Router();
const Log = require("../models/healthlogs")


//Read All Logs from Server
router.get("/", async (req, res) => {
    try {
        const readLogs = await Log.find();
        res.json(readLogs);
    }
    catch(err) {
        res.json({ message : err.name });
    }
});



//Get a song
router.get("/get_a_song", async (req, res) => {
    try {
        var rand = Math.random();
        const readLogs = await Log.aggregate([{$sample:{size:1}}]);
        res.json({ spotify_link: readLogs[0].spotify_link });
    }
    catch(err) {
        res.json({ message : err.name });
    }
});


//Send song from backup
router.get("/backup_song", async (req, res) => {
    try {
        var rand = Math.floor(Math.random()*(spotify_list.length));
        res.json({ spotify_link: spotify_list[rand] });
    }
    catch(err) {
        res.json({ message : err.name });
    }
});


//Get list of folks feeling good and bad
router.get("/user_status_number", async (req, res) => {
  try {
    const goodLogs = await Log.find({"how_you_feel" : "good"});
    const badLogs = await Log.find({"how_you_feel" : "not_good"});
    
    res.json({"feeling_good" : goodLogs.length, "feeling_bad" : badLogs.length });
  }
  catch(err) {
    res.json({ message : err.name });
  }
});


//Get individual log
router.get("/user", async (req, res) => {
    try {
        const readLogs = await Log.find({ "userId" : req.query.id });
        res.json(readLogs);
    }
    catch(err) {
        res.json({ message : err.name });
    }
});




//Send Click Logs to Server
router.post('/', async (req, res) => {
    const log = new Log({
      name: req.body.name,
      how_you_feel: req.body.how_you_feel,
      other_ailments: req.body.other_ailments,
      have_you_smoked: req.body.have_you_smoked,
      response_to_covid: req.body.response_to_covid,
      people_in_household: req.body.people_in_household,
      interact: req.body.interact,
      age: req.body.age,
      zipcode: req.body.zipcode,
      spotify_link: req.body.spotify_link,
      userId: req.body.userId,
    });

    try {
        const saveLog = await log.save()
        res.json(saveLog);
    }
    catch(err) {
        res.json({ message : err.name });
    }
})

module.exports = router;



var spotify_list = [
  "https://open.spotify.com/playlist/37i9dQZF1EtkBN4eKjOFTU?si=Tlp4etQCQEKkFgWdkR_vYQ",
  "https://open.spotify.com/playlist/37i9dQZF1DZ06evO0v8njp?si=0eipFDPXQka01UADOsNkdw",
  "https://open.spotify.com/artist/4DHXXUP4qza7DacDKVT23G?si=DZZW4iPCThmyjHgnijzFNg",
  "https://open.spotify.com/playlist/37i9dQZF1EOoC97IsnvnlX?si=9DF2oUQqSV-vMAYT7M84ng",
  "https://open.spotify.com/playlist/37i9dQZF1DX0KCMikGxzJw?si=Z5XujX9pRha5A6MSjZKDaA",
  "https://open.spotify.com/playlist/7ySGEDnNVzQ8HEYYrCIG9J?si=xDEjyoHOQTynbIkrP8fzhw",
  "https://open.spotify.com/playlist/37i9dQZF1DX7s4W4By2flM?si=0R4m2HEFT2CGY5Autkt_UQ"
];
