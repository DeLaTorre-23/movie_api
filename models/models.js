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

let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true},
});

let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: String,
  DateOfBirth: Date,
  DateOfDeath: Date
});


let Documentary = mongoose.model('Documentary', documentarySchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

module.exports.Documentary = Documentary;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
