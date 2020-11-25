const mongoose = require('mongoose');

let documentarySchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    DateOfBirth: Date,
    DateOfDeath: Date
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documentary' }]
});

let Documentary = mongoose.model('Documentary', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Documentary = Documentary;
module.exports.User = User;
