const mongoose = require('mongoose');

const healthSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  how_you_feel: {
    type: String,
    required: true,
  },
  other_ailments: {
    type: String,
    required: true,
  },
  have_you_smoked: {
    type: String,
    required: true,
  },
  response_to_covid: {
    type: String,
    required: true,
  },
  people_in_household: {
    type: String,
    required: true,
  },
  interact: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  spotify_link: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model("Click", healthSchema);