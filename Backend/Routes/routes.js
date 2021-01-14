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



//Read Monthly Logs
router.get("/month", async (req, res) => {
    try {
        const readLogs = await Log.find({ "month" : req.query.month });
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